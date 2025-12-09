import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Truck, MapPin, Clock, CheckCircle, HardDrive, Database, Smartphone, CreditCard, Server, Apple, ChevronRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getKrajskaMesta, getMestoBySlug, Mesto } from '@/mesta';
import { siteConfig } from '@/config/site.config';

// Only generate pages for regional capitals (14 cities)
export async function generateStaticParams() {
  const krajskaMesta = getKrajskaMesta();
  return krajskaMesta.map((mesto) => ({
    mesto: mesto.slug,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ mesto: string }>
}): Promise<Metadata> {
  const { mesto: slug } = await params;
  const mesto = getMestoBySlug(slug);

  if (!mesto || !mesto.isRegionalCapital) {
    return {
      title: 'Strana nenalezena | DataHelp.cz',
    };
  }

  const title = `Záchrana dat ${mesto.name} | Svoz zdarma | DataHelp.cz`;
  const description = `Profesionální záchrana dat ${mesto.nameLocative} a okolí. 25 let zkušeností, bezplatná diagnostika, svoz ${mesto.nameGenitive} zdarma. Obnova dat z HDD, SSD, RAID, NAS. Volejte ${siteConfig.contact.phone}.`;

  return {
    title,
    description,
    keywords: [
      `záchrana dat ${mesto.name}`,
      `obnova dat ${mesto.name}`,
      `data recovery ${mesto.name}`,
      `oprava disku ${mesto.name}`,
      `záchrana dat ${mesto.region}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://www.datahelp.cz/zachrana-dat/${mesto.slug}`,
      siteName: 'DataHelp.cz',
      locale: 'cs_CZ',
      type: 'website',
    },
    alternates: {
      canonical: `https://www.datahelp.cz/zachrana-dat/${mesto.slug}`,
    },
  };
}

// Schema.org structured data
function generateSchemaOrg(mesto: Mesto) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Záchrana dat ${mesto.name}`,
    description: `Profesionální záchrana a obnova dat ${mesto.nameLocative} a okolí`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'DataHelp s.r.o.',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jirsíkova 541/1',
        addressLocality: 'Praha',
        postalCode: '186 00',
        addressCountry: 'CZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '50.0933',
        longitude: '14.4476',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Friday',
          opens: '08:00',
          closes: '15:30',
        },
      ],
    },
    areaServed: {
      '@type': 'City',
      name: mesto.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: mesto.region,
      },
    },
    serviceType: 'Data Recovery',
  };
}

// FAQ Schema
function generateFAQSchema(mesto: Mesto) {
  const faqs = [
    {
      question: `Máte pobočku ${mesto.nameLocative}?`,
      answer: `Ne, naše specializovaná laboratoř se nachází v Praze-Karlíně. Pro klienty ${mesto.nameGenitive} však zajišťujeme kompletní servis včetně bezplatného svozu a doručení.`,
    },
    {
      question: `Jak dlouho trvá svoz ${mesto.nameGenitive}?`,
      answer: `${mesto.deliveryTime}. Kurýr vyzvedne zařízení na vámi určené adrese a následující pracovní den je disk v naší laboratoři.`,
    },
    {
      question: `Kolik stojí záchrana dat pro klienty ${mesto.nameGenitive}?`,
      answer: `Cena závisí na typu a rozsahu poškození, nikoliv na vzdálenosti. Svoz i diagnostika jsou zdarma. Cenu sdělíme až po diagnostice a platíte pouze v případě úspěšné záchrany dat.`,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Services data
const services = [
  { name: 'HDD disky', href: '/zachrana-dat/hdd', icon: HardDrive, desc: 'Mechanické a elektronické závady' },
  { name: 'SSD disky', href: '/zachrana-dat/ssd', icon: Database, desc: 'Flash paměti a řadiče' },
  { name: 'RAID pole', href: '/zachrana-dat/raid', icon: Server, desc: 'Všechny úrovně RAID' },
  { name: 'NAS servery', href: '/zachrana-dat/nas', icon: Server, desc: 'Synology, QNAP, WD' },
  { name: 'Mobilní telefony', href: '/zachrana-dat/mobilni-telefon', icon: Smartphone, desc: 'iPhone, Android' },
  { name: 'Apple zařízení', href: '/zachrana-dat/apple', icon: Apple, desc: 'MacBook, iMac, Mac' },
  { name: 'Paměťové karty', href: '/zachrana-dat/sd-karta', icon: CreditCard, desc: 'SD, microSD, CF' },
  { name: 'USB flash disky', href: '/zachrana-dat/usb-flash', icon: HardDrive, desc: 'Všechny značky' },
];

export default async function MestoPage({ params }: { params: Promise<{ mesto: string }> }) {
  const { mesto: slug } = await params;
  const mesto = getMestoBySlug(slug);

  // Only show pages for regional capitals
  if (!mesto || !mesto.isRegionalCapital) {
    notFound();
  }

  const schemaOrg = generateSchemaOrg(mesto);
  const faqSchema = generateFAQSchema(mesto);

  const faqs = [
    {
      question: `Máte pobočku ${mesto.nameLocative}?`,
      answer: `Ne, naše specializovaná laboratoř se nachází v Praze-Karlíně. Pro klienty ${mesto.nameGenitive} však zajišťujeme kompletní servis včetně bezplatného svozu a doručení. Díky tomu máte přístup ke stejnému špičkovému vybavení jako pražští klienti.`,
    },
    {
      question: `Jak dlouho trvá svoz ${mesto.nameGenitive}?`,
      answer: `${mesto.deliveryTime}. Kurýr vyzvedne zařízení na vámi určené adrese a následující pracovní den je disk v naší laboratoři.`,
    },
    {
      question: `Kolik stojí záchrana dat pro klienty ${mesto.nameGenitive}?`,
      answer: `Cena závisí na typu a rozsahu poškození, nikoliv na vzdálenosti. Svoz i diagnostika jsou zdarma. Cenu sdělíme až po diagnostice a platíte pouze v případě úspěšné záchrany dat.`,
    },
    {
      question: 'Mohu disk přivézt osobně?',
      answer: mesto.distanceFromPrague === 0
        ? 'Ano, můžete nás navštívit osobně v Praze-Karlíně, Jirsíkova 541/1. Otevřeno máme Po-Čt 9-17h, Pá 8-15:30.'
        : `Ano, můžete přijet do naší laboratoře v Praze-Karlíně (vzdálenost ${mesto.distanceFromPrague} km). Většina klientů ${mesto.nameGenitive} však využívá bezplatný svoz kurýrem.`,
    },
    {
      question: 'Jak jsou data chráněna během přepravy?',
      answer: 'Doporučíme vám, jak disk bezpečně zabalit. Kurýr používá speciální přepravní podmínky pro citlivé zboží. Všechna svěřená data jsou chráněna mlčenlivostí a po předání vám jsou nevratně smazána.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Kontaktujte nás',
      description: `Zavolejte na ${siteConfig.contact.phone} nebo vyplňte online formulář. Poradíme vám, jak postupovat a domluvíme svoz ${mesto.nameGenitive}.`,
    },
    {
      number: '2',
      title: `Vyzvedneme disk ${mesto.nameLocative}`,
      description: `Kurýr vyzvedne vaše zařízení na vámi určené adrese ${mesto.nameLocative}. ${mesto.deliveryTime}.`,
    },
    {
      number: '3',
      title: 'Bezplatná diagnostika',
      description: 'V naší pražské laboratoři provedeme diagnostiku a sdělíme vám, jaká data lze zachránit a za jakou cenu.',
    },
    {
      number: '4',
      title: 'Záchrana dat',
      description: 'Po vašem schválení zahájíme záchranu dat. Standardně do 3-14 dnů, expresně do 24-48 hodin.',
    },
    {
      number: '5',
      title: `Doručení zpět do ${mesto.nameGenitive}`,
      description: `Zachráněná data vám doručíme kurýrem zpět ${mesto.nameLocative === 'v Praze' ? 'v Praze' : `do ${mesto.nameGenitive}`}.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/backgrounds/services-bg.webp"
              alt={`Zachrana dat ${mesto.name}`}
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(27, 56, 122, 0.95) 50%, rgba(27, 56, 122, 0.7) 100%)'
              }}
            />
          </div>

          <div className="relative z-10 text-white py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Záchrana dat {mesto.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                {mesto.region}
              </p>
              <p className="text-lg text-white/80 max-w-3xl mb-8">
                Profesionální obnova dat z pevných disků, SSD, RAID polí a flash pamětí
                pro klienty {mesto.nameGenitive} a celého regionu.
                Bezplatná diagnostika a svoz {mesto.nameGenitive} zdarma.
              </p>

              {/* Info boxes */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <span className="text-white/70 text-sm block">Svoz {mesto.nameGenitive}</span>
                  <span className="text-lg font-semibold text-green-400">ZDARMA</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <span className="text-white/70 text-sm block">Diagnostika</span>
                  <span className="text-lg font-semibold text-green-400">ZDARMA</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <span className="text-white/70 text-sm block">Vyzvednutí</span>
                  <span className="text-lg font-semibold">{mesto.deliveryTime}</span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="inline-flex items-center bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {siteConfig.contact.phone}
                </a>
                <Link
                  href="/poptavka-zachrany-dat"
                  className="inline-flex items-center bg-white hover:bg-gray-100 text-primary font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <Truck className="h-5 w-5 mr-2" />
                  Objednat bezplatný svoz
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Breadcrumbs />

        {/* Local Info Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Záchrana dat pro {mesto.name} a okolí
                  </h2>
                  <p className="text-gray-700 text-lg mb-4">
                    {mesto.localInfo}
                  </p>
                  {mesto.nearbyTowns.length > 0 && (
                    <p className="text-gray-600">
                      <strong>Obsluhujeme také:</strong> {mesto.nearbyTowns.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
              Služby záchrany dat {mesto.nameLocative}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <service.icon className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-4">
              Jak funguje záchrana dat pro {mesto.name}?
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              Kompletní proces od kontaktu až po doručení zachráněných dat
            </p>

            <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-50 rounded-xl p-5 h-full">
                    <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold mb-3">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-primary mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-300 z-10">
                      <ChevronRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Proč si vybrat DataHelp?
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">25+</div>
                <p className="text-white/80">let zkušeností</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">95%</div>
                <p className="text-white/80">úspěšnost záchrany</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">50000+</div>
                <p className="text-white/80">spokojených klientů</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">0 Kč</div>
                <p className="text-white/80">diagnostika a svoz</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10">
              Časté dotazy - záchrana dat {mesto.name}
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                >
                  <summary className="p-5 cursor-pointer font-semibold text-primary flex justify-between items-center hover:bg-gray-50">
                    {faq.question}
                    <span className="text-accent group-open:rotate-180 transition-transform ml-4">
                      <ChevronRight className="h-5 w-5 rotate-90" />
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Potřebujete zachránit data {mesto.nameLocative}?
              </h2>
              <p className="text-gray-600 mb-8">
                Kontaktujte nás pro bezplatnou konzultaci. Svoz {mesto.nameGenitive} zajistíme zdarma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Volat: {siteConfig.contact.phone}
                </a>
                <Link
                  href="/poptavka-zachrany-dat"
                  className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                >
                  Bezplatná diagnostika
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Cities */}
        {mesto.nearbyTowns.length > 0 && (
          <section className="py-8 bg-gray-100">
            <div className="container mx-auto px-4">
              <p className="text-center text-gray-600">
                <strong>Další města v regionu:</strong>{' '}
                {mesto.nearbyTowns.map((town, index) => (
                  <span key={town}>
                    {town}
                    {index < mesto.nearbyTowns.length - 1 && ' • '}
                  </span>
                ))}
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
