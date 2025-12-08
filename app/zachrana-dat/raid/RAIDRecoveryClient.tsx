'use client';

/**
 * RAID Data Recovery stránka
 * Obsah identický s datahelp.cz/zachrana-dat/raid
 */

import { Database, Server, HardDrive, ArrowRight, Phone, Mail, ChevronRight } from 'lucide-react';
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
    { name: 'NAS', href: '/zachrana-dat/nas', active: false },
    { name: 'RAID', href: '/zachrana-dat/raid', active: true },
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

export function RAIDRecoveryClient() {
  const t = useTranslations();

  const commonProblems = [
    'Selhání kabelu mezi řadičem a disky',
    'Poškození jednoho nebo více pevných disků',
    'Částečně přepsaná data',
    'Chybná konfigurace diskového pole',
    'Problémy s řadičem nebo jeho poškození'
  ];

  const raidTypes = [
    { type: 'RAID 0 (striping)', desc: 'optimalizace rychlosti dat rozdělením na více disků' },
    { type: 'RAID 1 (mirroring)', desc: 'zrcadlení dat pro ochranu proti ztrátě' },
    { type: 'RAID 5 (parita)', desc: 'zabezpečení dat s efektivním využitím diskového prostoru' },
    { type: 'RAID 6 (dvojitá parita)', desc: 'zvýšená ochrana umožňující výpadek až dvou disků' },
    { type: 'RAID 10', desc: 'kombinace výkonu RAID 0 a bezpečnosti RAID 1' },
    { type: 'RAID-Z', desc: 'pokročilý RAID v systému ZFS' },
    { type: 'Kombinované RAID konfigurace', desc: 'např. RAID 0+1, RAID 50, RAID 60 pro vyvážení výkonu a spolehlivosti' }
  ];

  const fileSystems = [
    { category: 'Windows', systems: 'FAT, NTFS, exFAT' },
    { category: 'Linux', systems: 'EXT2, EXT3, EXT4, Btrfs, XFS' },
    { category: 'macOS', systems: 'HFS, HFS+, APFS' },
    { category: 'Novell', systems: 'včetně NVFS a NSS' },
    { category: 'Unix', systems: 'a další pokročilé systémy' }
  ];

  const relatedLinks = [
    { text: 'záchrana dat z disku', href: '/zachrana-dat/hdd' },
    { text: 'záchrana dat SD karty', href: '/zachrana-dat/sd-karta' },
    { text: 'záchrana dat z flash disků (USB)', href: '/zachrana-dat/usb-flash' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceSchema
        name={t('services.raid.title')}
        description={t('services.raid.desc')}
        serviceType="RAID/NAS Data Recovery Service"
      />
      <PageHeader
        title="RAID"
        subtitle="Ať už je vaše RAID pole poškozené hardwarově, softwarově nebo jejich kombinací, nabízíme odborné řešení šité na míru vaší situaci, abychom bezpečně obnovili všechna data z vašeho RAID zařízení."
        backgroundImage="raid-recovery.webp"
      />
      <ServiceTabs />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">
        {/* Main Intro Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Záchrana dat z RAID – bezpečně a efektivně
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Máte poškozené diskové pole RAID a potřebujete obnovit data? Kontaktujte nás pomocí{' '}
              <Link href="/poptavka-zachrany-dat" className="text-accent font-semibold hover:underline">online formuláře</Link>{' '}
              nebo na nonstop čísle <a href="tel:+420775220440" className="text-accent font-semibold hover:underline">775 220 440</a>.
            </p>
            <p>
              DATAHELP se specializuje na obnovu dat z různých typů diskových polí RAID. Jsme připraveni pomoci i v případech, kdy není známa přesná konfigurace pole nebo řadiče. Obvykle nám stačí pouze samotné disky, takže není nutné dodávat celý server.
            </p>
          </div>
        </div>

        {/* Common Problems Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Nejčastější problémy RAID polí:
          </h2>
          <ul className="space-y-3">
            {commonProblems.map((problem, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-accent font-bold">•</span>
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RAID Types Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Database className="h-7 w-7 text-accent" />
            Podporované konfigurace RAID polí:
          </h2>
          <ul className="space-y-4">
            {raidTypes.map((raid, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-accent font-bold">•</span>
                <div>
                  <strong className="text-primary">{raid.type}</strong> – {raid.desc}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* File Systems Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <HardDrive className="h-7 w-7 text-accent" />
            Podporované souborové systémy:
          </h2>
          <ul className="space-y-3">
            {fileSystems.map((fs, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-accent font-bold">•</span>
                <div>
                  <strong className="text-primary">{fs.category}</strong> ({fs.systems})
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* How to Proceed Section */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Jak postupovat
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Není důležité, jestli Vaše pole bylo hardwarové, softwarové nebo nějakého jiného typu. Pokud z něj potřebujete obnovit data, <strong>předtím, než nám zavoláte (775 220 440)</strong>, si <strong>připravte co nejvíce informací o konfiguraci</strong> Vašeho diskového pole, které nyní můžete zjistit.
            </p>
            <p>
              U těžkých poškození nám pomůže, pokud nám budete schopni charakterizovat typ dat, která na diskovém poli byla uložena (běžné dokumenty, fotky, video nebo například účetnictví). Nejlepší ochranou proti ztrátě dat je pravidelné zálohování.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/poptavka-zachrany-dat"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              <span>Potřebuji vyzvednout a obnovit data z diskové pole RAID</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Related Links Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">
            Může vás zajímat:
          </h2>
          <ul className="space-y-2">
            {relatedLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="text-accent hover:underline">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
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
