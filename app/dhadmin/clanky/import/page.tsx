'use client';

/**
 * Admin - Hromadny import clanku z JSON
 * Umoznuje nahrat JSON soubor s vice clanky najednou
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileJson, Check, X, AlertCircle, Download } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ImportArticle {
  title_cs: string;
  slug?: string;
  excerpt_cs?: string;
  content_cs: string;
  author?: string;
  image_url?: string;
  is_published?: boolean;
  published_at?: string;
  categories?: string[]; // slugy kategorii
}

interface ImportResult {
  slug: string;
  title: string;
  status: 'success' | 'error' | 'skipped';
  message: string;
}

interface Category {
  id: string;
  slug: string;
  name_cs: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Example JSON template
const exampleJson = `[
  {
    "title_cs": "Jak správně zálohovat data",
    "slug": "jak-spravne-zalohovat-data",
    "excerpt_cs": "Naučte se základy správného zálohování dat.",
    "content_cs": "## Úvod\\n\\nZálohování dat je důležité...",
    "author": "DataHelp Team",
    "is_published": false,
    "categories": ["zalohovani-dat", "prvni-pomoc"]
  },
  {
    "title_cs": "Druhý článek",
    "content_cs": "Obsah druhého článku..."
  }
]`;

export default function ImportArticlesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [jsonInput, setJsonInput] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedArticles, setParsedArticles] = useState<ImportArticle[]>([]);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [skipExisting, setSkipExisting] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check auth
  useEffect(() => {
    const saved = sessionStorage.getItem('dhadmin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Fetch categories
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchCategories();
  }, [isAuthenticated]);

  const fetchCategories = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, slug, name_cs')
        .order('name_cs');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Parse JSON input
  const parseJson = (json: string) => {
    setParseError(null);
    setParsedArticles([]);
    setResults([]);

    if (!json.trim()) {
      return;
    }

    try {
      const parsed = JSON.parse(json);

      if (!Array.isArray(parsed)) {
        setParseError('JSON musí být pole článků (začínat [ a končit ])');
        return;
      }

      // Validate each article
      const validArticles: ImportArticle[] = [];
      const errors: string[] = [];

      parsed.forEach((article, index) => {
        if (!article.title_cs) {
          errors.push(`Článek #${index + 1}: chybí title_cs`);
          return;
        }
        if (!article.content_cs) {
          errors.push(`Článek #${index + 1}: chybí content_cs`);
          return;
        }

        validArticles.push({
          title_cs: article.title_cs,
          slug: article.slug || slugify(article.title_cs),
          excerpt_cs: article.excerpt_cs || '',
          content_cs: article.content_cs,
          author: article.author || 'DataHelp Team',
          image_url: article.image_url || '',
          is_published: article.is_published ?? false,
          published_at: article.published_at || new Date().toISOString().split('T')[0],
          categories: article.categories || []
        });
      });

      if (errors.length > 0) {
        setParseError(errors.join('\n'));
      }

      setParsedArticles(validArticles);
    } catch (e) {
      setParseError(`Neplatný JSON: ${(e as Error).message}`);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonInput(content);
      parseJson(content);
    };
    reader.readAsText(file);
  };

  // Import articles
  const handleImport = async () => {
    if (parsedArticles.length === 0) return;

    setImporting(true);
    setResults([]);

    const supabase = createClient();
    const importResults: ImportResult[] = [];

    for (const article of parsedArticles) {
      try {
        // Check if slug exists
        const { data: existing } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', article.slug)
          .maybeSingle();

        if (existing) {
          if (skipExisting) {
            importResults.push({
              slug: article.slug!,
              title: article.title_cs,
              status: 'skipped',
              message: 'Článek s tímto slug již existuje'
            });
            continue;
          } else {
            // Update existing
            const { error } = await supabase
              .from('blog_posts')
              .update({
                title_cs: article.title_cs,
                title_en: article.title_cs,
                excerpt_cs: article.excerpt_cs,
                excerpt_en: article.excerpt_cs,
                content_cs: article.content_cs,
                content_en: article.content_cs,
                author: article.author,
                image_url: article.image_url || null,
                is_published: article.is_published,
                published_at: article.is_published ? article.published_at : null
              })
              .eq('id', existing.id);

            if (error) throw error;

            importResults.push({
              slug: article.slug!,
              title: article.title_cs,
              status: 'success',
              message: 'Aktualizováno'
            });
            continue;
          }
        }

        // Create new article
        const { data: post, error: postError } = await supabase
          .from('blog_posts')
          .insert({
            slug: article.slug,
            title_cs: article.title_cs,
            title_en: article.title_cs,
            excerpt_cs: article.excerpt_cs,
            excerpt_en: article.excerpt_cs,
            content_cs: article.content_cs,
            content_en: article.content_cs,
            author: article.author,
            image_url: article.image_url || null,
            is_published: article.is_published,
            published_at: article.is_published ? article.published_at : null,
            reading_time_minutes: Math.max(1, Math.ceil(article.content_cs.split(/\s+/).length / 200)),
            view_count: 0
          })
          .select('id')
          .single();

        if (postError) throw postError;

        // Add categories
        if (article.categories && article.categories.length > 0) {
          const categoryIds = article.categories
            .map(slug => categories.find(c => c.slug === slug)?.id)
            .filter(Boolean);

          if (categoryIds.length > 0) {
            await supabase
              .from('blog_post_categories')
              .insert(categoryIds.map(catId => ({
                post_id: post.id,
                category_id: catId
              })));
          }
        }

        importResults.push({
          slug: article.slug!,
          title: article.title_cs,
          status: 'success',
          message: 'Vytvořeno'
        });

      } catch (error) {
        importResults.push({
          slug: article.slug || 'unknown',
          title: article.title_cs,
          status: 'error',
          message: (error as Error).message
        });
      }
    }

    setResults(importResults);
    setImporting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Nejste prihlaseni</p>
          <Link href="/dhadmin" className="text-primary hover:underline">
            Prejit na prihlaseni
          </Link>
        </div>
      </div>
    );
  }

  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  const skippedCount = results.filter(r => r.status === 'skipped').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link href="/dhadmin/clanky" className="text-white/80 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Import clanku z JSON</h1>
              <p className="text-white/70 text-sm">Hromadny import vice clanku najednou</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            {/* File upload */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Nahrat JSON soubor
              </h3>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors"
              >
                <FileJson className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <span className="text-gray-600">Kliknete pro vyber .json souboru</span>
              </button>
            </div>

            {/* JSON textarea */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Nebo vlozit JSON rucne</h3>
              <textarea
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  parseJson(e.target.value);
                }}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder={exampleJson}
              />

              {parseError && (
                <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm whitespace-pre-wrap">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  {parseError}
                </div>
              )}
            </div>

            {/* Example template */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Format JSON</h4>
              <p className="text-sm text-blue-700 mb-2">
                Pole objektu s temito poli:
              </p>
              <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                <li><code>title_cs</code> - titulek (povinne)</li>
                <li><code>content_cs</code> - obsah v Markdown (povinne)</li>
                <li><code>slug</code> - URL slug (volitelne, generuje se z titulku)</li>
                <li><code>excerpt_cs</code> - kratky popis</li>
                <li><code>author</code> - autor</li>
                <li><code>image_url</code> - URL obrazku</li>
                <li><code>is_published</code> - true/false</li>
                <li><code>categories</code> - pole slug kategorii</li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  setJsonInput(exampleJson);
                  parseJson(exampleJson);
                }}
                className="mt-3 text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Vlozit priklad
              </button>
            </div>
          </div>

          {/* Right: Preview & Results */}
          <div className="space-y-6">
            {/* Import options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Moznosti importu</h3>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={skipExisting}
                  onChange={(e) => setSkipExisting(e.target.checked)}
                  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-gray-700">Preskocit existujici clanky (podle slug)</span>
              </label>
              <p className="text-sm text-gray-500 mt-1 ml-8">
                {skipExisting
                  ? 'Clanky se stejnym slug budou ignorovany'
                  : 'Clanky se stejnym slug budou aktualizovany'}
              </p>
            </div>

            {/* Parsed articles preview */}
            {parsedArticles.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Nacteno {parsedArticles.length} clanku
                  </h3>
                  <button
                    type="button"
                    onClick={handleImport}
                    disabled={importing}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {importing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Importuji...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Importovat
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-auto">
                  {parsedArticles.map((article, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <FileJson className="h-4 w-4 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{article.title_cs}</p>
                        <p className="text-xs text-gray-500">/clanky/{article.slug}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        article.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {article.is_published ? 'Publikovat' : 'Draft'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Import results */}
            {results.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Vysledky importu</h3>

                {/* Summary */}
                <div className="flex gap-4 mb-4">
                  {successCount > 0 && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Check className="h-4 w-4" /> {successCount} uspesne
                    </span>
                  )}
                  {skippedCount > 0 && (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <AlertCircle className="h-4 w-4" /> {skippedCount} preskoceno
                    </span>
                  )}
                  {errorCount > 0 && (
                    <span className="flex items-center gap-1 text-red-600">
                      <X className="h-4 w-4" /> {errorCount} chyb
                    </span>
                  )}
                </div>

                <div className="space-y-2 max-h-64 overflow-auto">
                  {results.map((result, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-2 rounded ${
                        result.status === 'success' ? 'bg-green-50' :
                        result.status === 'skipped' ? 'bg-yellow-50' :
                        'bg-red-50'
                      }`}
                    >
                      {result.status === 'success' ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : result.status === 'skipped' ? (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <X className="h-4 w-4 text-red-600" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{result.title}</p>
                        <p className="text-xs text-gray-500">{result.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available categories */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Dostupne kategorie</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <code key={cat.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {cat.slug}
                  </code>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Pouzijte tyto slug hodnoty v poli "categories"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
