import { Metadata } from 'next';
import { MobilePhoneRecoveryClient } from './MobilePhoneRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z mobilu | Bezpečná obnova | Android | DataHelp',
  description: 'Profesionální záchrana dat z Android telefonů a tabletů. Speciální technologie pro dekryptaci a obnovu dat. Bezplatná diagnostika.',
  alternates: {
    canonical: '/zachrana-dat/mobilni-telefon',
  },
  keywords: 'záchrana dat mobil, obnova dat android, záchrana dat telefon, obnova android zařízení',
  openGraph: {
    title: 'Záchrana dat z mobilu | DataHelp.cz',
    description: 'Profesionální záchrana dat z Android telefonů a tabletů. Speciální technologie pro dekryptaci a obnovu dat.',
    url: 'https://www.datahelp.cz/zachrana-dat/mobilni-telefon',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function MobilePhoneRecoveryPage() {
  return <MobilePhoneRecoveryClient />;
}
