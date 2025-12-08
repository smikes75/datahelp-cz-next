'use client';

/**
 * Dynamický animovaný banner s konfigurovatelným textem a barvou
 * Použití: nastaveno přes admin panel (/admin/banner)
 */

interface DynamicAnnouncementBannerProps {
  text: string;
  bgColor: string;
}

// Mapování barev na Tailwind třídy
const COLOR_MAP: Record<string, string> = {
  'blue-900': 'bg-blue-900',
  'primary': 'bg-primary',
  'accent': 'bg-accent',
  'green-700': 'bg-green-700',
  'red-700': 'bg-red-700',
  'purple-700': 'bg-purple-700',
};

export function DynamicAnnouncementBanner({ text, bgColor }: DynamicAnnouncementBannerProps) {
  const bgClass = COLOR_MAP[bgColor] || 'bg-blue-900';

  return (
    <div className={`${bgClass} py-3 overflow-hidden`}>
      <div className="relative flex">
        <div className="animate-scroll whitespace-nowrap flex">
          <span className="mx-4 text-white font-medium inline-block">{text}</span>
          <span className="mx-4 text-white font-medium inline-block">{text}</span>
          <span className="mx-4 text-white font-medium inline-block">{text}</span>
          <span className="mx-4 text-white font-medium inline-block">{text}</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
