import { Metadata } from 'next';
import PoptavkaClient from './PoptavkaClient';

export const metadata: Metadata = {
  title: 'Objednat diagnostiku zdarma | DataHelp.cz',
  description: 'Bezplatná diagnostika a svoz po celé ČR. Zjistíme možnost záchrany dat a cenovou nabídku. Rychlé vyřízení, bez závazků.',
  alternates: {
    canonical: 'https://www.datahelp.cz/poptavka-zachrany-dat',
  },
  openGraph: {
    title: 'Objednat diagnostiku zdarma | DataHelp.cz',
    description: 'Bezplatná diagnostika a svoz po celé ČR. Zjistíme možnost záchrany dat a cenovou nabídku. Rychlé vyřízení, bez závazků.',
    url: 'https://www.datahelp.cz/poptavka-zachrany-dat',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function PoptavkaPage() {
  return <PoptavkaClient />;
}
