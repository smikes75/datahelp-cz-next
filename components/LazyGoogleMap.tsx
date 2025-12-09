'use client';

/**
 * Lazy-loaded Google Map pro lepší SEO/performance
 * Zobrazuje statický placeholder obrázek, po kliknutí načte interaktivní mapu
 */

import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

interface LazyGoogleMapProps {
  src: string;
  title: string;
  className?: string;
}

// Google Static Maps API URL pro placeholder
// Používáme statický obrázek místo API (bez API klíče)
const STATIC_MAP_PLACEHOLDER = '/images/map-placeholder.webp';

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
      {/* Placeholder - buď obrázek nebo fallback */}
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div className="text-center p-4">
          {/* Stylizovaný placeholder bez externího obrázku */}
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
            <div className="bg-white rounded-full p-4 shadow-lg mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <p className="text-gray-600 font-medium">Klikněte pro zobrazení mapy</p>
            <p className="text-gray-400 text-sm mt-1">DataHelp s.r.o., Praha 8 - Karlín</p>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-primary font-medium">Načíst mapu</span>
        </div>
      </div>
    </button>
  );
}
