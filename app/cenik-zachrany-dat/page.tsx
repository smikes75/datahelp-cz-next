import { Metadata } from 'next';
import { PricingClient } from './PricingClient';

export const metadata: Metadata = {
  title: 'Ceník záchrany dat | DataHelp.cz',
  description: 'Ceník záchrany dat – bez skrytých poplatků, platíte jen za úspěch. Ceny od 2000 Kč. Bezplatná diagnostika a doprava. Zjistěte cenu online nebo volejte!',
  alternates: {
    canonical: 'https://www.datahelp.cz/cenik-zachrany-dat',
  },
  openGraph: {
    title: 'Ceník záchrany dat | DataHelp.cz',
    description: 'Ceník záchrany dat – bez skrytých poplatků, platíte jen za úspěch. Ceny od 2000 Kč. Bezplatná diagnostika a doprava.',
    url: 'https://www.datahelp.cz/cenik-zachrany-dat',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
