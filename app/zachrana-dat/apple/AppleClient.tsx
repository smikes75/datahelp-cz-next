'use client';

/**
 * Apple - Data Recovery stránka
 * Obsah identický s datahelp.cz/zachrana-dat/apple
 */

import { Laptop, Smartphone, AlertTriangle, ArrowRight, Phone, Mail, ChevronRight } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ServiceSchema } from '@/components/schema/ServiceSchema';

// Apple logo SVG component
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

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
    { name: 'Apple', href: '/zachrana-dat/apple', active: true },
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

export function AppleClient() {
  const t = useTranslations();

  const commonIssues = [
    {
      title: 'iPhone/iPad nelze nabít ani připojit k počítači',
      desc: 'Tento problém často souvisí s nabíjecím konektorem.'
    },
    {
      title: 'Zamrznutí na logu Apple',
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
      title: 'Neúspěšný upgrade iOS',
      desc: 'Při nedostatku paměti nebo přerušení napájení může dojít k problémům při aktualizaci iOS.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceSchema
        name="Záchrana dat z Apple zařízení"
        description="Profesionální záchrana dat z MacBooků, iMaců, iPhonů a iPadů. Podporujeme APFS a HFS+ souborové systémy."
        serviceType="Data Recovery Service"
      />
      <PageHeader
        title="Apple"
        subtitle="Ztratili jste data na iPhonu, iPadu, MacBooku či iMacu? Pomůžeme vám je obnovit, ať už je problém s mechanickým poškozením, šifrováním, nebo souborovým systémem HFS+."
        backgroundImage="mobile-recovery.webp"
      />
      <ServiceTabs />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">
        {/* Main Intro Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Obnova a záchrana dat z Apple zařízení
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Ztratili jste <strong>důležitá data</strong> nebo došlo k poškození vašeho <strong>Apple zařízení</strong>? Jsme tu, abychom vám pomohli. Naše služby <strong>záchrany dat</strong> zahrnují zařízení jako <strong>iPhone, iPad, MacBook i iMac</strong>. Spolehlivě dokážeme <strong>obnovit data</strong> i v případech, kdy se zdá, že jsou data ztracena nenávratně.
            </p>
            <p className="mb-4">
              Uživatelé Apple mají výhodu nástroje <strong>Time Machine</strong>, který umožňuje automatickou a pravidelnou zálohu dat. Než se na nás obrátíte, <strong>doporučujeme zkontrolovat</strong>, zda nejsou ztracená data zálohována pomocí <strong>Time Machine</strong> – může to být snadná cesta k rychlému obnovení.
            </p>
            <p>
              U přístrojů s SSD disky (zejména <strong>MacBooky</strong>) pracujeme s přístupem přes speciální datové konektory. Apple používá proprietární konektory jako <strong>Lightning</strong> a <strong>MagSafe</strong> nebo v poslední době také <strong>USB-C</strong>. Naše laboratoř je vybavena potřebnými redukcemi pro práci se všemi aktuálními typy.
            </p>
          </div>
        </div>

        {/* iPhone/iPad Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="h-8 w-8 text-accent" />
            <h2 className="text-2xl font-bold text-primary">Obnova dat z iPhone a iPad</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-primary mb-3">Příčiny ztráty dat:</h3>
              <p className="text-gray-700 mb-6">
                Ztráta dat na iPhone či iPad bývá způsobena chybou uživatele, selháním paměti, případně nečekanými problémy s iOS.
              </p>

              <h3 className="font-bold text-primary mb-3">Doba obnovy:</h3>
              <p className="text-gray-700">
                Obnova dat z Apple zařízení může trvat od několika hodin až po několik týdnů, v závislosti na typu závady a specifikacích zařízení. Obnova dat z iPhone obvykle zabere desítky hodin, přičemž časová náročnost se liší podle modelu (např. iPhone 6 až 15). U iPadu může obnova trvat několik dní až týdnů, bez ohledu na typ zařízení (Mini, Air, nebo Pro).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-primary mb-3">Úspěšnost:</h3>
              <p className="text-gray-700 mb-6">
                Obnova dat z Apple zařízení může být náročná a má nižší úspěšnost, zejména kvůli <strong>dvojitému šifrování</strong>. Aby byla obnova možná, je nezbytné, aby zařízení nebylo nastaveno do továrního nastavení.
              </p>

              <h3 className="font-bold text-primary mb-3">Náš postup:</h3>
              <p className="text-gray-700">
                Začneme vytvořením image paměťového prostoru, čímž se přiblížíme k datům v paměti zařízení.
              </p>
            </div>
          </div>
        </div>

        {/* MacBook Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Laptop className="h-8 w-8 text-accent" />
            <h2 className="text-2xl font-bold text-primary">Obnova dat z MacBooku</h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Většina Apple notebooků využívá unikátní souborový systém <strong>HFS</strong> a <strong>HFS+</strong> (Hierarchical File System), který vychází z <strong>FreeBSD</strong>. Tento systém je navržen tak, aby byl <strong>výkonnější a stabilnější</strong> než souborové systémy používané například ve Windows. Díky své robustnosti dokáže HFS+ <strong>fungovat i při drobných chybách</strong>, aniž by došlo k okamžitému zhroucení systému. Nicméně, pokud dojde k <strong>fyzickému poškození disku</strong>, HFS+ souborový systém se může rozpadnout, což záchranu dat značně ztěžuje.
            </p>
            <p>
              Z pohledu uživatele se tento problém často projeví tak, že zařízení po vypnutí <strong>nelze znovu nastartovat</strong> nebo přestane reagovat. V mnoha případech může také dojít k tzv. "<strong>boot loop</strong>" (cyklickému restartování), kdy zařízení neustále načítá, ale nespustí systém. Tento stav bývá způsoben právě narušením integrity HFS+ souborového systému. I v těchto případech si však umíme poradit – využíváme speciální nástroje a techniky, které nám umožňují pracovat přímo se strukturou poškozeného souborového systému a obnovit data, která by jinak byla nedostupná.
            </p>
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
                  <strong className="text-primary">{issue.title}</strong>: {issue.desc}
                </div>
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
