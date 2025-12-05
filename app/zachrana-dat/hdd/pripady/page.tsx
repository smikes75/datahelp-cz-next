import { Metadata } from 'next';
import { HDDCaseStudiesClient } from './HDDCaseStudiesClient';

export const metadata: Metadata = {
  title: 'HDD případové studie | DataHelp.cz',
  description: 'Úspěšné případy záchrany dat z pevných disků. Reálné příklady mechanických poruch, elektronických závad a logických problémů.',
  alternates: {
    canonical: '/zachrana-dat/hdd/pripady',
  },
};

export default function HDDCaseStudiesPage() {
  return <HDDCaseStudiesClient />;
}
