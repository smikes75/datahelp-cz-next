'use client';

/**
 * Services sekce zobrazující 4 hlavní služby
 * HDD, SSD, RAID/NAS a Business solutions
 */

import React from 'react';
import { HardDrive, Smartphone, Database, Handshake } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';

// Inline skeleton pro service card
function ServiceCardSkeleton() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="animate-pulse space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const t = useTranslations('services');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: <HardDrive className="h-16 w-16 text-accent" />,
      title: t('hdd.title'),
      description: t('hdd.desc'),
      link: '/sluzby/hdd',
      features: [
        t('hdd.features.mechanical'),
        t('hdd.features.electronic'),
        t('hdd.features.logical')
      ]
    },
    {
      icon: <Smartphone className="h-16 w-16 text-accent" />,
      title: t('ssd.title'),
      description: t('ssd.desc'),
      link: '/sluzby/ssd',
      features: [
        t('ssd.features.controller'),
        t('ssd.features.firmware'),
        t('ssd.features.flash')
      ]
    },
    {
      icon: <Database className="h-16 w-16 text-accent" />,
      title: t('raid.title'),
      description: t('raid.desc'),
      link: '/sluzby/raid',
      features: [
        t('raid.features.hardware'),
        t('raid.features.software'),
        t('raid.features.virtual')
      ]
    },
    {
      icon: <Handshake className="h-16 w-16 text-accent" />,
      title: t('business.title'),
      description: t('business.desc'),
      link: '/sluzby/business-solutions',
      features: [
        t('business.features.support'),
        t('business.features.security'),
        t('business.features.priority')
      ]
    }
  ];

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-gray-200 h-8 w-64 mx-auto rounded mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          {t('title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="bg-gradient-to-br from-white via-white to-primary/5 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-4 text-primary">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-6">{service.description}</p>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full shadow-sm"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
