#!/usr/bin/env node

/**
 * Fix article HTML formatting - add proper spacing between elements
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

console.log('🚀 Fixing article HTML formatting...\n');

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

  // Fix formatting: ensure proper spacing between HTML tags
  const fixFormatting = (html) => {
    if (!html) return html;

    return html
      // Add newlines after closing tags
      .replace(/<\/h2>/g, '</h2>\n\n')
      .replace(/<\/h3>/g, '</h3>\n\n')
      .replace(/<\/p>/g, '</p>\n\n')
      .replace(/<\/ul>/g, '</ul>\n\n')
      .replace(/<\/ol>/g, '</ol>\n\n')
      .replace(/<\/li>/g, '</li>\n')
      // Clean up multiple newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const fixedContentCs = fixFormatting(post.content_cs);
  const fixedContentEn = fixFormatting(post.content_en);

  const { error } = await supabase
    .from('blog_posts')
    .update({
      content_cs: fixedContentCs,
      content_en: fixedContentEn
    })
    .eq('id', post.id);

  if (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
  } else {
    console.log(`   ✅ Fixed formatting\n`);
  }
}

console.log('🎉 Formatting fix complete!');
console.log('\n📍 Check: http://localhost:3000/clanky/jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy');
