import { Metadata } from 'next';
import { HDDCaseStudiesClient } from './HDDCaseStudiesClient';

export const metadata: Metadata = {
  title: 'HDD případové studie | DataHelp.cz',
  description: 'Úspěšné případy záchrany dat z pevných disků. Reálné příklady mechanických poruch, elektronických závad a logických problémů.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/hdd/pripady',
  },
  openGraph: {
    title: 'HDD případové studie | DataHelp.cz',
    description: 'Úspěšné případy záchrany dat z pevných disků. Reálné příklady mechanických poruch, elektronických závad a logických problémů.',
    url: 'https://www.datahelp.cz/zachrana-dat/hdd/pripady',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function HDDCaseStudiesPage() {
  return <HDDCaseStudiesClient />;
}
