'use client';


/**
 * Ceník - Price list stránka
 * Device cards s rozbalovacími detaily, FAQ, Service list
 */

import React, { useState, useRef } from 'react';
import { HardDrive, Smartphone, Database, Cpu, ChevronDown, ChevronUp, Wrench, AlertCircle, ClipboardList, Calculator, Microscope, Clock, Zap } from 'lucide-react';
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

// Service Price List komponenta
interface PriceItem {
  title: string;
  price: string;
}

interface PriceSection {
  icon: React.ReactNode;
  title: string;
  items: PriceItem[];
}

function ServicePriceList({ sections }: { sections: PriceSection[] }) {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="mt-4">
      <div className="grid gap-4">
        {sections.map((section, index) => {
          const isExpanded = expandedSections.includes(index);

          return (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="faq-button w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">{section.icon}</div>
                  <h3 className="text-xl font-semibold text-primary">{section.title}</h3>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
                )}
              </button>

              <div className={`transition-all duration-300 overflow-hidden ${
                isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 pt-2 space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-700">{item.title}</span>
                      <div className="flex-shrink-0 ml-4">
                        <span className="font-bold text-primary bg-primary/5 px-3 py-1 rounded-full whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Hlavní stránka ceníku
export function PricingClient() {
  const t = useTranslations();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [isServiceListExpanded, setIsServiceListExpanded] = useState(false);
  const [expandedFaqItems, setExpandedFaqItems] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleCard = (index: number) => {
    const isCurrentlyExpanded = expandedCards.includes(index);

    setExpandedCards(prev =>
      prev.includes(index)
        ? []
        : [index]
    );

    if (!isCurrentlyExpanded) {
      setTimeout(() => {
        const element = cardRefs.current[index];
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const toggleFaqItem = (index: number) => {
    setExpandedFaqItems(prev =>
      prev.includes(index)
        ? []
        : [index]
    );
  };

  const priceUnit = 'Kč';
  const hourlyUnit = 'Kč/hod';

  const prices = {
    basicDiagnostics: `0 ${priceUnit}`,
    detailedDiagnostics: `1 250 ${priceUnit}`,
    deletedRecovery: `1 000 ${hourlyUnit}`,
    filesystemRecovery: `1 250 ${hourlyUnit}`,
    compressedRecovery: `1 125 ${hourlyUnit}`,
    raidRecovery: `1 500 ${hourlyUnit}`,
    databaseRecovery: `1 375 ${hourlyUnit}`,
    electronicsRepair: `1 750 ${hourlyUnit}`,
    headsReplacement: `2 500 ${hourlyUnit}`,
    mechanicsRepair: `2 250 ${hourlyUnit}`,
    bgaRepair: `2 750 ${hourlyUnit}`,
    romEmulator: `2 375 ${hourlyUnit}`,
    serviceArea: `2 625 ${hourlyUnit}`,
    pc3000Work: `2 250 ${hourlyUnit}`,
    nandReconstruction: `2 500 ${hourlyUnit}`,
    securityChips: `3 000 ${hourlyUnit}`,
    mcmtTables: `2 750 ${hourlyUnit}`,
    firmwareAnalysis: `2 625 ${hourlyUnit}`,
    reverseEngineering: `2 375 ${hourlyUnit}`,
    damagedService: `2 750 ${hourlyUnit}`
  };

  const deviceCards = [
    {
      icon: <HardDrive className="h-8 w-8" />,
      title: 'HDD - Pevné disky',
      description: 'Obnova dat z mechanických pevných disků',
      deviceType: 'hdd' as const,
      software: {
        description: 'Smazané soubory, poškozený souborový systém, formátování',
        priceFrom: '3 500 Kč'
      },
      hardware: {
        description: 'Mechanické poškození, vadné hlavy, elektronika, servisní oblast',
        priceFrom: '6 000 Kč'
      },
      combined: {
        description: 'Kombinace softwarového a hardwarového poškození',
        priceFrom: '7 000 Kč'
      }
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'SSD - Solid State disky',
      description: 'Obnova dat z SSD disků a flash pamětí',
      deviceType: 'ssd' as const,
      software: {
        description: 'Logické poškození, ztracené oddíly, TRIM problémy',
        priceFrom: '2 500 Kč'
      },
      hardware: {
        description: 'Nefunkční řadič, NAND čipy, BGA rekonstrukce',
        priceFrom: '6 000 Kč'
      },
      combined: {
        description: 'Kombinace softwarového a hardwarového poškození',
        priceFrom: '8 000 Kč'
      }
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobilní zařízení',
      description: 'Obnova dat z telefonů a tabletů',
      deviceType: 'mobile' as const,
      software: {
        description: 'Omylem smazaná data, resetované telefony, zálohy',
        priceFrom: '2 000 Kč'
      },
      hardware: {
        description: 'Poškozená paměť eMMC/UFS, chip-off recovery',
        priceFrom: '6 500 Kč'
      },
      combined: {
        description: 'Kombinace softwarového a hardwarového poškození',
        priceFrom: '7 500 Kč'
      }
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: 'RAID/NAS systémy',
      description: 'Obnova dat z RAID polí a NAS serverů',
      deviceType: 'raid' as const,
      software: {
        description: 'Rozpad RAID/NAS, chybná konfigurace, chybějící disky',
        priceFrom: '5 000 Kč'
      },
      hardware: {
        description: 'Více vadných disků, komplexní rekonstrukce, NAS servery',
        priceFrom: '14 000 Kč'
      },
      combined: {
        description: 'Kombinace softwarového a hardwarového poškození více disků',
        priceFrom: '19 000 Kč'
      }
    }
  ];

  const servicePriceSections: PriceSection[] = [
    {
      icon: <Microscope className="h-6 w-6 text-accent" />,
      title: 'Diagnostika',
      items: [
        { title: 'Základní diagnostika', price: prices.basicDiagnostics },
        { title: 'Diagnostika s protokolem', price: prices.detailedDiagnostics }
      ]
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent" />,
      title: 'Softwarové závady',
      items: [
        { title: 'Obnova smazaných dat', price: prices.deletedRecovery },
        { title: 'Oprava souborového systému', price: prices.filesystemRecovery },
        { title: 'Obnova komprimovaných dat', price: prices.compressedRecovery },
        { title: 'Rekonstrukce RAID/NAS', price: prices.raidRecovery },
        { title: 'Obnova databází', price: prices.databaseRecovery }
      ]
    },
    {
      icon: <Wrench className="h-6 w-6 text-accent" />,
      title: 'Hardwarové chyby ',
      items: [
        { title: 'Závada elektroniky', price: prices.electronicsRepair },
        { title: 'Výměna hlav', price: prices.headsReplacement },
        { title: 'Závada mechaniky', price: prices.mechanicsRepair },
        { title: 'BGA přepájení', price: prices.bgaRepair },
        { title: 'ROM emulátor', price: prices.romEmulator },
        { title: 'Servisní zóna', price: prices.serviceArea }
      ]
    },
    {
      icon: <Zap className="h-6 w-6 text-accent" />,
      title: 'Specializované služby',
      items: [
        { title: 'Práce s PC-3000', price: prices.pc3000Work },
        { title: 'Rekonstrukce NAND', price: prices.nandReconstruction },
        { title: 'Bezpečnostní čipy', price: prices.securityChips },
        { title: 'MCMT tabulky', price: prices.mcmtTables },
        { title: 'Analýza firmware', price: prices.firmwareAnalysis },
        { title: 'Reverzní inženýrství', price: prices.reverseEngineering },
        { title: 'Poškozená servisní zóna', price: prices.damagedService }
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: 'Expresní služby',
      items: [
        { title: 'Bez ohledu na pracovní dobu, Nonstop', price: '+100%' },
        { title: 'Přednostní řešení', price: '+50%' }
      ]
    }
  ];

  const faqItems = [
    {
      question: 'Jak se stanovuje konečná cena?',
      answer: 'Konečná cena se stanoví po bezplatné diagnostice, kdy přesně určíme typ a rozsah poškození. Cena zahrnuje veškeré práce potřebné k záchraně dat.'
    },
    {
      question: 'Co zahrnuje bezplatná diagnostika?',
      answer: 'Bezplatná diagnostika zahrnuje prvotní posouzení média – určíme typ a rozsah poškození a na základě toho vám sdělíme, zda je záchrana dat možná a kolik bude stát. Celý proces je nezávazný a nic neplatíte.'
    },
    {
      question: 'Jak dlouho trvá záchrana dat?',
      answer: 'Standardní doba je 5-10 pracovních dnů. Pro urgentní případy nabízíme expresní službu (24-48 hodin) s příplatkem.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Ceník"
        subtitle="Ceny bez skrytých poplatků. Platíte pouze za úspěšně zachráněná data."
        backgroundImage="pricing-bg.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 pt-8 pb-4">
        {/* Device Pricing Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-3">
            Ceník dle typu zařízení
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Výsledná cena závisí na typu poškození a komplexnosti případu. Kliknutím na kartu zobrazíte detailní rozpis cen.
          </p>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {deviceCards.map((card, index) => {
              const isExpanded = expandedCards.includes(index);

              return (
                <button
                  key={index}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  onClick={() => toggleCard(index)}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    isExpanded
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`${isExpanded ? 'text-primary' : 'text-accent'}`}>
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-6 space-y-4 border-t border-gray-200 pt-4" onClick={(e) => e.stopPropagation()}>
                      {/* Software Damage */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-5 w-5 text-accent flex-shrink-0" />
                            <h4 className="font-semibold text-gray-800">Softwarové poškození</h4>
                          </div>
                          <div className="text-primary font-bold whitespace-nowrap ml-7 sm:ml-0">
                            <span className="text-sm">od </span>
                            <span className="text-lg">{card.software.priceFrom}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-7">{card.software.description}</p>
                      </div>

                      {/* Hardware Damage */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Wrench className="h-5 w-5 text-accent flex-shrink-0" />
                            <h4 className="font-semibold text-gray-800">Hardwarové závady</h4>
                          </div>
                          <div className="text-primary font-bold whitespace-nowrap ml-7 sm:ml-0">
                            <span className="text-sm">od </span>
                            <span className="text-lg">{card.hardware.priceFrom}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-7">{card.hardware.description}</p>
                      </div>

                      {/* Combined Damage */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-5 w-5 text-accent flex-shrink-0" />
                            <h4 className="font-semibold text-gray-800">Kombinované poškození</h4>
                          </div>
                          <div className="text-primary font-bold whitespace-nowrap ml-7 sm:ml-0">
                            <span className="text-sm">od </span>
                            <span className="text-lg">{card.combined.priceFrom}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-7">{card.combined.description}</p>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Link
                          href="/poptavka-zachrany-dat"
                          className="block bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <ClipboardList className="h-5 w-5" />
                          <span>Objednat diagnostiku</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Často kladené dotazy
          </h2>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {faqItems.map((item, index) => {
              const isExpanded = expandedFaqItems.includes(index);

              return (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaqItem(index)}
                    className="faq-button w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none text-left"
                  >
                    <h3 className="text-lg font-semibold text-primary pr-4 flex-1">{item.question}</h3>
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-primary flex-shrink-0" />
                    )}
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Price List - Wrapped in Accordion */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setIsServiceListExpanded(!isServiceListExpanded)}
              className="faq-button w-full p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-primary mb-1">
                  Detailní položkový ceník
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Pro firmy a IT specialisty
                </p>
              </div>
              {isServiceListExpanded ? (
                <ChevronUp className="h-5 w-5 text-primary flex-shrink-0 ml-3" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary flex-shrink-0 ml-3" />
              )}
            </button>

            <div className={`transition-all duration-300 overflow-hidden ${
              isServiceListExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-6">
                <ServicePriceList sections={servicePriceSections} />

                {/* Price Calculator CTA */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link
                    href="/kalkulacka"
                    className="block bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center space-x-3 max-w-md mx-auto"
                  >
                    <Calculator className="h-6 w-6" />
                    <span className="text-lg">Cenová kalkulačka</span>
                  </Link>
                  <p className="text-center text-gray-600 text-sm mt-3">
                    Spočítejte si orientační cenu pro váš případ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
