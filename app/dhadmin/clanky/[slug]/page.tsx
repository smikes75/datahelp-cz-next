'use client';

/**
 * Admin - Editace clanku
 * Formular pro upravu existujiciho clanku s Markdown preview
 */

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Edit as EditIcon, AlertCircle, Check, ExternalLink, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { marked } from 'marked';
import ImageUpload from '@/components/admin/ImageUpload';
import SeoPreview from '@/components/admin/SeoPreview';

interface Category {
  id: string;
  slug: string;
  name_cs: string;
}

interface FormData {
  id: string;
  title_cs: string;
  slug: string;
  excerpt_cs: string;
  content_cs: string;
  author: string;
  image_url: string;
  is_published: boolean;
  published_at: string;
  reading_time_minutes: number;
  view_count: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EditArticlePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [originalSlug, setOriginalSlug] = useState('');

  const [formData, setFormData] = useState<FormData>({
    id: '',
    title_cs: '',
    slug: '',
    excerpt_cs: '',
    content_cs: '',
    author: 'DataHelp Team',
    image_url: '',
    is_published: false,
    published_at: new Date().toISOString().split('T')[0],
    reading_time_minutes: 1,
    view_count: 0
  });

  // Check auth
  useEffect(() => {
    const saved = sessionStorage.getItem('dhadmin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch article and categories
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchArticle();
    fetchCategories();
  }, [isAuthenticated, resolvedParams.slug]);

  const fetchArticle = async () => {
    try {
      const supabase = createClient();

      // Fetch article
      const { data: article, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', resolvedParams.slug)
        .single();

      if (error) throw error;
      if (!article) {
        router.push('/dhadmin/clanky');
        return;
      }

      setOriginalSlug(article.slug);
      setFormData({
        id: article.id,
        title_cs: article.title_cs || '',
        slug: article.slug,
        excerpt_cs: article.excerpt_cs || '',
        content_cs: article.content_cs || '',
        author: article.author || 'DataHelp Team',
        image_url: article.image_url || '',
        is_published: article.is_published,
        published_at: article.published_at ? article.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
        reading_time_minutes: article.reading_time_minutes || 1,
        view_count: article.view_count || 0
      });

      // Fetch article categories
      const { data: postCats } = await supabase
        .from('blog_post_categories')
        .select('category_id')
        .eq('post_id', article.id);

      if (postCats) {
        setSelectedCategories(postCats.map(pc => pc.category_id));
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      router.push('/dhadmin/clanky');
    } finally {
      setLoading(false);
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

  // Auto-calculate reading time
  useEffect(() => {
    if (formData.content_cs) {
      setFormData(f => ({ ...f, reading_time_minutes: calculateReadingTime(formData.content_cs) }));
    }
  }, [formData.content_cs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(e => ({ ...e, [name]: '' }));
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title_cs.trim()) {
      newErrors.title_cs = 'Titulek je povinny';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug je povinny';
    }

    if (formData.excerpt_cs.length > 160) {
      newErrors.excerpt_cs = 'Excerpt musi mit max 160 znaku';
    }

    if (selectedCategories.length === 0) {
      newErrors.categories = 'Vyberte alespon jednu kategorii';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkSlugUnique = async (): Promise<boolean> => {
    if (formData.slug === originalSlug) return true;

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', formData.slug)
        .neq('id', formData.id)
        .maybeSingle();

      if (error) throw error;
      return !data;
    } catch (error) {
      console.error('Error checking slug:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const isUnique = await checkSlugUnique();
    if (!isUnique) {
      setErrors(e => ({ ...e, slug: 'Tento slug jiz existuje' }));
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();

      // Update blog post
      const { error: postError } = await supabase
        .from('blog_posts')
        .update({
          slug: formData.slug,
          title_cs: formData.title_cs,
          title_en: formData.title_cs,
          excerpt_cs: formData.excerpt_cs,
          excerpt_en: formData.excerpt_cs,
          content_cs: formData.content_cs,
          content_en: formData.content_cs,
          author: formData.author,
          image_url: formData.image_url || null,
          is_published: formData.is_published,
          published_at: formData.is_published ? formData.published_at : null,
          reading_time_minutes: formData.reading_time_minutes
        })
        .eq('id', formData.id);

      if (postError) throw postError;

      // Update categories - delete old, insert new
      await supabase
        .from('blog_post_categories')
        .delete()
        .eq('post_id', formData.id);

      if (selectedCategories.length > 0) {
        const categoryInserts = selectedCategories.map(categoryId => ({
          post_id: formData.id,
          category_id: categoryId
        }));

        await supabase
          .from('blog_post_categories')
          .insert(categoryInserts);
      }

      // Redirect if slug changed
      if (formData.slug !== originalSlug) {
        router.push(`/dhadmin/clanky/${formData.slug}`);
      } else {
        // Show success feedback
        alert('Clanek ulozen');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Chyba pri ukladani clanku');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Opravdu chcete smazat tento clanek? Tato akce je nevratna.')) return;

    setDeleting(true);

    try {
      const supabase = createClient();

      // Delete category associations
      await supabase
        .from('blog_post_categories')
        .delete()
        .eq('post_id', formData.id);

      // Delete post
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', formData.id);

      if (error) throw error;

      router.push('/dhadmin/clanky');
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Chyba pri mazani clanku');
    } finally {
      setDeleting(false);
    }
  };

  const renderPreview = () => {
    if (!formData.content_cs) {
      return <p className="text-gray-400 italic">Zadny obsah k nahledu</p>;
    }
    const html = marked(formData.content_cs);
    return (
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dhadmin/clanky" className="text-white/80 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Editace clanku</h1>
                <p className="text-white/70 text-sm">{formData.view_count} zobrazeni</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {formData.is_published && (
                <a
                  href={`/clanky/${formData.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Zobrazit
                </a>
              )}
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
              >
                {previewMode ? <EditIcon className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {previewMode ? 'Editor' : 'Nahled'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titulek *
              </label>
              <input
                type="text"
                name="title_cs"
                value={formData.title_cs}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.title_cs ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title_cs && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title_cs}
                </p>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Obsah (Markdown)
                </label>
                <span className="text-sm text-gray-500">
                  ~{formData.reading_time_minutes} min cteni
                </span>
              </div>

              {previewMode ? (
                <div className="min-h-[400px] border border-gray-200 rounded-lg p-4 overflow-auto">
                  {renderPreview()}
                </div>
              ) : (
                <textarea
                  name="content_cs"
                  value={formData.content_cs}
                  onChange={handleInputChange}
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Publikace</h3>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Publikovano</span>
                </label>

                {formData.is_published && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Datum publikace
                    </label>
                    <input
                      type="date"
                      name="published_at"
                      value={formData.published_at}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Ukladam...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Ulozit zmeny
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full bg-red-50 text-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {deleting ? 'Mazu...' : 'Smazat clanek'}
                </button>
              </div>
            </div>

            {/* Slug */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug *
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">/clanky/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className={`flex-1 px-2 py-2 border-b focus:outline-none focus:border-primary ${
                    errors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.slug}
                </p>
              )}
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (meta description)
              </label>
              <textarea
                name="excerpt_cs"
                value={formData.excerpt_cs}
                onChange={handleInputChange}
                rows={3}
                maxLength={160}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.excerpt_cs ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between mt-1">
                <span className={`text-sm ${formData.excerpt_cs.length > 155 ? 'text-orange-500' : 'text-gray-500'}`}>
                  {formData.excerpt_cs.length}/160
                </span>
                {formData.excerpt_cs.length <= 155 && formData.excerpt_cs.length > 0 && (
                  <span className="text-green-500 text-sm flex items-center gap-1">
                    <Check className="h-4 w-4" /> OK
                  </span>
                )}
              </div>
            </div>

            {/* SEO Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <SeoPreview
                title={formData.title_cs}
                description={formData.excerpt_cs}
                slug={formData.slug}
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kategorie *
              </label>
              <div className="space-y-2">
                {categories.length === 0 ? (
                  <p className="text-gray-500 text-sm">Zadne kategorie</p>
                ) : (
                  categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{cat.name_cs}</span>
                    </label>
                  ))
                )}
              </div>
              {errors.categories && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.categories}
                </p>
              )}
            </div>

            {/* Author */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Image */}
            <div className="bg-white rounded-lg shadow p-6">
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData(f => ({ ...f, image_url: url }))}
                folder="blog"
                label="Hlavni obrazek"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
