# 🚀 RYCHLÝ START - DataHelp Next.js Migrace

## Krok 1: Vytvoř adresář a zkopíruj soubory

```bash
# Vytvoř nový adresář pro projekt
mkdir ~/Projects/datahelp-nextjs
cd ~/Projects/datahelp-nextjs

# Zkopíruj zdrojové soubory z původního projektu
# (uprav cestu podle toho, kde máš prototyp)
cp -r ~/Documents/claude/src ./src-backup
cp -r ~/Documents/claude/public ./public-backup
cp ~/Documents/claude/package.json ./package-original.json
```

## Krok 2: Zkopíruj migrační soubory

```bash
# Zkopíruj soubory z tohoto balíčku
cp /cesta/k/CLAUDE.md ./
cp /cesta/k/MIGRATION-PROMPTS.md ./
cp /cesta/k/REDIRECT-MAP.md ./
cp /cesta/k/setup.sh ./

# Nastav oprávnění pro spuštění
chmod +x setup.sh
```

## Krok 3: Spusť setup skript

```bash
./setup.sh
```

Skript automaticky:
- Inicializuje Next.js projekt
- Nainstaluje dependencies
- Vytvoří základní strukturu
- Připraví i18n a Supabase konfigurace

## Krok 4: Uprav .env.local

```bash
# Otevři .env.local a přidej správný Supabase klíč
nano .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://oqcvqquecshienabwkxu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tvuj-skutecny-klic-zde
NEXT_PUBLIC_SITE_URL=https://www.datahelp.cz
```

## Krok 5: Spusť Claude Code

```bash
claude
```

## Krok 6: Vlož startovací prompt

Zkopíruj tento prompt do Claude Code:

```
Jsem Claude Code a budu migrovat React+Vite aplikaci na Next.js 14.

## Instrukce
1. Přečti CLAUDE.md v tomto adresáři - obsahuje kompletní specifikaci projektu
2. Analyzuj ./src-backup/ adresář se zdrojovými soubory
3. Pracuj systematicky, fázi po fázi
4. Po každé změně testuj pomocí `npm run dev`
5. Pokud narazíš na chybu, oprav ji před pokračováním
6. Piš komentáře v kódu česky

## Začni Fází 1: Analýza

Proveď analýzu zdrojových souborů:

1. Projdi ./src-backup/pages/ - seznam všech stránek
2. Projdi ./src-backup/components/ - seznam všech komponent
3. Projdi ./src-backup/contexts/ - seznam kontextů
4. Projdi ./src-backup/hooks/ - seznam custom hooks
5. Zkontroluj package-original.json - seznam dependencies
6. Zkontroluj ./src-backup/locales/ - strukturu překladů

Vytvoř report a pak čekej na další instrukce.
```

## Krok 7: Pokračuj podle MIGRATION-PROMPTS.md

Po každé dokončené fázi použij odpovídající pokračovací prompt z MIGRATION-PROMPTS.md

---

## 📁 Struktura souborů v balíčku

```
datahelp-migration/
├── CLAUDE.md              # Hlavní kontext pro Claude Code
├── MIGRATION-PROMPTS.md   # Všechny prompty pro migraci
├── REDIRECT-MAP.md        # SEO redirect mapa
├── setup.sh               # Automatický setup skript
└── QUICKSTART.md          # Tento soubor
```

---

## ⏱ Odhadovaný čas

| Fáze | Čas |
|------|-----|
| Setup | 30 min |
| Analýza | 1 hod |
| Komponenty | 15-20 hod |
| Stránky | 20-30 hod |
| SEO & Testing | 10-15 hod |
| Bug fixes | 10-20 hod |
| **Celkem** | **60-90 hod** |

---

## 💡 Tipy

1. **Dělej časté buildy** - `npm run build` odhalí SSR problémy
2. **Commituj často** - po každé funkční změně
3. **Testuj v prohlížeči** - ne jen v terminálu
4. **Čti chybové hlášky** - Claude Code je umí interpretovat
5. **Buď konkrétní** - čím konkrétnější prompt, tím lepší výsledek

---

## 🆘 Pomoc

Pokud se zasekneš:

1. Zkopíruj chybovou hlášku
2. Použij DEBUG PROMPT z MIGRATION-PROMPTS.md
3. Nech Claude Code analyzovat a opravit

---

Hodně štěstí! 🍀
