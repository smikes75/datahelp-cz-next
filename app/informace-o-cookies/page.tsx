import { Metadata } from 'next';
import { CookiesClient } from './CookiesClient';

export const metadata: Metadata = {
  title: 'Informace o cookies | DataHelp.cz',
  description: 'Jak používáme cookies na našem webu. Funkční, analytické, marketingové a personalizační cookies.',
  alternates: {
    canonical: '/informace-o-cookies',
  },
};

export default function CookiesPage() {
  return <CookiesClient />;
}
