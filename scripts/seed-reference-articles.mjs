#!/usr/bin/env node

/**
 * Seed script pro vložení 5 referenčních článků do Supabase
 * Použití: node scripts/seed-reference-articles.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Načíst .env.local
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
  console.error('❌ Chybí Supabase credentials v .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Spouštím seed pro referenční články...\n');

// Články přímo v JavaScriptu
const articles = [
  {
    slug: 'jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy',
    title_cs: 'Jak jsme zachraňovali milionové fotografie Ondřeje Pýchy',
    title_en: "How we recovered Ondřej Pýcha's million-dollar photos",
    excerpt_cs: 'Úspěšná záchrana milionových fotografií z 3TB externího disku s nefunkčními čtecími hlavami.',
    excerpt_en: 'Successful recovery of million-dollar photos from 3TB external disk with non-functioning read heads.',
    content_cs: `<h2>Případ: Záchrana fotografií Ondřeje Pýchy</h2>
<p>Ondřej Pýcha je fotograf pracující se známými osobnostmi ze showbyznysu a sportu. Jeho cenná sbírka fotografií se ocitla "uvězněna na nefunkčním disku" a urgentně potřeboval přístup k těmto datům.</p>
<h3>Typ poškozeného zařízení</h3>
<ul>
<li>3TB externí mechanický plotnový disk značky Seagate</li>
<li>Formát 3,5"</li>
<li>Výrobce má vysokou reklamační sazbu (60 %)</li>
</ul>
<h3>Identifikované problémy</h3>
<ul>
<li>Nefunkční čtecí hlavy</li>
<li>Poškozené plotny</li>
<li>Disk se přestal načítat</li>
</ul>
<h3>Příčina selhání</h3>
<p>Výrobní defekt – vadné součástky a nevhodné nastavení hardwaru v továrně. Nefunkční hlavy následně fyzicky poškodily povrch datových ploten.</p>
<h3>Proces záchrany</h3>
<p>Naši technici postupně:</p>
<ol>
<li>Demontovali plotny v čistém prostředí</li>
<li>Čtli data ze servisní stopy</li>
<li>Rekonstruovali souborový systém</li>
<li>Obnovili všechny fotografie</li>
</ol>
<h3>Výsledek</h3>
<p>Podařilo se nám zachránit 100 % dat včetně všech fotografií. Ondřej Pýcha byl nadšený a mohl pokračovat v práci na svých projektech.</p>`,
    content_en: `<h2>Case: Recovery of Ondřej Pýcha's photographs</h2>
<p>Ondřej Pýcha is a photographer working with well-known personalities from showbusiness and sports. His valuable photo collection was "imprisoned on a non-functional disk" and he urgently needed access to this data.</p>
<h3>Type of damaged device</h3>
<ul>
<li>3TB external mechanical hard drive by Seagate</li>
<li>3.5" format</li>
<li>Manufacturer has high return rate (60%)</li>
</ul>
<h3>Identified problems</h3>
<ul>
<li>Non-functional read heads</li>
<li>Damaged platters</li>
<li>Disk stopped loading</li>
</ul>
<h3>Cause of failure</h3>
<p>Manufacturing defect – faulty components and improper hardware settings at the factory. Non-functional heads subsequently physically damaged the surface of data platters.</p>
<h3>Recovery process</h3>
<p>Our technicians gradually:</p>
<ol>
<li>Dismantled platters in clean environment</li>
<li>Read data from service track</li>
<li>Reconstructed file system</li>
<li>Recovered all photographs</li>
</ol>
<h3>Result</h3>
<p>We managed to recover 100% of data including all photographs. Ondřej Pýcha was thrilled and could continue working on his projects.</p>`,
    image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80',
    author: 'DataHelp Team',
    published_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    reading_time_minutes: 5,
    view_count: 0
  },
  {
    slug: 'jak-jsme-zachranovali-cenna-data-check-czech-fashion',
    title_cs: 'Jak jsme zachraňovali cenná data Check Czech Fashion',
    title_en: 'How we recovered valuable data from Check Czech Fashion',
    excerpt_cs: 'Záchrana 6 let práce – články, videa a fotografie z 1TB disku po havárii čtecí hlavy.',
    excerpt_en: '6 years of work recovered – articles, videos and photos from 1TB disk after read head failure.',
    content_cs: `<h2>Případ: Check Czech Fashion</h2>
<p>Módní portál Check Czech Fashion ztratil přístup k 6 letům práce – stovky článků, videa a fotografie z módních přehlídek.</p>
<h3>Typ poškození</h3>
<ul>
<li>1TB mechanický disk Western Digital</li>
<li>Havárie čtecí hlavy</li>
<li>Poškozený souborový systém</li>
</ul>
<h3>Proces záchrany</h3>
<p>Náš tým provedl:</p>
<ol>
<li>Výměnu čtecích hlav v čistém boxu</li>
<li>Sektorové čtení všech dat</li>
<li>Rekonstrukci databáze</li>
<li>Obnovu všech článků a médií</li>
</ol>
<h3>Výsledek</h3>
<p>Zachránili jsme 98 % všech dat. Portál mohl pokračovat v provozu bez ztráty obsahu.</p>`,
    content_en: `<h2>Case: Check Czech Fashion</h2>
<p>Fashion portal Check Czech Fashion lost access to 6 years of work – hundreds of articles, videos and photos from fashion shows.</p>
<h3>Type of damage</h3>
<ul>
<li>1TB mechanical disk Western Digital</li>
<li>Read head crash</li>
<li>Damaged file system</li>
</ul>
<h3>Recovery process</h3>
<p>Our team performed:</p>
<ol>
<li>Read head replacement in clean box</li>
<li>Sector-by-sector data reading</li>
<li>Database reconstruction</li>
<li>Recovery of all articles and media</li>
</ol>
<h3>Result</h3>
<p>We recovered 98% of all data. The portal could continue operating without content loss.</p>`,
    image_url: 'https://images.unsplash.com/photo-1558394043-d7e93d0072da?w=600&q=80',
    author: 'DataHelp Team',
    published_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    reading_time_minutes: 4,
    view_count: 0
  },
  {
    slug: 'vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka',
    title_cs: 'Vykouzlili jsme úsměv na tváři mága rockové kytary Michala Pavlíčka',
    title_en: "We brought a smile to rock guitar master Michal Pavlíček's face",
    excerpt_cs: 'Záchrana hudebních projektů ze dvou disků s kompletně poškozenou elektronikou.',
    excerpt_en: 'Recovery of music projects from two disks with completely damaged electronics.',
    content_cs: `<h2>Případ: Michal Pavlíček</h2>
<p>Legendární kytarista Michal Pavlíček přišel o přístup ke svým hudebním projektům uloženým na dvou externích discích.</p>
<h3>Typ poškození</h3>
<ul>
<li>Dva externí disky 2TB</li>
<li>Kompletně poškozená elektronika</li>
<li>Přepětí v síti</li>
</ul>
<h3>Proces záchrany</h3>
<p>Provedli jsme:</p>
<ol>
<li>Výměnu elektroniky obou disků</li>
<li>Diagnostiku ploten</li>
<li>Kompletní extrakci dat</li>
<li>Rekonstrukci hudebních projektů</li>
</ol>
<h3>Výsledek</h3>
<p>Zachránili jsme 100 % hudebních projektů. Michal Pavlíček mohl pokračovat v práci na svých skladbách.</p>`,
    content_en: `<h2>Case: Michal Pavlíček</h2>
<p>Legendary guitarist Michal Pavlíček lost access to his music projects stored on two external disks.</p>
<h3>Type of damage</h3>
<ul>
<li>Two 2TB external disks</li>
<li>Completely damaged electronics</li>
<li>Power surge</li>
</ul>
<h3>Recovery process</h3>
<p>We performed:</p>
<ol>
<li>Electronics replacement on both disks</li>
<li>Platter diagnostics</li>
<li>Complete data extraction</li>
<li>Music project reconstruction</li>
</ol>
<h3>Result</h3>
<p>We recovered 100% of music projects. Michal Pavlíček could continue working on his compositions.</p>`,
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
    author: 'DataHelp Team',
    published_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    reading_time_minutes: 5,
    view_count: 0
  },
  {
    slug: 'jak-jsme-obnovili-ztracene-vzpominky-herecky-a-daberky-kamily-sprachalove',
    title_cs: 'Jak jsme obnovili ztracené vzpomínky herečky a dabérky Kamily Špráchalové',
    title_en: 'How we restored lost memories of actress and voice actress Kamila Špráchalová',
    excerpt_cs: 'Obnova ztracených vzpomínek – fotografie a nahrávky ze smazaného disku s mechanickými vadami.',
    excerpt_en: 'Recovery of lost memories – photos and recordings from deleted disk with mechanical defects.',
    content_cs: `<h2>Případ: Kamila Špráchalová</h2>
<p>Kamila Špráchalová, známá jako hlas Fiony ze Shreka, omylem smazala cenné vzpomínky z vadného disku.</p>
<h3>Typ poškození</h3>
<ul>
<li>Externí disk 1TB</li>
<li>Omylem smazaná data</li>
<li>Mechanické vady disku</li>
</ul>
<h3>Proces záchrany</h3>
<p>Naše řešení:</p>
<ol>
<li>Oprava mechanických vad</li>
<li>Hluboké skenování disku</li>
<li>Rekonstrukce smazaných souborů</li>
<li>Obnova fotografií a nahrávek</li>
</ol>
<h3>Výsledek</h3>
<p>Obnovili jsme 95 % fotografií a všechny audio nahrávky. Vzpomínky byly zachráněny.</p>`,
    content_en: `<h2>Case: Kamila Špráchalová</h2>
<p>Kamila Špráchalová, known as the voice of Fiona from Shrek, accidentally deleted precious memories from a faulty disk.</p>
<h3>Type of damage</h3>
<ul>
<li>1TB external disk</li>
<li>Accidentally deleted data</li>
<li>Mechanical disk defects</li>
</ul>
<h3>Recovery process</h3>
<p>Our solution:</p>
<ol>
<li>Mechanical defect repair</li>
<li>Deep disk scanning</li>
<li>Deleted file reconstruction</li>
<li>Photo and recording recovery</li>
</ol>
<h3>Result</h3>
<p>We recovered 95% of photos and all audio recordings. Memories were saved.</p>`,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    author: 'DataHelp Team',
    published_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    reading_time_minutes: 4,
    view_count: 0
  },
  {
    slug: 'zachranili-jsme-data-stepance-hilgertove',
    title_cs: 'Zachránili jsme data Štěpánce Hilgertové',
    title_en: 'We recovered data for Štěpánka Hilgertová',
    excerpt_cs: 'Záchrana 200 GB fotografií a videí z externího disku s přepsaným souborovým systémem za 3 dny.',
    excerpt_en: '200 GB of photos and videos recovered from external disk with overwritten file system in 3 days.',
    content_cs: `<h2>Případ: Štěpánka Hilgertová</h2>
<p>Dvojnásobná olympijská vítězka Štěpánka Hilgertová ztratila 200 GB fotografií a videí po přeformátování disku.</p>
<h3>Typ poškození</h3>
<ul>
<li>Externí disk 500GB</li>
<li>Přepsaný souborový systém</li>
<li>Urgentní záchrana za 3 dny</li>
</ul>
<h3>Proces záchrany</h3>
<p>Expresní řešení:</p>
<ol>
<li>Prioritní zpracování</li>
<li>Rekonstrukce souborového systému</li>
<li>Obnova všech fotografií</li>
<li>Dodání dat za 3 dny</li>
</ol>
<h3>Výsledek</h3>
<p>Zachránili jsme 200 GB dat včetně všech fotografií a videí. Štěpánka byla nadšená rychlostí a kvalitou práce.</p>`,
    content_en: `<h2>Case: Štěpánka Hilgertová</h2>
<p>Two-time Olympic champion Štěpánka Hilgertová lost 200 GB of photos and videos after disk reformatting.</p>
<h3>Type of damage</h3>
<ul>
<li>500GB external disk</li>
<li>Overwritten file system</li>
<li>Urgent 3-day recovery</li>
</ul>
<h3>Recovery process</h3>
<p>Express solution:</p>
<ol>
<li>Priority processing</li>
<li>File system reconstruction</li>
<li>Photo recovery</li>
<li>Data delivery in 3 days</li>
</ol>
<h3>Result</h3>
<p>We recovered 200 GB of data including all photos and videos. Štěpánka was thrilled with the speed and quality of work.</p>`,
    image_url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&q=80',
    author: 'DataHelp Team',
    published_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    reading_time_minutes: 4,
    view_count: 0
  }
];

console.log(`📝 Připraveno ${articles.length} článků k vložení\n`);

// Vložit články do Supabase
for (const article of articles) {
  console.log(`⏳ Vkládám: ${article.title_cs}...`);

  // Zkontrolovat, zda článek již existuje
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, slug')
    .eq('slug', article.slug)
    .single();

  if (existing) {
    console.log(`   ⚠️  Článek již existuje, přeskakuji\n`);
    continue;
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([article])
    .select();

  if (error) {
    console.error(`   ❌ Chyba: ${error.message}\n`);
  } else {
    console.log(`   ✅ Vloženo s ID: ${data[0].id}\n`);
  }
}

console.log('🎉 Seed dokončen!');
console.log('\n📍 Ověřte na: http://localhost:3000/reference');
console.log('📍 Nebo zkuste: http://localhost:3000/clanky/jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy');
