import { Metadata } from 'next';
import { ReferenceClient } from './ReferenceClient';

export const metadata: Metadata = {
  title: 'Reference | DataHelp.cz',
  description: 'Reference spokojených zákazníků DataHelp – úspěšné příběhy záchran dat pro firmy i jednotlivce. Hodnocení 4.9/5. Přečtěte si, co o nás píší klienti!',
  alternates: {
    canonical: '/reference',
  },
  openGraph: {
    title: 'Reference | DataHelp.cz',
    description: 'Reference spokojených zákazníků DataHelp – úspěšné příběhy záchran dat pro firmy i jednotlivce. Hodnocení 4.9/5.',
    url: 'https://www.datahelp.cz/reference',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function ReferencePage() {
  return <ReferenceClient />;
}
