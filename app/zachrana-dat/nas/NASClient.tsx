'use client';

/**
 * NAS - Data Recovery stránka
 * Obsah identický s datahelp.cz/zachrana-dat/nas
 */

import { Server, Database, HardDrive, ArrowRight, Phone, Mail, ChevronRight } from 'lucide-react';
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
    { name: 'USB Flash', href: '/zachrana-dat/usb-flash', active: false },
    { name: 'NAS', href: '/zachrana-dat/nas', active: true },
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

export function NASClient() {
  const t = useTranslations();

  const softwareIssues = [
    {
      title: 'Softwarové závady',
      symptoms: ['Smazaná data, rozpadlý operační systém, rozpadlý souborový systém, napadení kryptovirem.', 'Nedostupná data.', 'Nespuštění NAS.']
    },
    {
      title: 'Ztráta konfigurace disků',
      symptoms: ['Nenaběhnutí operačního systému; nepřístupná síťová jednotka; nejde webové rozhraní.']
    }
  ];

  const hardwareIssues = [
    {
      title: 'Závada na diskovém řadiči',
      symptoms: ['Nenaběhnutí operačního systému; nepřístupná síťová jednotka; nejde webové rozhraní.']
    },
    {
      title: 'Vadný jeden či více pevných disků',
      symptoms: ['Utržené čtecí hlavy, spálená řídící elektronika, poškození záznamové plotny disku.', 'Nedostupná data.', 'Nespuštění NAS.']
    }
  ];

  const raidTypes = [
    { type: 'RAID 0 (striping)', desc: 'Nabízí rychlý přístup k datům, ale bez redundance.' },
    { type: 'RAID 1 (mirroring)', desc: 'Zrcadlí data pro vyšší bezpečnost, chrání před selháním jednoho disku.' },
    { type: 'RAID 5', desc: 'Využívá striping s paritou, což umožňuje obnovení dat při selhání jednoho disku a poskytuje rovnováhu mezi kapacitou a ochranou.' },
    { type: 'RAID 6', desc: 'Dvojitá parita umožňuje obnovu při selhání až dvou disků, vhodné pro větší pole disků.' },
    { type: 'RAID 10 (1+0)', desc: 'Kombinuje zrcadlení a striping, poskytuje vysoký výkon a ochranu dat, ale vyžaduje minimálně čtyři disky.' }
  ];

  const fileSystems = ['EXT4', 'Btrfs', 'NTFS', 'ZFS', 'APFS'];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceSchema
        name="Záchrana dat z NAS serveru"
        description="Profesionální záchrana dat z NAS serverů a RAID diskových polí. Bezplatná diagnostika. Více než 20 let zkušeností."
        serviceType="Data Recovery Service"
      />
      <PageHeader
        title="NAS"
        subtitle="Máte problém s NAS serverem? Ať už jde o softwarové potíže nebo fyzické poškození, náš tým s dlouholetými zkušenostmi je připraven bezpečně obnovit vaše cenná data."
        backgroundImage="raid-recovery.webp"
      />
      <ServiceTabs />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">
        {/* Main Intro Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Záchrana dat z NAS zařízení – bezpečně a efektivně
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Má váš NAS server problémy se softwarem nebo utrpěl fyzické poškození? Náš odborně vyškolený tým a špičkové laboratorní vybavení jsou připraveny bezpečně a efektivně řešit různé závady, včetně mechanických a elektronických problémů na NAS serverech.
            </p>
            <p className="mb-4">
              Poskytneme vám <strong>bezplatnou diagnostiku</strong> problému a po pečlivém posouzení rozsahu poškození stanovíme cenu za obnovu dat. S více než <strong>20 lety zkušeností</strong> a certifikovanými nástroji, jako jsou <strong>ACELab a Cellebrite</strong>, zvládáme i komplikované případy.
            </p>
            <p className="mb-4">
              Naše služby obnovy dat z NAS jsou dostupné nepřetržitě, a to pro všechna běžná i specifická zařízení, včetně <strong>RAID polí</strong>.
            </p>
            <p>
              Pokud máte <strong>poškozené NAS zařízení</strong>, doporučujeme jej dále nezapínat a neprovádět na něm žádné změny – tím se snižuje riziko ztráty dat. <Link href="/poptavka-zachrany-dat" className="text-accent font-semibold hover:underline">Kontaktujte nás co nejdříve</Link>, abychom mohli situaci odborně posoudit a navrhnout nejlepší řešení pro záchranu vašich dat.
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

        {/* RAID and File Systems Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Záchrana dat z NAS úložišť všech konfigurací a souborových systémů
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 mb-8">
            <p>
              Dokážeme sestavit a spravovat běžné i pokročilé konfigurace pro NAS zařízení, včetně <strong>RAID 0, RAID 1, RAID 5, RAID 6 a RAID 10</strong>. Každý z těchto typů nabízí specifické výhody a stupně ochrany dat:
            </p>
          </div>

          <ul className="space-y-4 mb-8">
            {raidTypes.map((raid, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-accent font-bold mt-1">•</span>
                <div>
                  <strong className="text-primary">{raid.type}</strong>: {raid.desc}
                </div>
              </li>
            ))}
          </ul>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Kromě RAID konfigurací podporujeme různé souborové systémy, které NAS zařízení obvykle používají, jako jsou <strong>{fileSystems.join(', ')}</strong>. Tato variabilita nám umožňuje flexibilně reagovat na různé typy závad a obnovovat data z široké škály NAS zařízení.
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
