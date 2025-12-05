/**
 * Obchodní podmínky - Terms of Service
 */

import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Obchodní podmínky | DataHelp.cz',
  description: 'Všeobecné obchodní podmínky poskytování služeb záchrany dat.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="h-12 w-12" />
            <h1 className="text-4xl font-bold">Obchodní podmínky</h1>
          </div>
          <p className="text-xl">Všeobecné obchodní podmínky poskytování služeb</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-lg max-w-none">
          <h2>1. Základní ustanovení</h2>
          <p>
            Tyto všeobecné obchodní podmínky (dále jen "VOP") upravují vztahy mezi společností
            <strong> DataHelp s.r.o.</strong> (dále jen "poskytovatel") a klientem při poskytování
            služeb záchrany a obnovy dat.
          </p>

          <h2>2. Vymezení pojmů</h2>
          <ul>
            <li><strong>Médium</strong> - datové úložiště předané klientem k záchraně dat</li>
            <li><strong>Diagnostika</strong> - analýza poškození a odhad možnosti záchrany</li>
            <li><strong>Záchrana dat</strong> - proces obnovy dat z poškozeného média</li>
            <li><strong>Cenová nabídka</strong> - závazná nabídka ceny za službu</li>
          </ul>

          <h2>3. Postup poskytování služeb</h2>
          <h3>3.1 Přijetí média</h3>
          <p>
            Klient předá médium poskytovateli osobně nebo pomocí dopr avce. O převzetí je vyhotoven
            záznam obsahující popis média a stav při převzetí.
          </p>

          <h3>3.2 Diagnostika</h3>
          <p>
            Poskytovatel provede bezplatnou diagnostiku média a zašle klientovi cenovou nabídku.
            Diagnostika je nezávazná a klient může médium odmítnout převzít zpět bez poplatku.
          </p>

          <h3>3.3 Cenová nabídka</h3>
          <p>
            Cenová nabídka obsahuje odhad ceny, pravděpodobnost úspěchu a předpokládanou dobu zpracování.
            Nabídka je platná 30 dnů od vystavení.
          </p>

          <h3>3.4 Záchrana dat</h3>
          <p>
            Po schválení cenové nabídky klientem poskytovatel zahájí proces záchrany dat.
            Klient je pravidelně informován o průběhu.
          </p>

          <h2>4. Cena a platební podmínky</h2>
          <h3>4.1 Cena služby</h3>
          <p>
            Klient platí pouze za úspěšně zachráněná data. V případě neúspěšné záchrany je účtován
            pouze poplatek za diagnostiku (pokud byl sjednán).
          </p>

          <h3>4.2 Splatnost</h3>
          <p>
            Faktura je splatná před předáním zachráněných dat. Platba je možná v hotovosti,
            převodem nebo kartou.
          </p>

          <h2>5. Odpovědnost</h2>
          <h3>5.1 Odpovědnost poskytovatele</h3>
          <p>
            Poskytovatel neodpovídá za úspěch záchrany dat. Veškeré úkony jsou prováděny s maximální
            odbornou péčí, ale úspěch nelze garantovat.
          </p>

          <h3>5.2 Ochrana médií</h3>
          <p>
            Poskytovatel odpovídá za řádné uschování média po dobu poskytování služby. V případě
            poškození nebo ztráty náleží klientovi náhrada ve výši běžné ceny nového média.
          </p>

          <h3>5.3 Důvěrnost</h3>
          <p>
            Poskytovatel se zavazuje zachovávat mlčenlivost o všech datech a informacích získaných
            při poskytování služby.
          </p>

          <h2>6. Reklamace</h2>
          <p>
            Klient má právo reklamovat službu do 14 dnů od předání dat. Poskytovatel posoudí oprávněnost
            reklamace do 30 dnů.
          </p>

          <h2>7. Závěrečná ustanovení</h2>
          <p>
            Tyto VOP jsou platné od 1. 1. 2025. Poskytovatel si vyhrazuje právo VOP měnit.
            Aktuální verze je vždy dostupná na webových stránkách.
          </p>

          <h2>8. Kontakt</h2>
          <p>
            <strong>DataHelp s.r.o.</strong><br />
            Jirsíkova 541/1<br />
            186 00 Praha 8 - Karlín<br />
            IČ: XXXXXXXX<br />
            DIČ: CZXXXXXXXX<br />
            Email: <a href="mailto:info@datahelp.cz">info@datahelp.cz</a><br />
            Tel.: +420 775 220 440
          </p>

          <p className="text-sm text-gray-600 mt-8">
            Platné od: 1. 1. 2025
          </p>
        </div>
      </div>
    </div>
  );
}
