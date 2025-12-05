import { Hero } from '@/components/Hero';
import { ScrollingBanner } from '@/components/ScrollingBanner';
import { Gallery } from '@/components/Gallery';
import { ProcessInfographic } from '@/components/ProcessInfographic';
import { ElfsightReviews } from '@/components/ElfsightReviews';
import { HomeContact } from '@/components/HomeContact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollingBanner />
      <Gallery />
      <ProcessInfographic />
      <ElfsightReviews />
      <HomeContact />
    </div>
  );
}
