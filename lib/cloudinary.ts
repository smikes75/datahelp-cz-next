import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

// Upload image to Cloudinary
export async function uploadImage(
  file: Buffer,
  options?: {
    folder?: string;
    publicId?: string;
    transformation?: object[];
  }
): Promise<{
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      folder: options?.folder || 'datahelp/galleries',
      resource_type: 'image',
      // Auto-optimize images
      transformation: options?.transformation || [
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    };

    if (options?.publicId) {
      uploadOptions.public_id = options.publicId;
    }

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
            width: result.width,
            height: result.height,
          });
        } else {
          reject(new Error('Upload failed - no result'));
        }
      })
      .end(file);
  });
}

// Delete image from Cloudinary
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Failed to delete image:', error);
    return false;
  }
}

// Generate optimized image URL
export function getOptimizedUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  }
): string {
  const transformations: string[] = [];

  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  transformations.push(`q_${options?.quality || 'auto'}`);
  transformations.push(`f_${options?.format || 'auto'}`);

  const transformation = transformations.join(',');
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${publicId}`;
}

// Get blur placeholder URL (tiny version for loading)
export function getBlurPlaceholder(publicId: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_10,h_10,c_fill,q_10,e_blur:1000/${publicId}`;
}
