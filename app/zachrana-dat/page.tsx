import { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';

export const metadata: Metadata = {
  title: 'Profesionální záchrana dat | DataHelp.cz',
  description: 'Komplexní služby záchrany dat z HDD, SSD, RAID a mobilních zařízení. Více než 25 let zkušeností.',
  alternates: {
    canonical: '/zachrana-dat',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
