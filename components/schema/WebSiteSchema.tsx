/**
 * WebSite Schema.org JSON-LD
 * Pomáhá Google pochopit strukturu webu a zobrazit sitelinks search box
 * Použití: Přidat do root layout pro všechny stránky
 */

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DataHelp.cz',
    alternateName: 'DataHelp',
    url: 'https://www.datahelp.cz',
    description: 'Profesionální záchrana a obnova dat z HDD, SSD, RAID, NAS a mobilních zařízení. Více než 25 let zkušeností.',
    publisher: {
      '@type': 'Organization',
      name: 'DataHelp s.r.o.',
      url: 'https://www.datahelp.cz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.datahelp.cz/images/logo.png',
      },
    },
    inLanguage: 'cs-CZ',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.datahelp.cz/clanky?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
