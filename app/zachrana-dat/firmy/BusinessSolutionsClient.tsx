'use client';

/**
 * Business Solutions stránka
 */

import { Clock, Shield, Headphones, Award, Server, Laptop, Lock, BookOpen } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
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

export function BusinessSolutionsClient() {
  const t = useTranslations();

  const features = [
    {
      icon: <Clock className="h-12 w-12 text-accent" />,
      title: t('services.business.features.support'),
      description: t('services.business.features.supportDesc')
    },
    {
      icon: <Shield className="h-12 w-12 text-accent" />,
      title: t('services.business.features.security'),
      description: t('services.business.features.securityDesc')
    },
    {
      icon: <Headphones className="h-12 w-12 text-accent" />,
      title: t('services.business.features.priority'),
      description: t('services.business.features.priorityDesc')
    },
    {
      icon: <Award className="h-12 w-12 text-accent" />,
      title: t('services.business.features.sla'),
      description: t('services.business.features.slaDesc')
    }
  ];

  const businessServices = [
    {
      icon: <Server className="h-6 w-6 text-accent" />,
      title: t('services.business.services.servers'),
      description: t('services.business.services.serversDesc')
    },
    {
      icon: <Laptop className="h-6 w-6 text-accent" />,
      title: t('services.business.services.workstations'),
      description: t('services.business.services.workstationsDesc')
    },
    {
      icon: <Lock className="h-6 w-6 text-accent" />,
      title: t('services.business.services.ransomware'),
      description: t('services.business.services.ransomwareDesc')
    },
    {
      icon: <BookOpen className="h-6 w-6 text-accent" />,
      title: t('services.business.services.consulting'),
      description: t('services.business.services.consultingDesc')
    }
  ];

  const references = [
    t('services.business.references.banks'),
    t('services.business.references.government'),
    t('services.business.references.hospitals'),
    t('services.business.references.industry'),
    t('services.business.references.it'),
    t('services.business.references.education')
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('services.business.title')}
        subtitle={t('services.business.desc')}
        backgroundImage="business-solutions.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16">
        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-primary">{feature.title}</h3>
              <p className="text-gray-600 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-primary">{t('services.business.services.title')}</h2>
          <div className="space-y-6">
            {businessServices.map((service, index) => (
              <div key={index} className="border-l-4 border-accent pl-6">
                <div className="flex items-center space-x-3 mb-2">
                  {service.icon}
                  <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reference */}
        <div className="bg-primary text-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">{t('services.business.references.title')}</h2>
          <p className="text-lg mb-4">{t('services.business.references.subtitle')}</p>
          <ul className="space-y-2 text-white/90">
            {references.map((ref, index) => (
              <li key={index}>• {ref}</li>
            ))}
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('services.business.cta.title')}</h2>
          <p className="text-xl mb-8">{t('services.business.cta.subtitle')}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="tel:+420775220440"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              +420 775 220 440
            </a>
            <a
              href="mailto:info@datahelp.cz"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              info@datahelp.cz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
