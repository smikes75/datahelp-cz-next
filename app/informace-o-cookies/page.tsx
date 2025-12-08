import { Metadata } from 'next';
import { CookiesClient } from './CookiesClient';

export const metadata: Metadata = {
  title: 'Informace o cookies | DataHelp.cz',
  description: 'Přehled cookies používaných na webu DataHelp.cz. Informace o funkčních, analytických a marketingových cookies a možnostech jejich nastavení.',
  alternates: {
    canonical: 'https://www.datahelp.cz/informace-o-cookies',
  },
  openGraph: {
    title: 'Informace o cookies | DataHelp.cz',
    description: 'Přehled cookies používaných na webu DataHelp.cz. Informace o funkčních, analytických a marketingových cookies a možnostech jejich nastavení.',
    url: 'https://www.datahelp.cz/informace-o-cookies',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function CookiesPage() {
  return <CookiesClient />;
}
