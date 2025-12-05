'use client';

/**
 * Elfsight Reviews widget
 * Načítá externí script pro zobrazení hodnocení
 */

import { useEffect, useState } from 'react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { AlertTriangle } from 'lucide-react';

export function ElfsightReviews() {
  const t = useTranslations('reviews');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Load Elfsight platform script
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    script.defer = true;

    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 2000;

    const loadScript = () => {
      script.onload = () => {
        setError(false);
      };

      script.onerror = () => {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(loadScript, retryDelay);
        } else {
          setError(true);
        }
      };

      document.body.appendChild(script);
    };

    loadScript();

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
              {t('title')}
            </h2>
            <p className="text-yellow-600">{t('review1')}</p>
            <p className="text-yellow-600 mt-4">{t('review2')}</p>
            <p className="text-yellow-600 mt-4">{t('review3')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-8 pb-4 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-6 md:mb-12">
          {t('title')}
        </h2>
        <div
          className="elfsight-app-d4a576be-88da-4007-8183-5e430e73c73c"
          data-elfsight-app-lazy
        ></div>
      </div>
    </section>
  );
}
