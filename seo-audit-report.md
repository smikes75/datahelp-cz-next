# SEO Struktura Audit: DataHelp.cz Redesign

**Datum analýzy:** 5. prosince 2024
**Produkční web:** https://www.datahelp.cz
**Nový projekt:** Next.js 14 App Router

---

## Executive Summary

### Celkový přehled

| Metrika | Produkce | Nový projekt | Delta |
|---------|----------|--------------|-------|
| **Celkem URL** | 228 | 127 (vč. 100 blog postů) | -101 |
| **Hlavní stránky** | 51 | 25 | -26 |
| **Blog články** | 115 | ✅ Zachováno (ISR) | 0 |
| **Novinky** | 62 | ❌ **CHYBÍ** | -62 |

### Kritická zjištění

🔴 **KRITICKÉ:**
- **62 URL z kategorie "Novinky" chybí** v novém projektu
- **8 servisních stránek záchrana dat chybí** (pevny-disk, externi-disk, sd-karta, usb-flash, nas, apple, mobilni-telefon, zachrana-dat-po-cele-cr)
- **5 ceníkových podstránek chybí**
- **20+ tématických/informačních stránek chybí**

⚠️ **DŮLEŽITÉ:**
- Struktura URL se výrazně změnila u služeb záchrana dat
- Chybí mnoho long-tail SEO stránek

✅ **POZITIVNÍ:**
- Blog články zachovány (ISR na `/clanky/[slug]`)
- Hlavní navigační struktura zachována
- Canonical URLs implementovány

---

## Fáze 1: Analýza produkčního webu

### 1.1 Kompletní URL mapa produkce

**Celkem: 228 URL**

#### Kategorie URL:

| Kategorie | Počet | Priority |
|-----------|-------|----------|
| Homepage | 1 | 1.0 |
| Články (/clanky/) | 115 | 0.5 |
| Novinky (/novinky/) | 62 | 0.5 |
| Služby (/zachrana-dat/) | 10 | 0.5 |
| Ceník (/cenik-zachrany-dat/) | 6 | 0.5 |
| Informační stránky | 34 | 0.5 |

### 1.2 Detailní struktura služeb (Produkce)

#### A) Záchrana dat - Hlavní služby

```
/zachrana-dat/                          (Přehled služeb)
├── /zachrana-dat/pevny-disk/           ⚠️ CHYBÍ V NOVÉM
├── /zachrana-dat/externi-disk/         ⚠️ CHYBÍ V NOVÉM
├── /zachrana-dat/ssd/                  ✅ Zachováno
├── /zachrana-dat/sd-karta/             ⚠️ CHYBÍ V NOVÉM
├── /zachrana-dat/usb-flash/            ⚠️ CHYBÍ V NOVÉM
├── /zachrana-dat/nas/                  ⚠️ CHYBÍ V NOVÉM
├── /zachrana-dat/raid/                 ✅ Zachováno
├── /zachrana-dat/apple/                ⚠️ CHYBÍ V NOVÉM
└── /zachrana-dat/mobilni-telefon/      ⚠️ CHYBÍ V NOVÉM

/zachrana-dat-po-cele-cr/               ⚠️ CHYBÍ V NOVÉM
```

**Metadata příklad (pevny-disk):**
- Title: "Záchrana dat z HDD – Bezplatná diagnostika & svoz | DataHelp"
- H1: "Pevný disk"
- Canonical: https://www.datahelp.cz/zachrana-dat/pevny-disk/

#### B) Ceník - Podstránky

```
/cenik-zachrany-dat/                                                ✅ Zachováno
├── /cenik-zachrany-dat/cenik-zachrany-dat-flash-disky-pametove-karty-mobily/  ⚠️ CHYBÍ
├── /cenik-zachrany-dat/cenik-zachrany-dat-nas-datova-uloziste/               ⚠️ CHYBÍ
├── /cenik-zachrany-dat/cenik-zachrany-dat-raid-pole/                         ⚠️ CHYBÍ
├── /cenik-zachrany-dat/cenik-zachrany-dat-ssd-disk-solid-state-disk/         ⚠️ CHYBÍ
└── /cenik-zachrany-dat/cenik-zachrany-dat-z-mobilu-os-android-ios/           ⚠️ CHYBÍ
```

#### C) Blog a novinky

```
/clanky/                                ✅ Zachováno
├── /clanky/[slug]/                     ✅ 115 článků (ISR)
└── /clanky/kategorie/*/                🔍 Kategorie v sitemapě

/novinky/                               ❌ CHYBÍ CELÁ SEKCE
└── /novinky/[slug]/                    ❌ 62 novinek chybí
```

**Příklady novinek (62 URL):**
- `/novinky/sk-hynix-predstavil-ssd-platinum-p41/`
- `/novinky/toshiba-dodala-rekordni-pocet-hdd-nearline/`
- `/novinky/backblaze-statistiky-poruchovosti-hdd-za-rok-2021/`
- atd...

