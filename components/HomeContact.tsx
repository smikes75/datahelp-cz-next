'use client';

/**
 * HomeContact sekce na homepage
 * Zobrazuje kontaktní formulář a mapu (pouze CS)
 */

import { useTranslations, useLocale } from '@/contexts/TranslationsContext';
import { Phone } from 'lucide-react';
import { Contact } from './Contact';

export function HomeContact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const showMap = locale === 'cs';

  return (
    <section className="py-16 pb-8 md:pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`${showMap ? 'max-w-7xl' : 'max-w-2xl'} mx-auto`}>
          <div className={`${showMap ? 'grid md:grid-cols-2 gap-8' : ''}`}>
            {/* Contact Form - hidden on mobile when showMap is true */}
            <div className={`bg-white p-8 rounded-lg shadow-lg ${showMap ? 'hidden md:block' : ''}`}>
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t('form.leaveMessage')}
              </h2>
              <Contact />
            </div>

            {/* Map - pouze CS */}
            {showMap && (
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Kde nás najdete
                </h2>
                {/* CLS-safe map container with fixed aspect ratio */}
                <div className="aspect-[4/3] rounded-lg overflow-hidden md:mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.4899373947447!2d14.447864776769673!3d50.09404217152393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94a7f4f7e9bb%3A0x8c8a8d8e8f8e8f8f!2sJirs%C3%ADkova%20541%2F1%2C%20186%2000%20Karl%C3%ADn!5e0!3m2!1scs!2scz!4v1234567890123!5m2!1scs!2scz"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="DataHelp.cz Location"
                  />
                </div>
                <div className="h-4"></div>
                <div className="grid md:grid-cols-2 gap-4 px-4 pb-4 pt-4">
                  <div className="text-center md:text-left">
                    <p className="text-gray-700">
                      <strong>DataHelp s.r.o.</strong>
                    </p>
                    <p className="text-gray-700 whitespace-pre-line">
                      {t('info.address')}
                    </p>
                  </div>
                  <div className="text-gray-700 text-sm text-center md:text-left">
                    <p className="font-semibold mb-1">Otevírací doba:</p>
                    <p>Po - Čt: 9:00 - 17:00</p>
                    <p>Pá: 8:00 - 15:30</p>
                    <p className="mt-1">
                      <strong>Tel.:</strong>{' '}
                      <a
                        href="tel:+420775220440"
                        className="text-primary hover:text-accent transition-colors"
                      >
                        +420 775 220 440
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nonstop Hotline Button - Hidden */}
        <div className="hidden">
          <a
            href="tel:+420775220440"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent ring-2 ring-primary text-white font-bold text-base rounded-lg transition-all shadow-md hover:scale-105"
          >
            <Phone className="h-5 w-5" />
            <span>Nonstop hotline</span>
          </a>
        </div>
      </div>
    </section>
  );
}
