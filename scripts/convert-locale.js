#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import all the locale files from oldprototype
const localesPath = path.join(__dirname, '../oldprototype/src/i18n/locales/cs');

// List of all translation files to import
const files = [
  'accessibility',
  'banner',
  'hero',
  'about',
  'services',
  'reviews',
  'pricing',
  'faq',
  'contact',
  'techPage',
  'gallery',
  'process',
  'footer',
  'privacy',
  'terms',
  'cookies',
  'cookieConsent',
  'priceCalculator',
  'orderDiagnostics',
  'blog',
  'seo',
  'nav'
];

// Dynamically import and combine all translations
const translations = {
  caseStudies: {
    title: 'Případové studie',
    description: 'Reálné příklady úspěšné záchrany dat z poškozených zařízení',
    problem: 'Problém:',
    solution: 'Řešení:',
    result: 'Výsledek:',
    duration: 'Doba řešení:',
    recoveryRate: 'Úspěšnost:',
    documentation: 'Kompletní dokumentace',
    contactUs: 'Máte podobný problém?'
  },
  stickyCta: {
    call: 'Volat',
    consultation: 'Bezplatná konzultace'
  }
};

// Read each file and parse its export
files.forEach(file => {
  try {
    const filePath = path.join(localesPath, `${file}.ts`);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract the exported object using regex
    // This is a simple parser - works for most cases
    const match = content.match(/export const \w+ = ({[\s\S]*});?\s*$/m);

    if (match) {
      // Evaluate the object (safely, as we control the source)
      const objString = match[1];
      try {
        // Use eval in a controlled way (we own this code)
        const obj = eval(`(${objString})`);
        translations[file] = obj;
        console.log(`✓ Imported ${file}`);
      } catch (e) {
        console.error(`✗ Failed to eval ${file}:`, e.message);
      }
    } else {
      console.error(`✗ Could not parse ${file}`);
    }
  } catch (e) {
    console.error(`✗ Error reading ${file}:`, e.message);
  }
});

// Special handling for cookieConsent (has two exports)
try {
  const cookieConsentPath = path.join(localesPath, 'cookieConsent.ts');
  const content = fs.readFileSync(cookieConsentPath, 'utf-8');

  const consentMatch = content.match(/export const cookieConsent = ({[\s\S]*?});/m);
  const settingsMatch = content.match(/export const cookieSettings = ({[\s\S]*?});/m);

  if (consentMatch && settingsMatch) {
    translations.cookieConsent = eval(`(${consentMatch[1]})`);
    translations.cookieSettings = eval(`(${settingsMatch[1]})`);
    console.log('✓ Imported cookieConsent and cookieSettings');
  }
} catch (e) {
  console.error('✗ Error with cookieConsent:', e.message);
}

// Special handling for caseStudies
try {
  const caseStudiesPath = path.join(localesPath, 'caseStudies.ts');
  const content = fs.readFileSync(caseStudiesPath, 'utf-8');

  const match = content.match(/export const caseStudies = ({[\s\S]*});?\s*$/m);

  if (match) {
    translations.caseStudies = eval(`(${match[1]})`);
    console.log('✓ Imported caseStudies');
  }
} catch (e) {
  console.error('✗ Error with caseStudies:', e.message);
}

// Write the combined JSON file
const outputPath = path.join(__dirname, '../messages/cs.json');
fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf-8');

console.log(`\n✅ Successfully created ${outputPath}`);
console.log(`   Total sections: ${Object.keys(translations).length}`);