#### D) Informační a utility stránky

**Zachované (✅):**
```
/                                       ✅ Homepage
/caste-dotazy/                          ✅ FAQ
/kontakt/                               ✅ Kontakt
/o-nas/                                 ✅ O nás
/reference/                             ⚠️ CHYBÍ (existuje v produkci!)
/obchodni-podminky/                     ✅ Obchodní podmínky
/ochrana-osobnich-udaju/                ✅ GDPR
/informace-o-cookies/                   ✅ Cookies
/poptavka-zachrany-dat/                 ✅ Poptávka
```

**Nové v redesignu (🆕):**
```
/technologie/                           🆕 Nová stránka (!)
/kalkulacka/                            🆕 Cenová kalkulačka
/zachrana-dat/firmy/                    🆕 Firemní řešení
/zachrana-dat/hdd/                      🆕 HDD (namísto /pevny-disk/)
/zachrana-dat/hdd/pripady/              🆕 Případové studie
/zachrana-dat/ssd/pripady/              🆕 Případové studie
/zachrana-dat/raid/pripady/             🆕 Případové studie
/admin/*                                🆕 Admin interface (3 stránky)
```

**Chybějící v novém projektu (⚠️):**
```
/reference/                             ⚠️ Reference/testimonials
/bezpecnost-dat/                        ⚠️ Bezpečnost dat
/fakturacni-udaje/                      ⚠️ Fakturační údaje
/partnersky-program/                    ⚠️ Partnerský program
/likvidace-dat/                         ⚠️ Likvidace dat
/odborne/                               ⚠️ Odborné informace
```

**Tématické/SEO stránky chybějící (⚠️):**
```
/pevny-disk-externi-disk/               ⚠️ HDD/external disk info
/hw-problem/                            ⚠️ HW problémy
/pametova-karta/                        ⚠️ Memory cards
/formatovani-pevneho-disku/             ⚠️ Disk formatting
/mechanicke-poskozeni-ploten-hdd/       ⚠️ Mechanical damage
/pevny-disk-vadne-sektory/              ⚠️ Bad sectors
/pevny-disk-vadny-motorek-zadrena-loziska/  ⚠️ Motor issues
/pevny-disk-prepeti-vypadek-elektriny/  ⚠️ Power surge
/pevny-disk-hw-poskozeni/               ⚠️ HW damage
/namoceny-pevny-disk/                   ⚠️ Water damage
/zaplaveny-disk/                        ⚠️ Flooded disk
/vadna-vnejsi-elektronika-hdd/          ⚠️ External electronics
/vadna-vnitrni-elektronika-hdd/         ⚠️ Internal electronics
/dalsi-zavady-hdd/                      ⚠️ Other HDD issues
/obnova-smazanych-souboru/              ⚠️ Deleted files recovery
/obnova-smazanych-fotek/                ⚠️ Photo recovery
/obnova-dat-z-diskoveho-pole-raid/      ⚠️ RAID recovery
/princip-cteni-hdd/                     ⚠️ HDD reading principle
/prvni-kroky-zachrany-dat/              ⚠️ First aid steps
```

### 1.3 Technické SEO elementy (Produkce)

**✅ Implementováno:**
- Sitemap.xml: https://www.datahelp.cz/sitemap.xml
- Robots.txt: Correct (allows all)
- Canonical URLs: Implementováno
- Title tags: Unique per page
- Meta descriptions: Present
- H1 tags: Present

**🔍 Neanalyzováno (vyžaduje další audit):**
- Schema.org markup (JSON-LD)
- Open Graph tags
- Hreflang tags (jazykové verze)
- Interní linking struktura
- Image alt tags
- Loading speed

---

## Fáze 2: Analýza nového projektu

### 2.1 Kompletní route mapa

**Celkem: 25 routes (+ 100 dynamických blog postů)**

#### Struktura Next.js App Router:

```
app/
├── page.tsx                            → /
├── caste-dotazy/page.tsx               → /caste-dotazy
├── cenik-zachrany-dat/page.tsx         → /cenik-zachrany-dat
├── clanky/
│   ├── page.tsx                        → /clanky
│   └── [slug]/page.tsx                 → /clanky/[slug] (100 posts, ISR)
├── informace-o-cookies/page.tsx        → /informace-o-cookies
├── kalkulacka/page.tsx                 → /kalkulacka (NOVÉ)
├── kontakt/page.tsx                    → /kontakt
├── o-nas/page.tsx                      → /o-nas
├── obchodni-podminky/page.tsx          → /obchodni-podminky
├── ochrana-osobnich-udaju/page.tsx     → /ochrana-osobnich-udaju
├── poptavka-zachrany-dat/page.tsx      → /poptavka-zachrany-dat
├── technologie/page.tsx                → /technologie (NOVÉ)
├── zachrana-dat/
│   ├── page.tsx                        → /zachrana-dat
│   ├── firmy/page.tsx                  → /zachrana-dat/firmy (NOVÉ)
│   ├── hdd/
│   │   ├── page.tsx                    → /zachrana-dat/hdd (NOVÉ JMÉNO)
│   │   └── pripady/page.tsx            → /zachrana-dat/hdd/pripady (NOVÉ)
│   ├── ssd/
│   │   ├── page.tsx                    → /zachrana-dat/ssd
│   │   └── pripady/page.tsx            → /zachrana-dat/ssd/pripady (NOVÉ)
│   └── raid/
│       ├── page.tsx                    → /zachrana-dat/raid
│       └── pripady/page.tsx            → /zachrana-dat/raid/pripady (NOVÉ)
├── admin/
│   ├── page.tsx                        → /admin (NOVÉ)
│   ├── dashboard/page.tsx              → /admin/dashboard (NOVÉ)
│   └── kontakty/page.tsx               → /admin/kontakty (NOVÉ)
└── test-env/page.tsx                   → /test-env (TEST)
```

