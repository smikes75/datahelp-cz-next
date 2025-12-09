/**
 * Galerie obrázků laboratoře - SSR verze
 * Desktop: mřížka 4 sloupce
 * Mobile: horizontální scroll
 *
 * Načítá obrázky ze Supabase na serveru (SSR)
 * Fallback na statické obrázky pokud DB je prázdná
 */

import { getGalleryImages, type GalleryImage } from '@/lib/gallery';
import { GalleryClient } from './GalleryClient';

// Fallback static images (used until Cloudinary is configured)
const FALLBACK_IMAGES = [
  { url: "/images/gallery/clean-room.webp", altKey: 'cleanRoom' },
  { url: "/images/gallery/diagnostics.webp", altKey: 'diagnostics' },
  { url: "/images/gallery/server-room.webp", altKey: 'serverRoom' },
  { url: "/images/gallery/data-center.webp", altKey: 'dataCenter' }
];

export async function Gallery() {
  // Načti obrázky na serveru
  const images = await getGalleryImages('nase-laborator');

  // Pokud nejsou obrázky z Cloudinary, použij fallback
  const useFallback = images.length === 0;

  return (
    <GalleryClient
      images={images}
      fallbackImages={FALLBACK_IMAGES}
      useFallback={useFallback}
    />
  );
}
