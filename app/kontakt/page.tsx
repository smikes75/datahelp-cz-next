import { Metadata } from 'next';
import KontaktClient from './KontaktClient';

export const metadata: Metadata = {
  title: 'Kontaktujte nás – Praha 8, Karlín | DataHelp.cz',
  description: 'Kontakt DataHelp – Praha 8, Karlín. Volejte 24/7 hotline +420 775 220 440. Bezplatný svoz po celé ČR. Potřebujete pomoct? Jsme tu pro vás nonstop!',
  alternates: {
    canonical: 'https://www.datahelp.cz/kontakt',
  },
  openGraph: {
    title: 'Kontakt | DataHelp.cz',
    description: 'Kontakt DataHelp – Praha 8, Karlín. Volejte 24/7 hotline +420 775 220 440. Bezplatný svoz po celé ČR.',
    url: 'https://www.datahelp.cz/kontakt',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function KontaktPage() {
  return <KontaktClient />;
}
