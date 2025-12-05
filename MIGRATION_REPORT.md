# Migration Report - DataHelp.cz React → Next.js

## Status: IN PROGRESS

This document tracks the migration of all pages from the React/Vite project to Next.js 14 App Router.

---

## Migration Approach

### Component Type Classification

Each page was analyzed for interactivity to determine if it should be a Server or Client Component:

**Client Components** (require `'use client';` directive):
- Pages with useState, useEffect, or event handlers
- Forms with validation and submission logic
- Interactive UI elements (accordions, tabs, carousels)
- Pages that use browser APIs (localStorage, window, etc.)

**Server Components** (no directive):
- Static content pages (Terms, Privacy, Cookies)
- Pages that only fetch data without client interactivity

### Import Replacements Applied

All pages received these systematic replacements:

```typescript
// OLD (React Router)
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// NEW (Next.js)
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
```

### Image Optimization

All `<img>` tags replaced with Next.js `<Image>`:

```typescript
// OLD
<img src="/images/photo.jpg" alt="..." />

// NEW
import Image from 'next/image';
<Image src="/images/photo.jpg" alt="..." width={800} height={600} />
// or
<Image src="/images/photo.jpg" alt="..." fill className="object-cover" />
```

### Translation System

Replaced react-i18next with next-intl:

```typescript
// OLD
const { t } = useTranslation();
const data = t('key', { returnObjects: true });

// NEW
const t = useTranslations();
const data = t.raw('key'); // for objects/arrays
const text = t('key'); // for strings
```

---

## Pages Migration Status

### ✅ Main Pages (Completed: 2/11)

| Page | Source | Destination | Type | Status |
|------|--------|-------------|------|--------|
| About Us | `src-backup/pages/AboutUsPage.tsx` | `app/[locale]/o-nas/page.tsx` | Client | ✅ DONE |
| FAQ | `src-backup/pages/FAQPage.tsx` | `app/[locale]/faq/page.tsx` | Client | ✅ DONE |
| Services | `src-backup/pages/ServicesPage.tsx` | `app/[locale]/sluzby/page.tsx` | Client | 🔄 TODO |
| Contact | `src-backup/pages/ContactPage.tsx` | `app/[locale]/kontakt/page.tsx` | Client | 🔄 TODO |
| Technology | `src-backup/pages/TechnologyPage.tsx` | `app/[locale]/technologie/page.tsx` | Client | 🔄 TODO |
| Pricing | `src-backup/pages/PricingPage.tsx` | `app/[locale]/cenik/page.tsx` | Client | 🔄 TODO |
| Order Diagnostics | `src-backup/pages/OrderDiagnosticsPage.tsx` | `app/[locale]/objednat-diagnostiku/page.tsx` | Client | 🔄 TODO |
| Price Calculator | `src-backup/pages/PriceCalculatorPage.tsx` | `app/[locale]/kalkulacka/page.tsx` | Client | 🔄 TODO |
| Cookies | `src-backup/pages/CookiesPage.tsx` | `app/[locale]/cookies/page.tsx` | Server | 🔄 TODO |
| Privacy (GDPR) | `src-backup/pages/PrivacyPage.tsx` | `app/[locale]/gdpr/page.tsx` | Server | 🔄 TODO |
| Terms | `src-backup/pages/TermsPage.tsx` | `app/[locale]/obchodni-podminky/page.tsx` | Server | 🔄 TODO |

### Service Detail Pages (0/4)

| Page | Source | Destination | Type | Status |
|------|--------|-------------|------|--------|
| HDD Recovery | `src-backup/pages/services/HDDRecoveryPage.tsx` | `app/[locale]/sluzby/hdd/page.tsx` | Client | 🔄 TODO |
| SSD Recovery | `src-backup/pages/services/SSDRecoveryPage.tsx` | `app/[locale]/sluzby/ssd/page.tsx` | Client | 🔄 TODO |
| RAID Systems | `src-backup/pages/services/RAIDSystemsPage.tsx` | `app/[locale]/sluzby/raid/page.tsx` | Client | 🔄 TODO |
| Business Solutions | `src-backup/pages/services/BusinessSolutionsPage.tsx` | `app/[locale]/sluzby/firmy/page.tsx` | Client | 🔄 TODO |

