import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client pro použití v Client Components (browser)
 * Použití: import { createClient } from '@/lib/supabase/client'
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
