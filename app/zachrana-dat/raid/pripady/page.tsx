import { Metadata } from 'next';
import { RAIDCaseStudiesClient } from './RAIDCaseStudiesClient';

export const metadata: Metadata = {
  title: 'RAID případové studie | DataHelp.cz',
  description: 'Úspěšné případy záchrany dat z RAID polí a NAS serverů. Reálné příklady řešení komplexních problémů s diskovými poli.',
  alternates: {
    canonical: '/zachrana-dat/raid/pripady',
  },
};

export default function RAIDCaseStudiesPage() {
  return <RAIDCaseStudiesClient />;
}
