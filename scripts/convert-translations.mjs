/**
 * Script pro konverzi překladů z TypeScript modulů do JSON
 * Používá dynamický import pro načtení TypeScript modulů
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Seznam všech překladových modulů
const modules = [
  'seo', 'nav', 'accessibility', 'banner', 'hero', 'about',
  'services', 'reviews', 'pricing', 'faq', 'contact', 'techPage',
  'gallery', 'process', 'footer', 'privacy', 'terms', 'cookies',
  'cookieConsent', 'priceCalculator', 'orderDiagnostics', 'blog', 'admin'
];

const translations = {};

console.log('📦 Načítám překladové moduly...');

// Načteme každý modul
for (const moduleName of modules) {
  try {
    const modulePath = `../src-backup/i18n/locales/cs/${moduleName}.ts`;
    // Použijeme dynamický import - Node.js má problém s .ts soubory
    // Proto načteme soubor jako text a extrahujeme data
    const { readFileSync } = await import('fs');
    const content = readFileSync(join(__dirname, modulePath), 'utf-8');

    // Extrahujeme export
    const match = content.match(/export const \w+ = (\{[\s\S]*\});?\s*$/);
    if (match) {
      // Nahradíme TypeScript syntax za JavaScript
      let code = match[1];

      // Vyhodnotíme jako JavaScript
      const result = eval('(' + code + ')');
      translations[moduleName] = result;

      console.log(`✅ ${moduleName}`);
    }
  } catch (err) {
    console.error(`❌ ${moduleName}:`, err.message);
  }
}

// Přidáme extra translations
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

// Uložíme
const outputFile = join(__dirname, '../messages/cs.json');
writeFileSync(outputFile, JSON.stringify(translations, null, 2), 'utf-8');

console.log(`\n✨ Hotovo! Celkem modulů: ${Object.keys(translations).length}`);
