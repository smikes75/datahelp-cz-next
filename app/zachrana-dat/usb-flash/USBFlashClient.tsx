'use client';

/**
 * USB Flash - Data Recovery stránka
 * Obsah identický s datahelp.cz/zachrana-dat/usb-flash
 */

import { Usb, ArrowRight, Phone, Mail, ChevronRight } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ServiceSchema } from '@/components/schema/ServiceSchema';

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

// Navigation tabs component for service pages
function ServiceTabs() {
  const tabs = [
    { name: 'Pevný disk', href: '/zachrana-dat/hdd', active: false },
    { name: 'Externí disk', href: '/zachrana-dat/externi-disk', active: false },
    { name: 'SSD', href: '/zachrana-dat/ssd', active: false },
    { name: 'SD karta', href: '/zachrana-dat/sd-karta', active: false },
    { name: 'USB Flash', href: '/zachrana-dat/usb-flash', active: true },
    { name: 'NAS', href: '/zachrana-dat/nas', active: false },
    { name: 'RAID', href: '/zachrana-dat/raid', active: false },
    { name: 'Apple', href: '/zachrana-dat/apple', active: false },
    { name: 'Android', href: '/zachrana-dat/mobilni-telefon', active: false },
  ];

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  tab.active
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-600 hover:text-primary hover:border-gray-300'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
          {/* Mobile scroll indicator */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none md:hidden">
            <div className="w-12 h-full bg-gradient-to-l from-white via-white/80 to-transparent" />
            <div className="absolute right-1 text-gray-400">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function USBFlashClient() {
  const t = useTranslations();

  const softwareIssues = [
    {
      title: 'Smazaná data uživatelem',
      symptoms: ['Nechtěné uvedení do továrního nastavení/nechtěné smazání.', 'Nedostupná data.']
    },
    {
      title: 'Zformátování',
      symptoms: ['Nechtěné zformátování.', 'Nedostupná data.']
    },
    {
      title: 'Poškozený souborový systém',
      symptoms: ['Nedokončení zápisu při kopírování – brzké vyjmutí.']
    }
  ];

  const hardwareIssues = [
    {
      title: 'Vadný paměťový řadič',
      symptoms: ['Zařízení se nehlásí.', 'Flash disk udává jinou kapacitu úložného prostoru, než by měl.']
    },
    {
      title: 'Vadné paměťové bloky',
      symptoms: ['Data nepřístupná, flash disk chce formátovat.']
    },
    {
      title: 'Ulomený konektor',
      symptoms: ['Médium se nehlásí, viditelné mechanické poškození.']
    }
  ];

  const interfaces = [
    'USB 2.0 Micro-B',
    'USB 2.0 Type-A',
    'USB 3.0/3.1 Gen 1 Type-A',
    'USB 3.1 Gen 2 Type-A',
    'USB 3.1 Type-C',
    'USB 3.2 Gen 2x2 Type-C',
    'Thunderbolt 3/4',
    'Wi-Fi',
    'Lightning'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceSchema
        name="Záchrana dat z USB flash disku"
        description="Profesionální záchrana dat z USB flash disků všech typů a značek. Bezplatná diagnostika a svoz."
        serviceType="Data Recovery Service"
      />
      <PageHeader
        title="USB Flash"
        subtitle="Ztratili jste data z flash disku? V DataHelpu nabízíme profesionální záchranu dat z poškozených nebo nefunkčních flash pamětí pomocí pokročilých technologií a algoritmů, které umožňují obnovu dat i z těch nejsložitějších případů."
        backgroundImage="ssd-recovery.webp"
      />
      <ServiceTabs />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">
        {/* Main Intro Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Ztratili jste data z flash disku?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              V DataHelpu nabízíme špičkové služby pro obnovu dat z jakéhokoli typu flash pamětí. Máme dlouholeté zkušenosti s různými výrobci, jako jsou <strong>ADATA, Kingston, Corsair, Sandisk, Verbatim, Patriot, Transcend, Silicon Power, Samsung, Leef, EMTEC, Pitaka</strong> a další.
            </p>
            <p className="mb-4">
              Flash disky mohou selhat z mnoha důvodů, ať už se jedná o <strong>selhání řídícího čipu</strong>, <strong>poškození paměťových buněk</strong>, nebo <strong>chybu souborového systému</strong>. Často se setkáváme také s případy, kdy je disk mechanicky poškozen nebo je nutné jej formátovat. V takových případech je klíčové neprovádět další pokusy o připojení zařízení – každý další zásah může snížit šance na úspěšnou <strong>záchranu dat</strong>.
            </p>
            <p className="mb-4">
              Naše technologie a vybavení umožňují obnovit data i z těch nejkomplikovanějších situací. Díky použití pokročilých algoritmů jsme schopni rekonstruovat poškozené souborové systémy a obnovit vaše soubory do původního stavu.
            </p>
            <p>
              S naším týmem odborníků, dlouholetými zkušenostmi a nejmodernějšími metodami máte jistotu, že vaše data budou v bezpečí. <Link href="/poptavka-zachrany-dat" className="text-accent font-semibold hover:underline">Kontaktujte nás</Link>, a my provedeme bezplatnou diagnostiku a navrhneme nejvhodnější postup pro <strong>záchranu vašich dat</strong>.
            </p>
          </div>
        </div>

        {/* Issues Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Přehled běžných závad:
          </h2>

          <h3 className="text-xl font-bold text-primary mb-4">Softwarové závady</h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">Poškození</th>
                  <th className="p-3 text-left font-semibold">Příčina a symptomy</th>
                </tr>
              </thead>
              <tbody>
                {softwareIssues.map((issue, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border-b font-medium text-gray-900 align-top">
                      {issue.title}
                    </td>
                    <td className="p-3 border-b text-gray-700">
                      <ul className="list-disc list-inside space-y-1">
                        {issue.symptoms.map((symptom, i) => (
                          <li key={i}>{symptom}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-primary mb-4">Hardwarové závady</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">Poškození</th>
                  <th className="p-3 text-left font-semibold">Příčina a symptomy</th>
                </tr>
              </thead>
              <tbody>
                {hardwareIssues.map((issue, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border-b font-medium text-gray-900 align-top">
                      {issue.title}
                    </td>
                    <td className="p-3 border-b text-gray-700">
                      <ul className="list-disc list-inside space-y-1">
                        {issue.symptoms.map((symptom, i) => (
                          <li key={i}>{symptom}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* USB Interfaces Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Usb className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">Typy rozhraní</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {interfaces.map((iface, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="text-accent font-bold">•</span>
                <span className="text-gray-700">{iface}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Process Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Jak data z flash disku obnovujeme?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Při obnově dat z flash disků se pomocí speciálních nástrojů vytváří <strong>obrazy vašeho média</strong>, se kterými následně pracujeme. Tento proces zahrnuje rekonstrukci souborového systému a obnovu jednotlivých souborů. Na rozdíl od jiných typů médií, kde často dochází k mechanickému poškození, jsou flash disky méně náchylné na mechanické poruchy, což zjednodušuje a zrychluje proces <strong>záchrany dat</strong>.
            </p>
            <p className="mb-4">
              I přes menší kapacitu u některých flash disků se však setkáváme s různými problémy, jako je <strong>selhání řídícího čipu</strong> nebo <strong>poškození paměťových buněk</strong>, které vyžadují odborný zásah.
            </p>
            <p>
              Kromě toho je při obnově dat klíčové zachovat <strong>strukturu souborového systému</strong>, aby bylo možné data plně zrekonstruovat. Problémy s poškozeným souborovým systémem nebo mechanickým poškozením konektoru mohou zkomplikovat přístup k datům, avšak díky pokročilým technikám a vybavení jsme schopni dosáhnout <strong>vysoké úspěšnosti obnovy</strong>.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Potřebujete okamžitou pomoc?</h2>
          <p className="text-lg mb-6 opacity-90">
            Kontaktujte nás na níže uvedeném telefonu či e-mailu, proveďte rovnou objednávku záchrany dat, nebo nás navštivte osobně v centrále naší firmy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link
              href="/poptavka-zachrany-dat"
              className="inline-flex items-center justify-center space-x-2 bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              <span>Objednat diagnostiku</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="mailto:info@datahelp.cz"
              className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>info@datahelp.cz</span>
            </a>
            <a
              href="tel:+420775220440"
              className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>+420 775 220 440</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
