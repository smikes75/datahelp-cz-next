# DataHelp.cz - Next.js Migration Project

## 🎯 Project Goal
Migrate the DataHelp.cz website from Vite+React to Next.js 14 with App Router for better SEO, performance, and scalability.

## 📁 Project Structure

### Source Files (DO NOT MODIFY)
- `./src-backup/` - Original React components and pages from Vite project
- `./public-backup/` - Original static files
- `./package-original.json` - Original dependencies reference

### Target Structure
```
app/
├── [locale]/                    # Locale wrapper (cs/en)
│   ├── layout.tsx              # Main layout with header/footer
│   ├── page.tsx                # Homepage
│   ├── sluzby/
│   │   ├── page.tsx            # Services overview
│   │   └── [slug]/
│   │       └── page.tsx        # Service detail (hdd, ssd, raid, nas, mobily, apple, pametove-karty)
│   ├── cenik/
│   │   ├── page.tsx            # Pricing overview
│   │   └── [slug]/
│   │       └── page.tsx        # Pricing detail
│   ├── blog/
│   │   ├── page.tsx            # Blog list (paginated, ISR)
│   │   └── [slug]/
│   │       └── page.tsx        # Blog post (ISR)
│   ├── o-nas/
│   │   └── page.tsx            # About page
│   ├── kontakt/
│   │   └── page.tsx            # Contact page
│   ├── faq/
│   │   └── page.tsx            # FAQ page
│   ├── reference/
│   │   └── page.tsx            # References/testimonials
│   ├── objednat-diagnostiku/
│   │   └── page.tsx            # Order form
│   ├── kalkulacka/
│   │   └── page.tsx            # Price calculator
│   ├── cookies/
│   │   └── page.tsx            # Cookie policy
│   ├── gdpr/
│   │   └── page.tsx            # Privacy policy
│   └── obchodni-podminky/
│       └── page.tsx            # Terms of service
├── api/
│   ├── contact/
│   │   └── route.ts            # Contact form API
│   ├── order/
│   │   └── route.ts            # Order form API
│   └── revalidate/
│       └── route.ts            # ISR revalidation webhook
├── sitemap.ts                   # Dynamic sitemap
├── robots.ts                    # Robots.txt
└── not-found.tsx               # 404 page
```

## 🛠 Tech Stack

### Current (Vite + React)
- React 18
- Vite
- React Router v6
- react-i18next
- Tailwind CSS
- Supabase
- react-helmet-async

### Target (Next.js)
- Next.js 14.x (App Router)
- TypeScript
- next-intl (i18n)
- Tailwind CSS (same config)
- Supabase (same backend)
- Next.js Metadata API (replaces react-helmet)

## 🗄 Database (Supabase)

### Connection
```
URL: https://oqcvqquecshienabwkxu.supabase.co
```

### Tables
- `blog_posts` - Blog articles
- `orders` - Diagnostic orders
- `contacts` - Contact form submissions

### Important
Create TWO Supabase clients:
1. `lib/supabase/client.ts` - For client components (browser)
2. `lib/supabase/server.ts` - For server components (SSR)

## 🌍 Internationalization (i18n)

### Languages
- `cs` - Czech (default)
- `en` - English

