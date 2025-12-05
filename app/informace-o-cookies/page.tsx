import { Metadata } from 'next';
import { CookiesClient } from './CookiesClient';

export const metadata: Metadata = {
  title: 'Informace o cookies | DataHelp.cz',
  description: 'Jak používáme cookies na našem webu. Funkční, analytické, marketingové a personalizační cookies.',
  alternates: {
    canonical: 'https://www.datahelp.cz/informace-o-cookies',
  },
  openGraph: {
    title: 'Informace o cookies | DataHelp.cz',
    description: 'Jak používáme cookies na našem webu. Funkční, analytické, marketingové a personalizační cookies.',
    url: 'https://www.datahelp.cz/informace-o-cookies',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function CookiesPage() {
  return <CookiesClient />;
}