### 2.2 Metadata implementation

#### ✅ Stránky s canonical URLs (19 stránek):

**Server Components (původní):**
1. `/` - Homepage
2. `/obchodni-podminky`
3. `/ochrana-osobnich-udaju`
4. `/clanky` - Blog list
5. `/clanky/[slug]` - Blog posts (100 dynamických URL)
6. `/poptavka-zachrany-dat`

**Refaktored (Wrapper Pattern):**
7. `/caste-dotazy` - FAQ
8. `/informace-o-cookies`
9. `/o-nas`
10. `/technologie`
11. `/cenik-zachrany-dat`
12. `/zachrana-dat` - Services
13. `/zachrana-dat/hdd`
14. `/zachrana-dat/ssd`
15. `/zachrana-dat/raid`
16. `/zachrana-dat/firmy`
17. `/zachrana-dat/hdd/pripady`
18. `/zachrana-dat/ssd/pripady`
19. `/zachrana-dat/raid/pripady`

#### ⚠️ Stránky BEZ canonical URLs (6 stránek):

- `/kontakt` - Contact form (client component)
- `/kalkulacka` - Calculator (client component)
- `/admin/*` - Admin pages (3x)
- `/test-env` - Test page

---

## Fáze 3: Porovnávací analýza

### 3.1 URL Mapping tabulka - Hlavní stránky

| Produkční URL | Nová URL | Status | Poznámka |
|---------------|----------|--------|----------|
| `/` | `/` | ✅ | Zachováno |
| `/caste-dotazy/` | `/caste-dotazy/` | ✅ | Zachováno + canonical |
| `/kontakt/` | `/kontakt/` | ✅ | Zachováno |
| `/o-nas/` | `/o-nas/` | ✅ | Zachováno + canonical |
| `/reference/` | - | ❌ | **CHYBÍ** |
| `/obchodni-podminky/` | `/obchodni-podminky/` | ✅ | Zachováno + canonical |
| `/ochrana-osobnich-udaju/` | `/ochrana-osobnich-udaju/` | ✅ | Zachováno + canonical |
| `/informace-o-cookies/` | `/informace-o-cookies/` | ✅ | Zachováno + canonical |
| `/poptavka-zachrany-dat/` | `/poptavka-zachrany-dat/` | ✅ | Zachováno + canonical |
| - | `/technologie/` | 🆕 | **NOVÁ STRÁNKA** |
| - | `/kalkulacka/` | 🆕 | **NOVÁ STRÁNKA** |

### 3.2 URL Mapping - Služby záchrana dat

| Produkční URL | Nová URL | Status | Redirect nutný |
|---------------|----------|--------|----------------|
| `/zachrana-dat/` | `/zachrana-dat/` | ✅ | Ne |
| `/zachrana-dat/pevny-disk/` | `/zachrana-dat/hdd/` | ⚠️ | **301 redirect** |
| `/zachrana-dat/externi-disk/` | `/zachrana-dat/hdd/` | ⚠️ | **301 redirect** |
| `/zachrana-dat/ssd/` | `/zachrana-dat/ssd/` | ✅ | Ne |
| `/zachrana-dat/raid/` | `/zachrana-dat/raid/` | ✅ | Ne |
| `/zachrana-dat/nas/` | `/zachrana-dat/raid/` | ⚠️ | **301 redirect** |
| `/zachrana-dat/sd-karta/` | - | ❌ | **Chybí** |
| `/zachrana-dat/usb-flash/` | - | ❌ | **Chybí** |
| `/zachrana-dat/apple/` | - | ❌ | **Chybí** |
| `/zachrana-dat/mobilni-telefon/` | - | ❌ | **Chybí** |
| `/zachrana-dat-po-cele-cr/` | - | ❌ | **Chybí** |
| - | `/zachrana-dat/firmy/` | 🆕 | **NOVÁ** |
| - | `/zachrana-dat/hdd/pripady/` | 🆕 | **NOVÁ** |
| - | `/zachrana-dat/ssd/pripady/` | 🆕 | **NOVÁ** |
| - | `/zachrana-dat/raid/pripady/` | 🆕 | **NOVÁ** |

