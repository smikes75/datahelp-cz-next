/**
 * Script pro konverzi překladů z TypeScript modulů do JSON
 * Převádí src-backup/i18n/locales/cs/*.ts -> messages/cs.json
 */

const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src-backup/i18n/locales/cs');
const outputFile = path.join(__dirname, '../messages/cs.json');

// Načteme index.ts aby viděli strukturu
const indexPath = path.join(localesDir, 'index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf-8');

// Extrahujeme všechny importy a exports z index.ts
const importRegex = /import \{ (\w+) \} from '\.\/(\w+)'/g;
const modules = [];
let match;

while ((match = importRegex.exec(indexContent)) !== null) {
  modules.push({
    name: match[1],
    file: match[2]
  });
}

console.log(`📦 Nalezeno ${modules.length} překladových modulů`);

// Načteme všechny moduly
const translations = {};

for (const module of modules) {
  const filePath = path.join(localesDir, `${module.file}.ts`);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Najdeme export const xxx = { ... }
    const exportMatch = content.match(/export const \w+ = ({[\s\S]*});?\s*$/);

    if (exportMatch) {
      try {
        // Převedeme TypeScript objekty na JSON
        // Odstraníme poslední středník pokud existuje
        let objString = exportMatch[1].replace(/;$/, '');

        // Nahradíme single quotes za double quotes
        objString = objString.replace(/'/g, '"');

        // Nahradíme property keys bez uvozovek za keys s uvozovkami
        objString = objString.replace(/(\w+):/g, '"$1":');

        // Pokusíme se parsovat
        const parsed = eval(`(${objString})`);
        translations[module.name] = parsed;

        console.log(`✅ ${module.file}.ts -> ${module.name}`);
      } catch (err) {
        console.error(`❌ Chyba při parsování ${module.file}.ts:`, err.message);
      }
    }
  } else {
    console.warn(`⚠️  Soubor ${module.file}.ts nebyl nalezen`);
  }
}

// Přidáme ještě extra translations z index.ts (caseStudies, stickyCta)
translations.caseStudies = {
  title: 'Případové studie',
  description: 'Reálné příklady úspěšné záchrany dat z poškozených zařízení',
  problem: 'Problém:',
  solution: 'Řešení:',
  result: 'Výsledek:',
  duration: 'Doba řešení:',
  recoveryRate: 'Úspěšnost:',
  documentation: 'Kompletní dokumentace',
  contactUs: 'Máte podobný problém?'
};

translations.stickyCta = {
  call: 'Volat',
  consultation: 'Bezplatná konzultace'
};

// Uložíme do JSON souboru
fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2), 'utf-8');

console.log(`\n✨ Překlady úspěšně převedeny do ${outputFile}`);
console.log(`📊 Celkem modulů: ${Object.keys(translations).length}`);
