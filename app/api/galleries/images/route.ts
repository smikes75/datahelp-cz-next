import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/cloudinary';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client for server-side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - Fetch images for a gallery (public endpoint for frontend)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gallerySlug = searchParams.get('gallery');

    if (!gallerySlug) {
      return NextResponse.json(
        { error: 'Gallery slug is required' },
        { status: 400 }
      );
    }

    // First get the gallery
    const { data: gallery, error: galleryError } = await supabase
      .from('galleries')
      .select('id, name, slug, is_active')
      .eq('slug', gallerySlug)
      .eq('is_active', true)
      .single();

    if (galleryError || !gallery) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    // Get images for this gallery
    const { data: images, error: imagesError } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('gallery_id', gallery.id)
      .order('sort_order', { ascending: true });

    if (imagesError) {
      console.error('Database error:', imagesError);
      return NextResponse.json(
        { error: 'Failed to fetch images' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      gallery: {
        name: gallery.name,
        slug: gallery.slug,
      },
      images: images || [],
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an image from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { publicId } = body;

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    const success = await deleteImage(publicId);

    if (!success) {
      console.warn('Failed to delete from Cloudinary:', publicId);
      // Don't fail the request - image might already be deleted
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
