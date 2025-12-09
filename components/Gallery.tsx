'use client';

/**
 * Galerie obrázků laboratoře
 * Desktop: mřížka 4 sloupce
 * Mobile: horizontální scroll
 *
 * Načítá obrázky z Cloudinary přes Supabase databázi
 * Fallback na statické obrázky pokud API selže
 */

import React, { useRef, useEffect, useState } from 'react';
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

// Fallback static images (used until Cloudinary is configured)
const FALLBACK_IMAGES = [
  { url: "/images/gallery/clean-room.webp", altKey: 'cleanRoom' },
  { url: "/images/gallery/diagnostics.webp", altKey: 'diagnostics' },
  { url: "/images/gallery/server-room.webp", altKey: 'serverRoom' },
  { url: "/images/gallery/data-center.webp", altKey: 'dataCenter' }
];

export function Gallery() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/galleries/images?gallery=nase-laborator');

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
        console.warn('Gallery: Using fallback images', error);
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

  // Loading state
  if (loading) {
    return (
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-primary">
            {t('title')}
          </h2>
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="md:hidden flex gap-4 overflow-x-hidden px-4 -mx-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] aspect-square bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Use fallback static images
  if (useFallback) {
    return (
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-primary">
            {t('title')}
          </h2>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FALLBACK_IMAGES.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={image.url}
                  alt={t(image.altKey)}
                  fill
                  className="object-cover transform transition duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
          >
            {FALLBACK_IMAGES.map((image, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[85vw] aspect-square overflow-hidden rounded-lg shadow-lg snap-center"
              >
                <Image
                  src={image.url}
                  alt={t(image.altKey)}
                  fill
                  className="object-cover"
                  sizes="85vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Mobile Scroll Indicator Dots */}
          <div className="md:hidden flex justify-center gap-2 mt-6">
            {FALLBACK_IMAGES.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>
    );
  }

  // Dynamic images from Cloudinary
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-primary">
          {t('title')}
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
              <Image
                src={image.cloudinary_url}
                alt={getAlt(image)}
                fill
                className="object-cover transform transition duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 w-[85vw] aspect-square overflow-hidden rounded-lg shadow-lg snap-center"
            >
              <Image
                src={image.cloudinary_url}
                alt={getAlt(image)}
                fill
                className="object-cover"
                sizes="85vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Mobile Scroll Indicator Dots */}
        <div className="md:hidden flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
