import { Metadata } from 'next';
import { HDDRecoveryClient } from './HDDRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z HDD | DataHelp.cz',
  description: 'Profesionální záchrana dat z pevných disků. Mechanické poruchy, elektronické závady, logické problémy. Úspěšnost 95%.',
  alternates: {
    canonical: '/zachrana-dat/hdd',
  },
};

export default function HDDRecoveryPage() {
  return <HDDRecoveryClient />;
}
