/**
 * LocalBusiness Schema.org JSON-LD
 * Zobrazí v Google SERP: rating stars, telefon, adresu, otevírací dobu
 * Použití: Přidat do root layout pro všechny stránky
 */

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'DataHelp s.r.o.',
    description: 'Profesionální záchrana a obnova dat z HDD, SSD, RAID, mobilních zařízení. Více než 25 let zkušeností, úspěšnost 95%.',
    url: 'https://www.datahelp.cz',
    telephone: '+420775220440',
    email: 'info@datahelp.cz',
    priceRange: '$$',

    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jirsíkova 541/1',
      addressLocality: 'Praha 8 - Karlín',
      postalCode: '186 00',
      addressCountry: 'CZ',
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.094042,
      longitude: 14.450050,
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

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '150',
    },

    foundingDate: '1998',

    sameAs: [
      'https://www.facebook.com/datahelpcz',
      'https://www.linkedin.com/company/datahelp',
    ],

    areaServed: {
      '@type': 'Country',
      name: 'Česká republika',
    },

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Služby záchrana dat',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Záchrana dat z HDD',
            description: 'Profesionální záchrana dat z pevných disků',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Záchrana dat z SSD',
            description: 'Obnova dat z SSD disků',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Záchrana dat z RAID',
            description: 'Rekonstrukce RAID polí',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Záchrana dat z mobilů',
            description: 'Obnova dat z mobilních telefonů',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
