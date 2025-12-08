import { Metadata } from 'next';
import { SDKartaClient } from './SDKartaClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z SD karty | DataHelp.cz',
  description: 'Profesionální záchrana smazaných nebo ztracených dat z paměťových karet všech typů včetně SD, microSD, Compact Flash a XQD. Bezplatná diagnostika.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/sd-karta',
  },
  openGraph: {
    title: 'Záchrana dat z SD karty | DataHelp.cz',
    description: 'Profesionální záchrana smazaných nebo ztracených dat z paměťových karet všech typů včetně SD, microSD, Compact Flash a XQD.',
    url: 'https://www.datahelp.cz/zachrana-dat/sd-karta',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function SDKartaPage() {
  return <SDKartaClient />;
}
