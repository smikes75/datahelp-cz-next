import { Metadata } from 'next';
import { PricingClient } from './PricingClient';

export const metadata: Metadata = {
  title: 'Ceník záchrany dat | DataHelp.cz',
  description: 'Transparentní ceny bez skrytých poplatků. Platíte pouze za úspěšně zachráněná data. Ceny od 2000 Kč.',
  alternates: {
    canonical: '/cenik-zachrany-dat',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