### 3.3 URL Mapping - Ceník

| Produkční URL | Nová URL | Status | Redirect nutný |
|---------------|----------|--------|----------------|
| `/cenik-zachrany-dat/` | `/cenik-zachrany-dat/` | ✅ | Ne (ale jiný obsah) |
| `/cenik-zachrany-dat/cenik-zachrany-dat-flash-disky-pametove-karty-mobily/` | - | ❌ | **Chybí** |
| `/cenik-zachrany-dat/cenik-zachrany-dat-nas-datova-uloziste/` | - | ❌ | **Chybí** |
| `/cenik-zachrany-dat/cenik-zachrany-dat-raid-pole/` | - | ❌ | **Chybí** |
| `/cenik-zachrany-dat/cenik-zachrany-dat-ssd-disk-solid-state-disk/` | - | ❌ | **Chybí** |
| `/cenik-zachrany-dat/cenik-zachrany-dat-z-mobilu-os-android-ios/` | - | ❌ | **Chybí** |

### 3.4 URL Mapping - Blog

| Produkční URL | Nová URL | Status | Poznámka |
|---------------|----------|--------|----------|
| `/clanky/` | `/clanky/` | ✅ | Zachováno |
| `/clanky/[slug]/` | `/clanky/[slug]/` | ✅ | 115 článků, ISR (1h) |
| `/clanky/kategorie/*/` | - | ⚠️ | **Kategorie chybí** |
| `/novinky/` | - | ❌ | **CHYBÍ CELÁ SEKCE** |
| `/novinky/[slug]/` | - | ❌ | **62 novinek chybí** |

### 3.5 Chybějící informační/SEO stránky

**Celkem 20+ tématických stránek chybí:**

| Produkční URL | SEO hodnota | Doporučení |
|---------------|-------------|------------|
| `/reference/` | 🔴 Vysoká | **Vytvořit** - důležité pro konverze |
| `/bezpecnost-dat/` | 🟡 Střední | Vytvořit nebo přesměrovat |
| `/fakturacni-udaje/` | 🟢 Nízká | Přesměrovat na /kontakt |
| `/partnersky-program/` | 🟡 Střední | Zvážit vytvoření |
| `/likvidace-dat/` | 🟡 Střední | Zvážit vytvoření |
| `/odborne/` | 🟢 Nízká | Přesměrovat na /clanky |
| `/pevny-disk-externi-disk/` | 🔴 Vysoká | **301 → /zachrana-dat/hdd** |
| `/hw-problem/` | 🟡 Střední | 301 → /caste-dotazy nebo /zachrana-dat |
| `/pametova-karta/` | 🔴 Vysoká | **Vytvořit stránku** nebo přidat sekci |
| `/formatovani-pevneho-disku/` | 🟡 Střední | 301 → /clanky nebo FAQ |
| `/mechanicke-poskozeni-ploten-hdd/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/pevny-disk-vadne-sektory/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/pevny-disk-vadny-motorek-zadrena-loziska/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/pevny-disk-prepeti-vypadek-elektriny/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/pevny-disk-hw-poskozeni/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/namoceny-pevny-disk/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/zaplaveny-disk/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/vadna-vnejsi-elektronika-hdd/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/vadna-vnitrni-elektronika-hdd/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/dalsi-zavady-hdd/` | 🟡 Střední | 301 → /zachrana-dat/hdd |
| `/obnova-smazanych-souboru/` | 🟡 Střední | 301 → /zachrana-dat |
| `/obnova-smazanych-fotek/` | 🟡 Střední | 301 → /zachrana-dat |
| `/obnova-dat-z-diskoveho-pole-raid/` | 🟡 Střední | 301 → /zachrana-dat/raid |
| `/princip-cteni-hdd/` | 🟢 Nízká | 301 → /technologie nebo /clanky |
| `/prvni-kroky-zachrany-dat/` | 🟡 Střední | 301 → /caste-dotazy |
| `/zachrana-dat-po-cele-cr/` | 🔴 Vysoká | **Vytvořit** - lokální SEO důležité |

---

## Fáze 4: Kritické SEO problémy

### 4.1 Kategorie problémů

#### 🔴 KRITICKÉ (musí být vyřešeno před launche)

**1. Novinky sekce chybí (62 URL)**
- **Dopad:** Ztráta 62 indexovaných stránek
- **Řešení:**
  - A) Vytvořit `/novinky/` sekci v novém projektu
  - B) 301 redirect všechny novinky → `/clanky/` (sloučit s články)
  - C) Vytvořit kategorizaci v `/clanky/` (novinky = kategorie)

**2. Hlavní servisní stránky chybí (8 URL)**
- `/zachrana-dat/sd-karta/` ❌
- `/zachrana-dat/usb-flash/` ❌
- `/zachrana-dat/apple/` ❌
- `/zachrana-dat/mobilni-telefon/` ❌
- **Dopad:** Ztráta cílených landing pages pro tyto služby
- **Řešení:** Vytvořit tyto stránky NEBO přidat sekce na hlavní stránku

