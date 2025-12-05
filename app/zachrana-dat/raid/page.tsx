import { Metadata } from 'next';
import { RAIDRecoveryClient } from './RAIDRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z RAID a NAS | DataHelp.cz',
  description: 'Záchrana dat z RAID a NAS – Synology, QNAP, vše konfigurace 0/1/5/6/10. Expertní rekonstrukce polí. Selhání RAID? Jednejte rychle. Volejte 24/7!',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/raid',
  },
  openGraph: {
    title: 'Záchrana dat z RAID a NAS | DataHelp.cz',
    description: 'Záchrana dat z RAID a NAS – Synology, QNAP, všechny konfigurace 0/1/5/6/10. Expertní rekonstrukce polí. Selhání RAID? Jednejte rychle.',
    url: 'https://www.datahelp.cz/zachrana-dat/raid',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function RAIDRecoveryPage() {
  return <RAIDRecoveryClient />;
}
