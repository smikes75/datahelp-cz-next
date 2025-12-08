'use client';

import { useState } from 'react';
import {
  HardDrive,
  Smartphone,
  Database,
  Cpu,
  CreditCard,
  Usb,
  Server,
  Apple,
  Clock,
  Zap,
  Timer,
  Leaf,
  Package,
  Search,
  FileCheck,
  Shield,
  CheckCircle,
  Send,
  AlertTriangle,
  Settings,
  Bug,
  Trash2,
  RefreshCw,
  Flame,
  Droplets,
  ChevronRight
} from 'lucide-react';
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
export function ServicesClient() {
  const t = useTranslations();
  const [expandedProcess, setExpandedProcess] = useState(false);

  // 9 kategorií služeb podle datahelp.cz
  const services = [
    {
      icon: <HardDrive className="h-12 w-12" />,
      title: 'Pevné disky',
      description: 'Záchrana dat z HDD všech výrobců - Seagate, WD, Samsung, Toshiba',
      link: '/zachrana-dat/hdd'
    },
    {
      icon: <HardDrive className="h-12 w-12" />,
      title: 'Externí disky',
      description: 'Obnova dat z externích USB disků 2.5" a 3.5"',
      link: '/zachrana-dat/externi-disk'
    },
    {
      icon: <Cpu className="h-12 w-12" />,
      title: 'SSD disky',
      description: 'Specializovaná záchrana dat z SSD, M.2, NVMe disků',
      link: '/zachrana-dat/ssd'
    },
    {
      icon: <CreditCard className="h-12 w-12" />,
      title: 'SD karty',
      description: 'Obnova dat z paměťových karet SD, microSD, CF, XQD',
      link: '/zachrana-dat/sd-karta'
    },
    {
      icon: <Usb className="h-12 w-12" />,
      title: 'USB flash disky',
      description: 'Záchrana dat z USB flash disků všech typů',
      link: '/zachrana-dat/usb-flash'
    },
    {
      icon: <Server className="h-12 w-12" />,
      title: 'NAS servery',
      description: 'Obnova dat z NAS zařízení Synology, QNAP, WD a dalších',
      link: '/zachrana-dat/nas'
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: 'RAID pole',
      description: 'Rekonstrukce RAID 0, 1, 5, 6, 10 a dalších konfigurací',
      link: '/zachrana-dat/raid'
    },
    {
      icon: <Apple className="h-12 w-12" />,
      title: 'Apple zařízení',
      description: 'Záchrana dat z iPhone, iPad, MacBook, iMac',
      link: '/zachrana-dat/apple'
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: 'Mobilní telefony',
      description: 'Obnova dat z Android telefonů a tabletů',
      link: '/zachrana-dat/mobilni-telefon'
    }
  ];

  // 6-krokový proces záchrany dat
  const processSteps = [
    {
      icon: <Package className="h-8 w-8" />,
      title: 'Bezplatný svoz',
      description: 'Vyzvedneme vaše médium kdekoliv v ČR zdarma, nebo jej můžete přinést osobně.'
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Diagnostika',
      description: 'Do 24-48 hodin provedeme bezplatnou diagnostiku a sdělíme vám rozsah poškození.'
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: 'Cenová nabídka',
      description: 'Obdržíte přesnou cenovou nabídku. Bez vašeho souhlasu nezačínáme.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Záchrana dat',
      description: 'Naši specialisté provedou záchranu dat v čisté laboratoři.'
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Ověření',
      description: 'Zkontrolujete seznam zachráněných souborů před finálním předáním.'
    },
    {
      icon: <Send className="h-8 w-8" />,
      title: 'Předání dat',
      description: 'Data vám předáme na novém médiu. Platíte pouze za úspěšnou záchranu.'
    }
  ];

  // Rychlosti zpracování
  const speeds = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Express',
      time: '12-48 hodin',
      price: '+100%',
      color: 'bg-red-500'
    },
    {
      icon: <Timer className="h-8 w-8" />,
      title: 'Priority',
      time: '24-72 hodin',
      price: '+50%',
      color: 'bg-orange-500'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Standard',
      time: '3-21 dní',
      price: 'Základní cena',
      color: 'bg-primary'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'EcoHelp',
      time: '4-8 týdnů',
      price: '-20%',
      color: 'bg-green-500'
    }
  ];

  // Příčiny ztráty dat - Hardware
  const hardwareCauses = [
    { icon: <Settings className="h-6 w-6" />, title: 'Výrobní vady', desc: 'Poruchy z výroby' },
    { icon: <Zap className="h-6 w-6" />, title: 'Přepětí', desc: 'Výpadky elektřiny' },
    { icon: <Flame className="h-6 w-6" />, title: 'Přehřátí', desc: 'Tepelné poškození' },
    { icon: <Droplets className="h-6 w-6" />, title: 'Kapaliny', desc: 'Zalití vodou' },
    { icon: <AlertTriangle className="h-6 w-6" />, title: 'Mechanické', desc: 'Pády a nárazy' },
    { icon: <Flame className="h-6 w-6" />, title: 'Požár/povodeň', desc: 'Přírodní katastrofy' }
  ];

  // Příčiny ztráty dat - Software
  const softwareCauses = [
    { icon: <AlertTriangle className="h-6 w-6" />, title: 'Selhání OS', desc: 'Porucha systému' },
    { icon: <Bug className="h-6 w-6" />, title: 'Chyby aplikací', desc: 'Softwarové chyby' },
    { icon: <Trash2 className="h-6 w-6" />, title: 'Smazání', desc: 'Nechtěné smazání' },
    { icon: <Bug className="h-6 w-6" />, title: 'Malware', desc: 'Viry a ransomware' },
    { icon: <RefreshCw className="h-6 w-6" />, title: 'Aktualizace', desc: 'Nepovedené update' },
    { icon: <Database className="h-6 w-6" />, title: 'Souborový systém', desc: 'Poškozená struktura' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Záchrana dat"
        subtitle="Profesionální obnova dat z poškozených médií s více než 25 lety zkušeností"
        backgroundImage="services-bg.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">

        {/* 9 kategorií služeb */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Z jakého zařízení potřebujete zachránit data?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
              >
                <div className="flex justify-center mb-4 text-accent group-hover:text-primary transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 hidden md:block">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Více info</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6-krokový proces */}
        <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-2">
            Postup záchrany dat
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Jak probíhá záchrana dat od převzetí po předání
          </p>

          {/* Desktop - vždy viditelné */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-accent mb-1">{index + 1}</div>
                <h3 className="font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile - skrytý s tlačítkem */}
          <div className="md:hidden">
            <button
              onClick={() => setExpandedProcess(!expandedProcess)}
              className="w-full py-3 px-4 bg-primary/10 rounded-lg text-primary font-semibold flex items-center justify-center"
            >
              {expandedProcess ? 'Skrýt postup' : 'Zobrazit postup'}
              <ChevronRight className={`h-5 w-5 ml-2 transition-transform ${expandedProcess ? 'rotate-90' : ''}`} />
            </button>
            {expandedProcess && (
              <div className="mt-4 space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Rychlosti zpracování */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-2">
            Rychlost zpracování
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Vyberte si rychlost podle vašich potřeb
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {speeds.map((speed, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${speed.color} flex items-center justify-center text-white`}>
                  {speed.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{speed.title}</h3>
                <p className="text-gray-600 mb-2">{speed.time}</p>
                <p className={`font-semibold ${speed.color === 'bg-green-500' ? 'text-green-600' : speed.color === 'bg-primary' ? 'text-primary' : 'text-accent'}`}>
                  {speed.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Příčiny ztráty dat */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Příčiny ztráty dat
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Hardware */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <HardDrive className="h-6 w-6 mr-2 text-accent" />
                Hardwarové příčiny
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {hardwareCauses.map((cause, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-accent flex-shrink-0">{cause.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{cause.title}</h4>
                      <p className="text-sm text-gray-600">{cause.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Software */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <Bug className="h-6 w-6 mr-2 text-accent" />
                Softwarové příčiny
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {softwareCauses.map((cause, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-accent flex-shrink-0">{cause.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{cause.title}</h4>
                      <p className="text-sm text-gray-600">{cause.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA sekce */}
        <section className="text-center bg-primary rounded-lg p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Potřebujete zachránit data?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Diagnostika a svoz po celé ČR zdarma. Platíte pouze za úspěšnou záchranu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/poptavka-zachrany-dat"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Objednat diagnostiku
            </Link>
            <Link
              href="/kalkulacka"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Zjistit orientační cenu
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
