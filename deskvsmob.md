# KOMPLETNÍ RESPONSIVE DESIGN DOKUMENTACE

## Breakpoint strategie
- **Primární breakpoint**: `md` (768px) - hlavní oddělení mobile/desktop
- **Sekundární**: `sm` (640px), `lg` (1024px)
- **Nepoužívané**: `xl`, `2xl`

---

## 1. HEADER (`components/Header.tsx`)

| Prvek | Mobile (< 768px) | Desktop (≥ 768px) |
|-------|------------------|-------------------|
| Logo výška | `h-12` | `md:h-[3.72rem]` |
| Desktop navigace | `hidden` | `md:flex items-center space-x-8` |
| Hamburger menu | `md:hidden flex items-center gap-4` | Skrytý |
| Mobilní menu | `md:hidden mt-4 space-y-4 pb-4` | Skrytý |
| Phone ikona | Viditelná | Skrytá |

---

## 2. HERO (`components/Hero.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Section padding | `py-6` | `md:py-16` |
| Title visibility | `block md:hidden` | `hidden md:block` |
| Title font | `text-3xl` | `text-5xl` |
| Title text | `titleMobile` (kratší) | `title` (delší) |
| Subtitle visibility | `block md:hidden` | `hidden md:block` |
| Subtitle font | `text-lg` | `text-xl` |
| Button font | `text-sm` | `md:text-lg` |
| Button padding | `px-3 py-1.5` | `md:px-6 md:py-3` |
| Button weight | `font-bold` | `md:font-semibold` |
| Výhody sekce | Skrytá | `hidden md:grid md:grid-cols-3 gap-8` |

---

## 3. FOOTER (`components/Footer.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Grid sloupce | `grid-cols-2` | `md:grid-cols-4` |
| Section padding | `py-6` | `md:py-12` |
| Nadpisy font | `text-base` | `md:text-xl` |
| Nadpisy margin | `mb-4` | `md:mb-6` |
| List spacing | `space-y-1.5` | `md:space-y-3` |
| Text font | `text-xs` | `md:text-base` |
| Social icons desktop | Skryté | `hidden md:block mt-4` |
| Social icons mobile | `md:hidden mt-6 flex justify-end` | Skryté |
| Sloupec 3 (Města) | Skrytý | `hidden md:block` |
| Sloupec 4 (Kontakt) | Skrytý | `hidden md:block` |

---

## 4. GALERIE (`components/GalleryClient.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Section padding | `py-8` | `md:py-16` |
| Nadpis font | `text-2xl` | `md:text-3xl` |
| Nadpis margin | `mb-6` | `md:mb-12` |
| Layout | `md:hidden flex overflow-x-auto snap-x` | `hidden md:grid md:grid-cols-2 lg:grid-cols-4` |
| Item width | `w-[85vw]` | Auto (grid) |
| Aspect ratio | `aspect-video` (16:9) | `aspect-square` |
| Indicator dots | `md:hidden flex justify-center` | Skryté |

---

## 5. PAGE HEADER (`components/PageHeader.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Padding | `py-8` | `md:py-12` |
| H1 font | `text-3xl` | `md:text-5xl` |
| Subtitle font | `text-lg` | `md:text-xl` |

---

## 6. BREADCRUMBS (`components/Breadcrumbs.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Desktop list | Skrytý | `hidden md:flex` (všechny prvky) |
| Mobile list | `flex md:hidden` | Skrytý |
| Obsah | Jen Home + poslední | Celá cesta |

---

## 7. PAGINATION (`components/Pagination.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Desktop nav | `hidden sm:flex` | Viditelná |
| Mobile nav | `flex sm:hidden` | Skrytá |
| Info text | Skrytý | `hidden sm:block text-sm` |
| Komplexita | Zjednodušená | Všechny stránky |

---

## 8. PROCESS INFOGRAPHIC (`components/ProcessInfographic.tsx`)

