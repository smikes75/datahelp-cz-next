'use client';

/**
 * Hero sekce na homepage
 * Zobrazuje hlavní nadpis, CTA tlačítka a 3 klíčové výhody
 */

import React from 'react';
import { ShieldCheck, Cpu, Trophy } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { backgroundImages } from '@/lib/utils/imageUtils';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <div className="relative bg-primary">
      {/* Background image - positioned on right half like datahelp.eu */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Image only on right 50% */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2">
          <Image
            src={backgroundImages.home}
            alt=""
            fill
            className="object-cover"
            style={{
              objectPosition: 'left center'
            }}
            priority
            fetchPriority="high"
          />
        </div>
        {/* Gradient overlay from left (solid blue) to right (transparent) */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgb(27, 56, 122) 50%, rgba(27, 56, 122, 0) 100%)'
          }}
        ></div>
      </div>

      {/* Obsah */}
      <div className="relative z-10 text-white py-6 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Desktop title & subtitle */}
            <h1 className="hidden md:block text-5xl font-bold mb-6 whitespace-pre-line">
              {t('title')}
            </h1>
            <p className="hidden md:block text-xl mb-8 whitespace-pre-line">
              {t('subtitle')}
            </p>
            {/* Mobile title & subtitle - shorter */}
            <h1 className="block md:hidden text-3xl font-bold mb-4">
              {t('titleMobile')}
            </h1>
            <p className="block md:hidden text-lg mb-6 whitespace-pre-line">
              {t('subtitleMobile')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8 md:mt-8">
              <Link
                href="/cenik-zachrany-dat"
                className="accent-background text-white text-sm md:text-lg px-3 py-1.5 md:px-6 md:py-3 rounded-lg font-bold md:font-semibold inline-flex items-center justify-center"
              >
                Ceník
              </Link>
              <Link
                href="/poptavka-zachrany-dat"
                className="bg-white text-primary text-sm md:text-lg px-3 py-1.5 md:px-6 md:py-3 rounded-lg font-bold md:font-semibold inline-flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                {t('orderDiagnostics')}
              </Link>
            </div>
          </div>

          {/* Klíčové výhody - pouze desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 mt-16">
            <div className="flex items-center space-x-4">
              <Trophy className="h-12 w-12 text-accent" />
              <div>
                <h3 className="font-semibold text-lg">{t('experience')}</h3>
                <p>{t('experienceDesc')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Cpu className="h-12 w-12 text-accent" />
              <div>
                <h3 className="font-semibold text-lg">{t('technology')}</h3>
                <p>{t('technologyDesc')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ShieldCheck className="h-12 w-12 text-accent" />
              <div>
                <h3 className="font-semibold text-lg">{t('security')}</h3>
                <p>{t('securityDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
