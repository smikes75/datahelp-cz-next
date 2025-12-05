import { Metadata } from 'next';
import { PricingClient } from './PricingClient';

export const metadata: Metadata = {
  title: 'Ceník záchrany dat | DataHelp.cz',
  description: 'Transparentní ceny bez skrytých poplatků. Platíte pouze za úspěšně zachráněná data. Ceny od 2000 Kč.',
  alternates: {
    canonical: 'https://www.datahelp.cz/cenik-zachrany-dat',
  },
  openGraph: {
    title: 'Ceník záchrany dat | DataHelp.cz',
    description: 'Transparentní ceny bez skrytých poplatků. Platíte pouze za úspěšně zachráněná data. Ceny od 2000 Kč.',
    url: 'https://www.datahelp.cz/cenik-zachrany-dat',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
