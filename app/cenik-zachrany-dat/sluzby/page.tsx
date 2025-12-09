import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArrowRight, Phone, ClipboardList, Microscope, Cpu, Wrench, Zap, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Položkový ceník služeb záchrany dat | DataHelp.cz',
  description: 'Detailní položkový ceník služeb záchrany dat. Diagnostika, softwarové závady, hardwarové opravy, specializované služby. Pro firmy a IT specialisty.',
  alternates: {
    canonical: 'https://www.datahelp.cz/cenik-zachrany-dat/sluzby',
  },
  openGraph: {
    title: 'Položkový ceník služeb záchrany dat | DataHelp.cz',
    description: 'Detailní položkový ceník služeb záchrany dat. Pro firmy a IT specialisty.',
    url: 'https://www.datahelp.cz/cenik-zachrany-dat/sluzby',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/pricing-bg.webp"
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

interface PriceItem {
  title: string;
  price: string;
}

interface PriceSection {
  icon: React.ReactNode;
  title: string;
  items: PriceItem[];
}

function PricingSection({ section }: { section: PriceSection }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary/5 p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {section.icon}
          <h2 className="text-xl font-bold text-primary">{section.title}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {section.items.map((item, index) => (
            <div
              key={index}
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
}

export default function SluzbyPricingPage() {
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

  const sections: PriceSection[] = [
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
      title: 'Hardwarové chyby',
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

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Položkový ceník služeb"
        subtitle="Pro firmy a IT specialisty – hodinové sazby dle typu práce"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-gray-700 text-lg mb-4">
            Tento ceník je určen zejména pro firmy a IT specialisty, kteří potřebují detailní přehled
            o cenách jednotlivých úkonů. Konečná cena zakázky se stanovuje po bezplatné diagnostice.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <PricingSection key={index} section={section} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Jak se počítá cena?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Ceny jsou orientační a závisí na složitosti konkrétního případu.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Konečná cena se stanoví po bezplatné diagnostice.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>U složitějších případů může být nutná kombinace více úkonů.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Platíte pouze za úspěšně zachráněná data.</span>
            </li>
          </ul>
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Potřebujete nacenit konkrétní případ?</h3>
          <p className="text-gray-600 mb-6">Objednejte bezplatnou diagnostiku nebo nás kontaktujte pro více informací.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/poptavka-zachrany-dat"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              Objednat diagnostiku
            </Link>
            <a
              href="tel:+420775220440"
              className="inline-flex items-center justify-center bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              +420 775 220 440
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Související stránky</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/cenik-zachrany-dat"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Zpět na hlavní ceník
            </Link>
            <Link
              href="/kalkulacka"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Cenová kalkulačka
            </Link>
            <Link
              href="/technologie"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Naše technologie
            </Link>
            <Link
              href="/poptavka-zachrany-dat"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Objednat diagnostiku
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