**3. Změna URL struktury bez redirectů**
- `/zachrana-dat/pevny-disk/` → `/zachrana-dat/hdd/`
- `/zachrana-dat/externi-disk/` → `/zachrana-dat/hdd/`
- `/zachrana-dat/nas/` → `/zachrana-dat/raid/`
- **Dopad:** 404 errors, ztráta SEO juice
- **Řešení:** 301 redirecty (viz sekce 4.2)

**4. Reference stránka chybí**
- `/reference/` ❌
- **Dopad:** Ztráta social proof, důležité pro konverze
- **Řešení:** Vytvořit stránku `/reference/`

**5. Ceníkové podstránky chybí (5 URL)**
- **Dopad:** Ztráta long-tail SEO queries
- **Řešení:** Sloučit do hlavní stránky `/cenik-zachrany-dat/` s anchor linky

#### ⚠️ DŮLEŽITÉ (ovlivní SEO, řešit brzy)

**1. 20+ tématických/informačních stránek chybí**
- Mnoho long-tail keywords
- **Řešení:** 301 redirecty na nejbližší relevantní stránku

**2. Kategorie článků chybí**
- `/clanky/kategorie/*` není v novém projektu
- **Řešení:** Implementovat category pages

**3. Lokální SEO stránka chybí**
- `/zachrana-dat-po-cele-cr/` ❌
- **Dopad:** Ztráta lokálního SEO
- **Řešení:** Vytvořit nebo přidat na hlavní stránku

**4. Partnerský program chybí**
- `/partnersky-program/` ❌
- **Řešení:** Vytvořit nebo přesměrovat

#### 🟢 NICE TO HAVE (vylepšení)

1. Admin sekce není v sitemapě (správně, ale ověřit robots.txt)
2. Test stránka `/test-env/` by měla být v robots.txt disallowed
3. Kalkulačka a technologie jsou nové - přidat do navigation
4. Případové studie jsou nové - přidat interní linking

---

## Fáze 4.2: Redirect mapa (301 redirects)

### POVINNÉ REDIRECTY (musí být implementovány)

```nginx
# Služby - změna názvů
/zachrana-dat/pevny-disk/                           → /zachrana-dat/hdd/
/zachrana-dat/externi-disk/                         → /zachrana-dat/hdd/

# NAS → RAID
/zachrana-dat/nas/                                  → /zachrana-dat/raid/

# Chybějící služby → hlavní servisní stránka
/zachrana-dat/sd-karta/                             → /zachrana-dat/
/zachrana-dat/usb-flash/                            → /zachrana-dat/
/zachrana-dat/apple/                                → /zachrana-dat/
/zachrana-dat/mobilni-telefon/                      → /zachrana-dat/

# Lokální SEO
/zachrana-dat-po-cele-cr/                           → /kontakt/

# Ceníkové podstránky → hlavní ceník
/cenik-zachrany-dat/cenik-zachrany-dat-flash-disky-pametove-karty-mobily/  → /cenik-zachrany-dat/#flash
/cenik-zachrany-dat/cenik-zachrany-dat-nas-datova-uloziste/                → /cenik-zachrany-dat/#nas
/cenik-zachrany-dat/cenik-zachrany-dat-raid-pole/                          → /cenik-zachrany-dat/#raid
/cenik-zachrany-dat/cenik-zachrany-dat-ssd-disk-solid-state-disk/          → /cenik-zachrany-dat/#ssd
/cenik-zachrany-dat/cenik-zachrany-dat-z-mobilu-os-android-ios/            → /cenik-zachrany-dat/#mobil

# NOVINKY sekce (62 URL) - ROZHODNOUT strategii:
# Varianta A: Redirect všech na články
/novinky/*                                          → /clanky/
# Varianta B: Individuální mapování (časově náročné)
# Varianta C: Zachovat novinky sekci (vyžaduje vývoj)

# Tématické HDD stránky → HDD záchrana
/pevny-disk-externi-disk/                           → /zachrana-dat/hdd/
/hw-problem/                                        → /caste-dotazy/
/pametova-karta/                                    → /zachrana-dat/  # nebo vytvořit novou stránku
/formatovani-pevneho-disku/                         → /clanky/
/mechanicke-poskozeni-ploten-hdd/                   → /zachrana-dat/hdd/
/pevny-disk-vadne-sektory/                          → /zachrana-dat/hdd/
/pevny-disk-vadny-motorek-zadrena-loziska/          → /zachrana-dat/hdd/
/pevny-disk-prepeti-vypadek-elektriny/              → /zachrana-dat/hdd/
/pevny-disk-hw-poskozeni/                           → /zachrana-dat/hdd/
/namoceny-pevny-disk/                               → /zachrana-dat/hdd/
/zaplaveny-disk/                                    → /zachrana-dat/hdd/
/vadna-vnejsi-elektronika-hdd/                      → /zachrana-dat/hdd/
/vadna-vnitrni-elektronika-hdd/                     → /zachrana-dat/hdd/
/dalsi-zavady-hdd/                                  → /zachrana-dat/hdd/

# Obecné recovery stránky
/obnova-smazanych-souboru/                          → /zachrana-dat/
/obnova-smazanych-fotek/                            → /zachrana-dat/
/obnova-dat-z-diskoveho-pole-raid/                  → /zachrana-dat/raid/

# Edukační stránky
/princip-cteni-hdd/                                 → /technologie/
/prvni-kroky-zachrany-dat/                          → /caste-dotazy/

# Informační stránky
/reference/                                         → VYTVOŘIT NOVOU STRÁNKU (!)
/bezpecnost-dat/                                    → /clanky/
/fakturacni-udaje/                                  → /kontakt/
/partnersky-program/                                → /kontakt/  # nebo vytvořit
/likvidace-dat/                                     → /kontakt/  # nebo vytvořit
/odborne/                                           → /clanky/
```

