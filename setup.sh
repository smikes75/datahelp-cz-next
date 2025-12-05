#!/bin/bash

# ===========================================
# DataHelp Next.js Migration - Setup Script
# ===========================================

echo "🚀 DataHelp Next.js Migration Setup"
echo "===================================="

# Barvy pro výstup
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kontrola že jsme ve správném adresáři
if [ ! -f "CLAUDE.md" ]; then
    echo -e "${RED}❌ Chyba: Spusť tento skript z adresáře datahelp-nextjs${NC}"
    echo "   cd ~/Projects/datahelp-nextjs && ./setup.sh"
    exit 1
fi

# 1. Kontrola zdrojových souborů
echo ""
echo -e "${YELLOW}📁 Krok 1: Kontrola zdrojových souborů...${NC}"

if [ ! -d "src-backup" ]; then
    echo -e "${RED}❌ Adresář src-backup neexistuje!${NC}"
    echo ""
    echo "Zkopíruj zdrojové soubory z původního projektu:"
    echo "  cp -r ~/Documents/claude/src ./src-backup"
    echo "  cp -r ~/Documents/claude/public ./public-backup"
    echo "  cp ~/Documents/claude/package.json ./package-original.json"
    exit 1
else
    echo -e "${GREEN}✅ src-backup existuje${NC}"
fi

if [ ! -d "public-backup" ]; then
    echo -e "${YELLOW}⚠️  public-backup neexistuje - zkopíruj pokud máš statické soubory${NC}"
fi

# 2. Inicializace Next.js (pokud ještě není)
echo ""
echo -e "${YELLOW}📦 Krok 2: Kontrola Next.js projektu...${NC}"

if [ ! -f "package.json" ] || ! grep -q '"next"' package.json 2>/dev/null; then
    echo "Inicializuji Next.js projekt..."
    
    # Vytvoř dočasný adresář pro Next.js init
    npx create-next-app@latest temp-next --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
    
    # Přesuň soubory
    mv temp-next/* . 2>/dev/null
    mv temp-next/.* . 2>/dev/null
    rm -rf temp-next
    
    echo -e "${GREEN}✅ Next.js projekt vytvořen${NC}"
else
    echo -e "${GREEN}✅ Next.js projekt už existuje${NC}"
fi

# 3. Instalace dodatečných dependencies
echo ""
echo -e "${YELLOW}📚 Krok 3: Instalace dependencies...${NC}"

npm install next-intl @supabase/supabase-js @supabase/ssr
npm install -D @types/node

echo -e "${GREEN}✅ Dependencies nainstalovány${NC}"

# 4. Vytvoření základní struktury
echo ""
echo -e "${YELLOW}📂 Krok 4: Vytváření adresářové struktury...${NC}"

mkdir -p app/\[locale\]
mkdir -p app/api
mkdir -p components/ui
mkdir -p components/layout
mkdir -p components/features
mkdir -p lib/supabase
mkdir -p messages
mkdir -p types

echo -e "${GREEN}✅ Adresářová struktura vytvořena${NC}"

# 5. Vytvoření základních souborů (pokud neexistují)
echo ""
echo -e "${YELLOW}📝 Krok 5: Vytváření základních souborů...${NC}"

# middleware.ts pro i18n
if [ ! -f "middleware.ts" ]; then
cat > middleware.ts << 'EOF'
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['cs', 'en'],
  defaultLocale: 'cs',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(cs|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
EOF
echo "  ✅ middleware.ts"
fi

# i18n.ts
if [ ! -f "i18n.ts" ]; then
cat > i18n.ts << 'EOF'
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));
EOF
echo "  ✅ i18n.ts"
fi

# next.config.js
if [ ! -f "next.config.js" ] && [ ! -f "next.config.mjs" ]; then
cat > next.config.mjs << 'EOF'
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
EOF
echo "  ✅ next.config.mjs"
fi

# Základní messages soubory
if [ ! -f "messages/cs.json" ]; then
cat > messages/cs.json << 'EOF'
{
  "common": {
    "home": "Domů",
    "services": "Služby",
    "pricing": "Ceník",
    "about": "O nás",
    "contact": "Kontakt",
    "blog": "Blog",
    "faq": "Časté dotazy",
    "orderDiagnostics": "Objednat diagnostiku",
    "phone": "+420 775 220 440",
    "email": "info@datahelp.cz"
  },
  "home": {
    "title": "Profesionální záchrana dat",
    "subtitle": "Bezplatné posouzení a svoz po celé ČR zdarma",
    "yearsExperience": "25+ let zkušeností",
    "completedOrders": "55.000+ zakázek"
  }
}
EOF
echo "  ✅ messages/cs.json"
fi

if [ ! -f "messages/en.json" ]; then
cat > messages/en.json << 'EOF'
{
  "common": {
    "home": "Home",
    "services": "Services",
    "pricing": "Pricing",
    "about": "About",
    "contact": "Contact",
    "blog": "Blog",
    "faq": "FAQ",
    "orderDiagnostics": "Order Diagnostics",
    "phone": "+420 775 220 440",
    "email": "info@datahelp.cz"
  },
  "home": {
    "title": "Professional Data Recovery",
    "subtitle": "Free assessment and pickup across Czech Republic",
    "yearsExperience": "25+ years of experience",
    "completedOrders": "55,000+ completed orders"
  }
}
EOF
echo "  ✅ messages/en.json"
fi

# Supabase client
if [ ! -f "lib/supabase/client.ts" ]; then
cat > lib/supabase/client.ts << 'EOF'
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
EOF
echo "  ✅ lib/supabase/client.ts"
fi

if [ ! -f "lib/supabase/server.ts" ]; then
cat > lib/supabase/server.ts << 'EOF'
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie errors in middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie errors in middleware
          }
        },
      },
    }
  );
}
EOF
echo "  ✅ lib/supabase/server.ts"
fi

# .env.local template
if [ ! -f ".env.local" ]; then
cat > .env.local << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://oqcvqquecshienabwkxu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Site URL (pro sitemap a canonical URLs)
NEXT_PUBLIC_SITE_URL=https://www.datahelp.cz
EOF
echo "  ✅ .env.local (UPRAV SUPABASE KLÍČ!)"
fi

# .gitignore update
if ! grep -q ".env.local" .gitignore 2>/dev/null; then
cat >> .gitignore << 'EOF'

# Environment
.env.local
.env.*.local

# Backup files
src-backup/
public-backup/
package-original.json
EOF
echo "  ✅ .gitignore updated"
fi

echo ""
echo -e "${GREEN}===================================="
echo "✅ Setup dokončen!"
echo "====================================${NC}"
echo ""
echo "📋 Další kroky:"
echo ""
echo "1. Uprav .env.local - přidej správný Supabase ANON_KEY"
echo ""
echo "2. Otevři Claude Code:"
echo "   ${YELLOW}claude${NC}"
echo ""
echo "3. Zkopíruj startovací prompt z MIGRATION-PROMPTS.md"
echo ""
echo "4. Sleduj pokyny a migruj projekt"
echo ""
echo -e "${YELLOW}💡 Tip: Přečti si CLAUDE.md pro kompletní specifikaci projektu${NC}"
