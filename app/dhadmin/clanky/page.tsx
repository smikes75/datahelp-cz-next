'use client';

/**
 * Admin - Seznam clanku
 * Zobrazuje vsechny clanky s moznosti filtrovani podle kategorii a editace
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, ExternalLink, Search, FileJson, Tag, Star, ChevronDown, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface BlogPost {
  id: string;
  slug: string;
  title_cs: string;
  excerpt_cs: string;
  is_published: boolean;
  published_at: string;
  view_count: number;
  author: string;
  created_at: string;
  is_pillar?: boolean;
  parent_slug?: string;
}

interface Category {
  id: string;
  slug: string;
  name_cs: string;
}

interface ArticleCategory {
  post_id: string;
  category_id: string;
}

export default function ArticlesListPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [articleCategories, setArticleCategories] = useState<ArticleCategory[]>([]);
  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all',
    search: ''
  });
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [savingCategory, setSavingCategory] = useState(false);

  // Check auth
  useEffect(() => {
    const saved = sessionStorage.getItem('dhadmin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Fetch articles
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchArticles();
    fetchCategories();
    fetchArticleCategories();
  }, [isAuthenticated]);

  const fetchArticles = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title_cs, excerpt_cs, is_published, published_at, view_count, author, created_at, is_pillar, parent_slug')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

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

  const fetchArticleCategories = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_post_categories')
        .select('post_id, category_id');

      if (error) throw error;
      setArticleCategories(data || []);
    } catch (error) {
      console.error('Error fetching article categories:', error);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Opravdu chcete smazat clanek "${title}"?`)) return;

    setDeleting(id);
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-auth': 'dhadmin'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Chyba pri mazani');
      }

      fetchArticles();
      fetchArticleCategories();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Chyba pri mazani clanku: ' + (error as Error).message);
    } finally {
      setDeleting(null);
    }
  };

  // Get categories for an article
  const getArticleCategories = (articleId: string): Category[] => {
    const catIds = articleCategories
      .filter(ac => ac.post_id === articleId)
      .map(ac => ac.category_id);
    return categories.filter(c => catIds.includes(c.id));
  };

  // Update article categories
  const handleCategoryChange = async (articleId: string, categoryIds: string[]) => {
    setSavingCategory(true);
    try {
      const supabase = createClient();

      // Delete existing categories
      await supabase
        .from('blog_post_categories')
        .delete()
        .eq('post_id', articleId);

      // Insert new categories
      if (categoryIds.length > 0) {
        await supabase
          .from('blog_post_categories')
          .insert(categoryIds.map(catId => ({
            post_id: articleId,
            category_id: catId
          })));
      }

      await fetchArticleCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating categories:', error);
      alert('Chyba pri zmene kategorii');
    } finally {
      setSavingCategory(false);
    }
  };

  // Filter articles
  const filteredArticles = articles.filter(article => {
    // Status filter
    if (filter.status === 'published' && !article.is_published) return false;
    if (filter.status === 'draft' && article.is_published) return false;
    if (filter.status === 'pillar' && !article.is_pillar) return false;

    // Category filter
    if (filter.category !== 'all') {
      const articleCats = getArticleCategories(article.id);
      if (!articleCats.some(c => c.slug === filter.category)) return false;
    }

    // Search filter
    if (filter.search) {
      const search = filter.search.toLowerCase();
      if (!article.title_cs?.toLowerCase().includes(search) &&
          !article.slug?.toLowerCase().includes(search)) {
        return false;
      }
    }

    return true;
  });

  // Group articles by category for display
  const getCategoryStats = () => {
    const stats: Record<string, number> = {};
    articles.forEach(article => {
      const cats = getArticleCategories(article.id);
      cats.forEach(cat => {
        stats[cat.slug] = (stats[cat.slug] || 0) + 1;
      });
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dhadmin" className="text-white/80 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold">Sprava clanku</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dhadmin/clanky/import"
                className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
              >
                <FileJson className="h-4 w-4" />
                Import z JSON
              </Link>
              <Link
                href="/dhadmin/clanky/novy"
                className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Novy clanek
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category tabs */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(f => ({ ...f, category: 'all' }))}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter.category === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Vsechny ({articles.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(f => ({ ...f, category: cat.slug }))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter.category === cat.slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name_cs} ({categoryStats[cat.slug] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Hledat podle nazvu nebo slug..."
                value={filter.search}
                onChange={(e) => setFilter(f => ({ ...f, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Status filter */}
            <select
              value={filter.status}
              onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Vsechny stavy</option>
              <option value="published">Publikovane</option>
              <option value="draft">Drafty</option>
              <option value="pillar">Pillar pages</option>
            </select>

            {/* Stats */}
            <div className="text-sm text-gray-500">
              {filteredArticles.length} z {articles.length} clanku
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Titulek</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Kategorie</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Stav</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">Datum</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Zadne clanky nenalezeny
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => {
                  const articleCats = getArticleCategories(article.id);
                  const isEditing = editingCategory === article.id;

                  return (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-2">
                          {article.is_pillar && (
                            <span title="Pillar page">
                              <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-1" />
                            </span>
                          )}
                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1">
                              {article.title_cs || '(bez nazvu)'}
                            </p>
                            <p className="text-sm text-gray-500">/clanky/{article.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        {isEditing ? (
                          <CategoryEditor
                            articleId={article.id}
                            categories={categories}
                            selectedIds={articleCats.map(c => c.id)}
                            onSave={handleCategoryChange}
                            onCancel={() => setEditingCategory(null)}
                            saving={savingCategory}
                          />
                        ) : (
                          <div className="flex items-center gap-1 flex-wrap">
                            {articleCats.length === 0 ? (
                              <span className="text-gray-400 text-sm">-</span>
                            ) : (
                              articleCats.map(cat => (
                                <span
                                  key={cat.id}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {cat.name_cs}
                                </span>
                              ))
                            )}
                            <button
                              onClick={() => setEditingCategory(article.id)}
                              className="p-1 text-gray-400 hover:text-primary"
                              title="Zmenit kategorii"
                            >
                              <Tag className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          article.is_published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.is_published ? 'Publikovano' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 hidden lg:table-cell">
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString('cs-CZ')
                          : '-'}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {article.is_published && (
                            <a
                              href={`/clanky/${article.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-primary"
                              title="Zobrazit na webu"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <Link
                            href={`/dhadmin/clanky/${article.slug}`}
                            className="p-2 text-gray-400 hover:text-primary"
                            title="Editovat"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id, article.title_cs)}
                            disabled={deleting === article.id}
                            className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50"
                            title="Smazat"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
            <p className="text-sm text-gray-500">Celkem clanku</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-2xl font-bold text-green-600">
              {articles.filter(a => a.is_published).length}
            </p>
            <p className="text-sm text-gray-500">Publikovanych</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-2xl font-bold text-yellow-600">
              {articles.filter(a => !a.is_published).length}
            </p>
            <p className="text-sm text-gray-500">Draftu</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-2xl font-bold text-blue-600">
              {articles.filter(a => a.is_pillar).length}
            </p>
            <p className="text-sm text-gray-500">Pillar pages</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-2xl font-bold text-gray-900">
              {articles.reduce((sum, a) => sum + (a.view_count || 0), 0)}
            </p>
            <p className="text-sm text-gray-500">Celkem zobrazeni</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Category Editor component
function CategoryEditor({
  articleId,
  categories,
  selectedIds,
  onSave,
  onCancel,
  saving
}: {
  articleId: string;
  categories: Category[];
  selectedIds: string[];
  onSave: (articleId: string, categoryIds: string[]) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [selected, setSelected] = useState<string[]>(selectedIds);

  const toggleCategory = (catId: string) => {
    setSelected(prev =>
      prev.includes(catId)
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => toggleCategory(cat.id)}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
              selected.includes(cat.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.name_cs}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave(articleId, selected)}
          disabled={saving}
          className="px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? 'Ukladam...' : 'Ulozit'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Zrusit
        </button>
      </div>
    </div>
  );
}