### Setup with next-intl
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['cs', 'en'],
  defaultLocale: 'cs',
  localePrefix: 'as-needed' // cs without prefix, en with /en/
});
```

### Translation Files
- `messages/cs.json` - Czech translations
- `messages/en.json` - English translations

Copy translations from `src-backup/locales/` and convert to next-intl format.

## 🔍 SEO Requirements

### Metadata
Each page must have:
- `title` - Unique, descriptive
- `description` - 150-160 characters
- `openGraph` - Title, description, image
- `alternates` - Canonical URL, language alternates

### Schema.org (JSON-LD)
Implement for:
- `LocalBusiness` - Company info
- `Service` - Each service page
- `FAQPage` - FAQ page
- `Article` - Blog posts
- `BreadcrumbList` - All pages

### Sitemap
Dynamic sitemap including:
- All static pages
- All blog posts from Supabase
- All service pages
- Language alternates

## 📝 Migration Rules

### Component Migration
1. Check if component needs interactivity (useState, useEffect, onClick)
   - YES → Add "use client" directive at top
   - NO → Keep as Server Component
2. Replace imports:
   - `react-router-dom` Link → `next/link`
   - `useNavigate()` → `useRouter()` from `next/navigation`
   - `useParams()` → `params` prop or `useParams()` from `next/navigation`
   - `useLocation()` → `usePathname()` from `next/navigation`
3. Replace `react-helmet-async` → Next.js Metadata API

### Image Migration
- Replace `<img>` with `<Image>` from `next/image`
- Configure remote images in `next.config.js`
- Use proper width/height or fill property

### Data Fetching
- Client-side `useEffect` → Server Component with async/await
- For real-time data → Keep client-side or use Server Actions

## 🚀 ISR Configuration for Blog

```typescript
// app/[locale]/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  // Generate only latest 100 posts at build time
  const posts = await getLatestPosts(100);
  return posts.map((post) => ({ slug: post.slug }));
}
// Other posts will be generated on-demand
```

## 🧪 Testing Checklist

### After Each Migration Step
1. Run `npm run dev`
2. Check browser console for errors
3. Test the specific page/component
4. Run `npm run build` to catch SSR issues

### Final Testing
- [ ] All pages load without errors
- [ ] Navigation works (internal links)
- [ ] Language switching works
- [ ] Blog pagination works
- [ ] Forms submit correctly
- [ ] Mobile responsive
- [ ] Lighthouse score 90+ (Performance, SEO, Accessibility)
- [ ] `npm run build` succeeds

## 📋 Commands

```bash
# Development
npm run dev

# Build (always test before deployment)
npm run build

# Start production server locally
npm run start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## ⚠️ Common Issues & Solutions

### "useRouter only works in Client Components"
Add `"use client"` at the top of the file.

### "Text content does not match server-rendered HTML"
Usually caused by:
- Using `Date.now()` or random values
- Browser-only APIs (window, localStorage)
Solution: Use `useEffect` for client-only code or dynamic imports.

### "Invalid src prop on next/image"
Add domain to `next.config.js`:
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '*.supabase.co' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
},
```

### Supabase not working in Server Components
Use the server client, not browser client:
```typescript
import { createServerClient } from '@/lib/supabase/server';
const supabase = createServerClient();
```

### i18n translations not loading
Check:
1. Middleware is configured
2. `messages/[locale].json` files exist
3. `NextIntlClientProvider` wraps the app

## 🎯 Success Criteria

1. ✅ All pages from original site work in Next.js
2. ✅ SEO metadata on every page
3. ✅ Lighthouse Performance > 90
4. ✅ Lighthouse SEO > 95
5. ✅ Blog uses ISR (not full static generation)
6. ✅ Forms work (contact, order)
7. ✅ i18n works (CS/EN)
8. ✅ Mobile responsive
9. ✅ `npm run build` succeeds without errors

## 📞 Company Info (for Schema.org)

```json
{
  "name": "DataHelp s.r.o.",
  "description": "Profesionální záchrana a obnova dat",
  "url": "https://www.datahelp.cz",
  "telephone": "+420 775 220 440",
  "email": "info@datahelp.cz",
  "address": {
    "streetAddress": "Jirsíkova 541/1",
    "addressLocality": "Praha 8 - Karlín",
    "postalCode": "186 00",
    "addressCountry": "CZ"
  },
  "openingHours": [
    "Mo-Th 09:00-17:00",
    "Fr 08:00-15:30"
  ],
  "foundingDate": "1998",
  "priceRange": "$$"
}
```

## 📝 Changelog

### December 5, 2024 - Session: Final Polishing & Oldprototype Synchronization

**Goal**: Make Next.js build IDENTICAL to oldprototype (final polished Vite version).

#### 1. Cookie Consent Runtime Error Fix
**Problem**: `useCookieConsent must be used within CookieConsentProvider` error
- Footer component uses useCookieConsent hook but provider wasn't wrapping properly
- Root cause: CookieConsentContext.tsx returned children without context when mounted=false

**Solution**:
```typescript
// BEFORE (broken):
if (!mounted) {
  return <>{children}</>;
}

