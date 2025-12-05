import { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';

export const metadata: Metadata = {
  title: 'Profesionální záchrana dat | DataHelp.cz',
  description: 'Komplexní služby záchrany dat z HDD, SSD, RAID a mobilních zařízení. Více než 25 let zkušeností.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat',
  },
  openGraph: {
    title: 'Profesionální záchrana dat | DataHelp.cz',
    description: 'Komplexní služby záchrany dat z HDD, SSD, RAID a mobilních zařízení. Více než 25 let zkušeností.',
    url: 'https://www.datahelp.cz/zachrana-dat',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
