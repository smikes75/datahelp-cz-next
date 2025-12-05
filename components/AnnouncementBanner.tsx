'use client';

/**
 * Animovaný banner pro speciální oznámení
 * Použití: akce, PF přání, důležitá oznámení
 */

import { useTranslations } from '@/contexts/TranslationsContext';

export function AnnouncementBanner() {
  const t = useTranslations('announcementBanner');

  const content = t('message');

  return (
    <div className="bg-blue-900 py-3 overflow-hidden">
      <div className="relative flex">
        <div className="animate-scroll whitespace-nowrap flex">
          <span className="mx-4 text-white font-medium inline-block">{content}</span>
          <span className="mx-4 text-white font-medium inline-block">{content}</span>
          <span className="mx-4 text-white font-medium inline-block">{content}</span>
          <span className="mx-4 text-white font-medium inline-block">{content}</span>
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
