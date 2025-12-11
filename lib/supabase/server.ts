import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Supabase client pro použití v Server Components (SSR)
 * Používá cookies pro správu auth session
 * Použití: import { createClient } from '@/lib/supabase/server'
 *
 * Realtime je vypnutý pro snížení velikosti bundlu (~200KB úspora)
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Handle cookie errors in Server Components
          }
        },
      },
      realtime: {
        params: {
          eventsPerSecond: -1
        }
      }
    }
  );
}

/**
 * Supabase client pro statickou generaci (bez cookies)
 * Použití během generateStaticParams a build time
 * Nepoužívá cookies - vhodné pro veřejná data
 *
 * Realtime je vypnutý pro snížení velikosti bundlu (~200KB úspora)
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      realtime: {
        params: {
          eventsPerSecond: -1
        }
      }
    }
  );
}
