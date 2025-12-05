'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Image from 'next/image';

export function TechnologyGallery() {
  const t = useTranslations('techPage');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    {
      url: "/images/technology/clean-room-tech.webp",
      alt: t('gallery.cleanRoom')
    },
    {
      url: "/images/technology/diagnostics-tech.webp",
      alt: t('gallery.diagnostics')
    },
    {
      url: "/images/technology/server-tech.webp",
      alt: t('gallery.serverRoom')
    },
    {
      url: "/images/technology/datacenter-tech.webp",
      alt: t('gallery.dataCenter')
    },
    {
      url: "/images/gallery/clean-room.webp",
      alt: t('gallery.cleanRoom')
    },
    {
      url: "/images/technology/parts-warehouse.webp",
      alt: t('gallery.partsWarehouse')
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">{t('gallery.title')}</h2>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden md:block relative max-w-5xl mx-auto">
        <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
          {images.map((image, index) => (
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
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Přejít na obrázek ${index + 1}`}
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
          {images.map((image, index) => (
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
          {images.map((_, index) => (
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
