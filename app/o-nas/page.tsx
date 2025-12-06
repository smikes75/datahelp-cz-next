import { Metadata } from 'next';
import { AboutUsClient } from './AboutUsClient';

export const metadata: Metadata = {
  title: 'O nás – 25 let zkušeností v záchraně dat | DataHelp.cz',
  description: 'O DataHelp – 25+ let zkušeností, úspěšnost 95%. Odborníci na HDD, SSD, RAID, mobily. Věříme nám tisíce firem i jednotlivců. Zachráníme vaše data!',
  alternates: {
    canonical: 'https://www.datahelp.cz/o-nas',
  },
  openGraph: {
    title: 'O nás | DataHelp.cz',
    description: 'O DataHelp – 25+ let zkušeností, úspěšnost 95%. Odborníci na HDD, SSD, RAID, mobily. Věříme nám tisíce firem i jednotlivců.',
    url: 'https://www.datahelp.cz/o-nas',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