### Next.js implementace (next.config.js)

```javascript
module.exports = {
  async redirects() {
    return [
      // Služby - změna názvů
      {
        source: '/zachrana-dat/pevny-disk',
        destination: '/zachrana-dat/hdd',
        permanent: true, // 301
      },
      {
        source: '/zachrana-dat/externi-disk',
        destination: '/zachrana-dat/hdd',
        permanent: true,
      },
      {
        source: '/zachrana-dat/nas',
        destination: '/zachrana-dat/raid',
        permanent: true,
      },
      // Chybějící služby
      {
        source: '/zachrana-dat/sd-karta',
        destination: '/zachrana-dat',
        permanent: true,
      },
      {
        source: '/zachrana-dat/usb-flash',
        destination: '/zachrana-dat',
        permanent: true,
      },
      {
        source: '/zachrana-dat/apple',
        destination: '/zachrana-dat',
        permanent: true,
      },
      {
        source: '/zachrana-dat/mobilni-telefon',
        destination: '/zachrana-dat',
        permanent: true,
      },
      // Novinky sekce - ROZHODNOUT
      {
        source: '/novinky/:slug',
        destination: '/clanky',
        permanent: true,
      },
      // ... další redirecty
    ];
  },
};
```

---

## Fáze 5: Prioritizovaná doporučení

### 5.1 PRE-LAUNCH (před nasazením)

#### 1️⃣ MUSÍ být hotovo (P0)

**A) Implementovat 301 redirecty**
- [ ] Vytvořit `next.config.js` s redirect mapou (viz sekce 4.2)
- [ ] Otestovat všechny redirecty
- [ ] Ověřit status code 301 (ne 302!)

**B) Vytvořit chybějící kritické stránky**
- [ ] `/reference/` - Reference/testimonials stránka
  - Důvod: Vysoká hodnota pro konverze
  - Priorita: 🔴 KRITICKÁ

**C) Rozhodnout o novinkách (62 URL)**
- [ ] Varianta A: Sloučit s články → `/clanky/`
- [ ] Varianta B: Vytvořit `/novinky/` sekci
- [ ] Varianta C: Individuální redirecty
- [ ] Implementovat zvolenou strategii

**D) Vytvořit chybějící servisní stránky**
- [ ] `/zachrana-dat/sd-karta/` nebo přidat sekci na `/zachrana-dat/`
- [ ] `/zachrana-dat/usb-flash/` nebo přidat sekci na `/zachrana-dat/`
- [ ] `/zachrana-dat/apple/` nebo přidat sekci na `/zachrana-dat/`
- [ ] `/zachrana-dat/mobilni-telefon/` nebo přidat sekci na `/zachrana-dat/`
- Alternativa: Pokud nejsou vytvořeny, MUSÍ být redirecty!

**E) Technické SEO**
- [ ] Ověřit všechny canonical URLs
- [ ] Vygenerovat sitemap.xml pro produkci
- [ ] Nastavit robots.txt pro produkci
  - Disallow: /admin
  - Disallow: /test-env
  - Sitemap: https://www.datahelp.cz/sitemap.xml
- [ ] Přidat meta robots noindex na /admin a /test-env stránky

#### 2️⃣ VELMI DŮLEŽITÉ (P1)

**A) Ceníkové podstránky**
- [ ] Přidat anchor navigaci na `/cenik-zachrany-dat/`
  - #flash, #nas, #raid, #ssd, #mobil
- [ ] Nebo vytvořit separátní stránky (časově náročnější)

**B) Kategorie článků**
- [ ] Implementovat `/clanky/kategorie/[slug]/` pages
- [ ] Nebo redirect na `/clanky/` s filtry

**C) Lokální SEO**
- [ ] `/zachrana-dat-po-cele-cr/` - vytvořit nebo přidat sekci na homepage

