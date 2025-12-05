import { Metadata } from 'next';
import { SSDRecoveryClient } from './SSDRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z SSD | DataHelp.cz',
  description: 'Záchrana dat ze SSD – NVMe, SATA, flash paměti. Pokročilé metody obnovy, úspěšnost 95%. Poškozené SSD? Bezplatná diagnostika. Volejte odborníky 24/7!',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/ssd',
  },
  openGraph: {
    title: 'Záchrana dat z SSD | DataHelp.cz',
    description: 'Záchrana dat ze SSD – NVMe, SATA, flash paměti. Pokročilé metody obnovy, úspěšnost 95%. Poškozené SSD? Bezplatná diagnostika.',
    url: 'https://www.datahelp.cz/zachrana-dat/ssd',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function SSDRecoveryPage() {
  return <SSDRecoveryClient />;
}
