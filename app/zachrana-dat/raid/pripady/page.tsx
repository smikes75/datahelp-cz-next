import { Metadata } from 'next';
import { RAIDCaseStudiesClient } from './RAIDCaseStudiesClient';

export const metadata: Metadata = {
  title: 'RAID případové studie | DataHelp.cz',
  description: 'Úspěšné případy záchrany dat z RAID polí a NAS serverů. Reálné příklady řešení komplexních problémů s diskovými poli.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/raid/pripady',
  },
  openGraph: {
    title: 'RAID případové studie | DataHelp.cz',
    description: 'Úspěšné případy záchrany dat z RAID polí a NAS serverů. Reálné příklady řešení komplexních problémů s diskovými poli.',
    url: 'https://www.datahelp.cz/zachrana-dat/raid/pripady',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function RAIDCaseStudiesPage() {
  return <RAIDCaseStudiesClient />;
}