**D) Metadata audit**
- [ ] Ověřit title tags na všech stránkách
- [ ] Ověřit meta descriptions
- [ ] Ověřit H1 tags (pouze jeden per page)

### 5.2 POST-LAUNCH (po nasazení)

#### 1️⃣ První týden

**A) Monitoring**
- [ ] Google Search Console - sledovat 404 errors
- [ ] Analytics - sledovat traffic drop
- [ ] Logovat všechny 404 requesty
- [ ] Sledovat position changes v Google

**B) Quick fixes**
- [ ] Opravit jakékoli nové 404 errors
- [ ] Přidat redirecty pro chybějící URL

#### 2️⃣ První měsíc

**A) Content development**
- [ ] Vytvořit `/partnersky-program/` stránku
- [ ] Vytvořit `/likvidace-dat/` stránku
- [ ] Přidat nové případové studie
- [ ] Přidat nové blog články

**B) Interní linking**
- [ ] Audit interních linků
- [ ] Opravit broken internal links
- [ ] Přidat cross-linking mezi souvisejícími stránkami

**C) Schema markup**
- [ ] Implementovat LocalBusiness schema
- [ ] Implementovat Service schema
- [ ] Implementovat FAQPage schema
- [ ] Implementovat Article schema pro blog

#### 3️⃣ Dlouhodobě (Q1 2025)

**A) Content strategie**
- [ ] Vytvořit category landing pages
- [ ] Vytvořit long-tail content stránky
- [ ] Přidat case studies pro všechny služby

**B) Technické SEO**
- [ ] Implementovat hreflang (pokud budou jazykové verze)
- [ ] Optimalizovat Core Web Vitals
- [ ] Implementovat structured data pro všechny typy stránek

---

## 5.3 Akční plán (Timeline)

### Před launche (týden před nasazením)

| Task | Priority | Odhadovaný čas | Assigned to |
|------|----------|----------------|-------------|
| Implementovat 301 redirecty | P0 | 4h | Dev team |
| Vytvořit `/reference/` stránku | P0 | 6h | Dev + Content |
| Rozhodnout strategii novinek | P0 | 1h | Management |
| Implementovat novinky strategii | P0 | 2-8h | Dev team |
| Vytvořit chybějící služby | P0 | 8h | Dev + Content |
| Robots.txt + sitemap | P0 | 1h | Dev team |
| Metadata audit | P1 | 3h | SEO team |
| Anchor navigace ceník | P1 | 2h | Dev team |

**Celkem: ~27-33 hodin práce**

### První den po launche

| Task | Priority | Čas |
|------|----------|-----|
| Monitor 404 errors (GSC) | P0 | Continuous |
| Check Analytics traffic | P0 | 30min |
| Verify all redirects working | P0 | 1h |
| Log all 404s from server | P0 | Setup |

### První týden

| Task | Priority | Čas |
|------|----------|-----|
| Fix missing redirects | P0 | As needed |
| Monitor rankings | P1 | Daily check |
| Internal linking audit | P1 | 4h |

---

## 6. Rizika při zanedbání

### 🔴 VYSOKÉ RIZIKO

**1. Novinky sekce bez redirectů (62 URL)**
- **Riziko:** 62x 404 errors
- **Dopad:**
  - Ztráta ~27% indexovaných stránek
  - Negative SEO signal pro Google
  - Bad user experience
  - Potential traffic loss: střední (novinky obvykle mají nižší traffic než služby)

**2. Služby bez redirectů**
- **Riziko:** 8x 404 errors na klíčových landing pages
- **Dopad:**
  - Ztráta direct traffic (bookmarks, external links)
  - Ztráta SEO rankings pro tyto keywords
  - Potential traffic loss: vysoký (hlavní konverzní stránky)

**3. Reference stránka chybí**
- **Riziko:** Ztráta social proof
- **Dopad:**
  - Snížení konverzního poměru
  - Ztráta trust signalů
  - Competitive disadvantage

### ⚠️ STŘEDNÍ RIZIKO

**1. Tématické SEO stránky chybí (20+ URL)**
- **Riziko:** Ztráta long-tail traffic
- **Dopad:**
  - Pokles organic traffic (odhadem 5-15%)
  - Ztráta niche keywords
  - Horší content depth signály

**2. Ceníkové podstránky sloučeny**
- **Riziko:** Ztráta specifických landing pages
- **Dopad:**
  - Horší keyword targeting
  - Potenciálně nižší konverze
  - Ale lze kompenzovat anchor linky

### 🟢 NÍZKÉ RIZIKO

**1. Kategorie článků chybí**
- **Dopad:** Menší vliv, většina trafficu je na jednotlivých článcích

**2. Utility stránky sloučeny/redirectovány**
- **Dopad:** Minimální, pokud jsou správně redirectovány

---

## 7. Závěr a klíčová doporučení

### ✅ Pozitivní

1. **Blog je plně zachován** - 115 článků s ISR
2. **Hlavní navigace zachována** - klíčové stránky OK
3. **Canonical URLs implementovány** - 19 stránek
4. **Technická SEO struktura solidní** - Next.js optimalizace

