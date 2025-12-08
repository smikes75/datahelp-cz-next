'use client';

/**
 * Kalkulačka ceny - Price Calculator
 * Matches oldprototype/src/pages/PriceCalculatorPage.tsx
 */

import { useState, useEffect } from 'react';
import { Calculator, HardDrive, Smartphone, Database, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageHeader } from '@/components/PageHeader';

type DamageType =
  | 'logical' | 'physical' | 'electronic'
  | 'platter' | 'head' | 'motor'
  | 'controller' | 'flash' | 'encryption'
  | 'config' | 'multiple-disks'
  | 'water' | 'screen' | 'connector';

interface CalculatorState {
  deviceType: 'hdd' | 'ssd' | 'raid' | 'mobile' | '';
  damageType: DamageType | '';
}

export default function KalkulackaClient() {
  const t = useTranslations('priceCalculator');
  const tServices = useTranslations('services');
  const searchParams = useSearchParams();

  const [calculator, setCalculator] = useState<CalculatorState>({
    deviceType: '',
    damageType: ''
  });

  const [showResult, setShowResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const deviceParam = searchParams.get('device') as 'hdd' | 'ssd' | 'raid' | 'mobile' | null;
    if (deviceParam && ['hdd', 'ssd', 'raid', 'mobile'].includes(deviceParam)) {
      setCalculator(prev => ({ ...prev, deviceType: deviceParam }));
      setCurrentStep(2);
    }
  }, [searchParams]);

  const deviceTypes = [
    {
      id: 'hdd' as const,
      icon: <HardDrive className="h-8 w-8" />,
      title: tServices('hdd.title'),
      description: t('deviceTypes.hdd'),
      basePrice: 3500
    },
    {
      id: 'ssd' as const,
      icon: <Cpu className="h-8 w-8" />,
      title: tServices('ssd.title'),
      description: t('deviceTypes.ssd'),
      basePrice: 2500
    },
    {
      id: 'mobile' as const,
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobilní zařízení',
      description: 'Telefony, tablety, smartphony',
      basePrice: 2000
    },
    {
      id: 'raid' as const,
      icon: <Database className="h-8 w-8" />,
      title: tServices('raid.title'),
      description: t('deviceTypes.raid'),
      basePrice: 5000
    }
  ];

  const damageTypesByDevice = {
    hdd: [
      {
        id: 'logical' as const,
        title: t('damageTypes.hdd.logical'),
        description: t('damageTypes.hdd.logicalDesc'),
        multiplier: 1.0
      },
      {
        id: 'platter' as const,
        title: t('damageTypes.hdd.platter'),
        description: t('damageTypes.hdd.platterDesc'),
        multiplier: 2.5
      },
      {
        id: 'head' as const,
        title: t('damageTypes.hdd.head'),
        description: t('damageTypes.hdd.headDesc'),
        multiplier: 2.2
      },
      {
        id: 'electronic' as const,
        title: t('damageTypes.hdd.electronic'),
        description: t('damageTypes.hdd.electronicDesc'),
        multiplier: 1.5
      }
    ],
    ssd: [
      {
        id: 'logical' as const,
        title: t('damageTypes.ssd.logical'),
        description: t('damageTypes.ssd.logicalDesc'),
        multiplier: 1.0
      },
      {
        id: 'controller' as const,
        title: t('damageTypes.ssd.controller'),
        description: t('damageTypes.ssd.controllerDesc'),
        multiplier: 2.3
      },
      {
        id: 'flash' as const,
        title: t('damageTypes.ssd.flash'),
        description: t('damageTypes.ssd.flashDesc'),
        multiplier: 2.8
      },
      {
        id: 'electronic' as const,
        title: t('damageTypes.ssd.electronic'),
        description: t('damageTypes.ssd.electronicDesc'),
        multiplier: 1.6
      }
    ],
    raid: [
      {
        id: 'logical' as const,
        title: t('damageTypes.raid.logical'),
        description: t('damageTypes.raid.logicalDesc'),
        multiplier: 1.2
      },
      {
        id: 'config' as const,
        title: t('damageTypes.raid.config'),
        description: t('damageTypes.raid.configDesc'),
        multiplier: 1.5
      },
      {
        id: 'multiple-disks' as const,
        title: t('damageTypes.raid.multipleDisks'),
        description: t('damageTypes.raid.multipleDisksDesc'),
        multiplier: 2.5
      },
      {
        id: 'controller' as const,
        title: t('damageTypes.raid.controller'),
        description: t('damageTypes.raid.controllerDesc'),
        multiplier: 1.8
      }
    ],
    mobile: [
      {
        id: 'logical' as const,
        title: t('damageTypes.mobile.logical'),
        description: t('damageTypes.mobile.logicalDesc'),
        multiplier: 1.0
      },
      {
        id: 'water' as const,
        title: t('damageTypes.mobile.water'),
        description: t('damageTypes.mobile.waterDesc'),
        multiplier: 1.8
      },
      {
        id: 'encryption' as const,
        title: t('damageTypes.mobile.encryption'),
        description: t('damageTypes.mobile.encryptionDesc'),
        multiplier: 2.5
      },
      {
        id: 'flash' as const,
        title: t('damageTypes.mobile.flash'),
        description: t('damageTypes.mobile.flashDesc'),
        multiplier: 2.2
      }
    ]
  };

  const calculatePrice = () => {
    if (!calculator.deviceType || !calculator.damageType) return null;

    const device = deviceTypes.find(d => d.id === calculator.deviceType);
    const damageTypes = damageTypesByDevice[calculator.deviceType as keyof typeof damageTypesByDevice];
    const damage = damageTypes?.find(d => d.id === calculator.damageType);

    if (!device || !damage) return null;

    const basePrice = device.basePrice;
    const finalPrice = Math.round(basePrice * damage.multiplier);

    return {
      basePrice,
      finalPrice,
      currency: 'Kč'
    };
  };

  const resetCalculator = () => {
    setShowResult(false);
    setCurrentStep(1);
    setCalculator({
      deviceType: '',
      damageType: ''
    });
  };

  const handleDeviceSelect = (deviceId: 'hdd' | 'ssd' | 'raid' | 'mobile') => {
    setCalculator({...calculator, deviceType: deviceId, damageType: ''});
    setCurrentStep(2);
  };

  const handleDamageSelect = (damageId: DamageType) => {
    setCalculator({...calculator, damageType: damageId});
    setShowResult(true);

    // Scroll to result after a short delay
    setTimeout(() => {
      const resultElement = document.getElementById('calculator-result');
      if (resultElement) {
        const headerOffset = 100;
        const elementPosition = resultElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const price = calculatePrice();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="pricing-bg.webp"
      />

      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Step 1: Device Type Selection */}
          {!showResult && currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-3" />
                {t('steps.deviceType')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {deviceTypes.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => handleDeviceSelect(device.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      calculator.deviceType === device.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`mb-4 ${calculator.deviceType === device.id ? 'text-primary' : 'text-accent'}`}>
                        {device.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{device.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{device.description}</p>
                      <span className="text-primary font-bold">
                        {t('from')} {device.basePrice.toLocaleString('cs-CZ')} Kč
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Damage Type Selection */}
          {!showResult && currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              {/* Selected Device Info */}
              <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 mb-6 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <div className="flex items-center space-x-2 text-primary font-semibold">
                  <span className="inline-block">{deviceTypes.find(d => d.id === calculator.deviceType)?.icon}</span>
                  <span>{deviceTypes.find(d => d.id === calculator.deviceType)?.title}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-primary mb-6">
                {t('steps.damageType')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {calculator.deviceType && damageTypesByDevice[calculator.deviceType as keyof typeof damageTypesByDevice]?.map((damage) => (
                  <button
                    key={damage.id}
                    onClick={() => handleDamageSelect(damage.id)}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      calculator.damageType === damage.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <h3 className="font-semibold text-lg mb-2">{damage.title}</h3>
                    <p className="text-sm text-gray-600">{damage.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {showResult && price && (
            <div id="calculator-result" className="bg-white rounded-lg shadow-lg p-8 mb-8">
              {/* Selection Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-primary mb-4">{t('result.yourSelection')}</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">{t('result.deviceType')}</span>
                    <p className="text-primary">
                      {deviceTypes.find(d => d.id === calculator.deviceType)?.title}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('result.damageType')}</span>
                    <p className="text-primary">
                      {calculator.deviceType && damageTypesByDevice[calculator.deviceType as keyof typeof damageTypesByDevice]?.find(d => d.id === calculator.damageType)?.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {t('result.title')}
                </h2>
                <div className="text-4xl font-bold text-primary mb-6">
                  {price.finalPrice.toLocaleString('cs-CZ')} {price.currency}
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-semibold text-primary mb-2">{t('result.warning.title')}</h3>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>• {t('result.warning.noDataNoPayment')}</li>
                        <li>• {t('result.warning.diagnosis')}</li>
                        <li>• {t('result.warning.finalPrice')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/poptavka-zachrany-dat"
                    className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Objednat diagnostiku
                  </Link>
                  <button
                    onClick={resetCalculator}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    {t('result.calculateAgain')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
