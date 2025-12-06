#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const slugs = [
  'jak-jsme-zachranovali-cenna-data-check-czech-fashion',
  'vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka',
  'jak-jsme-obnovili-ztracene-vzpominky-herecky-a-daberky-kamily-sprachalove',
  'zachranili-jsme-data-stepance-hilgertove'
];

for (const slug of slugs) {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title_cs, content_cs')
    .eq('slug', slug)
    .single();

  if (post) {
    console.log(`\n=== ${post.title_cs} ===`);
    console.log(`Délka: ${post.content_cs.length} znaků`);
    console.log(`Začátek: ${post.content_cs.substring(0, 100)}...`);

    // Check if starts with ## (missing intro)
    if (post.content_cs.trim().startsWith('##')) {
      console.log('⚠️  CHYBÍ ÚVODNÍ ODSTAVCE!');
    } else {
      console.log('✅ Má úvodní text');
    }
  }
}
