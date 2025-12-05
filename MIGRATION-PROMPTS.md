# 🚀 DataHelp Next.js Migration - Hlavní Prompt

## Jak použít tento soubor

1. Zkopíruj obsah sekce "STARTOVACÍ PROMPT" do Claude Code
2. Po dokončení každé fáze použij odpovídající "POKRAČOVACÍ PROMPT"
3. Při chybách použij "DEBUG PROMPT"

---

## STARTOVACÍ PROMPT

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

Vytvoř report ve formátu:

### Stránky (X celkem)
- [název] → [navrhovaná Next.js cesta]

### Komponenty (X celkem)
- [název] → [Server/Client Component]

### Kontexty
- [název] → [jak migrovat]

### Dependencies k přidání
- [balíček] → [účel]

### Potenciální problémy
- [problém] → [řešení]

Po dokončení analýzy čekej na další instrukce.
```

---

## POKRAČOVACÍ PROMPTY

### Po Fázi 1 (Analýza) → Fáze 2 (Setup)

```
Výborně. Pokračuj Fází 2: Setup projektu.

1. Uprav package.json - přidej tyto dependencies:
   - next-intl
   - @supabase/ssr (pro server-side Supabase)
   - Další identifikované v analýze

2. Vytvoř next.config.js s konfigurací pro:
   - next-intl plugin
   - Image domains (supabase, unsplash)
   - Redirecty (pokud potřeba)

3. Vytvoř middleware.ts pro i18n routing

4. Zkopíruj a uprav tailwind.config.js z originálu

5. Vytvoř základní strukturu:
   - lib/supabase/client.ts
   - lib/supabase/server.ts
   - messages/cs.json (zkopíruj z src-backup/locales)
   - messages/en.json

6. Vytvoř základní app/[locale]/layout.tsx

Po každém kroku spusť `npm run dev` a ověř že není chyba.
```

### Po Fázi 2 (Setup) → Fáze 3 (Komponenty)

```
Pokračuj Fází 3: Migrace komponent.

Migruj komponenty v tomto pořadí (od základních k složitějším):

1. **Layout komponenty** (Server Components):
   - Header
   - Footer
   - Navigation

2. **UI komponenty** (většinou Client):
   - Button
   - Card
   - Modal
   - Forms

3. **Feature komponenty**:
   - CookieConsent (Client)
   - LanguageSwitcher (Client)
   - ContactForm (Client)

Pro každou komponentu:
1. Zkopíruj do ./components/
2. Uprav importy (Link, useRouter, atd.)
3. Přidej "use client" pokud potřeba
4. Otestuj v prohlížeči

Začni s Header a Footer, pak pokračuj dalšími.
```

### Po Fázi 3 (Komponenty) → Fáze 4 (Stránky)

```
Pokračuj Fází 4: Migrace stránek.

Migruj stránky v tomto pořadí:

1. **Homepage** - app/[locale]/page.tsx
2. **Statické stránky**:
   - /o-nas
   - /kontakt
   - /faq
   - /cookies, /gdpr, /obchodni-podminky

3. **Služby**:
   - /sluzby (overview)
   - /sluzby/[slug] (detail)

4. **Ceník**:
   - /cenik (overview)
   - /cenik/[slug] (detail)

5. **Blog** (ISR):
   - /blog (seznam s paginací)
   - /blog/[slug] (detail článku)

Pro každou stránku:
1. Vytvoř soubor v app/[locale]/
2. Přidej metadata export pro SEO
3. Přidej generateStaticParams pokud dynamická
4. Otestuj v prohlížeči

Začni s Homepage.
```

### Po Fázi 4 (Stránky) → Fáze 5 (SEO & Finalizace)

```
Pokračuj Fází 5: SEO a finalizace.

1. **SEO**:
   - Ověř že každá stránka má metadata
   - Přidej JSON-LD Schema.org (LocalBusiness, Service, Article, FAQPage)
   - Vytvoř app/sitemap.ts (dynamický sitemap)
   - Vytvoř app/robots.ts

2. **Formuláře**:
   - Ověř že kontaktní formulář funguje
   - Ověř že objednávka diagnostiky funguje
   - Vytvoř API routes pokud potřeba

3. **Finální testy**:
   - Spusť `npm run build`
   - Oprav všechny chyby
   - Otestuj každou stránku manuálně
   - Zkontroluj mobile responsive

4. **Lighthouse audit**:
   - Spusť Lighthouse v Chrome DevTools
   - Cíl: Performance > 90, SEO > 95
   - Oprav problémy pokud jsou

Začni s SEO metadata kontrolou.
```

---

## DEBUG PROMPTY

### Při chybě v konzoli

```
Mám tuto chybu v konzoli:

[VLOŽ CHYBOVOU HLÁŠKU]

Analyzuj příčinu a oprav. Vysvětli co bylo špatně.
```

### Při selhání buildu

```
`npm run build` selhává s touto chybou:

[VLOŽ CHYBOVOU HLÁŠKU]

Oprav chybu a znovu spusť build. Pokud je více chyb, řeš je jednu po druhé.
```

### Při TypeScript chybách

```
TypeScript hlásí tyto chyby:

[VLOŽ CHYBY]

Oprav typy. Nevypínej TypeScript kontrolu, oprav správně.
```

### Při problémech s i18n

```
Překlady nefungují správně. Zkontroluj:
1. middleware.ts konfigurace
2. messages/*.json soubory
3. NextIntlClientProvider v layout.tsx
4. useTranslations hook v komponentách

Najdi a oprav problém.
```

---

## UTILITY PROMPTY

### Zobrazení struktury

```
Ukaž mi aktuální strukturu ./app/ adresáře pomocí `tree` nebo `find`.
```

### Kontrola TODO

```
Najdi všechny TODO komentáře v kódu a vytvoř seznam co zbývá dodělat.
```

### Porovnání s originálem

```
Porovnej [název stránky] v originálu (src-backup) a v nové verzi (app/).
Chybí nějaká funkcionalita?
```

### Export pro Git

```
Vytvoř .gitignore pro Next.js projekt a commitni aktuální stav:
git add .
git commit -m "[popis změn]"
```

---

## TIPY PRO EFEKTIVNÍ PRÁCI

1. **Malé kroky**: Migruj jednu komponentu/stránku najednou
2. **Častý test**: Po každé změně `npm run dev`
3. **Build často**: Minimálně po každé fázi `npm run build`
4. **Commit často**: Po každé funkční změně commitni
5. **Neptej se, dělej**: Claude Code má tendenci se ptát - řekni mu ať rovnou dělá
6. **Konkrétní instrukce**: Čím konkrétnější prompt, tím lepší výsledek

---

## CHECKLIST PRO DOKONČENÍ

```
□ Všechny stránky migrované
□ Všechny komponenty fungují
□ i18n funguje (CS/EN)
□ Blog s ISR funguje
□ Formuláře odesílají data
□ SEO metadata na všech stránkách
□ Schema.org JSON-LD
□ Sitemap generuje se
□ Mobile responsive
□ npm run build úspěšný
□ Lighthouse Performance > 90
□ Lighthouse SEO > 95
```
