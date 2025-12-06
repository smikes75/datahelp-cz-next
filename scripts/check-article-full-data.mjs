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

const { data: post } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('slug', 'jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy')
  .single();

if (post) {
  console.log('=== TITLE CS ===');
  console.log(post.title_cs);
  console.log('\n=== EXCERPT CS ===');
  console.log(post.excerpt_cs);
  console.log('\n=== CONTENT CS (prvních 1000 znaků) ===');
  console.log(post.content_cs.substring(0, 1000));
  console.log('\n=== CONTENT CS LENGTH ===');
  console.log(post.content_cs.length + ' znaků');
}
