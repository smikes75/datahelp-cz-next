import { MetadataRoute } from 'next';
import { createStaticClient } from '@/lib/supabase/server';
import { getKrajskaMesta } from '@/mesta';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.datahelp.cz';
  const currentDate = new Date();

  // Static pages with priority and changefreq
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Main services
    {
      url: `${baseUrl}/zachrana-dat`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zachrana-dat/hdd`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zachrana-dat/ssd`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zachrana-dat/raid`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zachrana-dat/mobilni-telefon`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zachrana-dat/firmy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Case studies
    {
      url: `${baseUrl}/zachrana-dat/hdd/pripady`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/zachrana-dat/ssd/pripady`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/zachrana-dat/raid/pripady`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Info pages - Pricing
    {
      url: `${baseUrl}/cenik-zachrany-dat`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cenik-zachrany-dat/hdd`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cenik-zachrany-dat/ssd`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cenik-zachrany-dat/flash`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cenik-zachrany-dat/mobil`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cenik-zachrany-dat/nas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cenik-zachrany-dat/raid`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cenik-zachrany-dat/sluzby`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kalkulacka`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/technologie`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reference`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/caste-dotazy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/poptavka-zachrany-dat`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partnersky-program`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/partneri`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Legal pages
    {
      url: `${baseUrl}/obchodni-podminky`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ochrana-osobnich-udaju`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/informace-o-cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Blog index
    {
      url: `${baseUrl}/clanky`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // City landing pages (14 regional capitals)
  const krajskaMesta = getKrajskaMesta();
  const cityPages: MetadataRoute.Sitemap = krajskaMesta.map((mesto) => ({
    url: `${baseUrl}/zachrana-dat/${mesto.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fetch blog posts from Supabase with timeout
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const supabase = createStaticClient();

    // Create a timeout promise (5 seconds)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Supabase query timeout')), 5000);
    });

    // Race between the query and timeout
    const now = new Date().toISOString();
    const { data: posts, error } = await Promise.race([
      supabase
        .from('blog_posts')
        .select('slug, updated_at, created_at')
        .eq('is_published', true)
        .lte('published_at', now)
        .order('created_at', { ascending: false }),
      timeoutPromise,
    ]);

    if (error) {
      console.error('Supabase error fetching blog posts for sitemap:', error.message);
    } else if (posts) {
      blogPosts = posts.map((post) => ({
        url: `${baseUrl}/clanky/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    // Log error but continue - sitemap should always return static pages at minimum
    console.error('Error fetching blog posts for sitemap:', error instanceof Error ? error.message : 'Unknown error');
  }

  return [...staticPages, ...cityPages, ...blogPosts];
}
