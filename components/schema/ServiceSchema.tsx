/**
 * Service Schema.org JSON-LD
 * Zobrazí službu jako rich result v Google SERP
 * Použití: Přidat na stránky služeb (/zachrana-dat/hdd/, /ssd/, atd.)
 */

interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
  offers?: {
    priceCurrency: string;
    price?: string;
    priceRange?: string;
  };
}

export function ServiceSchema({
  name,
  description,
  serviceType,
  areaServed = 'Česká republika',
  offers = { priceCurrency: 'CZK', priceRange: '1000-50000' },
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'LocalBusiness',
      name: 'DataHelp s.r.o.',
      telephone: '+420775220440',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jirsíkova 541/1',
        addressLocality: 'Praha 8',
        postalCode: '186 00',
        addressCountry: 'CZ',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: areaServed,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Ceník - ${name}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
          },
          priceCurrency: offers.priceCurrency,
          price: offers.price,
          priceSpecification: offers.priceRange
            ? {
                '@type': 'PriceSpecification',
                priceCurrency: offers.priceCurrency,
                minPrice: offers.priceRange.split('-')[0],
                maxPrice: offers.priceRange.split('-')[1],
              }
            : undefined,
        },
      ],
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://www.datahelp.cz/poptavka-zachrany-dat/',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: '+420775220440',
        contactType: 'customer service',
        areaServed: 'CZ',
        availableLanguage: ['cs', 'en'],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