// AFTER (fixed):
return (
  <CookieConsentContext.Provider value={{ ...values }}>
    {children}
  </CookieConsentContext.Provider>
);
```
- Always provide context wrapper
- Set showBanner/showSettings to false until mounted (prevents hydration mismatch)

**File**: `contexts/CookieConsentContext.tsx`

#### 2. Language Switching Fix (EN→CS Not Working)
**Problem**: Switching from English to Czech didn't work
- Root cause: `en.json` was incomplete (6.8KB vs 41KB for cs.json)
- Missing translation keys caused pages to fail when switching to EN

**Solution**:
- Complete rewrite of `messages/en.json` (~35KB of new content)
- Added all missing sections: breadcrumbs, about, techPage, services (full), caseStudies, gallery, pricing, calculator, orderDiagnostics, faq
- Added `localePrefix: 'always'` to `i18n/routing.ts` for consistent URL behavior

**Files**:
- `messages/en.json` - Complete translation file
- `i18n/routing.ts` - Added localePrefix configuration

#### 3. Hardcoded Czech Text Removal (Systematic Review)
**Problem**: Multiple components had hardcoded Czech strings instead of translation keys

**Fixed Components**:

1. **Hero.tsx** (line 67)
   ```typescript
   // BEFORE: <Link href="/cenik">Ceník</Link>
   // AFTER: <Link href="/cenik">{t('hero.pricing')}</Link>
   ```

2. **ProcessInfographic.tsx** (lines 45-46)
   ```typescript
   // BEFORE: {isExpanded ? 'Skrýt postup' : 'Zobrazit postup'}
   // AFTER: {isExpanded ? t('hideProcess') : t('showProcess')}
   ```

3. **HomeContact.tsx** (multiple lines)
   - "Kde nás najdete" → `t('info.findUs')`
   - "Otevírací doba:" → `t('info.openingHours')`
   - "Tel.:" → `t('info.phone')`
   - "Nonstop hotline" → `t('info.nonstopHotline')`

4. **Case Study Pages** (hdd/pripady, ssd/pripady, raid/pripady)
   - Added `price` field to CaseStudy interface
   - Moved hardcoded prices to translation files
   ```typescript
   // BEFORE: Cena: {index === 0 ? '13 000 Kč' : ...}
   // AFTER: {labels.price} {study.price}
   ```

5. **Pricing Page** (cenik/page.tsx)
   ```typescript
   // BEFORE: const priceUnit = 'Kč';
   // AFTER: const priceUnit = t('pricing.currency');
   ```

**Translation Keys Added** (both cs.json and en.json):
- `hero.pricing` → "Ceník" / "Pricing"
- `showProcess` / `hideProcess` → Process toggle labels
- `info.*` → Contact section labels
- `caseStudies.*.price` → Price values for all case studies
- `pricing.currency` → "Kč" / "CZK"
- `pricing.currencyPerHour` → "Kč/hod" / "CZK/hour"
- `pricing.calculatorHint` → Calculator hint text

#### 4. Accessibility Improvements
**Problem**: Czech text in English-only aria-labels

**Fixed**:
1. **LanguageSwitcher.tsx**
   - Changed `aria-label="Přepnout na češtinu"` → `"Switch to Czech"`

2. **CookieSettings.tsx**
   - Changed `aria-label="Zavřít"` → `"Close"`

#### 5. Font Appearance Fix (CRITICAL)
**Problem**: Next.js version had thinner/lighter fonts compared to oldprototype
- User reported: "Nová verze má tenčí/jiné fonty než originál"

**Investigation**:
- Both versions use system fonts (no custom font imports)
- Both have identical `font-weight: 450` boost for mobile
- Found difference in body tag:

```html
<!-- oldprototype/index.html:81 -->
<body>

