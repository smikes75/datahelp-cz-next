'use client';

/**
 * Mobile Phone Data Recovery stránka
 * Obsah identický s datahelp.cz/zachrana-dat/mobilni-telefon
 */

import { Smartphone, AlertTriangle, ArrowRight, Phone, Mail, ChevronRight } from 'lucide-react';
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
    { name: 'RAID', href: '/zachrana-dat/raid', active: false },
    { name: 'Apple', href: '/zachrana-dat/apple', active: false },
    { name: 'Android', href: '/zachrana-dat/mobilni-telefon', active: true },
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

export function MobilePhoneRecoveryClient() {
  const t = useTranslations();

  const commonIssues = [
    {
      title: 'Telefon/tablet nelze nabít ani připojit k počítači',
      desc: 'Tento problém často souvisí s nabíjecím konektorem.'
    },
    {
      title: 'Zamrznutí na logu Android',
      desc: 'Pokud se zařízení restartem neobnoví, může se jednat o chybu systému nebo paměti.'
    },
    {
      title: 'Zařízení se nezapne',
      desc: 'Může se jednat o vybitou baterii, nefunkční tlačítko, fyzické poškození nebo selhání hardwaru.'
    },
    {
      title: 'Červená obrazovka',
      desc: 'Pokud zařízení přijde do kontaktu s vodou, může dojít k vážné poruše. Přístroj nenabíjejte a obraťte se na nás.'
    },
    {
      title: 'Horizontální čáry na displeji',
      desc: 'Často se objevují po pádu nebo nárazu a mohou bránit v používání dotykové vrstvy.'
    },
    {
      title: 'Zamrznutí v recovery módu',
      desc: 'Pokud je nutné tovární nastavení, dojde ke ztrátě všech dat.'
    },
    {
      title: 'Neúspěšný upgrade OS',
      desc: 'Při nedostatku paměti nebo přerušení napájení může dojít k problémům při aktualizaci OS.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceSchema
        name={t('services.mobile.title')}
        description={t('services.mobile.desc')}
        serviceType="Mobile Phone Data Recovery Service"
      />
      <PageHeader
        title="Android"
        subtitle="Ztratili jste data z interní paměti mobilu, nebo tabletu s vestavěným operačním systémem Android? Díky nově vlastněným technologiím řešící dešifrování dat dokážeme vaše data zachránit s daleko vyšší úspěšností než kdy v minulosti."
        backgroundImage="mobile-recovery.webp"
      />
      <ServiceTabs />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">
        {/* Main Intro Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Obnova a záchrana dat z Android zařízení
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Mobilní telefony jsou dnes jedním z nejdůležitějších míst, kde ukládáme <strong>fotografie, kontakty, zprávy</strong> a další osobní nebo pracovní <strong>data</strong>. Při <strong>ztrátě dat</strong> je jejich <strong>obnova z Android zařízení</strong> často složitější, než si lidé myslí. Moderní telefony používají technologie, jako je <strong>funkce TRIM</strong> a <strong>interní šifrování</strong>, které pomáhají zajišťovat <strong>výkon a bezpečnost</strong>, ale komplikují možnost <strong>obnovení dat</strong>.
            </p>
          </div>
        </div>

        {/* TRIM Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Co je funkce TRIM a jak ovlivňuje záchranu smazaných dat?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Když na <strong>Android telefonu</strong> něco smažete, například <strong>fotografii</strong>, obvykle to neznamená, že se okamžitě odstraní z paměti. Dříve bylo možné takto smazaná data obnovit, protože v paměti zůstala „zapsaná" až do chvíle, kdy na ně bylo něco nového uloženo.
            </p>
            <p className="mb-4">
              <strong>Funkce TRIM</strong> tento proces ale mění.
            </p>
            <p>
              TRIM automaticky uvolní místo po <strong>smazání dat</strong> tak, že paměťové bloky ihned vymaže a připraví na nové záznamy. Uvolněná paměť se přepíše tzv. <strong>nulovým zápisem</strong>, takže místo, kde byla smazaná fotka, se zcela vyprázdní a tím se prakticky vymaže <strong>možnost obnovení</strong>. Pokud se TRIM proces dokončí, obnova dat už není možná, protože veškerá původní data jsou nenávratně ztracena.
            </p>
          </div>
        </div>

        {/* Encryption Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Jak funguje interní šifrování a proč ztěžuje obnovu dat?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              <strong>Interní šifrování</strong> chrání data uložená na vašem zařízení tím, že je zajišťuje proti neoprávněnému přístupu pomocí <strong>šifrovacích klíčů</strong>. Pokud telefon ztratí přístup k těmto klíčům (např. při zapomenutí hesla nebo při vážném poškození telefonu), šance na <strong>obnovu dat</strong> se také snižuje. Obnovení šifrovaných dat vyžaduje velmi <strong>specifické nástroje</strong> a <strong>odborné znalosti</strong>.
            </p>
          </div>
        </div>

        {/* What to do - Deleted Data */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Co dělat při smazání dat z Android zařízení?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Pokud na svém zařízení Android omylem <strong>smažete</strong> důležitá <strong>data</strong>, <strong>vypněte telefon</strong> co nejdříve a <strong>vyhledejte odbornou pomoc</strong>. Naše služby se <strong>specializují na záchranu dat</strong> z Android zařízení a <strong>používáme postupy</strong> a <strong>speciální nástroje</strong>, které mohou pomoct obnovit data i v případech, kdy funkce TRIM nebo šifrování obnovu dat značně komplikují.
            </p>
            <p className="font-semibold text-primary">
              <Link href="/poptavka-zachrany-dat" className="text-accent hover:underline">Kontaktujte nás co nejdříve</Link> – čím méně zařízení používáte po ztrátě dat, tím vyšší je šance na jejich úspěšné obnovení.
            </p>
          </div>
        </div>

        {/* What to do - Physical Damage */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-red-700 mb-6">
                Co dělat při fyzickém poškození Android zařízení?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Při <strong>fyzickém poškození Android zařízení</strong> se jej <strong>nepokoušejte zapnout</strong> nebo <strong>nabíjet</strong>, abyste předešli dalšímu poškození hardwaru. Pokud to jde, opatrně <strong>vyjměte SD kartu</strong> a <strong>SIM kartu</strong> – mohou obsahovat cenná data, která lze obnovit zvlášť. Dále doporučujeme přihlásit se do svého cloudového účtu (např. <strong>Google Drive</strong> nebo <strong>Fotky Google</strong>), kde může být část dat automaticky zálohována. Pro záchranu interních dat z poškozeného zařízení se obraťte přímo na <strong>odborníky</strong> – máme potřebné <strong>nástroje</strong> a osvědčené <strong>techniky</strong> pro obnovu dat i z fyzicky poškozených médií. Zařízení <strong>sami nerozebírejte</strong>, neodborný zásah může záchranu dat výrazně ztížit.
                </p>
                <p className="font-semibold">
                  Čím dříve začneme, tím větší je šance na úspěšné obnovení dat – zejména pokud bylo zařízení vystaveno vodě.
                </p>
                <p className="mt-4">
                  <Link href="/poptavka-zachrany-dat" className="text-accent font-semibold hover:underline">Nečekejte, až bude pozdě</Link> – kontaktujte nás a my se postaráme o záchranu vašich cenných dat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Issues Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Přehled běžných závad:
          </h2>
          <ul className="space-y-4">
            {commonIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <div className="text-gray-700">
                  <strong className="text-primary">{issue.title}:</strong> {issue.desc}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Potřebujete zachránit data?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold">1)</span>
              <p className="text-lg"><strong>Vypněte</strong> zařízení (další používání výrazně sníží šanci na záchranu dat).</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold">2)</span>
              <p className="text-lg">Objednejte <strong>bezplatnou diagnostiku</strong> poruchy a zjistěte cenu.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold">3)</span>
              <p className="text-lg">Po diagnostice se domluvíme na <strong>postupu záchrany dat</strong>.</p>
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
