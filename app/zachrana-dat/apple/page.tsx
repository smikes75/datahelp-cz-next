import { Metadata } from 'next';
import { AppleClient } from './AppleClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z Apple zařízení | Mac, iPhone, iPad | DataHelp.cz',
  description: 'Profesionální záchrana dat z Apple zařízení včetně MacBooků, iMaců, iPhonů a iPadů po smazání, fyzickém poškození, kontaktu s vodou nebo selhání disku. APFS a HFS+.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/apple',
  },
  openGraph: {
    title: 'Záchrana dat z Apple zařízení | Mac, iPhone, iPad | DataHelp.cz',
    description: 'Profesionální záchrana dat z Apple zařízení včetně MacBooků, iMaců, iPhonů a iPadů po smazání, fyzickém poškození nebo selhání disku.',
    url: 'https://www.datahelp.cz/zachrana-dat/apple',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function ApplePage() {
  return <AppleClient />;
}
