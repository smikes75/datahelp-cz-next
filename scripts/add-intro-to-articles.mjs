#!/usr/bin/env node

/**
 * Add intro paragraphs to all reference articles
 * Based on original datahelp.cz content
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

console.log('🚀 Adding intro paragraphs to articles...\n');

// Article intros based on datahelp.cz originals
const articles = [
  {
    slug: 'jak-jsme-zachranovali-cenna-data-check-czech-fashion',
    intro: `Móda. Fashion. Krása. Fotografie. Články. Videa. To všechno tvoří obsah oblíbeného českého internetového portálu Check Czech Fashion. Díky tomuto čtivému magazínu jste vždy v obraze, co se děje v módním světě. Za šest let práce tak vzniklo mnoho zajímavých článků a videí s rozhovory.

Když přestane disk fungovat a vy si uvědomíte, že se data nedají obnovit běžnými způsoby, je to obvykle nepříjemné. Ještě více znepokojivé je to ale, když se tento problém týká provozovatele módního webu. Zvláště když je v práci šest let a většina článků je uložena jen na jednom disku. Co teď? Provozovatelky neměly na výběr, disk bylo třeba zachránit.

Bez obav jsme je ubezpečili, že nejsou první ani poslední s takovým problémem.`
  },
  {
    slug: 'vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka',
    intro: `Spousta muzikantů ukládá své projekty a hudební tvorbu na externí disky. U většiny to běží tak, že skladby postupně ukládají na jeden disk a zároveň průběžně vypalují zálohy na DVD. Pokud je ale tvorba rozsáhlá a skladeb je hodně, může se stát, že jedno DVD nebude stačit. V takových případech dochází k tomu, že si člověk řekne: „To potom dodělám". Bohužel „potom" už nemusí nastat.

Michal Pavlíček patří k legendám české rockové scény. Je to kytarista, zpěvák a skladatel. Hrál například s kapelou Pražský výběr nebo s Michalem Prokopem. Spolupracoval i s Karlem Gottem nebo Lucií Bílou. V roce 2010 získal Cenu Anděl v kategorii kytarista roku.

Když se mu pokazily dva disky, které obsahovaly důležitou hudební tvorbu, nezbývalo mu nic jiného než hledat specialisty na záchranu dat. A tady přicházíme my – DataHelp.`
  },
  {
    slug: 'jak-jsme-obnovili-ztracene-vzpominky-herecky-a-daberky-kamily-sprachalove',
    intro: `Kamila Špráchalová je herečka a dabérka, kterou můžete znát například z dabingu seriálu Simpsonovi, kde propůjčuje hlas Líze Simpsonové. Má bohaté portfolio jak filmových, tak televizních rolí. Její disk obsahoval cenné vzpomínky v podobě fotografií a nahrávek, které měly pro ni velkou hodnotu.`
  },
  {
    slug: 'zachranili-jsme-data-stepance-hilgertove',
    intro: `Štěpánka Hilgertová je dvojnásobná olympijská vítězka ve vodním slalomu. K jejím největším úspěchům patří zlaté medaile z olympijských her v Atlantě 1996 a Athénách 2004. Je jednou z nejúspěšnějších českých sportovkyň všech dob.

Když se jí pokazil externí disk s 200 GB fotografií a videí, kontaktovala nás s žádostí o pomoc. Data potřebovala co nejrychleji, ideálně do 3 dnů.`
  }
];

for (const article of articles) {
  console.log(`⏳ Processing: ${article.slug}...`);

  const { data: post } = await supabase
    .from('blog_posts')
    .select('id, content_cs')
    .eq('slug', article.slug)
    .single();

  if (!post) {
    console.log(`   ⚠️  Article not found\n`);
    continue;
  }

  // Add intro only if content starts with ##
  if (!post.content_cs.trim().startsWith('##')) {
    console.log(`   ℹ️  Already has intro\n`);
    continue;
  }

  const newContent = article.intro + '\n\n' + post.content_cs;

  const { error } = await supabase
    .from('blog_posts')
    .update({
      content_cs: newContent
    })
    .eq('id', post.id);

  if (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
  } else {
    console.log(`   ✅ Added intro paragraphs\n`);
  }
}

console.log('🎉 All articles updated!');
