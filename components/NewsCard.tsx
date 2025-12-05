'use client';

/**
 * NewsCard komponenta pro zobrazení krátkých novinek BEZ obrázku
 * Použito pro kategorii "Novinky" - krátké textové zprávy
 */

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

interface NewsCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date?: string;
}

export function NewsCard({
  title,
  excerpt,
  slug,
  date,
}: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-primary">
      <div className="flex flex-col h-full">
        {date && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar size={14} />
            <span>{new Date(date).toLocaleDateString('cs-CZ')}</span>
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {excerpt}
        </p>

        <Link
          href={`/clanky/${slug}`}
          className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors mt-auto"
        >
          Zjistit více
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
