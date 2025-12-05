/**
 * GDPR / Privacy Policy stránka
 */

import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů (GDPR) | DataHelp.cz',
  description: 'Informace o zpracování osobních údajů v souladu s GDPR.',
  alternates: {
    canonical: '/ochrana-osobnich-udaju',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="h-12 w-12" />
            <h1 className="text-4xl font-bold">Ochrana osobních údajů</h1>
          </div>
          <p className="text-xl">Informace o zpracování údajů dle GDPR</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-lg max-w-none">
          <h2>Správce osobních údajů</h2>
          <p>
            <strong>DataHelp s.r.o.</strong><br />
            Jirsíkova 541/1<br />
            186 00 Praha 8 - Karlín<br />
            IČ: XXXXXXXX<br />
            Email: <a href="mailto:info@datahelp.cz">info@datahelp.cz</a><br />
            Tel.: +420 775 220 440
          </p>

          <h2>Jaké údaje zpracováváme</h2>
          <p>Zpracováváme následující kategorie osobních údajů:</p>
          <ul>
            <li>Identifikační údaje (jméno, příjmení)</li>
            <li>Kontaktní údaje (email, telefon, adresa)</li>
            <li>Informace o zařízení určeném k záchraně dat</li>
            <li>Technické údaje o vašem zařízení a poškození</li>
          </ul>

          <h2>Účel zpracování</h2>
          <p>Vaše osobní údaje zpracováváme pro tyto účely:</p>
          <ul>
            <li>Poskytování služeb záchrany dat</li>
            <li>Komunikace s klienty</li>
            <li>Fakturace a účetnictví</li>
            <li>Plnění zákonných povinností</li>
            <li>Ochrana našich práv</li>
          </ul>

          <h2>Právní základ zpracování</h2>
          <p>Údaje zpracováváme na základě:</p>
          <ul>
            <li>Plnění smlouvy (poskytování služeb)</li>
            <li>Oprávněného zájmu (komunikace, marketing)</li>
            <li>Zákonné povinnosti (účetnictví, daně)</li>
            <li>Souhlasu (newsletter, cookies)</li>
          </ul>

          <h2>Doba uložení údajů</h2>
          <ul>
            <li>Po dobu poskytování služeb</li>
            <li>5 let po ukončení služby (účetnictví)</li>
            <li>Do odvolání souhlasu (marketing)</li>
          </ul>

          <h2>Vaše práva</h2>
          <p>Máte právo:</p>
          <ul>
            <li>Na přístup ke svým osobním údajům</li>
            <li>Na opravu nepřesných údajů</li>
            <li>Na výmaz údajů ("právo být zapomenut")</li>
            <li>Na omezení zpracování</li>
            <li>Na přenositelnost údajů</li>
            <li>Vznést námitku proti zpracování</li>
            <li>Odvolat souhlas</li>
            <li>Podat stížnost u ÚOOÚ</li>
          </ul>

          <h2>Bezpečnost údajů</h2>
          <p>
            Vaše údaje chráníme pomocí moderních technických a organizačních opatření.
            Přístup k údajům mají pouze oprávněné osoby vázané mlčenlivostí.
          </p>

          <h2>Předávání údajů třetím stranám</h2>
          <p>Údaje nepředáváme třetím stranám, kromě:</p>
          <ul>
            <li>Dopravců (pro doručení zařízení)</li>
            <li>Účetních a daňových poradců</li>
            <li>IT poskytovatelů (hosting, email)</li>
          </ul>

          <h2>Kontakt</h2>
          <p>
            Pro dotazy ohledně zpracování osobních údajů nás kontaktujte na:
            <br /><a href="mailto:info@datahelp.cz">info@datahelp.cz</a>
          </p>

          <p className="text-sm text-gray-600 mt-8">
            Poslední aktualizace: 1. 1. 2025
          </p>
        </div>
      </div>
    </div>
  );
}
