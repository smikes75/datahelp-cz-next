'use client';

/**
 * Kalkulačka ceny - Price Calculator
 */

import { useState } from 'react';
import { Calculator, HardDrive, Smartphone, Database, Cpu, CheckCircle } from 'lucide-react';
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
          <div className="flex items-center gap-4 mb-4">
            <Calculator className="h-12 w-12" />
            <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
          </div>
          {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

type DeviceType = 'hdd' | 'ssd' | 'raid' | 'mobile' | '';
type DamageType = 'logical' | 'physical' | 'electronic' | 'complex' | '';
type Urgency = 'standard' | 'express' | 'super-express';

export default function PriceCalculatorPage() {
  const t = useTranslations();
  const [deviceType, setDeviceType] = useState<DeviceType>('');
  const [damageType, setDamageType] = useState<DamageType>('');
  const [urgency, setUrgency] = useState<Urgency>('standard');
  const [showResult, setShowResult] = useState(false);

  const deviceTypes = [
    { id: 'hdd' as const, icon: <HardDrive className="h-12 w-12" />, title: t('calculator.devices.hdd'), basePrice: 3500 },
    { id: 'ssd' as const, icon: <Cpu className="h-12 w-12" />, title: t('calculator.devices.ssd'), basePrice: 5000 },
    { id: 'raid' as const, icon: <Database className="h-12 w-12" />, title: t('calculator.devices.raid'), basePrice: 8000 },
    { id: 'mobile' as const, icon: <Smartphone className="h-12 w-12" />, title: t('calculator.devices.mobile'), basePrice: 6000 }
  ];

  const damageTypes = [
    { id: 'logical' as const, title: t('calculator.damage.logical'), multiplier: 1 },
    { id: 'electronic' as const, title: t('calculator.damage.electronic'), multiplier: 2 },
    { id: 'physical' as const, title: t('calculator.damage.physical'), multiplier: 3 },
    { id: 'complex' as const, title: t('calculator.damage.complex'), multiplier: 4 }
  ];

  const urgencyOptions = [
    { id: 'standard' as const, title: t('calculator.urgency.standard'), multiplier: 1 },
    { id: 'express' as const, title: t('calculator.urgency.express'), multiplier: 1.5 },
    { id: 'super-express' as const, title: t('calculator.urgency.superExpress'), multiplier: 2 }
  ];

  const calculatePrice = () => {
    if (!deviceType || !damageType) return null;

    const device = deviceTypes.find(d => d.id === deviceType);
    const damage = damageTypes.find(d => d.id === damageType);
    const urg = urgencyOptions.find(u => u.id === urgency);

    if (!device || !damage || !urg) return null;

    const basePrice = device.basePrice;
    const price = basePrice * damage.multiplier * urg.multiplier;

    return {
      min: Math.round(price),
      max: Math.round(price * 1.5)
    };
  };

  const handleCalculate = () => {
    if (deviceType && damageType) {
      setShowResult(true);
    }
  };

  const price = calculatePrice();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('calculator.title')}
        subtitle={t('calculator.subtitle')}
        backgroundImage="calculator-bg.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Step 1: Device Type */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">1. {t('calculator.step1')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {deviceTypes.map((device) => (
              <button
                key={device.id}
                onClick={() => {
                  setDeviceType(device.id);
                  setShowResult(false);
                }}
                className={`p-6 rounded-lg border-2 transition-all ${
                  deviceType === device.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300 hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-3 ${deviceType === device.id ? 'text-primary' : 'text-gray-400'}`}>
                    {device.icon}
                  </div>
                  <span className="font-medium">{device.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Damage Type */}
        {deviceType && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-6">2. {t('calculator.step2')}</h2>
            <div className="space-y-3">
              {damageTypes.map((damage) => (
                <button
                  key={damage.id}
                  onClick={() => {
                    setDamageType(damage.id);
                    setShowResult(false);
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    damageType === damage.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary/50'
                  }`}
                >
                  {damage.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Urgency */}
        {deviceType && damageType && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-6">3. {t('calculator.step3')}</h2>
            <div className="space-y-3">
              {urgencyOptions.map((urg) => (
                <button
                  key={urg.id}
                  onClick={() => {
                    setUrgency(urg.id);
                    setShowResult(false);
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    urgency === urg.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary/50'
                  }`}
                >
                  {urg.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Calculate Button */}
        {deviceType && damageType && !showResult && (
          <div className="text-center mb-6">
            <button
              onClick={handleCalculate}
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {t('calculator.calculate')}
            </button>
          </div>
        )}

        {/* Result */}
        {showResult && price && (
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">{t('calculator.result.title')}</h2>
            <div className="text-5xl font-bold mb-6">
              {price.min.toLocaleString()} - {price.max.toLocaleString()} {t('calculator.result.currency')}
            </div>
            <p className="text-lg text-white/90 mb-6">
              {t('calculator.result.note')}
            </p>
            <a
              href="tel:+420775220440"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('calculator.result.callUs')}: +420 775 220 440
            </a>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-2">{t('calculator.disclaimer.title')}</h3>
          <p className="text-gray-700 text-sm">
            {t('calculator.disclaimer.text')}
          </p>
        </div>
      </div>
    </div>
  );
}
