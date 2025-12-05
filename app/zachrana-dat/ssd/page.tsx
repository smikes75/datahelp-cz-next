'use client';

/**
 * SSD Data Recovery stránka
 */

import { Shield, Cpu, Zap, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

function PageHeader({ title, subtitle, backgroundImage }: { title: string; subtitle?: string; backgroundImage: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={`/images/backgrounds/${backgroundImage}`}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(27, 56, 122, 1) 50%, rgba(27, 56, 122, 0) 100%)'
          }}
        />
      </div>
      <div className="relative z-10 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export default function SSDRecoveryPage() {
  const t = useTranslations();

  const features = [
    {
      icon: <Cpu className="h-8 w-8 text-accent" />,
      title: t('services.ssd.features.controller'),
      description: t('services.ssd.features.controllerDesc')
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: t('services.ssd.features.firmware'),
      description: t('services.ssd.features.firmwareDesc')
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: t('services.ssd.features.flash'),
      description: t('services.ssd.features.flashDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('services.ssd.title')}
        subtitle={t('services.ssd.desc')}
        backgroundImage="ssd-recovery.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-primary">{t('services.ssd.supported.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">{t('services.ssd.supported.devices')}</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t('services.ssd.supported.sata')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t('services.ssd.supported.nvme')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t('services.ssd.supported.usb')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t('services.ssd.supported.cards')}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">{t('services.ssd.supported.manufacturers')}</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Samsung, Kingston</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Crucial, Intel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>SanDisk, Western Digital</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Transcend, ADATA a další</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Link
          href="/sluzby/ssd/pripady"
          className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">{t('caseStudies.title')}</h2>
              <p className="text-gray-600">{t('caseStudies.description')}</p>
            </div>
            <ArrowRight className="h-8 w-8 text-accent" />
          </div>
        </Link>

        <div className="text-center">
          <Link
            href="/objednat-diagnostiku"
            className="inline-flex items-center space-x-2 accent-background text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-shadow"
          >
            <span>{t('hero.orderDiagnostics')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
