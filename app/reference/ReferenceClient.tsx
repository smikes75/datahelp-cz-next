'use client';

import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Script from 'next/script';

interface SuccessStory {
  name: string;
  role: string;
  description: string;
  image: string;
  url: string;
}


// Logo references with actual SVG files
const logoReferences = [
  { name: 'ČVUT v Praze', src: '/images/references/cvut.svg', height: 60 },
  { name: 'Univerzita Karlova', src: '/images/references/uk.svg', height: 60 },
  { name: 'České dráhy', src: '/images/references/cd.svg', height: 30 },
  { name: 'Akademie věd ČR', src: '/images/references/avcr.svg', height: 50 },
  { name: 'AERO Vodochody', src: '/images/references/aero.svg', height: 35 },
  { name: 'Česká spořitelna', src: '/images/references/csas.svg', height: 40 },
  { name: 'Česká geologická služba', src: '/images/references/cgs.svg', height: 45 },
];


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

interface ReferenceClientProps {
  successStories: SuccessStory[];
}

export function ReferenceClient({ successStories }: ReferenceClientProps) {
  const t = useTranslations('reference');


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PageHeader
        title="Reference"
        subtitle="Důvěřují nám sportovci, umělci i firmy"
        backgroundImage="reference-bg.webp"
      />
      <Breadcrumbs />

      {/* Logo Strip Section */}
      <section className="py-6 md:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-sm text-gray-500 mb-8">Důvěřují nám přední české instituce a firmy</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {logoReferences.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  title={logo.name}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.height * 2}
                    height={logo.height}
                    className="w-auto object-contain"
                    style={{ height: logo.height }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Text References Section */}
      <section className="py-6 md:py-8 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              <span className="font-medium text-gray-700">A další:</span>{' '}
              Ministerstvo financí, Český telekomunikační úřad, Hasičský záchranný sbor hl. m. Prahy,
              Městská policie hl. m. Prahy, VŠCHT Praha, Univerzita Pardubice, Národní galerie v Praze,
              Fyzikální ústav AV ČR, Ústav organické chemie a biochemie AV ČR, T-Mobile, O2,
              Škoda Auto, ČEZ a stovky dalších firem a soukromých osob...
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 md:px-4 max-md:px-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 max-md:px-4">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Příběhy úspěchu
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pomohli jsme stovkám klientů z různých odvětví – od sportovců a umělců po velké firmy a organizace.
              </p>
            </div>

            {/* Mobile: Horizontal swipeable gallery */}
            <div className="md:hidden overflow-x-auto scrollbar-hide -mx-0 px-4">
              <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                {successStories.map((story, index) => (
                  <Link
                    key={index}
                    href={story.url}
                    className="group bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0"
                    style={{ width: '280px' }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="text-lg font-bold">{story.name}</h3>
                        <p className="text-xs text-gray-200">{story.role}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                        {story.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                        Číst příběh →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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

      {/* Elfsight Google Reviews Widget */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Co říkají naši klienti
              </h2>
            </div>
            {/* Elfsight Google Reviews Widget */}
            <div
              className="elfsight-app-d4a576be-88da-4007-8183-5e430e73c73c"
              data-elfsight-app-lazy
            />
            <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
          </div>
        </div>
      </section>
    </div>
  );
}
