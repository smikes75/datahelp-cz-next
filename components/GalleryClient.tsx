'use client';

/**
 * Klientská komponenta pro galerii obrázků laboratoře
 * Desktop: mřížka 4 sloupce
 * Mobile: 2x2 grid, po kliknutí se obrázek plynule rozbalí z rohu do fullscreen
 *
 * Přijímá obrázky jako props ze server komponenty (SSR)
 */

import React, { useState } from 'react';
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
  const [sliderIndex, setSliderIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Handle grid image click - expand that image, then transition to slider
  const handleGridClick = (index: number) => {
    setExpandedIndex(index);
    setSliderIndex(index);
    // After expand animation completes, show slider
    setTimeout(() => {
      setShowSlider(true);
    }, 400); // Match animation duration
  };

  // Close expanded view - return to grid
  const handleClose = () => {
    setShowSlider(false);
    setExpandedIndex(null);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next image
      setSliderIndex((prev) => (prev < 3 ? prev + 1 : 0));
    } else if (isRightSwipe) {
      // Swipe right - previous image
      setSliderIndex((prev) => (prev > 0 ? prev - 1 : 3));
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
          {/* Slider view after expansion - swipe to navigate */}
          {showSlider ? (
            <div
              className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={imageList[sliderIndex].url}
                alt={imageList[sliderIndex].alt}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="100vw"
                priority
              />
              {/* Subtle indicator dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {imageList.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === sliderIndex ? 'bg-white' : 'bg-white/40'
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
