import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase client pro API routes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - Načtení nastavení (veřejné)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  try {
    if (key) {
      // Načti konkrétní klíč
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

      if (error) {
        // Pokud tabulka neexistuje nebo klíč nenalezen, vrať výchozí hodnoty
        if (key === 'banner') {
          return NextResponse.json({
            enabled: false,
            type: 'contact',
            text: 'Svoz médií ZDARMA po celé ČR!',
            bgColor: 'blue-900'
          });
        }
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      return NextResponse.json(data.value);
    }

    // Načti všechna nastavení
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    // Fallback pro případ, že Supabase není dostupné
    if (key === 'banner') {
      return NextResponse.json({
        enabled: false,
        type: 'contact',
        text: 'Svoz médií ZDARMA po celé ČR!',
        bgColor: 'blue-900'
      });
    }
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// POST - Uložení nastavení (vyžaduje heslo)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, key, value } = body;

    // Ověření hesla
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!key || !value) {
      return NextResponse.json({ error: 'Missing key or value' }, { status: 400 });
    }

    // Upsert - vloží nebo aktualizuje
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        key,
        value,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
