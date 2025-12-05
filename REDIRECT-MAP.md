# 🔄 Redirect Mapa - DataHelp.cz

Pro zachování SEO hodnoty musíš nastavit 301 redirecty ze starých URL na nové.

## Formát
```
STARÁ URL → NOVÁ URL
```

---

## Hlavní stránky

```
/                                    → /                    (beze změny)
/zachrana-dat/                       → /sluzby/
/o-nas/                              → /o-nas/              (beze změny)
/kontakt/                            → /kontakt/            (beze změny)
/caste-dotazy/                       → /faq/
/faq/                                → /faq/                (beze změny)
/reference/                          → /reference/          (beze změny)
/reference-zachrana-dat-datahelp/    → /reference/
```

## Služby

```
/zachrana-dat/pevny-disk/            → /sluzby/hdd/
/zachrana-dat/externi-disk/          → /sluzby/hdd/
/zachrana-dat/ssd/                   → /sluzby/ssd/
/zachrana-dat/raid/                  → /sluzby/raid/
/zachrana-dat/nas/                   → /sluzby/nas/
/zachrana-dat/pametova-karta/        → /sluzby/pametove-karty/
/zachrana-dat/usb-flash/             → /sluzby/usb-flash/
/zachrana-dat/mobil/                 → /sluzby/mobily/
/zachrana-dat/apple/                 → /sluzby/apple/
```

## Ceník

```
/cenik-zachrany-dat/                                                    → /cenik/
/cenik-zachrany-dat/cenik-zachrany-dat-ssd-disk-solid-state-disk/      → /cenik/ssd/
/cenik-zachrany-dat/cenik-zachrany-dat-raid-pole/                      → /cenik/raid/
/cenik-zachrany-dat/cenik-zachrany-dat-nas-datova-uloziste/            → /cenik/nas/
/cenik-zachrany-dat/cenik-zachrany-dat-flash-disky-pametove-karty-mobily/ → /cenik/flash/
/cenik-zachrany-dat/cenik-zachrany-dat-z-mobilu-os-android-ios/        → /cenik/mobily/
/cenik-zachrany-dat/android-ios-interni-pamet-mobil-tablet/            → /cenik/mobily/
/pevny-disk-externi-disk/                                               → /cenik/hdd/
/pametova-karta/                                                        → /cenik/pametove-karty/
```

## Blog/Články

```
/clanky/                             → /blog/
/clanky/[jakykoli-slug]/             → /blog/[slug]/
```

### Konkrétní články (příklady)
```
/clanky/historie-pevnych-disku/                                         → /blog/historie-pevnych-disku/
/clanky/android-vs-ios-souboj-velikanu-a-podrobne-srovnani/            → /blog/android-vs-ios/
/clanky/vitejte-na-novem-webu-datahelp-vas-pruvodce-svetem-zachrany-a-obnovy-dat/ → /blog/vitejte-na-novem-webu/
/clanky/jak-poznate-ze-byl-vas-pocitac-napaden-malwarem/               → /blog/jak-poznat-malware/
/clanky/5-duvodu-proc-vyuzivat-cloud-pro-efektivni-zalohu-dat/         → /blog/5-duvodu-pro-cloud/
/clanky/dropbox-jak-s-nim-pracovat-a-zalohovat-data/                   → /blog/dropbox-pruvodce/
/clanky/ani-s-raidem-nejste-vzdy-v-bezpeci-datahelp-v-praxi-radi-ceho-se-vyvarovat/ → /blog/raid-bezpecnost/
```

## Ostatní

```
/obnova-smazanych-souboru/           → /sluzby/obnova-dat/
/objednavka/                         → /objednat-diagnostiku/
```

---

## Implementace v Next.js

### Varianta 1: next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/zachrana-dat',
        destination: '/sluzby',
        permanent: true, // 301
      },
      {
        source: '/zachrana-dat/pevny-disk',
        destination: '/sluzby/hdd',
        permanent: true,
      },
      {
        source: '/clanky/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/:path*',
        destination: '/cenik/:path*',
        permanent: true,
      },
      // ... další redirecty
    ];
  },
};
```

### Varianta 2: middleware.ts (pro komplexní logiku)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirectMap: Record<string, string> = {
  '/zachrana-dat': '/sluzby',
  '/zachrana-dat/pevny-disk': '/sluzby/hdd',
  '/caste-dotazy': '/faq',
  // ... další
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check exact matches
  if (redirectMap[path]) {
    return NextResponse.redirect(
      new URL(redirectMap[path], request.url),
      { status: 301 }
    );
  }
  
  // Check pattern matches (blog)
  if (path.startsWith('/clanky/')) {
    const slug = path.replace('/clanky/', '');
    return NextResponse.redirect(
      new URL(`/blog/${slug}`, request.url),
      { status: 301 }
    );
  }
  
  return NextResponse.next();
}
```

---

## ⚠️ DŮLEŽITÉ

1. **Testuj každý redirect** - použij curl nebo browser
2. **Zachovej trailing slashes konzistentně** - buď všude nebo nikde
3. **Loguj 404 chyby** po spuštění - odhalí chybějící redirecty
4. **Submit sitemap** do Google Search Console po migraci
5. **Monitoruj pozice** v Search Console první týdny po spuštění

---

## Kontrolní seznam po spuštění

```
□ Všechny staré URL vrací 301 (ne 404)
□ Sitemap.xml obsahuje pouze nové URL
□ Google Search Console: Submit nový sitemap
□ Google Search Console: Požádat o reindexaci klíčových stránek
□ Sledovat Coverage report v Search Console
□ Nastavit monitoring 404 chyb (Sentry, Vercel Analytics)
```
