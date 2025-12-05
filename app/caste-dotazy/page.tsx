import { Metadata } from 'next';
import { FAQClient } from './FAQClient';

export const metadata: Metadata = {
  title: 'Časté dotazy | DataHelp.cz',
  description: 'Často kladené dotazy o záchraně dat – postup, ceny, doručení, záruky. Máte otázky? Najděte odpovědi nebo volejte naše odborníky 24/7. Rádi poradíme!',
  alternates: {
    canonical: 'https://www.datahelp.cz/caste-dotazy',
  },
  openGraph: {
    title: 'Časté dotazy | DataHelp.cz',
    description: 'Často kladené dotazy o záchraně dat – postup, ceny, doručení, záruky. Máte otázky? Najděte odpovědi nebo volejte naše odborníky 24/7.',
    url: 'https://www.datahelp.cz/caste-dotazy',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
