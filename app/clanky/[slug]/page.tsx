/**
 * Blog detail stránka s ISR (Incremental Static Regeneration)
 * Regenerace každou hodinu
 */

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, ArrowLeft } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/utils/blog';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleSchema } from '@/components/schema/ArticleSchema';
import { Metadata } from 'next';
import { marked } from 'marked';

// ISR - revalidace každou hodinu (3600 sekund)
export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generovat statické cesty pro články při buildu
export async function generateStaticParams() {
  const posts = await getBlogPosts('cs');
  // Vrátit prvních 100 článků
  return posts.slice(0, 100).map((post) => ({
    slug: post.slug,
  }));
}

// Dynamická metadata pro SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = 'cs'; // Default locale
  const post = await getBlogPost(resolvedParams.slug, locale);

  if (!post) {
    return {
      title: 'Článek nenalezen | DataHelp.cz',
    };
  }

  return {
    title: `${post.title} | DataHelp.cz Blog`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    alternates: {
      canonical: `https://www.datahelp.cz/clanky/${resolvedParams.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const locale = 'cs'; // Default locale
  const post = await getBlogPost(resolvedParams.slug, locale);

  if (!post) {
    notFound();
  }

  // Formátovat datum
  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Parse Markdown content to HTML
  const htmlContent = await marked(post.content);

  // Build breadcrumbs based on categories
  const breadcrumbs = [
    { name: 'Domů', path: '/' },
    { name: 'Magazín', path: '/clanky' }
  ];

  // Check if post is in "novinky" category
  const isNews = post.categories?.some(cat => cat.slug === 'novinky');
  if (isNews) {
    breadcrumbs.push({ name: 'Novinky', path: '/clanky?category=novinky' });
  }

  breadcrumbs.push({ name: post.title, path: `/clanky/${post.slug}` });

  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        author={post.author}
        image={post.coverImage}
        url={`https://www.datahelp.cz/clanky/${post.slug}`}
      />
      <Breadcrumbs customItems={breadcrumbs} />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/clanky"
            className="inline-flex items-center text-primary hover:text-accent transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zpět na blog
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/reference"
            className="inline-flex items-center text-primary hover:text-accent transition-colors font-medium"
          >
            Naše reference
          </Link>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[400px] rounded-lg shadow-lg mb-8 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formattedDate}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary hover:prose-a:text-accent prose-strong:text-gray-900 prose-img:rounded-lg [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4 [&>ul>li]:mb-2 [&>ol>li]:mb-2"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Štítky:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
