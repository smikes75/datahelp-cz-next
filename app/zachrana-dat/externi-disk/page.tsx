import { Metadata } from 'next';
import { ExterniDiskClient } from './ExterniDiskClient';

export const metadata: Metadata = {
  title: 'Záchrana dat z externího disku | DataHelp.cz',
  description: 'Profesionální záchrana dat z externích disků po poruše, poškození, problémech s konektorem, smazání, formátování nebo selhání elektroniky. Bezplatná diagnostika.',
  alternates: {
    canonical: 'https://www.datahelp.cz/zachrana-dat/externi-disk',
  },
  openGraph: {
    title: 'Záchrana dat z externího disku | DataHelp.cz',
    description: 'Profesionální záchrana dat z externích disků po poruše, poškození, problémech s konektorem, smazání, formátování nebo selhání elektroniky.',
    url: 'https://www.datahelp.cz/zachrana-dat/externi-disk',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function ExterniDiskPage() {
  return <ExterniDiskClient />;
}
