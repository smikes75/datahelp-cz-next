'use client';

/**
 * SD Karta - Data Recovery stránka
 * Obsah identický s datahelp.cz/zachrana-dat/sd-karta
 */

import { CreditCard, ArrowRight, Phone, Mail, ChevronRight } from 'lucide-react';
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
    { name: 'SD karta', href: '/zachrana-dat/sd-karta', active: true },
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

export function SDKartaClient() {
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
      symptoms: ['Nedokončení zápisu při kopírování – brzké vyjmutí karty.']
    }
  ];

  const hardwareIssues = [
    {
      title: 'Vadný paměťový řadič',
      symptoms: ['Zařízení se nehlásí.', 'Karta udává jinou kapacitu úložného prostoru, než by měla.', 'U micro SD karet se jedná o tzv. monolitický čip – záchrana dat je obtížnější.']
    },
    {
      title: 'Vadné paměťové bloky',
      symptoms: ['Data nepřístupná, karta chce formátovat.']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceSchema
        name="Záchrana dat z SD karty"
        description="Profesionální záchrana dat z paměťových karet všech typů - SD, microSD, Compact Flash, XQD a dalších. Bezplatná diagnostika."
        serviceType="Data Recovery Service"
      />
      <PageHeader
        title="SD karta"
        subtitle="Máte nedostupná data na paměťové kartě? V DataHelpu se specializujeme na obnovu dat z různých typů karet, včetně MicroSD, Compact Flash a XQD. Bez ohledu na povahu poškození či výrobce vám naši specialisté pomohou obnovit vaše data."
        backgroundImage="ssd-recovery.webp"
      />
      <ServiceTabs />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">
        {/* Main Intro Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Poškodila se Vám paměťová karta?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              V DataHelpu se specializujeme na záchranu dat z <strong>MicroSD karet</strong>, stejně jako z dalších typů <strong>SD karet</strong>. Pokud vaše karta přestala fungovat, data jsou nedostupná nebo poškozená, nabízíme profesionální <strong>obnovu dat z poškozených paměťových karet</strong>. Pracujeme s širokou škálou značek, jako jsou <strong>Kingston, SanDisk, Samsung, ADATA, Transcend, Toshiba, Lexar, Tretec, Sony</strong> a další.
            </p>
            <p className="mb-4">
              Naše služby zahrnují i rychlou obnovu smazaných dat z paměťových karet používaných v <strong>digitálních fotoaparátech a kamerách</strong>. V případě ztráty dat doporučujeme okamžitě vypnout zařízení a kartu dále nepoužívat, aby nedošlo k trvalému poškození dat. Jakékoli pokusy o domácí opravu mohou vést k jejich nevratné ztrátě.
            </p>
            <p className="mb-4">
              Naše laboratoř je vybavena špičkovými technologiemi, které nám umožňují fyzicky přistupovat k poškozeným čipům a rekonstruovat data i z těch nejkomplikovanějších případů. Každá karta má svůj specifický <strong>řídící čip a paměťové bloky</strong>, které vyžadují odbornou analýzu.
            </p>
            <p>
              Nabízíme <strong>bezplatnou diagnostiku paměťových karet</strong> a platíte pouze za zachráněná data. Pokud potřebujete záchranu dat z paměťových karet, <Link href="/poptavka-zachrany-dat" className="text-accent font-semibold hover:underline">kontaktujte nás</Link>. Zajistíme diagnostiku zdarma a navrhneme nejvhodnější postup pro obnovu vašich dat.
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

        {/* Why Recovery is Complex Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Proč je obnova dat z paměťových karet tak náročná?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Záchrana dat z paměťových karet je složitý proces kvůli <strong>technologii flash pamětí</strong>, které jsou náchylné k poruchám podobně jako USB disky, flash disky nebo SSD disky. Nejčastější příčinou selhání je <strong>porucha řídícího čipu</strong>, který obsahuje algoritmus pro správu dat v paměťových buňkách. Tento algoritmus je klíčový pro správnou rekonstrukci dat, což činí proces obnovy dat výpočetně náročným.
            </p>
            <p className="mb-4">
              Kromě poruchy čipu je obnova dat z paměťových karet náročná také z důvodu <strong>omezené životnosti paměťových buněk</strong>, které mají daný počet zápisů. Zásadním problémem je rekonstrukce dat z celého souboru paměťového média, která vyžaduje velký datový prostor a technické vybavení laboratoře.
            </p>
            <p className="mb-4">
              Při obnově dat z paměťových karet je zásadní, že nelze pracovat pouze s částí paměťového média – je nutné zpracovat jeho <strong>kompletní obraz</strong>. To znamená, že například u 128 GB paměťové karty je potřeba pracovat s celým 128 GB souborem, což vyžaduje nejen velký výpočetní výkon, ale i dostatek času na podrobnou analýzu.
            </p>
            <p>
              Aby bylo možné efektivně vyhledat a obnovit potřebná data, je nutné mít k dispozici <strong>datový prostor</strong>, který je mnohonásobně větší než samotná kapacita karty. Tento prostor umožňuje bezpečné zpracování a rekonstrukci dat v plném rozsahu. Pokud vaše paměťová karta přestala fungovat, je pravděpodobné, že se jedná o poruchu řídícího čipu. V takovém případě je nezbytné využít profesionální služby pro záchranu dat, která má k dispozici <strong>špičkové vybavení pro rekonstrukci dat z flash pamětí</strong>.
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
