import { Metadata } from 'next';
import { AboutUsClient } from './AboutUsClient';

export const metadata: Metadata = {
  title: 'O nás | DataHelp.cz',
  description: 'Více než 25 let zkušeností v záchraně dat. Specializujeme se na obnovu HDD, SSD, RAID a mobilních zařízení.',
  alternates: {
    canonical: 'https://www.datahelp.cz/o-nas',
  },
  openGraph: {
    title: 'O nás | DataHelp.cz',
    description: 'Více než 25 let zkušeností v záchraně dat. Specializujeme se na obnovu HDD, SSD, RAID a mobilních zařízení.',
    url: 'https://www.datahelp.cz/o-nas',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
