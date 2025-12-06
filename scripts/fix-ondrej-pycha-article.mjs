#!/usr/bin/env node

/**
 * Fix Ondřej Pýcha article - add missing intro paragraphs
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

console.log('🚀 Fixing Ondřej Pýcha article...\n');

const slug = 'jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy';

const { data: post } = await supabase
  .from('blog_posts')
  .select('id, content_cs')
  .eq('slug', slug)
  .single();

if (!post) {
  console.log(`❌ Article not found\n`);
  process.exit(1);
}

// Add intro paragraphs before the current content
const introParagraphs = `Ve světě showbyznysu a sportu se pohybují nemalé peníze. Ti nejlepší spolupracují jenom s těmi nejlepšími. Něco o tom ví i Ondřej Pýcha, fotograf hvězd a celosvětově známých sportovců.

Ať se snažíte sebelépe, pravděpodobně vše nemáte zálohováno ve virtuálním cloudovém úložišti a vždy se najdou data, která zapomenete na vašem starším disku. Když si za několik let vzpomenete, že disk opět využijete, můžete být neblaze překvapeni. Disk se nenačítá, data jsou nedostupná.

Stejný problém měl i Ondřej Pýcha. Jeho značná práce byla uvězněna na nefunkčním disku, do kterého se potřeboval dostat co nejdříve. Ondra nás kontaktoval a my si přímo k němu pro disk zajeli. Po rychle diagnostice, kterou mají naši klienti zdarma i se svozem, jsme zjistili, že se jedná o vadné čtecí hlavy a poškozené plotny.

Ondrovi jsme zavolali, ať se nestrachuje. Jeho disk i fotografie budou v pořádku.

Po odsouhlasení prací jsme započali se záchranou.

`;

const newContent = introParagraphs + post.content_cs;

const { error } = await supabase
  .from('blog_posts')
  .update({
    content_cs: newContent
  })
  .eq('id', post.id);

if (error) {
  console.error(`❌ Error: ${error.message}\n`);
} else {
  console.log(`✅ Added intro paragraphs to article\n`);
  console.log('📍 Check: http://localhost:3000/clanky/jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy');
}