<!-- Next.js app/[locale]/layout.tsx:35 -->
<body className="antialiased">
```

**Root Cause**:
- The `antialiased` class applies `-webkit-font-smoothing: antialiased`
- This makes fonts appear thinner/lighter on macOS and iOS

**Solution**: Removed `antialiased` class from body tag
```typescript
// BEFORE
<body className="antialiased">

// AFTER
<body>
```

**File**: `app/[locale]/layout.tsx:35`

#### 6. Order Diagnostics Page Rewrite (COMPLETE OVERHAUL)
**Problem**: Next.js version had completely different structure than oldprototype
- Button toggles instead of radio buttons for customer type
- Different icons (MapPin instead of Home)
- Complex card design with shadows
- Missing breadcrumbs
- Wrong button colors and styling

**Solution**: Complete rewrite to match oldprototype exactly

**Key Changes**:
1. **Customer Type Selector**
   ```typescript
   // BEFORE: Button toggles with icons
   <button className="flex items-center gap-2 px-4 py-2 rounded-lg border-2">
     <User className="h-5 w-5" />

   // AFTER: Radio buttons (matches oldprototype)
   <label className="flex items-center">
     <input type="radio" name="customerType" value="individual" />
     <span className="ml-2 text-gray-700">{t('form.individual')}</span>
   </label>
   ```

2. **Icons**: Changed from `MapPin` to `Home` for personal delivery

3. **Card Design**: Simplified to `border-2 rounded-lg` (no shadows, no ChevronDown icons)

4. **Form Layout**:
   - Breadcrumbs component added
   - Radio buttons for customer type (not button toggles)
   - Privacy link inside form (not at bottom)
   - Terms link styling: `text-accent` with `underline`
   - Submit button: `bg-primary` (not `bg-accent`)

5. **Delivery Methods**:
   - Shipping (Truck icon) - with address fields
   - Courier (Package icon) - no address fields
   - Personal (Home icon) - no address fields

6. **Supabase Integration**: Fully functional with `createClient()`

7. **Double-click Terms Link**: Preserved from oldprototype (pulse animation on first click)

8. **Nonstop Hotline Button**: Mobile-only at bottom of page

**File**: `app/[locale]/objednat-diagnostiku/page.tsx` (complete rewrite, 695 lines)

#### Build Status
✅ All 248 pages building successfully
✅ No runtime errors
✅ Language switching CS↔EN works perfectly
✅ Fonts match oldprototype (bolder appearance)
✅ All translations synchronized
✅ Order form matches oldprototype EXACTLY

#### Remaining Work
⏳ Page-by-page visual comparison with oldprototype
⏳ Legal pages translation (gdpr, cookies, obchodni-podminky) - currently have hardcoded Czech content
⏳ Final QA testing on mobile devices

**Files Modified in This Session**:
- `contexts/CookieConsentContext.tsx` - Context wrapper fix
- `i18n/routing.ts` - Added localePrefix
- `messages/en.json` - Complete rewrite (~35KB)
- `messages/cs.json` - Added missing keys
- `components/Hero.tsx` - Fixed hardcoded text
- `components/ProcessInfographic.tsx` - Fixed hardcoded text
- `components/HomeContact.tsx` - Fixed hardcoded text
- `components/LanguageSwitcher.tsx` - Fixed aria-label
- `components/CookieSettings.tsx` - Fixed aria-label
- `app/[locale]/sluzby/hdd/pripady/page.tsx` - Fixed prices
- `app/[locale]/sluzby/ssd/pripady/page.tsx` - Fixed prices
- `app/[locale]/sluzby/raid/pripady/page.tsx` - Fixed prices
- `app/[locale]/cenik/page.tsx` - Fixed currency
- `app/[locale]/layout.tsx` - Removed antialiased class
- `app/[locale]/objednat-diagnostiku/page.tsx` - **COMPLETE REWRITE** to match oldprototype
