import { Metadata } from 'next';
import KalkulackaClient from './KalkulackaClient';

export const metadata: Metadata = {
  title: 'Kalkulačka ceny záchrany dat | DataHelp.cz',
  description: 'Kalkulačka orientační ceny záchrany dat. Vyberte typ zařízení, druh poškození a požadovanou rychlost zpracování.',
  alternates: {
    canonical: 'https://www.datahelp.cz/kalkulacka',
  },
  openGraph: {
    title: 'Kalkulačka ceny záchrany dat | DataHelp.cz',
    description: 'Kalkulačka orientační ceny záchrany dat. Vyberte typ zařízení, druh poškození a požadovanou rychlost zpracování.',
    url: 'https://www.datahelp.cz/kalkulacka',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function KalkulackaPage() {
  return <KalkulackaClient />;
}
