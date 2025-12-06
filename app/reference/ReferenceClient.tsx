'use client';

import { Star, ArrowRight, Quote, TrendingUp, Award } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface SuccessStory {
  name: string;
  role: string;
  description: string;
  image: string;
  url: string;
}

interface CustomerQuote {
  text: string;
  author: string;
  company: string;
}

// PageHeader komponenta
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

export function ReferenceClient() {
  const t = useTranslations('reference');

  const successStories: SuccessStory[] = [
    {
      name: 'Štěpánka Hilgertová',
      role: 'Olympijská vítězka',
      description: 'Záchrana 200 GB fotografií a videí z externího disku s přepsaným souborovým systémem za 3 dny.',
      image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&q=80',
      url: '/clanky/zachranili-jsme-data-stepance-hilgertove'
    },
    {
      name: 'Michal Pavlíček',
      role: 'Legendární kytarista',
      description: 'Záchrana hudebních projektů ze dvou disků s kompletně poškozenou elektronikou.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
      url: '/clanky/vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka'
    },
    {
      name: 'Check Czech Fashion',
      role: 'Módní portál',
      description: 'Záchrana 6 let práce – články, videa a fotografie z 1TB disku po havárii čtecí hlavy.',
      image: 'https://images.unsplash.com/photo-1558394043-d7e93d0072da?w=600&q=80',
      url: '/clanky/jak-jsme-zachranovali-cenna-data-check-czech-fashion'
    },
    {
      name: 'Ondřej Pýcha',
      role: 'Fotograf',
      description: 'Úspěšná záchrana milionových fotografií z 3TB externího disku s nefunkčními čtecími hlavami.',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80',
      url: '/clanky/jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy'
    },
    {
      name: 'Kamila Špráchalová',
      role: 'Herečka a dabérka',
      description: 'Obnova ztracených vzpomínek – fotografie a nahrávky ze smazaného disku s mechanickými vadami.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      url: '/clanky/jak-jsme-obnovili-ztracene-vzpominky-herecky-a-daberky-kamily-sprachalove'
    }
  ];

  const customerQuotes: CustomerQuote[] = [
    {
      text: 'Vynikající firma co se týká komunikace, spolehlivosti a rychlosti. Moc jim děkuji za záchranu dat z poškozeného disku. Překvapila mě i rychlost a to do 24 hodin. Vřele doporučuji!',
      author: 'Karel Dolejš',
      company: 'Záchrana z HDD'
    },
    {
      text: 'Na dovolené jsme utopili fotoaparát a všechny fotky byly uložené jen na jeho paměti. Zachránili nám všechny vzpomínky z dovolené! Oceňuji rychlé vyřízení, milý přístup slečny na recepci i pana technika.',
      author: 'Eva Vášová',
      company: 'Záchrana z paměťové karty'
    },
    {
      text: 'Po povodních 2024 jsem měl RAID disky kompletně zatopené vodou. Byl jsem přesvědčený, že data jsou ztracena, ale tým z DataHelp odvedl úžasnou práci. Podařilo se jim vrátit všechna důležitá data. Jednoznačně doporučuji!',
      author: 'Eduard Kopl',
      company: 'Záchrana z RAID po povodni'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PageHeader
        title="Reference"
        subtitle="Důvěřují nám sportovci, umělci i firmy"
        backgroundImage="reference-bg.webp"
      />
      <Breadcrumbs />

      {/* Statistics Section */}
      <section className="py-4 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center gap-3 md:grid md:grid-cols-3 md:gap-6">
              {/* Rating */}
              <div className="text-center flex-1 max-w-[120px] md:max-w-none">
                <div className="flex items-center justify-center gap-0.5 md:gap-1 mb-1 md:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-base md:text-3xl font-bold text-primary mb-0.5 md:mb-1">4.9/5</div>
                <p className="text-[10px] md:text-sm text-gray-600 leading-tight">Hodnocení</p>
              </div>

              {/* Jobs Completed */}
              <div className="text-center flex-1 max-w-[120px] md:max-w-none">
                <div className="flex items-center justify-center mb-1 md:mb-3">
                  <TrendingUp className="h-4 w-4 md:h-8 md:w-8 text-primary/70" />
                </div>
                <div className="text-base md:text-3xl font-bold text-primary mb-0.5 md:mb-1">55k+</div>
                <p className="text-[10px] md:text-sm text-gray-600 leading-tight">zakázek</p>
              </div>

              {/* Success Rate */}
              <div className="text-center flex-1 max-w-[120px] md:max-w-none">
                <div className="flex items-center justify-center mb-1 md:mb-3">
                  <Award className="h-4 w-4 md:h-8 md:w-8 text-primary/70" />
                </div>
                <div className="text-base md:text-3xl font-bold text-primary mb-0.5 md:mb-1">95%</div>
                <p className="text-[10px] md:text-sm text-gray-600 leading-tight">úspěšnost</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Příběhy úspěchu
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pomohli jsme stovkám klientů z různých odvětví – od sportovců a umělců po velké firmy a organizace.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {successStories.map((story, index) => (
                <Link
                  key={index}
                  href={story.url}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{story.name}</h3>
                      <p className="text-sm text-gray-200">{story.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {story.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      Číst příběh →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Quotes Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Co říkají naši klienti
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {customerQuotes.map((quote, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 shadow-md"
                >
                  <Quote className="h-8 w-8 text-accent mb-4" />
                  <p className="text-gray-700 mb-4 italic">
                    &quot;{quote.text}&quot;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-primary">{quote.author}</p>
                    <p className="text-sm text-gray-600">{quote.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Potřebujete zachránit data?
              </h3>
              <p className="text-gray-600 mb-4">
                Kontaktujte nás ještě dnes a získejte profesionální pomoc
              </p>
              <Link
                href="/poptavka-zachrany-dat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Objednat diagnostiku zdarma →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
