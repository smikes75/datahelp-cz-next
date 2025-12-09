import { Metadata } from 'next';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Sběrná místa a partneři | DataHelp.cz',
  description: 'Najděte nejbližší sběrné místo pro předání média k záchraně dat. Síť partnerů DataHelp po celé České republice.',
  alternates: {
    canonical: 'https://www.datahelp.cz/partneri',
  },
  openGraph: {
    title: 'Sběrná místa a partneři | DataHelp.cz',
    description: 'Najděte nejbližší sběrné místo pro předání média k záchraně dat.',
    url: 'https://www.datahelp.cz/partneri',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

// Partner data - easily editable
interface Partner {
  name: string;
  city: string;
  region: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  lat: number;
  lng: number;
}

// TODO: Doplnit skutečné partnery
const partners: Partner[] = [
  // Příklad struktury - nahraďte skutečnými daty
  /*
  {
    name: 'PC Servis Brno',
    city: 'Brno',
    region: 'Jihomoravský kraj',
    address: 'Masarykova 123, 602 00 Brno',
    phone: '+420 123 456 789',
    email: 'info@pcservisbrno.cz',
    website: 'https://www.pcservisbrno.cz',
    lat: 49.1951,
    lng: 16.6068,
  },
  */
];

// Group partners by region
const partnersByRegion = partners.reduce((acc, partner) => {
  if (!acc[partner.region]) {
    acc[partner.region] = [];
  }
  acc[partner.region].push(partner);
  return acc;
}, {} as Record<string, Partner[]>);

export default function PartneriPage() {
  const hasPartners = partners.length > 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <MapPin className="h-12 w-12" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Sběrná místa a partneři
              </h1>
            </div>
            <p className="text-xl text-white/90">
              Najděte nejbližší místo pro osobní předání média k záchraně dat.
              Všichni partneři zajistí bezpečné předání do naší laboratoře v Praze.
            </p>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-accent/10 border-b border-accent/20">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-700">
            <strong>Tip:</strong> Pokud nemáte partnera ve svém okolí, můžete využít{' '}
            <a href="/poptavka-zachrany-dat" className="text-accent font-semibold hover:underline">
              bezplatný svoz kurýrem
            </a>{' '}
            z jakéhokoliv místa v ČR.
          </p>
        </div>
      </section>

      {/* Partners List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {hasPartners ? (
            <div className="max-w-4xl mx-auto">
              {Object.entries(partnersByRegion).map(([region, regionPartners]) => (
                <div key={region} className="mb-10">
                  <h2 className="text-2xl font-bold text-primary mb-6 border-b border-gray-200 pb-2">
                    {region}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {regionPartners.map((partner, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {partner.name}
                        </h3>
                        <p className="text-accent font-medium mb-3">{partner.city}</p>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                            <span>{partner.address}</span>
                          </div>

                          {partner.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <a
                                href={`tel:${partner.phone}`}
                                className="hover:text-accent transition-colors"
                              >
                                {partner.phone}
                              </a>
                            </div>
                          )}

                          {partner.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <a
                                href={`mailto:${partner.email}`}
                                className="hover:text-accent transition-colors"
                              >
                                {partner.email}
                              </a>
                            </div>
                          )}

                          {partner.website && (
                            <div className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                              <a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent transition-colors"
                              >
                                Webové stránky
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Placeholder when no partners */
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Síť partnerů se připravuje
                </h2>
                <p className="text-gray-600 mb-8">
                  Aktuálně pracujeme na rozšíření sítě sběrných míst po celé České republice.
                  Mezitím můžete využít naše další možnosti předání média.
                </p>

                <div className="space-y-4">
                  <a
                    href="/poptavka-zachrany-dat"
                    className="block w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Objednat bezplatný svoz kurýrem
                  </a>
                  <a
                    href="/kontakt"
                    className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Navštívit laboratoř v Praze
                  </a>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                  Laboratoř DataHelp: Jirsíkova 541/1, Praha 8 - Karlín
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Chcete se stát partnerem?
            </h2>
            <p className="text-gray-600 mb-6">
              Nabízíme výhodný partnerský program pro servisní střediska, IT firmy a e-shopy.
            </p>
            <a
              href="/partnersky-program"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Více o partnerském programu
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