### Blog Pages (0/2)

| Page | Source | Destination | Type | Status |
|------|--------|-------------|------|--------|
| Blog List | `src-backup/pages/BlogPage.tsx` | `app/[locale]/blog/page.tsx` | Server + Client | 🔄 TODO |
| Blog Post Detail | `src-backup/pages/BlogPostPage.tsx` | `app/[locale]/blog/[slug]/page.tsx` | Server | 🔄 TODO |

### Admin Pages (0/3)

| Page | Source | Destination | Type | Status |
|------|--------|-------------|------|--------|
| Login | `src-backup/pages/admin/LoginPage.tsx` | `app/[locale]/admin/page.tsx` | Client | 🔄 TODO |
| Dashboard | `src-backup/pages/admin/AdminPage.tsx` | `app/[locale]/admin/dashboard/page.tsx` | Client | 🔄 TODO |
| Contact Forms | `src-backup/pages/admin/AdminContactForms.tsx` | `app/[locale]/admin/kontakty/page.tsx` | Client | 🔄 TODO |

---

## Components Migration Needed

### Shared Components to Migrate

These components are used across multiple pages and need to be migrated to `components/`:

1. **PageHeader** - Used on all pages for hero section
2. **Breadcrumbs** - Navigation breadcrumbs (needs Next.js routing)
3. **Contact** - Contact form with Supabase integration
4. **FAQ** - Accordion-style FAQ component
5. **AboutGallery** - Image carousel for about page
6. **TechnologyGallery** - Technology showcase gallery
7. **LoadingSkeleton** - Loading states
8. **FormInput, FormTextarea, FormButton** - Form UI components

### Component Migration Pattern

```typescript
// Example: PageHeader component migration

// OLD (React)
import { getBackgroundStyle } from '../utils/imageUtils';

export function PageHeader({ title, subtitle, backgroundImage }) {
  return (
    <div style={getBackgroundStyle(`/images/backgrounds/${backgroundImage}`)}>
      // content
    </div>
  );
}

// NEW (Next.js)
'use client'; // if interactive, otherwise omit

import Image from 'next/image';

export function PageHeader({ title, subtitle, backgroundImage }) {
  return (
    <div className="relative">
      <Image
        src={`/images/backgrounds/${backgroundImage}`}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      // content
    </div>
  );
}
```

---

## Special Considerations

### 1. Blog Pages with ISR

Blog pages need special handling for Incremental Static Regeneration:

```typescript
// app/[locale]/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  // Generate only latest 100 posts at build time
  const { data: posts } = await createServerClient()
    .from('blog_posts')
    .select('slug')
    .order('created_at', { ascending: false })
    .limit(100);

  return posts?.map((post) => ({ slug: post.slug })) || [];
}
```

### 2. Supabase Client/Server Separation

Pages fetching data need appropriate Supabase client:

```typescript
// Server Component
import { createServerClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = createServerClient();
  const { data } = await supabase.from('table').select();
  return <div>...</div>;
}

// Client Component
'use client';
import { createBrowserClient } from '@/lib/supabase/client';

export default function Page() {
  const supabase = createBrowserClient();
  // Use in useEffect or event handlers
}
```

### 3. Form Submissions

Forms with POST requests need to use Server Actions or API routes:

```typescript
// Option 1: Server Action (recommended)
'use server';

export async function submitContactForm(formData: FormData) {
  const supabase = createServerClient();
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  await supabase.from('contact_forms').insert([data]);
}

// Option 2: API Route
// app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Handle submission
  return Response.json({ success: true });
}
```

### 4. Metadata for SEO

