'use client';

/**
 * Klientská komponenta pro galerii obrázků laboratoře
 * Desktop: mřížka 4 sloupce
 * Mobile: 2x2 grid, po kliknutí se obrázek plynule rozbalí z rohu do fullscreen
 *
 * Přijímá obrázky jako props ze server komponenty (SSR)
 */

import React, { useState, useRef, useEffect } from 'react';
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

// Helper to get transform origin based on grid position
const getTransformOrigin = (index: number): string => {
  switch (index) {
    case 0: return 'top left';
    case 1: return 'top right';
    case 2: return 'bottom left';
    case 3: return 'bottom right';
    default: return 'center';
  }
};

export function GalleryClient({ images, fallbackImages, useFallback }: GalleryClientProps) {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showSlider, setShowSlider] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle grid image click - expand that image, then transition to slider
  const handleGridClick = (index: number) => {
    setExpandedIndex(index);
    setCurrentSlide(index);
    // After expand animation completes, show slider
    setTimeout(() => {
      setShowSlider(true);
      // Scroll to the clicked image
      setTimeout(() => {
        if (sliderRef.current) {
          const slideWidth = sliderRef.current.offsetWidth;
          sliderRef.current.scrollTo({ left: index * slideWidth, behavior: 'auto' });
        }
      }, 50);
    }, 400);
  };

  // Close expanded view - return to grid
  const handleClose = () => {
    setShowSlider(false);
    setExpandedIndex(null);
  };

  // Track current slide on scroll
  const handleScroll = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      const scrollLeft = sliderRef.current.scrollLeft;
      const newSlide = Math.round(scrollLeft / slideWidth);
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < 4) {
        setCurrentSlide(newSlide);
      }
    }
  };

  // Helper to get alt text based on locale
  const getAlt = (image: GalleryImage) => {
    return locale === 'en' ? (image.alt_en || image.alt_cs || '') : (image.alt_cs || '');
  };

  // Render mobile grid with expand animation
  const renderMobileGrid = (imageList: { url: string; alt: string }[]) => (
    <div className="md:hidden relative">
      {/* 2x2 Grid - always visible */}
      <div className="grid grid-cols-2 gap-2">
        {imageList.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => handleGridClick(index)}
            className={`relative aspect-square overflow-hidden rounded-lg shadow-lg focus:outline-none transition-opacity duration-300 ${
              expandedIndex !== null && expandedIndex !== index ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ transformOrigin: getTransformOrigin(index) }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="45vw"
              priority={index < 2}
            />
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Expanded overlay - click outside to close */}
      {expandedIndex !== null && (
        <div
          className="absolute inset-0 z-20"
          onClick={handleClose}
          style={{
            animation: !showSlider ? 'expandFromCorner 400ms ease-out forwards' : undefined,
            transformOrigin: getTransformOrigin(expandedIndex),
          }}
        >
          {/* Slider view after expansion - native horizontal scroll */}
          {showSlider ? (
            <div className="w-full h-full bg-white rounded-lg">
              <div
                ref={sliderRef}
                className="w-full h-full flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1"
                onScroll={handleScroll}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  transform: 'translateZ(0)',
                  willChange: 'scroll-position',
                  backfaceVisibility: 'hidden'
                }}
              >
                {imageList.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative flex-shrink-0 w-[calc(100%-8px)] h-full snap-center rounded-lg overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                    style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  </div>
                ))}
              </div>
              {/* Subtle indicator dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                {imageList.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Initial expand animation - shows clicked image */
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={imageList[expandedIndex].url}
                alt={imageList[expandedIndex].alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes expandFromCorner {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );

  // Use fallback static images
  if (useFallback) {
    const imageList = fallbackImages.map(img => ({
      url: img.url,
      alt: t(img.altKey)
    }));

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

          {/* Mobile Grid with expand */}
          {renderMobileGrid(imageList)}
        </div>
      </section>
    );
  }

  // Dynamic images from Cloudinary (loaded via SSR)
  const imageList = images.slice(0, 4).map(img => ({
    url: img.cloudinary_url,
    alt: getAlt(img)
  }));

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

        {/* Mobile Grid with expand */}
        {renderMobileGrid(imageList)}
      </div>
    </section>
  );
}
