/**
 * SEO utility funkce a konfigurace pro schema.org
 * Pro použití v Next.js metadata
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  canonical?: string;
  schema?: Record<string, unknown>;
}

// Base schema pro organizaci
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DataHelp.cz",
  "url": "https://datahelp.cz",
  "logo": "https://datahelp.cz/DataHelp.cz.svg",
  "foundingDate": "1998",
  "description": "Profesionální záchrana dat s více než 25 lety zkušeností - HDD, SSD, RAID recovery. Platíte pouze za úspěšně zachráněná data.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jirsíkova 541/1",
    "addressLocality": "Praha",
    "postalCode": "186 00",
    "addressCountry": "CZ"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+420-775-220-440",
    "contactType": "customer service",
    "availableLanguage": "cs",
    "areaServed": ["CZ", "SK", "DE", "AT"]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "08:00",
      "closes": "15:30"
    }
  ],
  "hasMap": "https://goo.gl/maps/datahelp",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "50.0922",
    "longitude": "14.4507"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Praha"
    },
    {
      "@type": "City",
      "name": "Brno"
    },
    {
      "@type": "Country",
      "name": "Czech Republic"
    }
  ]
};

// SEO konfigurace pro jednotlivé stránky
export const seoConfigs: Record<string, SEOConfig> = {
  home: {
    title: "DataHelp.cz - Profesionální záchrana dat | HDD, SSD, RAID obnova",
    description: "Profesionální služby záchrany dat s více než 25 lety zkušeností. Specializujeme se na obnovu HDD, SSD a RAID systémů. Platíte pouze za úspěšně zachráněná data. Diagnostika a svoz zdarma.",
    keywords: "záchrana dat, obnova dat, HDD recovery, SSD recovery, RAID recovery, profesionální záchrana dat Praha, oprava pevného disku, obnova smazaných dat, diagnostika zdarma, svoz zdarma",
    schema: {
      ...organizationSchema,
      "@type": ["Organization", "LocalBusiness"],
      "priceRange": "KčKč",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "currenciesAccepted": "EUR, CZK"
    }
  },
  services: {
    title: "Služby záchrany dat | HDD, SSD, RAID, NAS obnova | DataHelp.cz",
    description: "Komplexní služby záchrany dat pro HDD, SSD, RAID systémy a firemní řešení. Specializovaná laboratoř s více než 25 lety zkušeností. Diagnostika a svoz zdarma. Platíte jen za úspěch.",
    keywords: "služby záchrany dat, hdd obnova, ssd recovery, raid systémy, nas recovery, firemní řešení, laboratoř záchrany dat, diagnostika zdarma, svoz zdarma Praha",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Data Recovery Services",
      "provider": organizationSchema,
      "serviceType": "Data Recovery",
      "areaServed": ["CZ", "DE", "AT", "SK", "IT"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Data Recovery Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "HDD Data Recovery",
              "description": "Professional hard drive data recovery"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SSD Data Recovery",
              "description": "SSD and flash memory data recovery"
            }
          }
        ]
      }
    }
  },
  about: {
    title: "O nás | 25+ let zkušeností v záchraně dat | DataHelp.cz",
    description: "Profesionální záchrana dat s více než 25 lety zkušeností od roku 1998. Specializovaná laboratoř v Praze, certifikovaní technici a nejmodernější technologie pro obnovu dat.",
    keywords: "o datahelp, zkušenosti obnova dat, expertní tým, laboratoř pro záchranu dat Praha, certifikovaní specialisté, bezpečnost dat, založení 1998",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": organizationSchema
    }
  },
  contact: {
    title: "Kontakt | NONSTOP pohotovost | Záchrana dat Praha 8 Karlín | DataHelp.cz",
    description: "Kontaktujte naše experty na záchranu dat. NONSTOP pohotovostní služba po dohodě. Profesionální laboratoř záchrany dat v Praze 8 - Karlín, Jirsíkova 541/1.",
    keywords: "kontakt datahelp, záchrana dat kontakt, pohotovost záchrana dat, laboratoř Praha, záchrana dat Praha 8, data recovery Karlín, obnova dat Praha centrum, nonstop služba",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": organizationSchema
    }
  },
  pricing: {
    title: "Ceník záchrany dat | Transparentní ceny | Platíte jen za úspěch",
    description: "Transparentní ceník služeb záchrany dat. Platíte pouze za úspěšně zachráněná data. Diagnostika a svoz zdarma. Ceny od 6 250 Kč pro SSD a 8 750 Kč pro HDD.",
    keywords: "ceník záchrana dat, cena obnova dat, hdd recovery cena, ssd recovery cena, raid recovery cena, diagnostika zdarma, svoz zdarma, fixní cena",
    schema: {
      "@context": "https://schema.org",
      "@type": "PriceSpecification",
      "description": "Data Recovery Pricing",
      "priceCurrency": "EUR",
      "eligibleRegion": ["CZ", "DE", "AT", "SK"]
    }
  },
  faq: {
    title: "Často kladené otázky | FAQ záchrana dat | DataHelp.cz",
    description: "Odpovědi na nejčastější otázky o službách záchrany dat. Zjistěte více o našem procesu, cenách a bezpečnostních opatřeních.",
    keywords: "faq záchrana dat, otázky obnova dat, jak funguje záchrana dat, bezpečnost dat",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Kolik stojí záchrana dat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ceny se liší podle typu média a závažnosti poškození. Diagnostika a svoz jsou zdarma. Ceny začínají od 6 250 Kč pro SSD a 8 750 Kč pro HDD. Platíte pouze za úspěšně zachráněná data."
          }
        },
        {
          "@type": "Question",
          "name": "Jak dlouho trvá záchrana dat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standardní záchrana dat trvá obvykle 3-7 dní. Nabízíme také express službu s 48-72 hodinovou reakcí. Diagnostika probíhá během několika hodin až dnů."
          }
        },
        {
          "@type": "Question",
          "name": "Platím i když se data nezachrání?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ne. Platíte pouze za úspěšně zachráněná data. Pokud se nám data nepodaří obnovit, neplatíte nic. Diagnostika a svoz jsou vždy zdarma."
          }
        },
        {
          "@type": "Question",
          "name": "Je diagnostika opravdu zdarma?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ano, vstupní diagnostika je vždy bezplatná a bez závazků. Po diagnostice obdržíte přesnou cenovou nabídku a rozhodnete se, zda pokračovat v záchraně dat."
          }
        },
        {
          "@type": "Question",
          "name": "Jaká je úspěšnost záchrany dat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Naše úspěšnost je přes 95% pro většinu typů poškození. Máme více než 25 let zkušeností a moderní laboratoř vybavenou profesionálním hardware pro všechny typy médií."
          }
        }
      ]
    }
  },
  blog: {
    title: "Blog | Novinky a tipy o záchraně dat | DataHelp.cz",
    description: "Aktuální články, tipy a novinky ze světa záchrany dat. Průvodce, case studies a odborné rady od profesionálů.",
    keywords: "záchrana dat blog, data recovery články, tipy obnova dat, průvodce záchrana dat, case studies",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "DataHelp.cz Blog",
      "description": "Blog o záchraně dat a data recovery",
      "publisher": organizationSchema
    }
  }
};

/**
 * Generuje breadcrumb schema pro SEO
 */
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

/**
 * Generuje article schema pro blog posty
 */
export const generateArticleSchema = (
  title: string,
  description: string,
  image: string,
  datePublished?: string,
  dateModified?: string,
  author?: string
) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": title,
  "description": description,
  "image": {
    "@type": "ImageObject",
    "url": image,
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Person",
    "name": author || "DataHelp.cz Team",
    "url": "https://datahelp.cz/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DataHelp.cz",
    "logo": {
      "@type": "ImageObject",
      "url": "https://datahelp.cz/DataHelp.cz.svg"
    }
  },
  "datePublished": datePublished || new Date().toISOString(),
  "dateModified": dateModified || new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://datahelp.cz/blog"
  },
  "articleSection": "Data Recovery",
  "inLanguage": "cs"
});
