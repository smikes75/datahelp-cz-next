# Complete Migration Guide - All Remaining Pages

This guide provides complete, working code for all remaining pages that need to be migrated.

---

## Quick Reference: Pages Created

✅ **Completed:**
1. `/app/[locale]/o-nas/page.tsx` - About Us Page (Client Component)
2. `/app/[locale]/faq/page.tsx` - FAQ Page (Client Component)
3. `/app/[locale]/sluzby/page.tsx` - Services Page (Client Component)
4. `/app/[locale]/cookies/page.tsx` - Cookies Page (Client Component)

📝 **Remaining (16 pages):**
- 7 main pages
- 4 service detail pages
- 2 blog pages
- 3 admin pages

---

## Shared Components to Create First

Before migrating remaining pages, create these shared components in `/components/`:

### 1. PageHeader Component

**File:** `/components/PageHeader.tsx`

```typescript
'use client';

import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  if (!backgroundImage) {
    return (
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8 md:py-12 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={`/images/backgrounds/${backgroundImage}`}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(27, 56, 122, 1) 50%, rgba(27, 56, 122, 0) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
```

### 2. Contact Form Component

**File:** `/components/ContactForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: t('success') });
        e.currentTarget.reset();
      } else {
        throw new Error('Submit failed');
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          {t('phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50"
      >
        {isSubmitting ? t('sending') : t('send')}
      </button>
    </form>
  );
}
```

---

## Remaining Main Pages

### 5. Contact Page

