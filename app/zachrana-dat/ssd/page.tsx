import { Metadata } from 'next';
import { SSDRecoveryClient } from './SSDRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z SSD | DataHelp.cz',
  description: 'Specializujeme se na záchranu dat ze SSD disků, USB flash a paměťových karet. Pokročilé metody pro flash paměti.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/ssd',
  },
  openGraph: {
    title: 'Záchrana dat z SSD | DataHelp.cz',
    description: 'Specializujeme se na záchranu dat ze SSD disků, USB flash a paměťových karet. Pokročilé metody pro flash paměti.',
    url: 'https://www.datahelp.cz/zachrana-dat/ssd',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function SSDRecoveryPage() {
  return <SSDRecoveryClient />;
}
