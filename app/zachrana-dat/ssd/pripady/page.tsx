import { Metadata } from 'next';
import { SSDCaseStudiesClient } from './SSDCaseStudiesClient';

export const metadata: Metadata = {
  title: 'SSD případové studie | DataHelp.cz',
  description: 'Úspěšné případy záchrany dat z SSD disků a flash pamětí. Reálné příklady řešení problémů s kontroléry a NAND čipy.',
  alternates: {
    canonical: '/zachrana-dat/ssd/pripady',
  },
};

export default function SSDCaseStudiesPage() {
  return <SSDCaseStudiesClient />;
}
