'use client';

/**
 * Galerie obrázků laboratoře
 * Desktop: mřížka 4 sloupce
 * Mobile: horizontální scroll
 */

import React, { useRef } from 'react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Image from 'next/image';

export function Gallery() {
  const t = useTranslations('gallery');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = [
    {
      url: "/images/gallery/clean-room.webp",
      alt: t('cleanRoom')
    },
    {
      url: "/images/gallery/diagnostics.webp",
      alt: t('diagnostics')
    },
    {
      url: "/images/gallery/server-room.webp",
      alt: t('serverRoom')
    },
    {
      url: "/images/gallery/data-center.webp",
      alt: t('dataCenter')
    }
  ];

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12 text-primary">
          {t('title')}
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-lg group">
              <Image
                src={image.url}
                alt={image.alt}
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
              key={index}
              className="relative flex-shrink-0 w-[85vw] aspect-square overflow-hidden rounded-lg shadow-lg snap-center"
            >
              <Image
                src={image.url}
                alt={image.alt}
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
