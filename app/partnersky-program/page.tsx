import { Metadata } from 'next';
import Link from 'next/link';
import {
  Handshake,
  CheckCircle2,
  Mail,
  Percent,
  Truck,
  Clock,
  HardDrive,
  MessageCircle,
  CreditCard,
  Award,
  Gift
} from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Partnerský program | DataHelp.cz',
  description: 'Staňte se partnerem DataHelp. Bezplatná diagnostika, svoz zdarma, sleva 20% na záchranu dat. Program pro servisní střediska, IT firmy a e-shopy.',
  alternates: {
    canonical: 'https://www.datahelp.cz/partnersky-program',
  },
  openGraph: {
    title: 'Partnerský program | DataHelp.cz',
    description: 'Staňte se partnerem DataHelp. Bezplatná diagnostika, svoz zdarma, sleva 20% na záchranu dat.',
    url: 'https://www.datahelp.cz/partnersky-program',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Diagnostika závady zdarma',
    description: 'Nabízíme bezplatnou přednostní diagnostiku problému pro všechny partnery.',
  },
  {
    icon: Truck,
    title: 'Svoz zakázek zdarma po celé ČR',
    description: 'Bez ohledu na vzdálenost zajistíme svoz zakázek z jakéhokoliv místa v České republice – ať jste v Českých Budějovicích, Ostravě, Liberci, Plzni nebo Olomouci, vždy vám dokážeme pomoci.',
  },
  {
    icon: Clock,
    title: 'Rychlost prováděných služeb',
    description: 'Naše efektivní služby šetří čas a peníze nejen vám, ale i vašim zákazníkům.',
  },
  {
    icon: HardDrive,
    title: 'Záchrana dat ze všech typů datových médií',
    description: 'Specializujeme se na záchranu dat ze všech dostupných datových nosičů.',
  },
  {
    icon: MessageCircle,
    title: 'Přímá komunikace s odborníky',
    description: 'Možnost komunikovat přímo s techniky zajišťujícími záchranu dat vám umožňuje získat přesné informace o stavu vaší zakázky.',
  },
  {
    icon: CreditCard,
    title: 'Transparentní ceny',
    description: 'Naše ceny odpovídají vysoké kvalitě poskytovaných služeb a cenové limity jsou předem jasně stanovené.',
  },
  {
    icon: Percent,
    title: 'Sleva 20 % při zahájení spolupráce',
    description: 'Na realizované záchrany dat získáte slevu 20 %.',
  },
  {
    icon: CreditCard,
    title: 'Faktury se splatností 14 dní',
    description: 'Možnost platby na fakturu se 14 denní splatností.',
  },
  {
    icon: Award,
    title: 'Světová úroveň kvality',
    description: 'Díky kvalitě našich služeb se řadíme mezi špičku v oboru.',
  },
  {
    icon: Gift,
    title: 'Marketingové materiály zdarma',
    description: 'Poskytujeme zdarma marketingové materiály a propagační předměty k podpoře vaší spolupráce.',
  },
];

const targetAudience = [
  'Servisní střediska',
  'Velkoobchod / maloobchod s výpočetní a komunikační technikou a SW',
  'E-shopy',
  'Výrobci HW',
  'Vývoj SW',
  'Datastorage',
  'Instalace, správa a servis počítačových sítí',
];

export default function PartnerProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Hero section */}
      <section className="bg-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <Handshake className="h-12 w-12" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Staňte se partnerem
              </h1>
            </div>

          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-700 text-justify">
                Připravili jsme partnerský program, který přináší výhody v případě ztráty dat nejen pro Vás,
                ale i pro Vaše zákazníky. Získejte specializovanou službu záchrany dat a odměnu za kvalitní
                péči o své zákazníky.
              </p>
              <p className="text-gray-700 text-justify">
                V dnešní době je běžné, že se veškerá data, i ta nejcennější, uchovávají na datových nosičích,
                které však nesou riziko ztráty dat. Ať už je příčina jakákoliv, jsme připraveni Vám v této
                oblasti pomoci. Nabízíme služby zaměřené na záchranu dat z poškozených datových médií, ať už
                se jedná o softwarovou nebo hardwarovou závadu.
              </p>
            </div>

            {/* Target audience */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Komu je partnerský program určen
              </h2>
              <ul className="space-y-2">
                {targetAudience.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Důvody, proč se stát partnerem DataHelp
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Máte zájem o spolupráci?
              </h2>
              <p className="text-gray-800 mb-4">
                Kontaktujte nás na emailu:
              </p>
              <a
                href="mailto:cerna@datahelp.cz"
                className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:underline"
              >
                <Mail className="h-5 w-5" />
                cerna@datahelp.cz
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
