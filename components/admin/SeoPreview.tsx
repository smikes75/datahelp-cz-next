'use client';

/**
 * SEO Preview komponenta
 * Zobrazuje jak bude clanek vypadat ve vyhledavacich vysledcich Google
 */

import { Search, AlertCircle, Check } from 'lucide-react';

interface SeoPreviewProps {
  title: string;
  description: string;
  slug: string;
  baseUrl?: string;
}

export default function SeoPreview({
  title,
  description,
  slug,
  baseUrl = 'https://www.datahelp.cz'
}: SeoPreviewProps) {
  const url = `${baseUrl}/clanky/${slug}`;

  // SEO limits
  const titleLimit = 60;
  const descLimit = 160;

  const titleLength = title.length;
  const descLength = description.length;

  const titleOk = titleLength > 0 && titleLength <= titleLimit;
  const descOk = descLength > 0 && descLength <= descLimit;

  // Truncate for preview (Google truncates at ~60 chars for title, ~155 for desc)
  const displayTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const displayDesc = description.length > 155 ? description.substring(0, 152) + '...' : description;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Search className="h-4 w-4" />
        SEO Nahled
      </div>

      {/* Google Search Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="text-xs text-gray-500 mb-1">Nahled ve vyhledavani Google</div>

        {/* URL */}
        <div className="text-sm text-green-700 truncate">
          {url || 'https://www.datahelp.cz/clanky/...'}
        </div>

        {/* Title */}
        <div className="text-xl text-blue-700 hover:underline cursor-pointer truncate">
          {displayTitle || 'Titulek clanku'}
        </div>

        {/* Description */}
        <div className="text-sm text-gray-600 line-clamp-2">
          {displayDesc || 'Popis clanku pro vyhledavace...'}
        </div>
      </div>

      {/* SEO Stats */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {/* Title length */}
        <div className={`flex items-center gap-2 p-2 rounded ${
          titleOk ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
        }`}>
          {titleOk ? (
            <Check className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span>
            Titulek: {titleLength}/{titleLimit}
          </span>
        </div>

        {/* Description length */}
        <div className={`flex items-center gap-2 p-2 rounded ${
          descOk ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
        }`}>
          {descOk ? (
            <Check className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span>
            Popis: {descLength}/{descLimit}
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="text-xs text-gray-500 space-y-1">
        {titleLength === 0 && (
          <p>• Zadejte titulek clanku</p>
        )}
        {titleLength > titleLimit && (
          <p>• Titulek je prilis dlouhy, Google ho zkrati</p>
        )}
        {descLength === 0 && (
          <p>• Zadejte popis (excerpt) pro lepsi SEO</p>
        )}
        {descLength > descLimit && (
          <p>• Popis je prilis dlouhy, Google ho zkrati</p>
        )}
        {titleOk && descOk && (
          <p className="text-green-600">• SEO parametry jsou v poradku</p>
        )}
      </div>
    </div>
  );
}
