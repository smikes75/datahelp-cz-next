import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Cpu, Wrench, ArrowRight, Phone, ClipboardList, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ceník obnovy dat z mobilů Android & iOS | DataHelp.cz',
  description: 'Kolik stojí záchrana dat z telefonu? Android od 3 000 Kč, iPhone od 3 000 Kč. Smazaná data, poškozená deska, utopení. Bezplatná diagnostika.',
  alternates: {
    canonical: 'https://www.datahelp.cz/cenik-zachrany-dat/mobil',
  },
  openGraph: {
    title: 'Ceník obnovy dat z mobilů Android & iOS | DataHelp.cz',
    description: 'Kolik stojí záchrana dat z telefonu? Android od 3 000 Kč, iPhone od 3 000 Kč. Bezplatná diagnostika.',
    url: 'https://www.datahelp.cz/cenik-zachrany-dat/mobil',
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

interface PriceRow {
  damage: string;
  price: string;
  symptoms: string;
}

function PricingTable({ title, icon, rows }: { title: string; icon: React.ReactNode; rows: PriceRow[] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="bg-primary/5 p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {icon}
          <h2 className="text-xl font-bold text-primary">{title}</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">Poškození</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">Orientační ceny</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Příčina a symptomy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-gray-800 font-medium">{row.damage}</td>
                <td className="px-4 py-4">
                  <span className="font-bold text-primary bg-primary/5 px-3 py-1 rounded-full whitespace-nowrap">
                    {row.price}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-600 text-sm">{row.symptoms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MobilPricingPage() {
  // Android data
  const androidSoftwareRows: PriceRow[] = [
    {
      damage: 'Smazaná data',
      price: '3 000 – 10 000 Kč',
      symptoms: 'Nedostupná data po nechtěném smazání nebo továrním nastavení.'
    },
    {
      damage: 'Chyba operačního systému',
      price: '7 000 – 12 000 Kč',
      symptoms: 'Nenaběhne operační systém po zapnutí (např. po aktualizaci).'
    },
  ];

  const androidHardwareRows: PriceRow[] = [
    {
      damage: 'Poškozená základní deska',
      price: '9 000 – 15 000 Kč',
      symptoms: 'Zařízení se vůbec nezapne. Např. po utopení, pádu, výrobní vadě.'
    },
  ];

  // iOS data
  const iosSoftwareRows: PriceRow[] = [
    {
      damage: 'Smazaná data',
      price: '3 000 – 10 000 Kč',
      symptoms: 'Nedostupná data po nechtěném smazání nebo resetu.'
    },
    {
      damage: 'Chyba operačního systému',
      price: '12 000 – 15 000 Kč',
      symptoms: 'Nenaběhne operační systém po zapnutí (např. po aktualizaci). Komplikovanost dvojitého šifrování Apple.'
    },
  ];

  const iosHardwareRows: PriceRow[] = [
    {
      damage: 'Poškozená základní deska',
      price: '13 000 – 19 000 Kč',
      symptoms: 'Zařízení se vůbec nezapne. Např. po utopení, pádu, výrobní vadě.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Ceník obnovy dat z mobilů"
        subtitle="Android & iOS – orientační ceny dle typu poškození"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-gray-700 text-lg mb-4">
            Záchrana dat z mobilních telefonů vyžaduje specializované vybavení a znalosti.
            U Apple zařízení je proces složitější kvůli bezpečnostnímu šifrování.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Android section */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Smartphone className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-bold text-primary">Android</h2>
            </div>

            <PricingTable
              title="Softwarové závady"
              icon={<Cpu className="h-6 w-6 text-accent" />}
              rows={androidSoftwareRows}
            />

            <PricingTable
              title="Hardwarové závady"
              icon={<Wrench className="h-6 w-6 text-accent" />}
              rows={androidHardwareRows}
            />
          </div>

          {/* iOS section */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Smartphone className="h-8 w-8 text-gray-800" />
              <h2 className="text-2xl font-bold text-primary">iOS (iPhone, iPad)</h2>
            </div>

            <PricingTable
              title="Softwarové závady"
              icon={<Cpu className="h-6 w-6 text-accent" />}
              rows={iosSoftwareRows}
            />

            <PricingTable
              title="Hardwarové závady"
              icon={<Wrench className="h-6 w-6 text-accent" />}
              rows={iosHardwareRows}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Specifika mobilních zařízení</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Apple zařízení mají dvojité šifrování – záchrana je náročnější a dražší.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Po utopení telefon nevypínejte a nesušte – může dojít ke zkratu.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Záchrana z rozbitého displeje je možná – data jsou na čipu paměti.</span>
            </li>
          </ul>
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Potřebujete zachránit data z telefonu?</h3>
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
              href="/zachrana-dat/mobily-tablety"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Záchrana dat z mobilů – více informací
            </Link>
            <Link
              href="/cenik-zachrany-dat"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Zpět na hlavní ceník
            </Link>
            <Link
              href="/zachrana-dat/apple"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Záchrana dat z Apple zařízení
            </Link>
            <Link
              href="/kalkulacka"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Cenová kalkulačka
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
