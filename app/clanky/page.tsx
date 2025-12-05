/**
 * Blog stránka - seznam článků
 * Server Component s ISR
 */

import { ArticleCard } from '@/components/ArticleCard';
import { NewsCard } from '@/components/NewsCard';
import { PageHeader } from '@/components/PageHeader';
import { getPaginatedBlogPosts } from '@/lib/utils/blog';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Pagination } from '@/components/Pagination';
import { Metadata } from 'next';

// ISR - revalidace každou hodinu
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Magazín | DataHelp.cz',
  description: 'Odborné články, novinky a tipy ze světa záchrany dat. Zálohování, první pomoc, technologie.',
  alternates: {
    canonical: 'https://www.datahelp.cz/clanky',
  },
  openGraph: {
    title: 'Magazín | DataHelp.cz',
    description: 'Odborné články, novinky a tipy ze světa záchrany dat. Zálohování, první pomoc, technologie.',
    url: 'https://www.datahelp.cz/clanky',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
  params: Promise<{
    locale: string;
  }>;
}

export default async function BlogPage({ searchParams, params }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const currentPage = parseInt(resolvedSearchParams.page || '1');
  const category = resolvedSearchParams.category;
  const articlesPerPage = 20;

  const result = await getPaginatedBlogPosts({
    category: category && category !== 'all' ? category : undefined,
    page: currentPage,
    limit: articlesPerPage,
    locale: resolvedParams.locale
  });

  const categories = [
    { id: 'all', name: 'Vše' },
    { id: 'zalohovani-dat', name: 'Zálohování dat' },
    { id: 'prvni-pomoc', name: 'První pomoc' },
    { id: 'technologie', name: 'Technologie' },
    { id: 'nase-aktivity', name: 'Naše aktivity' },
    { id: 'novinky', name: 'Novinky' }
  ];

  const activeCategory = category || 'all';

  // Custom breadcrumbs pro kategorie
  const getBreadcrumbs = () => {
    const baseBreadcrumbs = [
      { name: 'Domů', path: '/' },
      { name: 'Magazín', path: '/clanky' }
    ];

    if (category && category !== 'all') {
      const categoryName = categories.find(c => c.id === category)?.name || category;
      baseBreadcrumbs.push({ name: categoryName, path: `/clanky?category=${category}` });
    }

    return baseBreadcrumbs;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Blog"
        subtitle="Odborné články, průvodce a novinky z oblasti záchrany dat"
        backgroundImage="services-bg.webp"
      />
      <Breadcrumbs customItems={getBreadcrumbs()} />

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex gap-3 flex-wrap mb-8">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/clanky${cat.id !== 'all' ? `?category=${cat.id}` : ''}`}
                className={`px-6 py-2 rounded-lg border-2 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-primary border-primary hover:bg-primary/5'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          {result.posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Žádné články nenalezeny</p>
            </div>
          ) : (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.posts.map((article) => (
                  category === 'novinky' ? (
                    <NewsCard
                      key={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      slug={article.slug}
                      date={article.date}
                    />
                  ) : (
                    <ArticleCard
                      key={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      imageUrl={article.coverImage}
                      slug={article.slug}
                      locale={resolvedParams.locale}
                    />
                  )
                ))}
              </div>

              {/* Pagination */}
              {result.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={result.totalPages}
                  baseUrl={category ? `/clanky?category=${category}` : '/clanky'}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