### ⚠️ Kritické body

1. **62 novinek bez strategieé** - ROZHODNOUT OKAMŽITĚ
2. **8 servisních stránek chybí** - VYTVOŘIT nebo REDIRECTOVAT
3. **Reference stránka kritická** - MUSÍ BÝT před launche
4. **20+ SEO stránek** - REDIRECTOVAT (ne tak kritické)

### 📋 Minimální požadavky před launche

**NESMÍ být spuštěno bez:**

1. ✅ 301 redirects implementovány a otestovány
2. ✅ Strategie novinek rozhodnuta a implementována
3. ✅ `/reference/` stránka vytvořena
4. ✅ Chybějící služby vytvořeny NEBO redirectovány
5. ✅ Robots.txt a sitemap.xml správně nastaveny
6. ✅ Metadata audit dokončen

### 🎯 Očekávaný SEO dopad

**Best case scenario** (vše implementováno):
- Minimální SEO disruption
- Potenciální improvement díky Next.js optimalizacím
- Organic traffic: ±5% (v rámci variance)

**Worst case scenario** (nic neimplementováno):
- 101 URL vrací 404
- Organic traffic drop: -30% až -50%
- Negative SEO signály
- Recovery time: 3-6 měsíců

**Realistic scenario** (kritické body vyřešeny):
- ~20 URL vrací 404 (tématické stránky)
- Organic traffic drop: -10% až -15%
- Recovery time: 1-2 měsíce
- Lze kompenzovat novým contentem

---

## Přílohy

### A) Kompletní seznam produkčních URL

Viz: `/tmp/datahelp-production-sitemap.xml`
- 228 celkově URL
- 51 ne-článkových stránek
- 115 článků
- 62 novinek

### B) Build output nového projektu

```
Route (app)                                            Revalidate  Expire
┌ ○ /                                                              Static
├ ○ /caste-dotazy                                                  Static
├ ○ /cenik-zachrany-dat                                            Static
├ ○ /clanky                                                        Static
├ ● /clanky/[slug]                                      1h         1y      (100 posts)
├ ○ /informace-o-cookies                                           Static
├ ○ /kalkulacka                                                    Static
├ ○ /kontakt                                                       Static
├ ○ /o-nas                                                         Static
├ ○ /obchodni-podminky                                             Static
├ ○ /ochrana-osobnich-udaju                                        Static
├ ○ /poptavka-zachrany-dat                                         Static
├ ○ /technologie                                                   Static
├ ○ /zachrana-dat                                                  Static
├ ○ /zachrana-dat/firmy                                            Static
├ ○ /zachrana-dat/hdd                                              Static
├ ○ /zachrana-dat/hdd/pripady                                      Static
├ ○ /zachrana-dat/raid                                             Static
├ ○ /zachrana-dat/raid/pripady                                     Static
├ ○ /zachrana-dat/ssd                                              Static
├ ○ /zachrana-dat/ssd/pripady                                      Static
├ ○ /admin/*                                                       Static (3x)
└ ○ /test-env                                                      Static

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
```

### C) Prioritní redirect seznam (TOP 20)

1. `/zachrana-dat/pevny-disk/` → `/zachrana-dat/hdd/`
2. `/zachrana-dat/externi-disk/` → `/zachrana-dat/hdd/`
3. `/zachrana-dat/nas/` → `/zachrana-dat/raid/`
4. `/zachrana-dat/sd-karta/` → `/zachrana-dat/`
5. `/zachrana-dat/usb-flash/` → `/zachrana-dat/`
6. `/zachrana-dat/apple/` → `/zachrana-dat/`
7. `/zachrana-dat/mobilni-telefon/` → `/zachrana-dat/`
8. `/novinky/*` → strategie TBD
9. `/pevny-disk-externi-disk/` → `/zachrana-dat/hdd/`
10. `/pametova-karta/` → `/zachrana-dat/`
11. `/mechanicke-poskozeni-ploten-hdd/` → `/zachrana-dat/hdd/`
12. `/pevny-disk-vadne-sektory/` → `/zachrana-dat/hdd/`
13. `/hw-problem/` → `/caste-dotazy/`
14. `/obnova-dat-z-diskoveho-pole-raid/` → `/zachrana-dat/raid/`
15. `/zachrana-dat-po-cele-cr/` → `/kontakt/`
16. `/formatovani-pevneho-disku/` → `/clanky/`
17. `/princip-cteni-hdd/` → `/technologie/`
18. `/prvni-kroky-zachrany-dat/` → `/caste-dotazy/`
19. `/bezpecnost-dat/` → `/clanky/`
20. `/fakturacni-udaje/` → `/kontakt/`

---

**Konec reportu**
**Poslední aktualizace:** 5. prosince 2024
**Vytvořil:** Claude Code SEO Audit Agent
**Status:** ✅ Kompletní analýza dokončena
