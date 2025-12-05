import { Metadata } from 'next';
import { ReferenceClient } from './ReferenceClient';

export const metadata: Metadata = {
  title: 'Reference | DataHelp.cz',
  description: 'Reference a hodnocení spokojených zákazníků DataHelp. Úspěšné příběhy záchran dat pro firmy i soukromé osoby.',
  alternates: {
    canonical: '/reference',
  },
  openGraph: {
    title: 'Reference | DataHelp.cz',
    description: 'Reference a hodnocení spokojených zákazníků DataHelp. Úspěšné příběhy záchran dat pro firmy i soukromé osoby.',
    url: 'https://www.datahelp.cz/reference',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function ReferencePage() {
  return <ReferenceClient />;
}
