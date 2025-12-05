'use client';

/**
 * Statický banner s kontaktními informacemi
 * Desktop: email + otevírací doba + hotline
 * Mobile: pouze hotline
 */

import { useTranslations } from '@/contexts/TranslationsContext';
import { Mail, Clock, Phone } from 'lucide-react';

export function ContactBanner() {
  const t = useTranslations('contactBanner');

  return (
    <div className="bg-blue-900 py-3">
      <div className="container mx-auto px-4">
        {/* Desktop Version - Aligned with page content */}
        <div className="hidden md:grid md:grid-cols-3 items-center gap-4 text-white">
          {/* Email - Left */}
          <div className="flex items-center gap-2 justify-start">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:info@datahelp.cz"
              className="hover:text-gray-200 transition-colors"
            >
              info@datahelp.cz
            </a>
          </div>

          {/* Opening Hours - Center */}
          <div className="flex items-center gap-2 justify-center">
            <Clock className="h-4 w-4" />
            <span>{t('hours')}</span>
          </div>

          {/* Hotline - Right */}
          <div className="flex items-center gap-2 justify-end">
            <Phone className="h-4 w-4" />
            <a
              href="tel:+420775220440"
              className="hover:text-gray-200 transition-colors"
            >
              {t('hotline')}
            </a>
          </div>
        </div>

        {/* Mobile Version - Only Hotline */}
        <div className="md:hidden flex items-center justify-center text-white">
          <a
            href="tel:+420775220440"
            className="hover:text-gray-200 transition-colors"
          >
            {t('hotline')}
          </a>
        </div>
      </div>
    </div>
  );
}
