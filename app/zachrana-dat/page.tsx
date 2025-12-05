'use client';

import { useState } from 'react';
import { HardDrive, Smartphone, Database, Handshake, Check, ChevronRight, Clock, TrendingUp, Layers } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// PageHeader komponenta
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

// Hlavní stránka služeb
export default function ServicesPage() {
  const t = useTranslations();
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const services = [
    {
      icon: <HardDrive className="h-16 w-16 text-accent" />,
      title: t('services.hdd.title'),
      description: t('services.hdd.desc'),
      link: '/zachrana-dat/hdd',
      features: [
        t('services.hdd.features.mechanical'),
        t('services.hdd.features.electronic'),
        t('services.hdd.features.logical')
      ],
      stats: {
        successRate: '95%',
        avgTime: '2-5 days',
        startPrice: '8 750 Kč'
      }
    },
    {
      icon: <Smartphone className="h-16 w-16 text-accent" />,
      title: t('services.ssd.title'),
      description: t('services.ssd.desc'),
      link: '/zachrana-dat/ssd',
      features: [
        t('services.ssd.features.controller'),
        t('services.ssd.features.firmware'),
        t('services.ssd.features.flash')
      ],
      stats: {
        successRate: '85%',
        avgTime: '3-7 days',
        startPrice: '6 250 Kč'
      }
    },
    {
      icon: <Database className="h-16 w-16 text-accent" />,
      title: t('services.raid.title'),
      description: t('services.raid.desc'),
      link: '/zachrana-dat/raid',
      features: [
        t('services.raid.features.hardware'),
        t('services.raid.features.software'),
        t('services.raid.features.virtual')
      ],
      stats: {
        successRate: '90%',
        avgTime: '5-10 days',
        startPrice: '12 500 Kč'
      }
    },
    {
      icon: <Handshake className="h-16 w-16 text-accent" />,
      title: t('services.business.title'),
      description: t('services.business.desc'),
      link: '/zachrana-dat/firmy',
      features: [
        t('services.business.features.support'),
        t('services.business.features.security'),
        t('services.business.features.priority')
      ],
      stats: {
        successRate: t('services.card.individualApproach'),
        avgTime: 'Priority',
        startPrice: 'Custom'
      }
    }
  ];

  const comparisonFeatures = [
    { key: 'recoveryTime', label: t('services.comparison.features.recoveryTime'), icon: <Clock className="h-5 w-5" /> },
    { key: 'successRate', label: t('services.comparison.features.successRate'), icon: <TrendingUp className="h-5 w-5" /> },
    { key: 'complexity', label: t('services.comparison.features.complexity'), icon: <Layers className="h-5 w-5" /> },
    { key: 'startingPrice', label: t('services.comparison.features.startingPrice'), icon: <Database className="h-5 w-5" /> },
    { key: 'commonIssues', label: t('services.comparison.features.commonIssues'), icon: <Check className="h-5 w-5" /> },
    { key: 'dataTypes', label: t('services.comparison.features.dataTypes'), icon: <HardDrive className="h-5 w-5" /> }
  ];

  const serviceTypes = ['hdd', 'ssd', 'raid'];

  const timelineSteps = [
    { key: 'before', phase: 'start' },
    { key: 'diagnosis', phase: 'middle' },
    { key: 'approval', phase: 'middle' },
    { key: 'recovery', phase: 'middle' },
    { key: 'verification', phase: 'middle' },
    { key: 'after', phase: 'end' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        backgroundImage="services-bg.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16">
        {/* Služby grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group bg-gradient-to-br from-white via-white to-primary/5 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center mb-6">{service.description}</p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{index === 3 ? '' : t('services.card.successRate')}</span>
                    <span className={`font-semibold ${index === 3 ? 'text-accent' : 'text-primary'}`}>{service.stats.successRate}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{t('services.card.avgTime')}</span>
                    <span className="font-semibold text-primary">{service.stats.avgTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{t('services.card.from')}</span>
                    <span className="font-bold text-accent">{service.stats.startPrice}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center text-accent group-hover:translate-x-2 transition-transform">
                  <span className="font-semibold">{t('services.card.learnMore')}</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Srovnávací tabulka */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">{t('services.comparison.title')}</h2>
            <p className="text-gray-600">{t('services.comparison.subtitle')}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600 font-semibold">{t('services.comparison.featureLabel')}</th>
                  {serviceTypes.map((type) => (
                    <th key={type} className="text-center py-4 px-4">
                      <div className="flex flex-col items-center">
                        {type === 'hdd' && <HardDrive className="h-8 w-8 text-accent mb-2" />}
                        {type === 'ssd' && <Smartphone className="h-8 w-8 text-accent mb-2" />}
                        {type === 'raid' && <Database className="h-8 w-8 text-accent mb-2" />}
                        <span className="font-bold text-primary">{t(`services.${type}.title`)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr
                    key={feature.key}
                    className={`border-b border-gray-100 transition-all duration-200 ${
                      activeRow === feature.key ? 'bg-accent/5 scale-[1.02]' : 'hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => setActiveRow(feature.key)}
                    onMouseLeave={() => setActiveRow(null)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`${activeRow === feature.key ? 'text-accent' : 'text-gray-400'}`}>
                          {feature.icon}
                        </div>
                        <span className="font-medium text-gray-700">{feature.label}</span>
                      </div>
                    </td>
                    {serviceTypes.map((type) => (
                      <td key={type} className="text-center py-4 px-4">
                        <span className={`${activeRow === feature.key ? 'font-semibold text-primary' : 'text-gray-600'}`}>
                          {t(`services.comparison.values.${type}.${feature.key}`)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline proces */}
        <div className="bg-gray-50 py-6 md:py-12 -mx-4 md:-mx-8 mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">{t('services.timeline.title')}</h2>
              <p className="text-gray-600">{t('services.timeline.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timelineSteps.map((step, idx) => {
                const stepData = t.raw(`services.timeline.steps.${step.key}`) as { title: string; description: string };
                const stepNumber = idx + 1;

                return (
                  <div
                    key={step.key}
                    className="relative bg-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl"
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-primary">
                        <span className="text-white font-bold text-lg">{stepNumber}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-primary">
                        {stepData.title}
                      </h3>
                    </div>
                    <div className={`transition-all duration-300 ${
                      activeStep === idx ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
                    } overflow-hidden mt-2`}>
                      <p className="text-base text-gray-600">
                        {stepData.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA kalkulačka */}
        <div className="text-center">
          <Link
            href="/kalkulacka"
            className="inline-flex items-center space-x-2 accent-background text-white px-8 py-3 font-semibold hover:shadow-xl transition-shadow"
          >
            <span>{t('hero.getPrice')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
