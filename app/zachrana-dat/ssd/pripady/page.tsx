import { Metadata } from 'next';
import { SSDCaseStudiesClient } from './SSDCaseStudiesClient';

export const metadata: Metadata = {
  title: 'SSD případové studie | DataHelp.cz',
  description: 'Úspěšné případy záchrany dat z SSD disků a flash pamětí. Reálné příklady řešení problémů s kontroléry a NAND čipy.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/ssd/pripady',
  },
  openGraph: {
    title: 'SSD případové studie | DataHelp.cz',
    description: 'Úspěšné případy záchrany dat z SSD disků a flash pamětí. Reálné příklady řešení problémů s kontroléry a NAND čipy.',
    url: 'https://www.datahelp.cz/zachrana-dat/ssd/pripady',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function SSDCaseStudiesPage() {
  return <SSDCaseStudiesClient />;
}
