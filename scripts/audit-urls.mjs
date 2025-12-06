#!/usr/bin/env node

/**
 * KOMPLETNÍ AUDIT URL - DataHelp.cz
 * Porovnání produkčního webu s Next.js projektem
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔍 Spouštím kompletní audit URL...\n');

// === 1. NAČTI PRODUKČNÍ URL ===
console.log('📥 Načítám produkční URL...');
const productionUrlsRaw = readFileSync('/tmp/production-urls.txt', 'utf-8');
const productionUrls = productionUrlsRaw.split('\n').filter(Boolean).map(url => url.trim());
console.log(`   ✓ Nalezeno ${productionUrls.length} URL v sitemapu\n`);

// === 2. NAČTI STRÁNKY Z PROJEKTU ===
console.log('📂 Načítám stránky z projektu...');
const pageFiles = execSync('find app -name "page.tsx" -type f 2>/dev/null', {
  cwd: projectRoot,
  encoding: 'utf-8'
}).split('\n').filter(Boolean);

const projectPages = pageFiles.map(file => {
  // Převod: app/zachrana-dat/hdd/page.tsx → /zachrana-dat/hdd/
  let path = file
    .replace('app/', '/')
    .replace('/page.tsx', '/')
    .replace('//', '/');

  // Homepage speciálně
  if (path === '/page.tsx' || path === '//') path = '/';

  return path;
});

console.log(`   ✓ Nalezeno ${projectPages.length} stránek v projektu\n`);

// === 3. PARSUJ REDIRECTY Z next.config.mjs ===
console.log('🔄 Parsuju redirecty...');
const nextConfigContent = readFileSync(join(projectRoot, 'next.config.mjs'), 'utf-8');

// Extrahuj všechny source/destination páry
const redirects = [];
const redirectRegex = /source:\s*['"](.+?)['"]\s*,\s*destination:\s*['"](.+?)['"]/gs;
let match;
while ((match = redirectRegex.exec(nextConfigContent)) !== null) {
  redirects.push({
    source: match[1],
    destination: match[2]
  });
}

console.log(`   ✓ Nalezeno ${redirects.length} redirectů\n`);

// === 4. FUNKCE PRO KONTROLU URL ===
function checkUrl(prodUrl) {
  // Normalizuj URL (odstraň trailing slash pro porovnání)
  const normalizedProd = prodUrl.replace(/\/$/, '');
  const normalizedProdWithSlash = normalizedProd + '/';

  // 1. Zkontroluj přímou existenci v projektu
  if (projectPages.includes(prodUrl) ||
      projectPages.includes(normalizedProd) ||
      projectPages.includes(normalizedProdWithSlash)) {
    return { status: 'exists', path: prodUrl };
  }

  // 2. Zkontroluj dynamické routy
  if (prodUrl.startsWith('/clanky/') && prodUrl !== '/clanky/' && prodUrl !== '/clanky') {
    // Článek - dynamická routa
    return { status: 'dynamic', path: '/clanky/[slug]/', pattern: prodUrl };
  }

  // 3. Zkontroluj redirecty
  for (const redirect of redirects) {
    const sourceNorm = redirect.source.replace(/\/$/, '');

    // Přesná shoda
    if (sourceNorm === normalizedProd || redirect.source === prodUrl) {
      return { status: 'redirect', destination: redirect.destination };
    }

    // Wildcard match (např. /novinky/:slug*)
    if (redirect.source.includes(':slug')) {
      const sourcePattern = redirect.source.replace(':slug*', '');
      if (prodUrl.startsWith(sourcePattern)) {
        return { status: 'redirect', destination: redirect.destination };
      }
    }
  }

  // 4. CHYBÍ
  return { status: 'missing' };
}

// === 5. ANALYZUJ VŠECHNY URL ===
console.log('🔬 Analyzuji všechny URL...\n');

const results = {
  exists: [],
  dynamic: [],
  redirect: [],
  missing: []
};

for (const url of productionUrls) {
  const result = checkUrl(url);

  switch (result.status) {
    case 'exists':
      results.exists.push({ url, path: result.path });
      break;
    case 'dynamic':
      results.dynamic.push({ url, route: result.path });
      break;
    case 'redirect':
      results.redirect.push({ url, destination: result.destination });
      break;
    case 'missing':
      results.missing.push({ url });
      break;
  }
}

// === 6. VYTVOŘ REPORT ===
console.log('📝 Generuji report...\n');

const report = `# Audit URL - DataHelp.cz vs Next.js projekt
Datum: ${new Date().toLocaleDateString('cs-CZ')}

## 📊 Shrnutí
- **Celkem URL na produkci:** ${productionUrls.length}
- ✅ **Existuje v projektu:** ${results.exists.length}
- 🔀 **Dynamické routy:** ${results.dynamic.length}
- ↪️ **Má redirect:** ${results.redirect.length}
- ❌ **CHYBÍ:** ${results.missing.length}

---

## ❌ CHYBĚJÍCÍ URL (${results.missing.length})

${results.missing.length === 0 ? '✅ Všechny URL jsou pokryté!\n' : ''}
${results.missing.map(({ url }) => `- \`${url}\``).join('\n')}

---

## ✅ Existující stránky (${results.exists.length})

| Produkční URL | Next.js cesta |
|---------------|---------------|
${results.exists.slice(0, 30).map(({ url, path }) => `| \`${url}\` | \`${path}\` |`).join('\n')}
${results.exists.length > 30 ? `\n... a dalších ${results.exists.length - 30} stránek` : ''}

---

## 🔀 Dynamické routy (${results.dynamic.length})

Články s dynamickým slug v \`/clanky/[slug]/\`:

${results.dynamic.slice(0, 20).map(({ url }) => `- \`${url}\``).join('\n')}
${results.dynamic.length > 20 ? `\n... a dalších ${results.dynamic.length - 20} článků` : ''}

---

## ↪️ Redirecty (${results.redirect.length})

| Produkční URL | Redirect na |
|---------------|-------------|
${results.redirect.slice(0, 30).map(({ url, destination }) => `| \`${url}\` | \`${destination}\` |`).join('\n')}
${results.redirect.length > 30 ? `\n... a dalších ${results.redirect.length - 30} redirectů` : ''}

---

## 📋 Stránky v Next.js projektu (${projectPages.length})

${projectPages.map(page => `- \`${page}\``).join('\n')}

---

## 🔗 Doporučení

${results.missing.length > 0 ? `
### KRITICKÉ: Chybějící URL (${results.missing.length})
Tyto URL existují na produkci, ale v Next.js projektu pro ně není ani stránka ani redirect:

${results.missing.map(({ url }) => `- \`${url}\` - Přidat redirect nebo vytvořit stránku`).join('\n')}
` : '✅ Všechny produkční URL jsou pokryté (buď existují, nebo mají redirect).'}

`;

// Ulož report
const reportPath = join(projectRoot, 'AUDIT-URLS-REPORT.md');
writeFileSync(reportPath, report, 'utf-8');

console.log('✅ Report vygenerován!');
console.log(`📄 Soubor: ${reportPath}\n`);

// === 7. VÝPIS SHRNUTÍ DO KONZOLE ===
console.log('═══════════════════════════════════════════');
console.log('📊 SHRNUTÍ AUDITU URL');
console.log('═══════════════════════════════════════════');
console.log(`✅ Existuje v projektu:  ${results.exists.length}`);
console.log(`🔀 Dynamické routy:      ${results.dynamic.length}`);
console.log(`↪️  Má redirect:          ${results.redirect.length}`);
console.log(`❌ CHYBÍ:                ${results.missing.length}`);
console.log('═══════════════════════════════════════════\n');

if (results.missing.length > 0) {
  console.log('⚠️  VAROVÁNÍ: Nalezeny chybějící URL!');
  console.log('   Zkontroluj AUDIT-URLS-REPORT.md\n');
  process.exit(1);
} else {
  console.log('🎉 Všechny produkční URL jsou pokryté!\n');
  process.exit(0);
}
