import { Metadata } from 'next';
import KontaktClient from './KontaktClient';

export const metadata: Metadata = {
  title: 'Kontakt | DataHelp.cz',
  description: 'Kontaktujte nás ohledně záchrany dat. Adresa, telefon, email, otevírací doba. Bezplatný svoz a diagnostika po celé ČR.',
  alternates: {
    canonical: 'https://www.datahelp.cz/kontakt',
  },
  openGraph: {
    title: 'Kontakt | DataHelp.cz',
    description: 'Kontaktujte nás ohledně záchrany dat. Adresa, telefon, email, otevírací doba. Bezplatný svoz a diagnostika po celé ČR.',
    url: 'https://www.datahelp.cz/kontakt',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function KontaktPage() {
  return <KontaktClient />;
}
