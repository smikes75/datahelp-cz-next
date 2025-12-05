/**
 * Image utility funkce pro práci s obrázky a pozadími
 */

/**
 * Vrací background style objekt pro inline styles
 * @param imagePath - Cesta k obrázku
 */
export const getBackgroundStyle = (imagePath: string) => ({
  backgroundImage: `url("${imagePath}")`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#1B387A' // Fallback barva
});

// Background images pro různé sekce
export const backgroundImages = {
  about: '/images/backgrounds/about-bg.webp',
  business: '/images/backgrounds/business-solutions.webp',
  contact: '/images/backgrounds/contact-bg.webp',
  hdd: '/images/backgrounds/hdd-recovery.webp',
  pricing: '/images/backgrounds/pricing-bg.webp',
  raid: '/images/backgrounds/raid-recovery.webp',
  services: '/images/backgrounds/services-bg.webp',
  ssd: '/images/backgrounds/ssd-recovery.webp',
  home: '/images/backgrounds/home-bg.webp'
};

// Galerie obrázků
export const galleryImages = {
  cleanRoom: '/images/gallery/clean-room.webp',
  dataCenter: '/images/gallery/data-center.webp',
  diagnostics: '/images/gallery/diagnostics.webp',
  serverRoom: '/images/gallery/server-room.webp'
};

/**
 * Generuje responsive image URL s různými velikostmi
 * Pro použití v srcSet atributu
 * @param url - URL obrázku
 */
export const getResponsiveImageUrl = (url: string) => {
  if (!url.startsWith('http')) return url;

  const sizes = [320, 640, 768, 1024, 1280, 1536];
  return sizes.map(size => {
    const params = new URLSearchParams({
      auto: 'format,compress',
      fit: 'crop',
      w: size.toString(),
      q: '80'
    });
    return `${url}?${params.toString()} ${size}w`;
  }).join(', ');
};
