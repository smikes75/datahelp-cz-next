import { Metadata } from 'next';
import { MobilePhoneRecoveryClient } from './MobilePhoneRecoveryClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z mobilu | Bezpečná obnova | Android | DataHelp',
  description: 'Záchrana dat z mobilu – Android telefony i tablety. Speciální dekryptace, obnova po poškození. Ztracená data? Zachráníme je. Volejte odborníky 24/7!',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/mobilni-telefon',
  },
  keywords: 'záchrana dat mobil, obnova dat android, záchrana dat telefon, obnova android zařízení',
  openGraph: {
    title: 'Záchrana dat z mobilu | DataHelp.cz',
    description: 'Záchrana dat z mobilu – Android telefony i tablety. Speciální dekryptace, obnova po poškození. Ztracená data? Zachráníme je.',
    url: 'https://www.datahelp.cz/zachrana-dat/mobilni-telefon',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function MobilePhoneRecoveryPage() {
  return <MobilePhoneRecoveryClient />;
}
