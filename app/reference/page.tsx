import { Metadata } from 'next';
import { ReferenceClient } from './ReferenceClient';
import { createStaticClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Reference – Spokojení zákazníci, hodnocení 4.9/5 | DataHelp.cz',
  description: 'Reference spokojených zákazníků DataHelp – úspěšné příběhy záchran dat pro firmy i jednotlivce. Hodnocení 4.9/5. Přečtěte si, co o nás píší klienti!',
  alternates: {
    canonical: 'https://www.datahelp.cz/reference',
  },
  openGraph: {
    title: 'Reference | DataHelp.cz',
    description: 'Reference spokojených zákazníků DataHelp – úspěšné příběhy záchran dat pro firmy i jednotlivce. Hodnocení 4.9/5.',
    url: 'https://www.datahelp.cz/reference',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

// Success stories slugs to fetch from DB
const SUCCESS_STORY_SLUGS = [
  'zachranili-jsme-data-stepance-hilgertove',
  'vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka',
  'jak-jsme-zachranovali-cenna-data-check-czech-fashion',
  'jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy',
  'jak-jsme-obnovili-ztracene-vzpominky-herecky-a-daberky-kamily-sprachalove',
];

// Static metadata for success stories (name, role, description)
const SUCCESS_STORY_META: Record<string, { name: string; role: string; description: string }> = {
  'zachranili-jsme-data-stepance-hilgertove': {
    name: 'Štěpánka Hilgertová',
    role: 'Olympijská vítězka',
    description: 'Záchrana 200 GB fotografií a videí z externího disku s přepsaným souborovým systémem za 3 dny.',
  },
  'vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka': {
    name: 'Michal Pavlíček',
    role: 'Legendární kytarista',
    description: 'Záchrana hudebních projektů ze dvou disků s kompletně poškozenou elektronikou.',
  },
  'jak-jsme-zachranovali-cenna-data-check-czech-fashion': {
    name: 'Check Czech Fashion',
    role: 'Módní portál',
    description: 'Záchrana 6 let práce – články, videa a fotografie z 1TB disku po havárii čtecí hlavy.',
  },
  'jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy': {
    name: 'Ondřej Pýcha',
    role: 'Fotograf',
    description: 'Úspěšná záchrana milionových fotografií z 3TB externího disku s nefunkčními čtecími hlavami.',
  },
  'jak-jsme-obnovili-ztracene-vzpominky-herecky-a-daberky-kamily-sprachalove': {
    name: 'Kamila Špráchalová',
    role: 'Herečka a dabérka',
    description: 'Obnova ztracených vzpomínek – fotografie a nahrávky ze smazaného disku s mechanickými vadami.',
  },
};

// ISR - revalidate every hour
export const revalidate = 3600;

async function getSuccessStories() {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, image_url')
      .in('slug', SUCCESS_STORY_SLUGS);

    if (error) {
      console.error('Error fetching success stories:', error);
      return [];
    }

    // Map DB data with static metadata, maintain order
    return SUCCESS_STORY_SLUGS.map((slug) => {
      const dbPost = data?.find((p) => p.slug === slug);
      const meta = SUCCESS_STORY_META[slug];
      return {
        name: meta?.name || '',
        role: meta?.role || '',
        description: meta?.description || '',
        image: dbPost?.image_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
        url: `/clanky/${slug}`,
      };
    });
  } catch (error) {
    console.error('Error in getSuccessStories:', error);
    return [];
  }
}

export default async function ReferencePage() {
  const successStories = await getSuccessStories();
  return <ReferenceClient successStories={successStories} />;
}
