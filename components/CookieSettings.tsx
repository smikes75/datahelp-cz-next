'use client';

import { useTranslations } from '@/contexts/TranslationsContext';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { X, Lock } from 'lucide-react';
import Link from 'next/link';

export function CookieSettings() {
  const t = useTranslations('cookieSettings');
  const {
    showSettings,
    preferences,
    updatePreferences,
    savePreferences,
    closeSettings,
  } = useCookieConsent();

  if (!showSettings) return null;

  const cookieCategories = [
    {
      key: 'functional',
      locked: true,
    },
    {
      key: 'analytical',
      locked: false,
    },
    {
      key: 'marketing',
      locked: false,
    },
    {
      key: 'personalization',
      locked: false,
    },
  ] as const;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">
            {t('title')}
          </h2>
          <button
            onClick={closeSettings}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">
            {t('description')}{' '}
            <Link
              href="/informace-o-cookies"
              onClick={closeSettings}
              className="text-accent hover:text-accent/80 underline font-semibold"
            >
              {t('moreInfo')}
            </Link>
          </p>

          {/* Cookie Categories */}
          <div className="space-y-4 mb-8">
            {cookieCategories.map((category) => (
              <div
                key={category.key}
                className="border border-gray-200 rounded-lg p-4 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-primary">
                      {t(`categories.${category.key}.title`)}
                    </h3>
                    {category.locked && (
                      <Lock className="h-4 w-4 text-gray-400" />
                    )}
                  </div>

                  {/* Toggle Switch - pure inline styles */}
                  <div
                    role="switch"
                    aria-checked={preferences[category.key]}
                    tabIndex={category.locked ? -1 : 0}
                    onClick={() =>
                      !category.locked && updatePreferences({
                        [category.key]: !preferences[category.key],
                      })
                    }
                    onKeyDown={(e) => {
                      if (!category.locked && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        updatePreferences({
                          [category.key]: !preferences[category.key],
                        });
                      }
                    }}
                    style={{
                      width: '44px',
                      minWidth: '44px',
                      height: '24px',
                      borderRadius: '9999px',
                      backgroundColor: category.locked
                        ? '#d1d5db'
                        : preferences[category.key]
                          ? '#1B387A'
                          : '#d1d5db',
                      cursor: category.locked ? 'not-allowed' : 'pointer',
                      position: 'relative',
                      transition: 'background-color 200ms',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '9999px',
                        backgroundColor: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                        position: 'absolute',
                        top: '2px',
                        left: preferences[category.key] ? '22px' : '2px',
                        transition: 'left 200ms',
                      }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(`categories.${category.key}.description`)}
                </p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={savePreferences}
            className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );
}
