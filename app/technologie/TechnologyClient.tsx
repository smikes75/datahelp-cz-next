'use client';


/**
 * Technologie stránka
 * Podle originálu: PageHeader, TechnologyGallery, Equipment accordion
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Image from 'next/image';
import { TechnologyGallery } from '@/components/TechnologyGallery';

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

export function TechnologyClient() {
  const t = useTranslations('techPage');
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const equipment = [
    {
      title: 'PC-3000 UDMA',
      description: t('equipment.pc3000udma.description'),
      features: [
        t('equipment.pc3000udma.features.manufacturers'),
        t('equipment.pc3000udma.features.firmware'),
        t('equipment.pc3000udma.features.recovery')
      ]
    },
    {
      title: 'PC-3000 Flash',
      description: t('equipment.pc3000flash.description'),
      features: [
        t('equipment.pc3000flash.features.monolithic'),
        t('equipment.pc3000flash.features.usb'),
        t('equipment.pc3000flash.features.ssd')
      ]
    },
    {
      title: 'PC-3000 SSD',
      description: t('equipment.pc3000ssd.description'),
      features: [
        t('equipment.pc3000ssd.features.nvme'),
        t('equipment.pc3000ssd.features.sata'),
        t('equipment.pc3000ssd.features.controller')
      ]
    },
    {
      title: 'RuSolut',
      description: t('equipment.rusolut.description'),
      features: [
        t('equipment.rusolut.features.precision'),
        t('equipment.rusolut.features.calibration'),
        t('equipment.rusolut.features.compatibility')
      ]
    },
    {
      title: 'NAND Reconstructor',
      description: t('equipment.nandreconstructor.description'),
      features: [
        t('equipment.nandreconstructor.features.chips'),
        t('equipment.nandreconstructor.features.reconstruction'),
        t('equipment.nandreconstructor.features.formats')
      ]
    },
    {
      title: 'BGA Rework',
      description: t('equipment.bgarework.description'),
      features: [
        t('equipment.bgarework.features.precision'),
        t('equipment.bgarework.features.profiles'),
        t('equipment.bgarework.features.safety')
      ]
    },
    {
      title: t('gallery.partsWarehouse'),
      description: t('equipment.partswarehouse.description'),
      features: [
        t('equipment.partswarehouse.features.inventory'),
        t('equipment.partswarehouse.features.availability'),
        t('equipment.partswarehouse.features.compatibility')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="technology-bg.webp"
      />

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <TechnologyGallery />
      </section>

      {/* Equipment Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">{t('equipment.title')}</h2>

          <div className="grid gap-4">
            {equipment.map((item, index) => {
              const isExpanded = expandedSections.includes(index);

              return (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
                    )}
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                      <ul className="space-y-3">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
