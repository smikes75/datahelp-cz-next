/**
 * Script pro kontrolu struktury Supabase tabulek
 * Zkontroluje, jestli tabulka contact_forms existuje a má správné sloupce
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oqcvqquecshienabwkxu.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xY3ZxcXVlY3NoaWVuYWJ3a3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNDg0NDAsImV4cCI6MjA0ODYyNDQ0MH0.BCRJF3eOJsxS3LmGLQJSj1JnTG7sKf2qZ8SLPvF9eM4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkTableSchema() {
  console.log('🔍 Kontrola Supabase tabulek...\n');

  try {
    // Test připojení - zkusíme načíst jeden řádek z tabulky
    console.log('📊 Kontrola tabulky: contact_forms');
    const { data, error, count } = await supabase
      .from('contact_forms')
      .select('*', { count: 'exact', head: false })
      .limit(1);

    if (error) {
      console.error('❌ Chyba při načítání tabulky contact_forms:');
      console.error('   Error code:', error.code);
      console.error('   Error message:', error.message);
      console.error('   Error details:', error.details);
      console.log('\n💡 Možné příčiny:');
      console.log('   - Tabulka neexistuje');
      console.log('   - RLS policy blokuje SELECT');
      console.log('   - Špatné credentials');
      return;
    }

    console.log('✅ Tabulka contact_forms existuje!');
    console.log(`   Počet záznamů: ${count}`);

    if (data && data.length > 0) {
      console.log('\n📋 Struktura tabulky (sloupce):');
      const columns = Object.keys(data[0]);
      columns.forEach(col => {
        const value = data[0][col];
        const type = typeof value;
        console.log(`   - ${col} (${type})`);
      });

      console.log('\n📄 Příklad záznamu:');
      console.log(JSON.stringify(data[0], null, 2));
    } else {
      console.log('\n⚠️  Tabulka je prázdná - nelze zobrazit strukturu');
      console.log('   Doporučení: Vytvoř testovací záznam pomocí formuláře');
    }

    // Zkontrolujeme, jestli máme INSERT práva
    console.log('\n🔐 Test INSERT práv...');
    const testData = {
      name: 'Test Script',
      email: 'test@script.cz',
      phone: '+420 123 456 789',
      message: 'Testovací zpráva ze scriptu - můžeš smazat',
      user_agent: 'Test Script v1.0'
    };

    const { error: insertError } = await supabase
      .from('contact_forms')
      .insert([testData])
      .select();

    if (insertError) {
      console.error('❌ INSERT selhal:');
      console.error('   Error:', insertError.message);
    } else {
      console.log('✅ INSERT funguje!');
      console.log('   Testovací záznam byl úspěšně vložen');
      console.log('   (můžeš ho smazat v Supabase dashboardu)');
    }

  } catch (err) {
    console.error('💥 Neočekávaná chyba:');
    console.error(err);
  }
}

// Spusť kontrolu
checkTableSchema();
