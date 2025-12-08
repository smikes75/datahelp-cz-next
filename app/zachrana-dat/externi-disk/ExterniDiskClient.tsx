'use client';

/**
 * Externí disk - Data Recovery stránka
 * Obsah identický s datahelp.cz/zachrana-dat/externi-disk
 */

import { HardDrive, Usb, AlertTriangle, ArrowRight, Phone, Mail, ChevronRight } from 'lucide-react';
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
    { name: 'Externí disk', href: '/zachrana-dat/externi-disk', active: true },
    { name: 'SSD', href: '/zachrana-dat/ssd', active: false },
    { name: 'SD karta', href: '/zachrana-dat/sd-karta', active: false },
    { name: 'USB Flash', href: '/zachrana-dat/usb-flash', active: false },
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

export function ExterniDiskClient() {
  const t = useTranslations();

  const softwareIssues = [
    {
      title: 'Smazaná data',
      cause: 'Zavinění uživatelem, softwarová chyba',
      symptoms: [
        'Nemohu najít svá data',
        'Soubory mají nulovou velikost',
        'Složky jsou prázdné',
        'Programy hlásí poškozené soubory'
      ]
    },
    {
      title: 'Zformátování',
      cause: 'Zavinění uživatelem, softwarová chyba',
      symptoms: [
        'Médium se tváří jako prázdné',
        'Diskový oddíl je na pohled prázdný',
        'Systém mě nutí provést zformátování',
        'Po instalaci OS je disk nebo oddíl prázdný'
      ]
    },
    {
      title: 'Reinstalace operačního systému a zformátování disku',
      cause: 'Zavinění uživatelem, softwarová chyba',
      symptoms: [
        'neopatrností při instalaci/opravě spouštění OS',
        'část dat již bývá přepsána OS'
      ]
    },
    {
      title: 'Po nákaze virem',
      cause: 'Průnik zvenčí',
      symptoms: [
        'Antivirus odhalil hrozby a od té doby nemohu nalézt důležitá data.',
        'Počítač se chová "jinak", data mizí sama od sebe.'
      ]
    }
  ];

  const hardwareIssues = [
    {
      title: 'Utržené čtecí hlavy',
      cause: 'Fyzický pád, otřes, únava materiálu, výrobní vady',
      symptoms: [
        'Po pádu, případně sám od sebe, se disk chová jinak, vydává jiný zvuk (cvaká) a hlásí problémy.',
        'Disk po pádu nenaběhne a systém jej vůbec nedetekuje',
        'Disk se slyšitelně roztočí, ale při čtení dat dochází k chybám.',
        'Při pokusu o zapnutí dojde k vypnutí a restartu počítače.',
        'Médium je podezřele hlasité.'
      ]
    },
    {
      title: 'Poškozený povrch datových ploten',
      cause: 'Fyzický pád, otřes, únava materiálu, nečistota',
      symptoms: [
        'Disk se slyšitelně roztočí, ale při čtení dochází k chybám.'
      ]
    },
    {
      title: 'Vadné sektory',
      cause: 'Opotřebování ploten',
      symptoms: [
        'Poškozený disk je BIOSem detekován a vydává cvakavé nebo chrčivé zvuky. Ztrácí se data. Systém, případně nainstalovaná utilita hlásí problémy s vadnými sektory.'
      ]
    },
    {
      title: 'Zadřená ložiska – zaseklé hlavy na plotnách',
      cause: 'Výrobní vady',
      symptoms: [
        'Disk se slyšitelně snaží roztočit, ale rychle dojde k vypnutí a restartu PC.',
        'Změnil se zvuk HDD, někdy může znít velmi hlasitě.'
      ]
    },
    {
      title: 'Vadná elektronika vnější, vnitřní',
      cause: 'Elektrický proud, přepětí',
      symptoms: [
        'Disk se vůbec netočí a BIOS jej nedetekuje',
        'HDD vydávat tichý zvuk',
        'Médium může být cítit po spálené elektronice',
        'Disk silně hřeje',
        'Disk se roztočí a pouze cvaká hlavami o mechanické dorazy. V některých případech zablokuje (přetíží) nebo zničí i dobrý zdroj v PC/NTB.'
      ]
    },
    {
      title: 'Vadný motor',
      cause: 'Výrobní vady, fyzický pád',
      symptoms: [
        'Po pádu se HDD vůbec nezapne.',
        'Disk zní jinak, vydává podivné zvuky.'
      ]
    },
    {
      title: 'Různá poškození',
      cause: 'Přírodní živly (požár, povodeň)',
      symptoms: [
        'Disk přišel do kontaktu s vodou či ohněm. Nezapínejte jej!'
      ]
    },
    {
      title: 'Přepsaná servisní data',
      cause: 'Lidský faktor, hardwarová/softwarová chyba',
      symptoms: [
        'Po klonování servisních informací disku PC nenaběhne a hlásí problémy s HDD.'
      ]
    }
  ];

  const interfaces = [
    'klasické rozhraní - USB 2.0/3.0',
    'FireWire - IEEE-1394',
    'eSata',
    'připojené síťově - LAN, WiFi',
    'Thunderbolt'
  ];

  const formFactors = ['5,25"', '3,5"', '2,5"', '1,8"'];

  const fileSystems = ['Windows', 'Apple Mac', 'Linux', 'FreeBSD', 'OpenBSD', 'Novell', 'OS/2'];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceSchema
        name="Záchrana dat z externího disku"
        description="Profesionální záchrana dat z externích disků všech typů a značek. Řešíme softwarové i hardwarové závady."
        serviceType="Data Recovery Service"
      />
      <PageHeader
        title="Externí disk"
        subtitle="Váš externí disk přestal fungovat a máte obavy o svá důležitá data? Nemusíte se bát – i z těžce poškozeného disku dokážeme data obnovit. Naši specialisté se postarají o bezpečnou obnovu vašich souborů."
        backgroundImage="hdd-recovery.webp"
      />
      <ServiceTabs />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">
        {/* Main Intro Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Váš externí disk přestal fungovat a vy se obáváte o svá důležitá data?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              <strong>Nemějte obavy</strong> – jsme tady, abychom vám pomohli! I v případě <strong>vážného poškození externího disku</strong> je často možné provést <strong>obnovu dat z HDD</strong>, a my jsme připraveni vám s tím pomoci.
            </p>
            <p className="mb-4">
              Vaše <strong>fotografie, hudba, důležité osobní nebo firemní dokumenty</strong> uložené na externím disku <strong>nejsou ztraceny navždy</strong>. Jsme <strong>specialisté na obnovu dat ze všech typů externích HDD</strong> – ať už má disk plotny o průměru 2,5", 3,5" nebo jiný rozměr. <strong>Typ disku ani rozsah poškození pro nás nepředstavují překážku</strong> – poradíme si s mechanickým i elektronickým poškozením, včetně problémů s <strong>plotnami</strong> či <strong>čtecími hlavami</strong>.
            </p>
            <p className="mb-4">
              Pokud používáte externí disky značek <strong>Western Digital</strong> nebo <strong>Seagate</strong>, jsme připraveni na jejich diagnostiku a záchranu dat – jedná se o <strong>nejčastější značky</strong>, se kterými se setkáváme. Zkušenosti však máme také s dalšími výrobci, jako jsou <strong>Toshiba, Samsung</strong> či <strong>Hitachi</strong>.
            </p>
            <p>
              <strong>Bezpečná záchrana dat</strong> je pro nás prioritou, proto používáme <strong>moderní technologie</strong> k dosažení <strong>maximální úspěšnosti</strong>.{' '}
              <Link href="/poptavka-zachrany-dat" className="text-accent font-semibold hover:underline">Kontaktujte nás</Link>{' '}
              co nejdříve, provedeme odbornou <strong>diagnostiku</strong> zdarma a navrhneme nejlepší <strong>postup</strong> pro záchranu vašich dat.
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
                      <div className="font-medium text-primary mb-2">{issue.cause}</div>
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
                      <div className="font-medium text-primary mb-2">{issue.cause}</div>
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

        {/* Repairs vs Data Recovery Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Opravy disků a záchrana dat: Co je důležité vědět
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Je důležité <strong>rozlišovat mezi záchranou dat z disku</strong> a <strong>opravou disku</strong>.
            </p>
            <p className="mb-4">
              <strong>Záchrana dat</strong> se zaměřuje na <strong>obnovení vašich souborů z poškozeného nebo nefunkčního disku</strong>, zatímco <strong>oprava disku</strong> znamená jeho uvedení do plně funkčního stavu pro další používání.
            </p>
            <p className="mb-4">
              Mechanicky poškozené disky se běžně <strong>neopravují</strong>, a to z důvodu <strong>vysokých nákladů na opravu</strong> a omezené spolehlivosti opraveného disku. V některých případech, kdy disk selže kvůli <strong>chybám ve firmwaru</strong> nebo <strong>poškození servisních dat</strong>, je oprava disku možná. Tento proces však zahrnuje <strong>kompletní inicializaci</strong> a znovu <strong>kalibraci servisních oblastí</strong>, což vede ke ztrátě všech uložených dat.
            </p>
            <p>
              Z těchto důvodů <strong>DataHelp s.r.o. opravy disků neprovádí</strong>. Naše specializace je záchrana dat, a to i v případě mechanického poškození, selhání firmwaru nebo poškození servisních dat.
            </p>
          </div>
        </div>

        {/* Supported Types Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Provádíme záchranu dat ze všech typů disků
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Interfaces */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <Usb className="h-5 w-5 text-accent" />
                Externí rozhraní:
              </h3>
              <ul className="space-y-2">
                {interfaces.map((iface, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-accent mt-1">•</span>
                    <span>{iface}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Factors */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-accent" />
                Rozměrové formáty:
              </h3>
              <div className="flex flex-wrap gap-2">
                {formFactors.map((size, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* File Systems */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Souborové systémy následujících platforem:</h3>
              <ul className="space-y-2">
                {fileSystems.map((fs, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-accent">•</span>
                    <span>{fs}</span>
                  </li>
                ))}
              </ul>
            </div>
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
