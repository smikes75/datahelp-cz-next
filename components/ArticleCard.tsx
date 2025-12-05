'use client';

/**
 * ArticleCard komponenta pro zobrazení náhledu blogového článku
 */

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
  locale?: string;
}

export function ArticleCard({
  title,
  excerpt,
  imageUrl,
  slug,
}: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[4/3] bg-gray-300 rounded-t-lg overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>

        <Link
          href={`/clanky/${slug}`}
          className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors"
        >
          Zjistit více
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