Every page needs metadata export:

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title - DataHelp.cz',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['/og-image.jpg'],
  },
};
```

---

## Translation Keys Audit

### Existing Translation Coverage

Based on `messages/cs.json`, these namespaces exist:
- ✅ `nav` - Navigation
- ✅ `about` - About page
- ✅ `services` - Services
- ✅ `contact` - Contact page
- ✅ `faq` - FAQ
- ✅ `blog` - Blog
- ✅ `techPage` - Technology page
- ✅ `cookies` - Cookies page
- ✅ `footer` - Footer

### Missing Translations

These keys need to be added to translation files:

1. **Pricing Page** - Missing `pricing` namespace
2. **Admin Pages** - Missing `admin` namespace
3. **Order Diagnostics** - Missing `orderDiagnostics` namespace
4. **Price Calculator** - Missing `priceCalculator` namespace
5. **Terms Page** - Missing `terms` namespace
6. **Privacy Page** - Missing `privacy` namespace

---

## Issues Encountered & Resolutions

### Issue 1: Image Optimization
**Problem**: Direct `<img>` tags don't leverage Next.js optimization
**Solution**: Replace all with `<Image>` component, add domains to `next.config.mjs`

### Issue 2: Client vs Server Components
**Problem**: useState/useEffect in Server Components causes errors
**Solution**: Add `'use client';` directive to interactive components

### Issue 3: Translation System Migration
**Problem**: react-i18next `returnObjects: true` doesn't map to next-intl
**Solution**: Use `t.raw('key')` for objects/arrays instead of `t('key')`

### Issue 4: Router Hooks
**Problem**: `useLocation()` and `useNavigate()` not available in Next.js
**Solution**: Use `usePathname()` and `useRouter()` from 'next/navigation'

---

## Next Steps

1. ✅ Create directory structure for all pages
2. ✅ Migrate 2 sample pages (About, FAQ) to establish pattern
3. 🔄 Migrate remaining main pages (9 pages)
4. 🔄 Migrate service detail pages (4 pages)
5. 🔄 Migrate blog pages with ISR (2 pages)
6. 🔄 Migrate admin pages (3 pages)
7. 🔄 Create shared component library
8. 🔄 Add missing translation keys
9. 🔄 Test all pages for compilation
10. 🔄 Add metadata to all pages
11. 🔄 Test forms and Supabase integration
12. 🔄 Run `npm run build` to verify

---

## Testing Checklist

After migration completion:

- [ ] All pages compile without errors
- [ ] All pages load in browser
- [ ] Navigation between pages works
- [ ] Language switching (cs/en) works
- [ ] Forms submit successfully
- [ ] Images load and optimize correctly
- [ ] Mobile responsive on all pages
- [ ] Breadcrumbs display correctly
- [ ] SEO metadata present on all pages
- [ ] Blog pagination works
- [ ] Blog ISR revalidation works
- [ ] Admin authentication works
- [ ] Lighthouse score 90+ for all pages

---

## Migration Templates

### Template: Simple Static Page

```typescript
// app/[locale]/example/page.tsx
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

// Metadata export (for SEO)
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('page.title')} - DataHelp.cz`,
    description: t('page.description'),
  };
}

// Server Component (no 'use client' needed)
export default function ExamplePage() {
  const t = useTranslations('page');

  return (
    <div className="min-h-screen bg-gray-50">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Template: Interactive Client Page

```typescript
// app/[locale]/example/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function ExamplePage() {
  const t = useTranslations('page');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <h1>{t('title')}</h1>
      <button onClick={() => setActiveTab(1)}>
        {t('clickMe')}
      </button>
      <Link href="/other-page">
        {t('navigate')}
      </Link>
    </div>
  );
}
```

### Template: Page with Data Fetching

```typescript
// app/[locale]/example/page.tsx
import { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import Image from 'next/image';

export const revalidate = 3600; // ISR - revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Example - DataHelp.cz',
    description: 'Example page with data',
  };
}

export default async function ExamplePage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('table')
    .select('*')
    .limit(10);

  return (
    <div className="min-h-screen bg-gray-50">
      {data?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

---

## Estimated Completion

- **Pages Migrated**: 2/20 (10%)
- **Components Migrated**: 0/8 (0%)
- **Estimated Time Remaining**: 8-12 hours
- **Priority**: High (blocking deployment)

---

## Notes

- All migrated pages maintain original functionality
- CSS classes remain unchanged (Tailwind)
- Component structure mirrors original where possible
- Czech language used for all code comments per requirements
- Supabase integration preserved
- Form validation logic preserved
- All interactive features maintained
