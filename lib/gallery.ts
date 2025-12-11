import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client (realtime disabled for bundle size optimization)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    realtime: {
      params: {
        eventsPerSecond: -1
      }
    }
  }
);

export interface GalleryImage {
  id: string;
  cloudinary_url: string;
  alt_cs: string | null;
  alt_en: string | null;
  width: number | null;
  height: number | null;
}

/**
 * Načte obrázky galerie ze Supabase (server-side)
 * Vrací prázdné pole pokud galerie neexistuje nebo je prázdná
 */
export async function getGalleryImages(gallerySlug: string): Promise<GalleryImage[]> {
  try {
    // Najdi galerii podle slugu
    const { data: gallery, error: galleryError } = await supabase
      .from('galleries')
      .select('id')
      .eq('slug', gallerySlug)
      .eq('is_active', true)
      .single();

    if (galleryError || !gallery) {
      return [];
    }

    // Načti obrázky pro tuto galerii
    const { data: images, error: imagesError } = await supabase
      .from('gallery_images')
      .select('id, cloudinary_url, alt_cs, alt_en, width, height')
      .eq('gallery_id', gallery.id)
      .order('sort_order', { ascending: true });

    if (imagesError || !images) {
      return [];
    }

    return images;
  } catch (error) {
    console.warn(`getGalleryImages(${gallerySlug}): Error fetching images`, error);
    return [];
  }
}
