'use client';

/**
 * Lazy-loaded Google Map pro lepší SEO/performance
 * Zobrazuje statický placeholder obrázek, po kliknutí načte interaktivní mapu
 */

import { useState } from 'react';
import Image from 'next/image';

interface LazyGoogleMapProps {
  src: string;
  title: string;
  className?: string;
}

export function LazyGoogleMap({ src, title, className = '' }: LazyGoogleMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        src={src}
        className={`w-full h-full border-0 ${className}`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    );
  }

  return (
    <button
      onClick={() => setIsLoaded(true)}
      className={`relative w-full h-full cursor-pointer group ${className}`}
      aria-label="Klikněte pro načtení interaktivní mapy"
    >
      {/* Static map placeholder image */}
      <Image
        src="/images/map-placeholder.webp"
        alt="Mapa - DataHelp s.r.o., Praha 8 - Karlín"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Hover overlay with "Load map" button */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-primary font-medium">Načíst interaktivní mapu</span>
        </div>
      </div>
    </button>
  );
}
