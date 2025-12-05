import { Metadata } from 'next';
import { HDDRecoveryClient } from './HDDRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z HDD | DataHelp.cz',
  description: 'Záchrana dat z HDD – odborníci na mechanické i elektronické poruchy. Úspěšnost 95%, bezplatná diagnostika. Poškozený disk? Jednejte rychle. Volejte 24/7!',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/hdd',
  },
  openGraph: {
    title: 'Záchrana dat z HDD | DataHelp.cz',
    description: 'Záchrana dat z HDD – odborníci na mechanické i elektronické poruchy. Úspěšnost 95%, bezplatná diagnostika. Poškozený disk? Jednejte rychle.',
    url: 'https://www.datahelp.cz/zachrana-dat/hdd',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function HDDRecoveryPage() {
  return <HDDRecoveryClient />;
}
