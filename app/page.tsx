import { Hero } from '@/components/Hero';
import { TopBanner } from '@/components/TopBanner';
import { Gallery } from '@/components/Gallery';
import { ProcessInfographic } from '@/components/ProcessInfographic';
import { ElfsightReviews } from '@/components/ElfsightReviews';
import { HomeContact } from '@/components/HomeContact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profesionální záchrana dat | DataHelp.cz',
  description: 'Záchrana dat z HDD, SSD, RAID – úspěšnost 95%, 25+ let zkušeností. Bezplatná diagnostika i svoz po celé ČR. Zachráníme vaše data. Volejte 24/7!',
  alternates: {
    canonical: 'https://www.datahelp.cz/',
  },
  openGraph: {
    title: 'Profesionální záchrana dat | DataHelp.cz',
    description: 'Záchrana dat z HDD, SSD, RAID – úspěšnost 95%, 25+ let zkušeností. Bezplatná diagnostika i svoz po celé ČR.',
    url: 'https://www.datahelp.cz/',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TopBanner />
      <Gallery />
      <ProcessInfographic />
      {/* <ElfsightReviews /> */}
      <HomeContact />
    </div>
  );
}
