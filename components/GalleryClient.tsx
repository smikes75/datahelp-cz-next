'use client';

/**
 * Klientská komponenta pro galerii obrázků laboratoře
 * Desktop: mřížka 4 sloupce
 * Mobile: horizontální scroll
 *
 * Přijímá obrázky jako props ze server komponenty (SSR)
 */

import React, { useRef } from 'react';
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

interface FallbackImage {
  url: string;
  altKey: string;
}

interface GalleryClientProps {
  images: GalleryImage[];
  fallbackImages: FallbackImage[];
  useFallback: boolean;
}

export function GalleryClient({ images, fallbackImages, useFallback }: GalleryClientProps) {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper to get alt text based on locale
  const getAlt = (image: GalleryImage) => {
    return locale === 'en' ? (image.alt_en || image.alt_cs || '') : (image.alt_cs || '');
  };

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
            {fallbackImages.map((image, index) => (
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
            className="md:hidden flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-6 pr-8"
          >
            {fallbackImages.map((image, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[85vw] aspect-[4/3] overflow-hidden rounded-lg shadow-lg snap-center"
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
            {fallbackImages.map((_, index) => (
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

  // Dynamic images from Cloudinary (loaded via SSR)
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
          className="md:hidden flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-6 pr-8"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 w-[85vw] aspect-[4/3] overflow-hidden rounded-lg shadow-lg snap-center"
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
