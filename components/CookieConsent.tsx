'use client';

import { useTranslations } from '@/contexts/TranslationsContext';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import Link from 'next/link';

export function CookieConsent() {
  const t = useTranslations('cookieConsent');
  const { showBanner, acceptAll, openSettings } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-28 md:bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t-4 border-accent">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
          {/* Text Content */}
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold text-primary mb-1 md:mb-2">
              {t('title')}
            </h3>
            <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
              {t('description')}{' '}
              <Link
                href="/cookies"
                className="text-accent hover:text-accent/80 underline font-semibold"
              >
                {t('learnMore')}
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
            <button
              onClick={acceptAll}
              className="order-1 md:order-2 px-4 md:px-6 py-2 md:py-2.5 bg-primary text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              {t('acceptAll')}
            </button>
            <button
              onClick={openSettings}
              className="order-2 md:order-1 px-4 md:px-6 py-2 md:py-2.5 bg-white border-2 border-primary text-primary text-sm md:text-base font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
            >
              {t('settings')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
