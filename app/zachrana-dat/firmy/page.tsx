import { Metadata } from 'next';
import { BusinessSolutionsClient } from './BusinessSolutionsClient';

export const metadata: Metadata = {
  title: 'Záchrana dat pro firmy | DataHelp.cz',
  description: 'Profesionální služby záchrany dat pro firemní klientelu. 24/7 podpora, SLA garance, prioritní zpracování. Servery, RAID, workstations.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/firmy',
  },
  openGraph: {
    title: 'Záchrana dat pro firmy | DataHelp.cz',
    description: 'Profesionální služby záchrany dat pro firemní klientelu. 24/7 podpora, SLA garance, prioritní zpracování.',
    url: 'https://www.datahelp.cz/zachrana-dat/firmy',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function BusinessSolutionsPage() {
  return <BusinessSolutionsClient />;
}
