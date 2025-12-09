'use client';

/**
 * Galerie technologií
 * Desktop: carousel s auto-play
 * Mobile: horizontální scroll
 *
 * Načítá obrázky z Cloudinary přes Supabase databázi
 * Fallback na statické obrázky pokud API selže
 */

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from '@/contexts/TranslationsContext';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  cloudinary_url: string;
  alt_cs: string | null;
  alt_en: string | null;
  width: number | null;
  height: number | null;
}

// Fallback static images
const FALLBACK_IMAGES = [
  { url: "/images/technology/clean-room-tech.webp", altKey: 'cleanRoom' },
  { url: "/images/technology/diagnostics-tech.webp", altKey: 'diagnostics' },
  { url: "/images/technology/server-tech.webp", altKey: 'serverRoom' },
  { url: "/images/technology/datacenter-tech.webp", altKey: 'dataCenter' },
  { url: "/images/gallery/clean-room.webp", altKey: 'cleanRoom' },
  { url: "/images/technology/parts-warehouse.webp", altKey: 'partsWarehouse' }
];

export function TechnologyGallery() {
  const t = useTranslations('techPage');
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  // Load images from API
  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/galleries/images?gallery=technologie');

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();

        if (data.images && data.images.length > 0) {
          setImages(data.images);
        } else {
          setUseFallback(true);
        }
      } catch (error) {
        console.warn('TechnologyGallery: Using fallback images', error);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  // Helper to get alt text based on locale
  const getAlt = (image: GalleryImage) => {
    return locale === 'en' ? (image.alt_en || image.alt_cs || '') : (image.alt_cs || '');
  };

  // Get the actual images array (dynamic or fallback)
  const displayImages = useFallback
    ? FALLBACK_IMAGES.map(img => ({ url: img.url, alt: t(`gallery.${img.altKey}`) }))
    : images.map(img => ({ url: img.cloudinary_url, alt: getAlt(img) }));

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || displayImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayImages.length]);

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{t('gallery.title')}</h2>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">{t('gallery.title')}</h2>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden md:block relative max-w-5xl mx-auto">
        <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Desktop Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden overflow-hidden">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-[85vw] snap-center">
              <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {displayImages.map((_, index) => (
            <div
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
