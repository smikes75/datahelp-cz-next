#!/usr/bin/env node

/**
 * Remove "Potřebujete okamžitou pomoc?" section from articles
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
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

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Removing contact section from articles...\n');

const slugs = [
  'jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy',
  'jak-jsme-zachranovali-cenna-data-check-czech-fashion',
  'vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka',
  'jak-jsme-obnovili-ztracene-vzpominky-herecky-a-daberky-kamily-sprachalove',
  'zachranili-jsme-data-stepance-hilgertove'
];

for (const slug of slugs) {
  console.log(`⏳ Processing: ${slug}...`);

  const { data: post } = await supabase
    .from('blog_posts')
    .select('id, content_cs, content_en')
    .eq('slug', slug)
    .single();

  if (!post) {
    console.log(`   ⚠️  Article not found\n`);
    continue;
  }

  // Remove everything from "## Potřebujete okamžitou pomoc?" onwards
  const removeContactSection = (content) => {
    if (!content) return content;

    // Czech version
    const czechMatch = content.indexOf('## Potřebujete okamžitou pomoc?');
    if (czechMatch !== -1) {
      return content.substring(0, czechMatch).trim();
    }

    // English version
    const englishMatch = content.indexOf('## Need immediate help?');
    if (englishMatch !== -1) {
      return content.substring(0, englishMatch).trim();
    }

    return content;
  };

  const cleanedContentCs = removeContactSection(post.content_cs);
  const cleanedContentEn = removeContactSection(post.content_en);

  const { error } = await supabase
    .from('blog_posts')
    .update({
      content_cs: cleanedContentCs,
      content_en: cleanedContentEn
    })
    .eq('id', post.id);

  if (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
  } else {
    console.log(`   ✅ Removed contact section\n`);
  }
}

console.log('🎉 Contact section removal complete!');
console.log('\n📍 Check: http://localhost:3000/clanky/jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy');
