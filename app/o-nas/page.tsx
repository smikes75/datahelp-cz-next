import { Metadata } from 'next';
import { AboutUsClient } from './AboutUsClient';

export const metadata: Metadata = {
  title: 'O nás | DataHelp.cz',
  description: 'Více než 25 let zkušeností v záchraně dat. Specializujeme se na obnovu HDD, SSD, RAID a mobilních zařízení.',
  alternates: {
    canonical: '/o-nas',
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
