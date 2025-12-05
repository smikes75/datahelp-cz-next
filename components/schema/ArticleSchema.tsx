/**
 * Article Schema.org JSON-LD
 * Zobrazí článek v Google SERP s datem, autorem, obrázkem
 * Může dostat článek do Google News
 * Použití: Přidat na stránky blog článků (/clanky/[slug]/)
 */

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  url: string;
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  author = 'DataHelp s.r.o.',
  image = 'https://www.datahelp.cz/images/og-image.png',
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://www.datahelp.cz/o-nas/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DataHelp s.r.o.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.datahelp.cz/DataHelp.cz.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
