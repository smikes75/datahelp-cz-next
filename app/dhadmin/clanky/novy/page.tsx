'use client';

/**
 * Admin - Novy clanek
 * Formular pro vytvoreni noveho clanku s Markdown preview
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Edit as EditIcon, AlertCircle, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { marked } from 'marked';
import ImageUpload from '@/components/admin/ImageUpload';
import AutosaveIndicator from '@/components/admin/AutosaveIndicator';
import SeoPreview from '@/components/admin/SeoPreview';
import SchedulePublish from '@/components/admin/SchedulePublish';
import { useAutosave } from '@/hooks/useAutosave';

interface Category {
  id: string;
  slug: string;
  name_cs: string;
}

interface FormData {
  title_cs: string;
  slug: string;
  excerpt_cs: string;
  content_cs: string;
  author: string;
  image_url: string;
  is_published: boolean;
  published_at: string;
  scheduled_at: string | null;
  reading_time_minutes: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function NewArticlePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [showRestorePrompt, setShowRestorePrompt] = useState(true);

  const initialFormData: FormData = {
    title_cs: '',
    slug: '',
    excerpt_cs: '',
    content_cs: '',
    author: 'DataHelp Team',
    image_url: '',
    is_published: false,
    published_at: new Date().toISOString().split('T')[0],
    scheduled_at: null,
    reading_time_minutes: 1
  };

  // Autosave hook
  const {
    data: formData,
    setData: setFormData,
    lastSaved,
    hasUnsavedChanges,
    clearSaved,
    restoreFromSaved,
    hasSavedData
  } = useAutosave<FormData>(initialFormData, {
    key: 'new_article',
    interval: 30000, // 30 sekund
    enabled: isAuthenticated
  });

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

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && formData.title_cs) {
      setFormData(f => ({ ...f, slug: slugify(formData.title_cs) }));
    }
  }, [formData.title_cs, slugManuallyEdited]);

  // Auto-calculate reading time
  useEffect(() => {
    if (formData.content_cs) {
      setFormData(f => ({ ...f, reading_time_minutes: calculateReadingTime(formData.content_cs) }));
    }
  }, [formData.content_cs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'slug') {
      setSlugManuallyEdited(true);
    }

    setFormData(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user types
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
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', formData.slug)
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

    // Check slug uniqueness
    const isUnique = await checkSlugUnique();
    if (!isUnique) {
      setErrors(e => ({ ...e, slug: 'Tento slug jiz existuje' }));
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();

      // Create blog post
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .insert({
          slug: formData.slug,
          title_cs: formData.title_cs,
          title_en: formData.title_cs, // Same as CS for now
          excerpt_cs: formData.excerpt_cs,
          excerpt_en: formData.excerpt_cs,
          content_cs: formData.content_cs,
          content_en: formData.content_cs,
          author: formData.author,
          image_url: formData.image_url || null,
          is_published: formData.is_published,
          published_at: formData.is_published ? formData.published_at : null,
          scheduled_at: !formData.is_published && formData.scheduled_at ? formData.scheduled_at : null,
          reading_time_minutes: formData.reading_time_minutes,
          view_count: 0
        })
        .select('id')
        .single();

      if (postError) throw postError;

      // Add category associations
      if (selectedCategories.length > 0) {
        const categoryInserts = selectedCategories.map(categoryId => ({
          post_id: post.id,
          category_id: categoryId
        }));

        const { error: catError } = await supabase
          .from('blog_post_categories')
          .insert(categoryInserts);

        if (catError) {
          console.error('Error adding categories:', catError);
        }
      }

      // Clear autosave and redirect
      clearSaved();
      router.push('/dhadmin/clanky');
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Chyba pri ukladani clanku');
    } finally {
      setSaving(false);
    }
  };

  // Render markdown preview
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
              <h1 className="text-2xl font-bold">Novy clanek</h1>
            </div>
            <div className="flex items-center gap-2">
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
        {/* Autosave restore prompt */}
        {showRestorePrompt && hasSavedData && !lastSaved && (
          <div className="mb-6">
            <AutosaveIndicator
              lastSaved={lastSaved}
              hasUnsavedChanges={hasUnsavedChanges}
              hasSavedData={hasSavedData}
              onRestore={() => {
                restoreFromSaved();
                setShowRestorePrompt(false);
              }}
              onDiscard={() => {
                clearSaved();
                setShowRestorePrompt(false);
              }}
            />
          </div>
        )}

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
                placeholder="Jak spravne zalohovat data"
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
                  placeholder="## Uvod

Napiste obsah clanku v Markdown formatu...

### Podnadpis

- Bod 1
- Bod 2

**Tucny text** a *kurziva*"
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Publikace</h3>
                {(lastSaved || hasUnsavedChanges) && (
                  <AutosaveIndicator
                    lastSaved={lastSaved}
                    hasUnsavedChanges={hasUnsavedChanges}
                    hasSavedData={false}
                  />
                )}
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Publikovat ihned</span>
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

                {/* Scheduled publishing - only when not publishing immediately */}
                {!formData.is_published && (
                  <SchedulePublish
                    scheduledAt={formData.scheduled_at}
                    onChange={(scheduledAt) => setFormData(f => ({ ...f, scheduled_at: scheduledAt }))}
                    isPublished={formData.is_published}
                  />
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
                      Ulozit clanek
                    </>
                  )}
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
                placeholder="Kratky popis clanku pro vyhledavace..."
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