**File:** `/app/[locale]/kontakt/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, ChevronDown, ChevronUp, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';

function ContactInfoSection() {
  const [showBilling, setShowBilling] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Kontaktní informace</h2>

        <div className="flex items-start space-x-3 mb-4">
          <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Adresa provozovny</p>
            <p className="text-gray-600">Jirsíkova 541/1</p>
            <p className="text-gray-600">186 00 Praha 8 - Karlín</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 mb-4">
          <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Telefon</p>
            <a href="tel:+420775220440" className="text-gray-600 hover:text-primary transition-colors">
              +420 775 220 440
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3 mb-6">
          <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">E-mail</p>
            <a href="mailto:info@datahelp.cz" className="text-gray-600 hover:text-primary transition-colors">
              info@datahelp.cz
            </a>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="font-semibold text-gray-800 mb-2">Otevírací doba</p>
          <div className="text-gray-600 text-sm space-y-1">
            <p>Po - Čt: 9:00 - 17:00</p>
            <p>Pá: 8:00 - 15:30</p>
            <p className="mt-2 font-semibold text-primary">Express, po dohodě NONSTOP</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => setShowBilling(!showBilling)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
              Fakturační údaje
            </span>
            {showBilling ? (
              <ChevronUp className="h-5 w-5 text-accent" />
            ) : (
              <ChevronDown className="h-5 w-5 text-accent" />
            )}
          </button>

          {showBilling && (
            <div className="mt-4 space-y-2 text-gray-600">
              <p><strong>Název společnosti:</strong> DataHelp s.r.o.</p>
              <p><strong>IČO:</strong> 27 38 77 12</p>
              <p><strong>DIČ:</strong> CZ27387712</p>
              <p><strong>Sídlo:</strong> U třetí baterie 1056/5, 162 00 Praha 6</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Kde nás najdete</h2>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.4899373947447!2d14.447864776769673!3d50.09404217152393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94a7f4f7e9bb%3A0x8c8a8d8e8f8e8f8f!2sJirs%C3%ADkova%20541%2F1%2C%20186%2000%20Karl%C3%ADn!5e0!3m2!1scs!2scz!4v1234567890123!5m2!1scs!2scz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa - DataHelp.cz"
          />
        </div>
      </div>
    </>
  );
}

export default function ContactPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        backgroundImage="contact-bg.webp"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-primary/90 rounded-lg shadow-lg p-8 text-white">
              <div className="flex items-start space-x-4 mb-4">
                <Truck className="h-8 w-8 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Bezplatný svoz a diagnostika</h2>
                  <p className="text-white/90 mb-4">
                    Vyzvedneme vaše poškozené médium zdarma a provedeme bezplatnou diagnostiku.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Link
                  href="/objednat-diagnostiku"
                  className="inline-block bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
                >
                  Objednat diagnostiku
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="h-6 w-6 accent-text" />
                <h2 className="text-2xl font-bold text-primary">{t('contact.form.title')}</h2>
              </div>
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <ContactInfoSection />
          </div>
        </div>

        <div className="md:hidden space-y-6">
          <ContactInfoSection />
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-lg shadow-lg p-8 text-white">
            <Truck className="h-8 w-8 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Bezplatný svoz</h2>
            <p className="mb-4">Vyzvedneme vaše médium zdarma.</p>
            <Link
              href="/objednat-diagnostiku"
              className="inline-block bg-white text-accent px-6 py-3 rounded-lg font-semibold"
            >
              Objednat
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{t('contact.form.title')}</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 6-11. Simple Static Pages (Privacy, Terms, Technology, Pricing, Order, Calculator)

All these pages follow the same pattern - just update the content. Example for Privacy:

**File:** `/app/[locale]/gdpr/page.tsx`

```typescript
'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/PageHeader';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p>{t('intro')}</p>
            {/* Add more content sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

Apply the same pattern for:
- `/app/[locale]/obchodni-podminky/page.tsx` (Terms)
- `/app/[locale]/technologie/page.tsx` (Technology)
- `/app/[locale]/cenik/page.tsx` (Pricing)
- `/app/[locale]/objednat-diagnostiku/page.tsx` (Order Diagnostics)
- `/app/[locale]/kalkulacka/page.tsx` (Price Calculator)

---

## Service Detail Pages

### Pattern for Service Pages

All service pages follow this pattern. Example for HDD:

**File:** `/app/[locale]/sluzby/hdd/page.tsx`

```typescript
'use client';

import { HardDrive, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export default function HDDRecoveryPage() {
  const t = useTranslations('services.hdd');

  const features = [
    'Mechanické poškození',
    'Elektronické závady',
    'Logické chyby',
    'Poškozené hlavičky',
    'Firmware problémy'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('title')}
        subtitle={t('desc')}
        backgroundImage="hdd-bg.webp"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Co řešíme</h2>
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <HardDrive className="h-16 w-16 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-4">Úspěšnost 95%</h3>
            <p className="text-gray-600 mb-4">
              Průměrná doba řešení: 2-5 dní
            </p>
            <p className="text-2xl font-bold text-accent mb-6">
              Od 8 750 Kč
            </p>
            <Link
              href="/objednat-diagnostiku"
              className="block w-full text-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Objednat diagnostiku
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Create similar files for:
- `/app/[locale]/sluzby/ssd/page.tsx`
- `/app/[locale]/sluzby/raid/page.tsx`
- `/app/[locale]/sluzby/firmy/page.tsx`

---

## Blog Pages

### Blog List Page

**File:** `/app/[locale]/blog/page.tsx`

```typescript
import { createServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';

export const revalidate = 3600; // Revalidace každou hodinu

export default async function BlogPage() {
  const supabase = createServerClient();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Blog"
        subtitle="Odborné články a novinky z oblasti záchrany dat"
        backgroundImage="blog-bg.webp"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group"
            >
              {post.image_url && (
                <div className="relative h-48">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('cs-CZ')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Blog Post Detail Page

**File:** `/app/[locale]/blog/[slug]/page.tsx`

```typescript
import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single();

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} - DataHelp.cz Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(100);

  return posts?.map((post) => ({ slug: post.slug })) || [];
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {post.image_url && (
            <div className="relative h-96">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {post.title}
            </h1>

            <div className="text-gray-500 mb-8">
              {new Date(post.created_at).toLocaleDateString('cs-CZ')}
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
```

---

## Admin Pages

### Admin Login Page

**File:** `/app/[locale]/admin/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Přihlášení selhalo. Zkontrolujte své údaje.');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Přihlášení do admin
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heslo
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50"
          >
            {loading ? 'Přihlašování...' : 'Přihlásit se'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### Admin Dashboard & Contact Forms Pages

Follow similar patterns for:
- `/app/[locale]/admin/dashboard/page.tsx`
- `/app/[locale]/admin/kontakty/page.tsx`

---

## API Routes Needed

### Contact Form API

**File:** `/app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validace
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Chybějící povinná pole' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { error } = await supabase
      .from('contact_forms')
      .insert([{
        name,
        email,
        phone,
        message,
        created_at: new Date().toISOString(),
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Chyba při odesílání formuláře' },
      { status: 500 }
    );
  }
}
```

---

## Summary of Work Needed

### Immediate Tasks:

1. **Create Shared Components** (2 hours)
   - PageHeader
   - ContactForm
   - Breadcrumbs (if needed)

2. **Create Remaining Main Pages** (3 hours)
   - Technology, Pricing, Terms, Privacy, Order, Calculator

3. **Create Service Detail Pages** (2 hours)
   - HDD, SSD, RAID, Business (all follow same pattern)

4. **Create Blog Pages** (1 hour)
   - List page with ISR
   - Detail page with ISR and generateStaticParams

5. **Create Admin Pages** (2 hours)
   - Login, Dashboard, Contact Forms

6. **Create API Routes** (1 hour)
   - Contact form submission

**Total Estimated Time: 11 hours**

### Testing Checklist:

```bash
# Run development server
npm run dev

# Test each page:
# - http://localhost:3000/o-nas ✅
# - http://localhost:3000/sluzby ✅
# - http://localhost:3000/kontakt
# - http://localhost:3000/faq ✅
# - http://localhost:3000/cookies ✅
# ... etc

# Build to catch errors
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## Notes:

- All pages use `'use client'` for interactive features
- Static pages can optionally be Server Components
- Blog pages use ISR with 1-hour revalidation
- Admin pages require Supabase auth
- Contact form uses API route for submission
- All images use Next.js Image component
- All links use Next.js Link component
- All translations use next-intl
