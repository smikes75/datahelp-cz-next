import { Metadata } from 'next';
import { HDDRecoveryClient } from './HDDRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z HDD | DataHelp.cz',
  description: 'Profesionální záchrana dat z pevných disků. Mechanické poruchy, elektronické závady, logické problémy. Úspěšnost 95%.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/hdd',
  },
  openGraph: {
    title: 'Záchrana dat z HDD | DataHelp.cz',
    description: 'Profesionální záchrana dat z pevných disků. Mechanické poruchy, elektronické závady, logické problémy. Úspěšnost 95%.',
    url: 'https://www.datahelp.cz/zachrana-dat/hdd',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function HDDRecoveryPage() {
  return <HDDRecoveryClient />;
}
