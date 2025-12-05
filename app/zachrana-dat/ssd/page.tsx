import { Metadata } from 'next';
import { SSDRecoveryClient } from './SSDRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z SSD | DataHelp.cz',
  description: 'Specializujeme se na záchranu dat ze SSD disků, USB flash a paměťových karet. Pokročilé metody pro flash paměti.',
  alternates: {
    canonical: '/zachrana-dat/ssd',
  },
};

export default function SSDRecoveryPage() {
  return <SSDRecoveryClient />;
}
