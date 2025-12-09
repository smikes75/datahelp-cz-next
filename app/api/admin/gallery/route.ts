import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'images', 'gallery');

// GET - List all images in gallery
export async function GET() {
  try {
    // Ensure gallery directory exists
    await fs.mkdir(GALLERY_DIR, { recursive: true });

    const files = await fs.readdir(GALLERY_DIR);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

    const images = await Promise.all(
      files
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return imageExtensions.includes(ext);
        })
        .map(async (file) => {
          const filePath = path.join(GALLERY_DIR, file);
          const stats = await fs.stat(filePath);
          return {
            name: file,
            path: `/images/gallery/${file}`,
            size: stats.size,
            lastModified: stats.mtime.toISOString(),
          };
        })
    );

    // Sort by last modified (newest first)
    images.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    );
  }
}

// POST - Upload new images
export async function POST(request: NextRequest) {
  try {
    // Ensure gallery directory exists
    await fs.mkdir(GALLERY_DIR, { recursive: true });

    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    const uploadedFiles: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        continue;
      }

      // Generate safe filename
      const ext = path.extname(file.name);
      const baseName = path.basename(file.name, ext)
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .toLowerCase();
      const timestamp = Date.now();
      const fileName = `${baseName}-${timestamp}${ext}`;

      const filePath = path.join(GALLERY_DIR, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      uploadedFiles.push(fileName);
    }

    return NextResponse.json({
      success: true,
      uploaded: uploadedFiles,
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}

// DELETE - Remove an image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'No file name provided' },
        { status: 400 }
      );
    }

    // Prevent path traversal
    const safeName = path.basename(name);
    const filePath = path.join(GALLERY_DIR, safeName);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    await fs.unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
