import { Metadata } from 'next';
import { FAQClient } from './FAQClient';

export const metadata: Metadata = {
  title: 'Časté dotazy | DataHelp.cz',
  description: 'Odpovědi na nejčastější otázky o záchraně dat. Postup, ceny, doručení a další informace.',
  alternates: {
    canonical: '/caste-dotazy',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
