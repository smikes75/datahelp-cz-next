import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { HardDrive, Cpu, Wrench, AlertTriangle, ArrowRight, Phone, ClipboardList } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ceník obnovy dat z HDD | Pevné disky | DataHelp.cz',
  description: 'Kolik stojí záchrana dat z HDD? Ceny od 3 000 Kč. Softwarové závady, hardwarové poškození, utržené hlavy, vadná elektronika. Bezplatná diagnostika.',
  alternates: {
    canonical: 'https://www.datahelp.cz/cenik-zachrany-dat/hdd',
  },
  openGraph: {
    title: 'Ceník obnovy dat z HDD | Pevné disky | DataHelp.cz',
    description: 'Kolik stojí záchrana dat z HDD? Ceny od 3 000 Kč. Softwarové závady, hardwarové poškození. Bezplatná diagnostika.',
    url: 'https://www.datahelp.cz/cenik-zachrany-dat/hdd',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

// PageHeader komponenta
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

// Pricing table component
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

export default function HDDPricingPage() {
  const softwareRows: PriceRow[] = [
    {
      damage: 'Smazaná data',
      price: '3 000 – 9 000 Kč',
      symptoms: 'Nemohu najít svá data, soubory mají nulovou velikost, složky jsou prázdné, programy hlásí poškozené soubory.'
    },
    {
      damage: 'Zformátování',
      price: '3 000 – 9 000 Kč',
      symptoms: 'Médium se tváří jako prázdné, diskový oddíl je na pohled prázdný, systém mě nutí provést zformátování.'
    },
    {
      damage: 'Reinstalace OS',
      price: '4 000 – 9 000 Kč',
      symptoms: 'Neopatrností při instalaci/opravě spouštění OS. Část dat již bývá přepsána operačním systémem.'
    },
    {
      damage: 'Po nákaze virem',
      price: 'individuálně',
      symptoms: 'Antivirus odhalil hrozby a od té doby nemohu nalézt důležitá data. Počítač se chová jinak, data mizí sama od sebe.'
    },
  ];

  const hardwareRows: PriceRow[] = [
    {
      damage: 'Utržené čtecí hlavy',
      price: '9 000 – 16 000 Kč',
      symptoms: 'Po pádu se disk chová jinak, vydává jiný zvuk (cvaká) a hlásí problémy. Disk po pádu nenaběhne nebo je podezřele hlasitý.'
    },
    {
      damage: 'Poškozený povrch ploten',
      price: '7 000 – 13 000 Kč',
      symptoms: 'Fyzický pád, otřes, únava materiálu, nečistota. Disk se slyšitelně roztočí, ale při čtení dochází k chybám.'
    },
    {
      damage: 'Vadné sektory',
      price: '7 000 – 13 000 Kč',
      symptoms: 'Opotřebování ploten. Poškozený disk je BIOSem detekován a vydává cvakavé nebo chrčivé zvuky. Ztrácí se data.'
    },
    {
      damage: 'Zaseklá ložiska/hlavy',
      price: '9 000 – 16 000 Kč',
      symptoms: 'Výrobní vady. Disk se slyšitelně snaží roztočit, ale rychle dojde k vypnutí. Změnil se zvuk HDD.'
    },
    {
      damage: 'Vadná elektronika',
      price: '3 000 – 9 000 Kč',
      symptoms: 'Elektrický proud, přepětí. Disk se vůbec netočí a BIOS jej nedetekuje. Médium může být cítit po spálené elektronice.'
    },
    {
      damage: 'Vadný motor',
      price: '9 000 – 15 000 Kč',
      symptoms: 'Výrobní vady, fyzický pád. Po pádu se HDD vůbec nezapne. Disk zní jinak, vydává podivné zvuky.'
    },
  ];

  const otherRows: PriceRow[] = [
    {
      damage: 'Požár/povodeň',
      price: 'individuálně',
      symptoms: 'Přírodní živly. Disk přišel do kontaktu s vodou či ohněm. Nezapínejte jej!'
    },
    {
      damage: 'Přepsaná servisní data',
      price: '7 000 – 13 000 Kč',
      symptoms: 'Po klonování servisních informací disku PC nenaběhne a hlásí problémy s HDD.'
    },
    {
      damage: 'Klonování disku',
      price: '1 000 – 4 000 Kč/ks',
      symptoms: 'Kopírování dat nebo vytvoření přesné kopie disku.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Ceník obnovy dat z HDD"
        subtitle="Pevné disky – orientační ceny dle typu poškození"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-8">
        {/* Intro text */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-gray-700 text-lg mb-4">
            Záchrana dat z pevných disků (HDD) patří mezi naše nejčastější služby. Cena závisí na typu poškození –
            softwarové závady jsou cenově dostupnější, hardwarové poruchy vyžadují práci v čistém prostředí a jsou náročnější.
          </p>
          <p className="text-gray-600">
            Níže najdete orientační ceny pro různé typy poškození. Přesnou cenu stanovíme po bezplatné diagnostice.
          </p>
        </div>

        {/* Pricing tables */}
        <div className="max-w-5xl mx-auto">
          <PricingTable
            title="Softwarové závady"
            icon={<Cpu className="h-6 w-6 text-accent" />}
            rows={softwareRows}
          />

          <PricingTable
            title="Hardwarové závady"
            icon={<Wrench className="h-6 w-6 text-accent" />}
            rows={hardwareRows}
          />

          <PricingTable
            title="Ostatní"
            icon={<AlertTriangle className="h-6 w-6 text-accent" />}
            rows={otherRows}
          />
        </div>

        {/* Info box */}
        <div className="max-w-4xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Jak stanovujeme cenu?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Cena závisí na typu a rozsahu poškození, které určíme při bezplatné diagnostice.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Platíte pouze za úspěšně zachráněná data – princip „Bez dat, bez platby".</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>V ceně je zahrnuta práce, náhradní díly i přenos dat na nové médium.</span>
            </li>
          </ul>
        </div>

        {/* CTA section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Potřebujete zachránit data z HDD?</h3>
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

        {/* Related links */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Související stránky</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/zachrana-dat/hdd"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Záchrana dat z HDD – více informací
            </Link>
            <Link
              href="/cenik-zachrany-dat"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Zpět na hlavní ceník
            </Link>
            <Link
              href="/cenik-zachrany-dat/ssd"
              className="flex items-center text-primary hover:text-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Ceník obnovy dat z SSD
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
