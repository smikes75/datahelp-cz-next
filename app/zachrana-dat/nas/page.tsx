import { Metadata } from 'next';
import { NASClient } from './NASClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z NAS serveru | DataHelp.cz',
  description: 'Profesionální záchrana dat z NAS serverů a diskových polí RAID. Řešíme selhání více disků, poškození RAID konfigurace, chyby řadiče, smazaná data i ransomware útoky.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/nas',
  },
  openGraph: {
    title: 'Záchrana dat z NAS serveru | DataHelp.cz',
    description: 'Profesionální záchrana dat z NAS serverů a diskových polí RAID. Řešíme selhání více disků, poškození RAID konfigurace, chyby řadiče.',
    url: 'https://www.datahelp.cz/zachrana-dat/nas',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function NASPage() {
  return <NASClient />;
}
