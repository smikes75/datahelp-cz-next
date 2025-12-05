'use client';

/**
 * Mobile Phone Data Recovery stránka
 * PageHeader, features, supported devices, technical challenges, symptoms, action steps
 */

import { Smartphone, Droplet, Shield, AlertTriangle, Phone, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ServiceSchema } from '@/components/schema/ServiceSchema';

// PageHeader component
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

export function MobilePhoneRecoveryClient() {
  const t = useTranslations();

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: t('services.mobile.features.encryption'),
      description: t('services.mobile.features.encryptionDesc')
    },
    {
      icon: <Droplet className="h-8 w-8 text-accent" />,
      title: t('services.mobile.features.water'),
      description: t('services.mobile.features.waterDesc')
    },
    {
      icon: <Smartphone className="h-8 w-8 text-accent" />,
      title: t('services.mobile.features.screen'),
      description: t('services.mobile.features.screenDesc')
    }
  ];

  const symptoms = [
    t('services.mobile.symptoms.charging'),
    t('services.mobile.symptoms.bootLoop'),
    t('services.mobile.symptoms.noPower'),
    t('services.mobile.symptoms.redScreen'),
    t('services.mobile.symptoms.lines'),
    t('services.mobile.symptoms.recovery'),
    t('services.mobile.symptoms.update')
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceSchema
        name={t('services.mobile.title')}
        description={t('services.mobile.desc')}
        serviceType="Mobile Phone Data Recovery Service"
      />
      <PageHeader
        title={t('services.mobile.title')}
        subtitle={t('services.mobile.desc')}
        backgroundImage="mobile-recovery.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16">
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Challenges */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-primary">{t('services.mobile.challenges.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {t('services.mobile.challenges.trim.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('services.mobile.challenges.trim.desc')}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {t('services.mobile.challenges.encryption.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('services.mobile.challenges.encryption.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Symptoms */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-primary">{t('services.mobile.symptoms.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">{symptom}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Devices */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-primary">{t('services.mobile.supported.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">{t('services.mobile.supported.devices')}</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t('services.mobile.supported.android')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t('services.mobile.supported.tablets')}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">{t('services.mobile.supported.manufacturers')}</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Samsung</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Xiaomi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Huawei</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>OnePlus</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">{t('services.mobile.supported.brands')}</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Google Pixel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Sony</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Motorola</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>LG</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Steps */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">{t('services.mobile.action.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">1</div>
              <p className="text-lg">{t('services.mobile.action.step1')}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">2</div>
              <p className="text-lg">{t('services.mobile.action.step2')}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="text-lg">{t('services.mobile.action.step3')}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/poptavka-zachrany-dat"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition-colors shadow-lg"
          >
            <Phone className="h-5 w-5" />
            {t('hero.orderDiagnostics')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
