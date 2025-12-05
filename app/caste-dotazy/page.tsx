import { Metadata } from 'next';
import { FAQClient } from './FAQClient';

export const metadata: Metadata = {
  title: 'Časté dotazy | DataHelp.cz',
  description: 'Odpovědi na nejčastější otázky o záchraně dat. Postup, ceny, doručení a další informace.',
  alternates: {
    canonical: 'https://www.datahelp.cz/caste-dotazy',
  },
  openGraph: {
    title: 'Časté dotazy | DataHelp.cz',
    description: 'Odpovědi na nejčastější otázky o záchraně dat. Postup, ceny, doručení a další informace.',
    url: 'https://www.datahelp.cz/caste-dotazy',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
