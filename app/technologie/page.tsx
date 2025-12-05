import { Metadata } from 'next';
import { TechnologyClient } from './TechnologyClient';

export const metadata: Metadata = {
  title: 'Technologie | DataHelp.cz',
  description: 'Špičkové vybavení pro záchranu dat. PC-3000, čistá laboratoř ISO 5, BGA stanice a další specializované nástroje.',
  alternates: {
    canonical: 'https://www.datahelp.cz/technologie',
  },
  openGraph: {
    title: 'Technologie | DataHelp.cz',
    description: 'Špičkové vybavení pro záchranu dat. PC-3000, čistá laboratoř ISO 5, BGA stanice a další specializované nástroje.',
    url: 'https://www.datahelp.cz/technologie',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function TechnologyPage() {
  return <TechnologyClient />;
}
