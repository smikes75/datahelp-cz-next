import { Metadata } from 'next';
import { RAIDRecoveryClient } from './RAIDRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z RAID a NAS | DataHelp.cz',
  description: 'Profesionální záchrana dat z RAID polí a NAS serverů. RAID 0, 1, 5, 6, 10. Synology, QNAP a další.',
  alternates: {
    canonical: '/zachrana-dat/raid',
  },
};

export default function RAIDRecoveryPage() {
  return <RAIDRecoveryClient />;
}
