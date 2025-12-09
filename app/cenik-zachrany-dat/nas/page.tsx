import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArrowRight, Phone, ClipboardList, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ceník obnovy dat z NAS a datových úložišť | DataHelp.cz',
  description: 'Kolik stojí záchrana dat z NAS? RAID 0/5/6 od 6 000 Kč. Synology, QNAP, WD MyCloud. Rozpadlá pole, smazaná data. Bezplatná diagnostika.',
  alternates: {
    canonical: 'https://www.datahelp.cz/cenik-zachrany-dat/nas',
  },
  openGraph: {
    title: 'Ceník obnovy dat z NAS a datových úložišť | DataHelp.cz',
    description: 'Kolik stojí záchrana dat z NAS? RAID 0/5/6 od 6 000 Kč. Bezplatná diagnostika.',
    url: 'https://www.datahelp.cz/cenik-zachrany-dat/nas',
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

interface ConfigRow {
  config: string;
  damage: string;
  price: string;
  symptoms: string;
}

function ConfigPricingTable({ rows }: { rows: ConfigRow[] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="bg-primary/5 p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Database className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-bold text-primary">Ceník dle konfigurace</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">Konfigurace</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">Poškození</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">Orientační ceny</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Příčina a symptomy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-gray-800 font-medium">{row.config}</td>
                <td className="px-4 py-4 text-gray-700">{row.damage}</td>
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

export default function NASPricingPage() {
  const configRows: ConfigRow[] = [
    {
      config: 'Všechny konfigurace',
      damage: 'Softwarové závady',
      price: '6 000 – 25 000 Kč',
      symptoms: 'Smazaná data, rozpadlý operační systém, rozpadlý souborový systém. Nedostupná data. Nespuštění NAS.'
    },
    {
      config: 'RAID 0',
      damage: 'Ztráta konfigurace',
      price: '8 000 – 15 000 Kč',
      symptoms: 'Nenaběhnutí operačního systému; nepřístupná síťová jednotka; nejde webové rozhraní.'
    },
    {
      config: 'RAID 5 (3 disky)',
      damage: 'Ztráta konfigurace',
      price: '9 000 – 18 000 Kč',
      symptoms: 'Nenaběhnutí operačního systému; nepřístupná síťová jednotka; nejde webové rozhraní.'
    },
    {
      config: 'RAID 5 (více disků)',
      damage: 'Ztráta konfigurace',
      price: 'od 15 000 Kč',
      symptoms: 'Nenaběhnutí operačního systému; nepřístupná síťová jednotka; nejde webové rozhraní.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Ceník obnovy dat z NAS"
        subtitle="Datová úložiště – orientační ceny dle konfigurace"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-gray-700 text-lg mb-4">
            Záchrana dat z NAS (Synology, QNAP, WD MyCloud, Buffalo a další) závisí na konfiguraci RAID pole
            a počtu disků. Cena se odvíjí od složitosti rekonstrukce.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <ConfigPricingTable rows={configRows} />
        </div>

        {/* Supported brands */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Podporované značky NAS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            <div>• Synology</div>
            <div>• QNAP</div>
            <div>• WD MyCloud</div>
            <div>• Buffalo</div>
            <div>• Netgear ReadyNAS</div>
            <div>• Thecus</div>
            <div>• Drobo</div>
            <div>• a další...</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Co ovlivňuje cenu?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Počet disků v NAS – více disků znamená složitější rekonstrukci.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Typ RAID konfigurace – RAID 5/6 je složitější než RAID 0/1.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Stav disků – pokud jsou některé disky fyzicky poškozené, cena se zvyšuje.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Pro velké RAID systémy (10+ disků) viz <Link href="/cenik-zachrany-dat/raid" className="text-accent underline">ceník RAID polí</Link>.</span>
            </li>
          </ul>
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Potřebujete zachránit data z NAS?</h3>
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
              href="/zachrana-dat/nas"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Záchrana dat z NAS – více informací
            </Link>
            <Link
              href="/cenik-zachrany-dat"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Zpět na hlavní ceník
            </Link>
            <Link
              href="/cenik-zachrany-dat/raid"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Ceník obnovy dat z RAID
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
