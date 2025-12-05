'use client';

/**
 * Scrollující banner s klíčovými výhodami
 * Zobrazuje se pod Hero sekcí
 */

import { useTranslations } from '@/contexts/TranslationsContext';

export function ScrollingBanner() {
  const t = useTranslations('banner');

  const content = `${t('noPayment')} • ${t('freeConsultation')} • ${t('secureRecovery')} • ${t('certified')} •`;

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