| Prvek | Mobile (CZ) | Desktop / EN |
|-------|-------------|--------------|
| Header | `hidden md:block` | Viditelný |
| Collapsible button | Viditelný (CZ only) | Skrytý |
| Grid | `grid-cols-1` (expanded) | `md:grid-cols-2 lg:grid-cols-3` |
| Popis kroků | Jen v expanded stavu | Hover efekt |

**Speciální logika**: `isCzech ? 'hidden md:grid' : ''`

---

## 9. TECHNOLOGY GALLERY (`components/TechnologyGallery.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Desktop carousel | Skrytý | `hidden md:block` + auto-play |
| Mobile scroll | `md:hidden overflow-hidden` | Skrytý |
| Item width | `w-[85vw]` snap-center | Auto |
| Desktop dots | Skryté | `flex justify-center gap-1.5` |
| Mobile dots | `md:hidden flex justify-center` | Skryté |

---

## 10. COOKIE CONSENT (`components/CookieConsent.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Bottom pozice | `bottom-28` | `md:bottom-0` |
| Flex direction | `flex-col` | `md:flex-row` |
| Items align | `items-start` | `md:items-center` |
| Gap | `gap-3` | `md:gap-6` |
| Title font | `text-base` | `md:text-lg` |
| Text font | `text-xs` | `md:text-sm` |
| Buttons | `flex-col sm:flex-row` | `md:order-*` |

---

## 11. HOME CONTACT (`components/HomeContact.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Section padding | `pb-8` | `md:pb-16` |
| Form card | `hidden md:block` | Viditelný |
| Map container | Skrytý | Viditelný |
| Info grid | Skrytý | `grid md:grid-cols-2 gap-4` |
| Text align | `text-center` | `md:text-left` |

---

## 12. CONTACT BANNER (`components/ContactBanner.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Grid layout | Skrytý | `hidden md:grid md:grid-cols-3` |

---

## 13. SERVICES (`components/Services.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Grid | 1 sloupec | `md:grid-cols-2 lg:grid-cols-4` |

---

## 14. PRICING PAGE (`app/cenik-zachrany-dat/PricingClient.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Detailed pricing | Skrytý | `hidden md:block` |
| Mobile accordion | `md:hidden` | Skrytý |
| Price layout | `flex-col` | `sm:flex-row sm:items-start sm:justify-between` |
| Price margin | `ml-7` | `sm:ml-0` |

---

## 15. ORDER FORM (`app/poptavka-zachrany-dat/PoptavkaClient.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Page header | `text-3xl py-8` | `md:text-5xl md:py-12` |
| Name fields | Stack (1 col) | `md:grid-cols-2 gap-6` |
| Contact fields | Stack | `grid md:grid-cols-2 gap-6` |

---

## 16. BLOG PAGE (`app/clanky/page.tsx`)

| Prvek | Mobile | Desktop |
|-------|--------|---------|
| Grid | `grid-cols-1` | `md:grid-cols-2 lg:grid-cols-3` |

---

## SHRNUTÍ NEJČASTĚJŠÍCH PATTERNŮ

### Visibility
```
hidden md:block     → Desktop only
md:hidden           → Mobile only
hidden md:flex      → Desktop flex
hidden md:grid      → Desktop grid
```

### Font sizes
```
text-3xl md:text-5xl    → Nadpisy
text-sm md:text-lg      → Tlačítka
text-xs md:text-sm      → Detaily
text-base md:text-xl    → Střední texty
```

### Spacing
```
py-6 md:py-12           → Section padding
py-8 md:py-16           → Větší sekce
mb-4 md:mb-6            → Margins
gap-3 md:gap-6          → Grid gaps
px-3 py-1.5 md:px-6 md:py-3  → Button padding
```

### Layout
```
grid-cols-2 md:grid-cols-4      → Footer
md:grid-cols-2 lg:grid-cols-4   → Services
flex-col md:flex-row            → Direction change
w-[85vw]                        → Mobile scroll items
```
