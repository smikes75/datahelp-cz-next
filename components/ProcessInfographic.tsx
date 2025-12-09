'use client';

/**
 * Process infografika - 6 kroků procesu záchrany dat
 * Desktop: mřížka
 * Mobile CS: collapsible
 * Mobile EN: normální mřížka
 */

import { useState } from 'react';
import { Package, Search, ThumbsUp, HardDrive, CheckCircle, Send, ShieldCheck, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from '@/contexts/TranslationsContext';

export function ProcessInfographic() {
  const t = useTranslations('process');
  const locale = useLocale();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isCzech = locale === 'cs';

  const steps = [
    {
      icon: <Package className="h-8 w-8 text-accent" />,
      title: t('reception.title'),
      description: t('reception.desc')
    },
    {
      icon: <Search className="h-8 w-8 text-accent" />,
      title: t('diagnosis.title'),
      description: t('diagnosis.desc')
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-accent" />,
      title: t('approval.title'),
      description: t('approval.desc')
    },
    {
      icon: <HardDrive className="h-8 w-8 text-accent" />,
      title: t('recovery.title'),
      description: t('recovery.desc')
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-accent" />,
      title: t('verification.title'),
      description: t('verification.desc')
    },
    {
      icon: <Send className="h-8 w-8 text-accent" />,
      title: t('delivery.title'),
      description: t('delivery.desc')
    }
  ];

  return (
    <section className="py-6 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Desktop header - hidden on mobile Czech */}
        <div className={`text-center mb-0 md:mb-8 ${isCzech ? 'hidden md:block' : ''}`}>
          <h2 className="text-3xl font-bold text-primary mb-2">
            {t('title')}
          </h2>
          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-sm">{t('guarantee')}</p>
          </div>
        </div>

        {/* Mobile Czech version - collapsible */}
        {isCzech && (
          <div className="md:hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-3 px-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors text-left"
              style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="text-center mb-2">
                <h2 className="text-3xl font-bold text-primary">
                  {t('title')}
                </h2>
              </div>
              {/* 6 icons in a row instead of "Zobrazit postup" text */}
              <div className="flex items-center justify-center gap-3 mt-3">
                <Package className="h-6 w-6 text-accent" />
                <Search className="h-6 w-6 text-accent" />
                <ThumbsUp className="h-6 w-6 text-accent" />
                <HardDrive className="h-6 w-6 text-accent" />
                <CheckCircle className="h-6 w-6 text-accent" />
                <Send className="h-6 w-6 text-accent" />
                <ChevronDown className={`h-5 w-5 text-primary ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <div className={`transition-all duration-500 overflow-hidden ${
              isExpanded ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}>
              <div className="grid grid-cols-1 gap-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="relative bg-white rounded-lg shadow-lg p-4"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex-shrink-0">{step.icon}</div>
                      <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop version and non-Czech mobile */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 ${isCzech ? 'hidden md:grid' : ''}`}>
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{step.icon}</div>
                <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
              </div>
              <div className={`transition-all duration-300 ${
                activeStep === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
              } overflow-hidden mt-2`}>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
