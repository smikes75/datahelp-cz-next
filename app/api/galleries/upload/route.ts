import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client for server-side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const galleryId = formData.get('galleryId') as string;
    const gallerySlug = formData.get('gallerySlug') as string;

    if (!file || !galleryId) {
      return NextResponse.json(
        { error: 'Missing file or gallery ID' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const cloudinaryResult = await uploadImage(buffer, {
      folder: `datahelp/galleries/${gallerySlug || 'general'}`,
    });

    // Get current max sort_order for this gallery
    const { data: existingImages } = await supabase
      .from('gallery_images')
      .select('sort_order')
      .eq('gallery_id', galleryId)
      .order('sort_order', { ascending: false })
      .limit(1);

    const nextSortOrder = existingImages && existingImages.length > 0
      ? existingImages[0].sort_order + 1
      : 0;

    // Save to database
    const { data, error } = await supabase
      .from('gallery_images')
      .insert({
        gallery_id: galleryId,
        cloudinary_public_id: cloudinaryResult.publicId,
        cloudinary_url: cloudinaryResult.secureUrl,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        sort_order: nextSortOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save image to database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      image: data,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
