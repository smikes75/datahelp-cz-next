import { Metadata } from 'next';
import { USBFlashClient } from './USBFlashClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z USB flash disku | DataHelp.cz',
  description: 'Profesionální záchrana dat z poškozených USB flash disků. Bezplatná diagnostika a svoz. Řešíme softwarové i hardwarové závady včetně poškozených konektorů.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/usb-flash',
  },
  openGraph: {
    title: 'Záchrana dat z USB flash disku | DataHelp.cz',
    description: 'Profesionální záchrana dat z poškozených USB flash disků. Bezplatná diagnostika a svoz. Řešíme softwarové i hardwarové závady.',
    url: 'https://www.datahelp.cz/zachrana-dat/usb-flash',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function USBFlashPage() {
  return <USBFlashClient />;
}
