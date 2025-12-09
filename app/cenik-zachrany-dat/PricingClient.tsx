'use client';


/**
 * Ceník - Price list stránka
 * Device cards s rozbalovacími detaily, FAQ
 */

import React, { useState, useRef } from 'react';
import { HardDrive, Smartphone, Database, Cpu, ChevronDown, ChevronUp, Wrench, AlertCircle, ClipboardList } from 'lucide-react';
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

// Hlavní stránka ceníku
export function PricingClient() {
  const t = useTranslations();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [expandedFaqItems, setExpandedFaqItems] = useState<number[]>([]);
  const [isDetailedPricingExpanded, setIsDetailedPricingExpanded] = useState(false);
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
        subtitle="Platíte pouze za úspěšně zachráněná data."
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

          {/* Anchor aliases for redirects */}
          <div id="nas" className="absolute -mt-24"></div>
          <div id="flash" className="absolute -mt-24"></div>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {deviceCards.map((card, index) => {
              const isExpanded = expandedCards.includes(index);
              // Map device types to anchor IDs for URL redirects
              const anchorId = card.deviceType === 'mobile' ? 'mobil' : card.deviceType;

              return (
                <button
                  key={index}
                  id={anchorId}
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

        {/* Quick links to all pricing pages */}
        <div className="mb-16">
          {/* Desktop version - always visible */}
          <div className="hidden md:block">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">
              Detailní ceníky
            </h2>
            <div className="grid grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
              <Link
                href="/cenik-zachrany-dat/hdd"
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
              >
                <HardDrive className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                <span className="font-semibold text-gray-800 group-hover:text-primary">HDD</span>
              </Link>
              <Link
                href="/cenik-zachrany-dat/ssd"
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
              >
                <Cpu className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                <span className="font-semibold text-gray-800 group-hover:text-primary">SSD</span>
              </Link>
              <Link
                href="/cenik-zachrany-dat/flash"
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
              >
                <Cpu className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                <span className="font-semibold text-gray-800 group-hover:text-primary">Flash</span>
              </Link>
              <Link
                href="/cenik-zachrany-dat/mobil"
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
              >
                <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                <span className="font-semibold text-gray-800 group-hover:text-primary">Mobily</span>
              </Link>
              <Link
                href="/cenik-zachrany-dat/nas"
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
              >
                <Database className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                <span className="font-semibold text-gray-800 group-hover:text-primary">NAS</span>
              </Link>
              <Link
                href="/cenik-zachrany-dat/raid"
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
              >
                <Database className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                <span className="font-semibold text-gray-800 group-hover:text-primary">RAID</span>
              </Link>
              <Link
                href="/cenik-zachrany-dat/sluzby"
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
              >
                <Wrench className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                <span className="font-semibold text-gray-800 group-hover:text-primary">Služby</span>
              </Link>
            </div>
          </div>

          {/* Mobile version - collapsible */}
          <div className="md:hidden">
            <button
              onClick={() => setIsDetailedPricingExpanded(!isDetailedPricingExpanded)}
              className="w-full p-4 rounded-lg border-2 border-gray-200 bg-white flex items-center justify-between hover:border-primary transition-colors"
              style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
            >
              <span className="text-xl font-bold text-primary">Detailní ceníky</span>
              {isDetailedPricingExpanded ? (
                <ChevronUp className="h-6 w-6 text-primary" />
              ) : (
                <ChevronDown className="h-6 w-6 text-primary" />
              )}
            </button>

            {isDetailedPricingExpanded && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Link
                  href="/cenik-zachrany-dat/hdd"
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
                >
                  <HardDrive className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-semibold text-gray-800 group-hover:text-primary">HDD</span>
                </Link>
                <Link
                  href="/cenik-zachrany-dat/ssd"
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
                >
                  <Cpu className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-semibold text-gray-800 group-hover:text-primary">SSD</span>
                </Link>
                <Link
                  href="/cenik-zachrany-dat/flash"
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
                >
                  <Cpu className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-semibold text-gray-800 group-hover:text-primary">Flash</span>
                </Link>
                <Link
                  href="/cenik-zachrany-dat/mobil"
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
                >
                  <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-semibold text-gray-800 group-hover:text-primary">Mobily</span>
                </Link>
                <Link
                  href="/cenik-zachrany-dat/nas"
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
                >
                  <Database className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-semibold text-gray-800 group-hover:text-primary">NAS</span>
                </Link>
                <Link
                  href="/cenik-zachrany-dat/raid"
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group"
                >
                  <Database className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-semibold text-gray-800 group-hover:text-primary">RAID</span>
                </Link>
                <Link
                  href="/cenik-zachrany-dat/sluzby"
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow group col-span-2"
                >
                  <Wrench className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-semibold text-gray-800 group-hover:text-primary">Služby</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
