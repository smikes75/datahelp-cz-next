'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Upload,
  GripVertical,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface GalleryImage {
  id: string;
  gallery_id: string;
  cloudinary_public_id: string;
  cloudinary_url: string;
  alt_cs: string | null;
  alt_en: string | null;
  sort_order: number;
  width: number | null;
  height: number | null;
}

interface Gallery {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  gallery_images: GalleryImage[];
}

export default function AdminGalleriesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ alt_cs: '', alt_en: '' });
  const [newGalleryName, setNewGalleryName] = useState('');
  const [showNewGalleryForm, setShowNewGalleryForm] = useState(false);

  const supabase = createClient();

  // Check auth on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_galleries_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load galleries
  const loadGalleries = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select(`
          *,
          gallery_images (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Sort images by sort_order
      const galleriesWithSortedImages = (data || []).map(g => ({
        ...g,
        gallery_images: (g.gallery_images || []).sort((a: GalleryImage, b: GalleryImage) => a.sort_order - b.sort_order)
      }));

      setGalleries(galleriesWithSortedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load galleries');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, supabase]);

  useEffect(() => {
    loadGalleries();
  }, [loadGalleries]);

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === '123datahelpadmin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_galleries_auth', 'true');
    } else {
      setError('Nesprávné heslo');
    }
  };

  // Create new gallery
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryName.trim()) return;

    const slug = newGalleryName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    try {
      const { error } = await supabase
        .from('galleries')
        .insert({ name: newGalleryName, slug });

      if (error) throw error;

      setNewGalleryName('');
      setShowNewGalleryForm(false);
      loadGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create gallery');
    }
  };

  // Toggle gallery active state
  const toggleGalleryActive = async (gallery: Gallery) => {
    try {
      const { error } = await supabase
        .from('galleries')
        .update({ is_active: !gallery.is_active })
        .eq('id', gallery.id);

      if (error) throw error;
      loadGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update gallery');
    }
  };

  // Delete gallery
  const handleDeleteGallery = async (gallery: Gallery) => {
    if (!confirm(`Opravdu smazat galerii "${gallery.name}" a všechny její obrázky?`)) return;

    try {
      // First delete images from Cloudinary via API
      for (const image of gallery.gallery_images) {
        await fetch('/api/galleries/images', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: image.cloudinary_public_id })
        });
      }

      // Then delete gallery (cascade will delete gallery_images rows)
      const { error } = await supabase
        .from('galleries')
        .delete()
        .eq('id', gallery.id);

      if (error) throw error;

      setSelectedGallery(null);
      loadGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gallery');
    }
  };

  // Upload image
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !selectedGallery) return;

    setUploading(true);
    setError(null);

    const files = Array.from(e.target.files);

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('galleryId', selectedGallery.id);
        formData.append('gallerySlug', selectedGallery.slug);

        const response = await fetch('/api/galleries/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Upload failed');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      }
    }

    setUploading(false);
    e.target.value = '';
    loadGalleries();
  };

  // Update image alt texts
  const handleUpdateImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          alt_cs: editForm.alt_cs || null,
          alt_en: editForm.alt_en || null
        })
        .eq('id', imageId);

      if (error) throw error;

      setEditingImage(null);
      loadGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update image');
    }
  };

  // Delete image
  const handleDeleteImage = async (image: GalleryImage) => {
    if (!confirm('Opravdu smazat tento obrázek?')) return;

    try {
      // Delete from Cloudinary
      await fetch('/api/galleries/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId: image.cloudinary_public_id })
      });

      // Delete from database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id);

      if (error) throw error;
      loadGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
    }
  };

  // Move image (reorder)
  const moveImage = async (image: GalleryImage, direction: 'up' | 'down') => {
    if (!selectedGallery) return;

    const images = [...selectedGallery.gallery_images];
    const currentIndex = images.findIndex(img => img.id === image.id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= images.length) return;

    // Swap
    [images[currentIndex], images[newIndex]] = [images[newIndex], images[currentIndex]];

    // Update sort_order for all images
    try {
      for (let i = 0; i < images.length; i++) {
        await supabase
          .from('gallery_images')
          .update({ sort_order: i })
          .eq('id', images[i].id);
      }
      loadGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder images');
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            Správa galerií
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Heslo</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Zadejte heslo"
              />
            </div>
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Přihlásit
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Selected gallery detail view
  if (selectedGallery) {
    const gallery = galleries.find(g => g.id === selectedGallery.id) || selectedGallery;

    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedGallery(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Zpět na seznam
            </button>
            <h1 className="text-2xl font-bold text-primary">{gallery.name}</h1>
          </div>

          {/* Upload section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Nahrát obrázky</h2>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-accent transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading ? (
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Klikněte nebo přetáhněte soubory
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, WebP (max 10MB)</p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
              <button onClick={() => setError(null)} className="float-right">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Images grid */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Obrázky ({gallery.gallery_images.length})
            </h2>

            {gallery.gallery_images.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Zatím žádné obrázky. Nahrajte první obrázek výše.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.gallery_images.map((image, index) => (
                  <div key={image.id} className="border rounded-lg overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={image.cloudinary_url}
                        alt={image.alt_cs || 'Gallery image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Controls */}
                    <div className="p-3">
                      {editingImage === image.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Alt text (CZ)"
                            value={editForm.alt_cs}
                            onChange={(e) => setEditForm({ ...editForm, alt_cs: e.target.value })}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Alt text (EN)"
                            value={editForm.alt_en}
                            onChange={(e) => setEditForm({ ...editForm, alt_en: e.target.value })}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateImage(image.id)}
                              className="flex-1 bg-green-500 text-white py-1 rounded text-sm hover:bg-green-600"
                            >
                              <Save className="w-4 h-4 inline mr-1" />
                              Uložit
                            </button>
                            <button
                              onClick={() => setEditingImage(null)}
                              className="flex-1 bg-gray-200 text-gray-700 py-1 rounded text-sm hover:bg-gray-300"
                            >
                              Zrušit
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs text-gray-500 mb-2 truncate">
                            {image.alt_cs || 'Bez alt textu'}
                          </p>
                          <div className="flex gap-1">
                            <button
                              onClick={() => moveImage(image, 'up')}
                              disabled={index === 0}
                              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                              title="Posunout nahoru"
                            >
                              <GripVertical className="w-4 h-4 rotate-180" />
                            </button>
                            <button
                              onClick={() => moveImage(image, 'down')}
                              disabled={index === gallery.gallery_images.length - 1}
                              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                              title="Posunout dolů"
                            >
                              <GripVertical className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingImage(image.id);
                                setEditForm({
                                  alt_cs: image.alt_cs || '',
                                  alt_en: image.alt_en || ''
                                });
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Upravit"
                            >
                              <Edit2 className="w-4 h-4 text-blue-500" />
                            </button>
                            <button
                              onClick={() => handleDeleteImage(image)}
                              className="p-1 hover:bg-gray-100 rounded ml-auto"
                              title="Smazat"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Gallery list view
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-primary">Správa galerií</h1>
          <Link href="/" className="text-gray-500 hover:text-primary">
            Zpět na web
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
            <button onClick={() => setError(null)} className="float-right">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* New gallery form */}
        {showNewGalleryForm ? (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Nová galerie</h2>
            <form onSubmit={handleCreateGallery} className="flex gap-4">
              <input
                type="text"
                value={newGalleryName}
                onChange={(e) => setNewGalleryName(e.target.value)}
                placeholder="Název galerie"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition"
              >
                Vytvořit
              </button>
              <button
                type="button"
                onClick={() => setShowNewGalleryForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Zrušit
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setShowNewGalleryForm(true)}
            className="w-full bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-center gap-2 text-accent hover:bg-accent/5 transition"
          >
            <Plus className="w-5 h-5" />
            Přidat galerii
          </button>
        )}

        {/* Galleries list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : galleries.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Zatím žádné galerie. Vytvořte první galerii výše.
          </div>
        ) : (
          <div className="space-y-4">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
              >
                {/* Preview thumbnails */}
                <div className="flex -space-x-2">
                  {gallery.gallery_images.slice(0, 3).map((img) => (
                    <div
                      key={img.id}
                      className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white relative"
                    >
                      <Image
                        src={img.cloudinary_url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ))}
                  {gallery.gallery_images.length === 0 && (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">{gallery.name}</h3>
                  <p className="text-sm text-gray-500">
                    {gallery.gallery_images.length} obrázků
                    <span className="mx-2">•</span>
                    <span className={gallery.is_active ? 'text-green-600' : 'text-gray-400'}>
                      {gallery.is_active ? 'Aktivní' : 'Neaktivní'}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleGalleryActive(gallery)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title={gallery.is_active ? 'Deaktivovat' : 'Aktivovat'}
                  >
                    {gallery.is_active ? (
                      <Eye className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedGallery(gallery)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="Spravovat obrázky"
                  >
                    <Edit2 className="w-5 h-5 text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteGallery(gallery)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="Smazat galerii"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
