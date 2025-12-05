/**
 * Obchodní podmínky - Terms of Service
 * IDENTICKÝ text jako na https://www.datahelp.cz/obchodni-podminky/
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obchodní podmínky | DataHelp.cz',
  description: 'Všeobecné obchodní podmínky poskytování služeb záchrany dat.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Obchodní podmínky</h1>

        <div className="text-sm text-gray-800 space-y-4 leading-relaxed">
          {/* I. ÚVODNÍ USTANOVENÍ */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">I. ÚVODNÍ USTANOVENÍ A PŘEDMĚT DÍLA</h2>
            <p>
              Tyto podmínky upravují vztahy mezi DataHelp s.r.o. (IČO: 273 87 712, sídlo U třetí baterie 1056/5, Praha 6-Břevnov, provozovna Jirsíkova 541/1, Praha 8-Karlín) jako zhotovitelem a objednatelem. Společnost je zaměřena na záchranu dat a zpřístupnění nepřístupných datových informací na různých paměťových nosičích (pevné disky, SSD, karty, NAS, USB, mobily apod.).
            </p>
            <p>
              Předmětem smlouvy je: 1) posouzení/prověření možnosti záchrany dat, 2) zaplacení ceny za posouzení dle ceníku, 3) návrh smlouvy na vlastní záchranu dat nebo sdělení nemožnosti záchravy.
            </p>
            <p>
              Aktuální ceník najdete na <a href="https://www.datahelp.cz/cenik-zachrany-dat/" className="text-blue-600 hover:underline">https://www.datahelp.cz/cenik-zachrany-dat/</a>
            </p>
          </section>

          {/* II. UZAVŘENÍ SMLOUVY */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">II. UZAVŘENÍ SMLOUVY O DÍLO</h2>
            <p>
              Smlouva se uzavírá písemně, e-mailem, formulářem na webu nebo konkludentně předáním nosiče. V písemné formě se uzavírá podpisem příjmového protokolu.
            </p>
            <p>
              <strong>Proces</strong>: Objednatel odešle objednávku s identifikačními údaji (jméno, příjmení, bydliště, pro firmy: název, sídlo, IČ, DIČ, e-mail, telefon). Zhotovitel provede posouzení a pošle návrh smlouvy s cenou, termínem a těmito podmínkami, nebo sdělí nemožnost záchravy.
            </p>
            <p>
              Smlouva o posouzení se uzavírá příjmem objednávky nebo podpisem protokolu. Smlouva o samotné záchraně se uzavírá přijetím návrhu objednatelem.
            </p>
            <p>
              Zhotovitel může od smlouvy odstoupit při nedostatečných kapacitách, nezaplacení zálohy nebo vyšší moci.
            </p>
          </section>

          {/* III. CENA DÍLA */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">III. CENA DÍLA A PLATEBNÍ PODMÍNKY</h2>
            <p>
              Cena je uvedena v ceníku nebo návrhu smlouvy, plus náklady na dopravu a DPH. Objednatel zaplatí nejpozději při předání díla (pokud se nedohodne jinak). Zhotovitel může požadovat zálohu či úhradu před začátkem prací.
            </p>
          </section>

          {/* IV. ODSTOUPENÍ */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">IV. ODSTOUPENÍ OD SMLOUVY</h2>
            <p>
              Žádná strana se nemůže odstoupit bez zákonného důvodu nebo důvodu uvedeného v těchto podmínkách. Výslovně se vylučují články 1977-1979, 1999-2003 občanského zákoníku.
            </p>
            <p>
              Při odstoupení má zhotovitel právo na odměnu za provedenou práci (hodinová sazba z ceníku) a náhradu nákladů.
            </p>
          </section>

          {/* V. PŘEPRAVA */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">V. PŘEPRAVA DATOVÉHO NOSIČE</h2>
            <p>
              Zhotovitel vystupuje jako zasílatel (nikoliv dopravce). Objednatel musí zabalit nosič minimálně do lepenkové krabice (rozměry: min. 15×10×1 cm, max. 100 cm na nejdelší straně, obvod max. 250 cm, váha max. 20 kg).
            </p>
            <p>
              Vrácení se provádí na adresu uvedenou v objednávce. Nebezpečí škody přechází na objednatele při předání prvnímu dopravci. Objednatel musí převzít nosič na uvedené adrese a kontrolovat obal. Při poškození musí sepsať protokol s dopravcem.
            </p>
          </section>

          {/* VI. PROVEDENÍ A PŘEDÁNÍ */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">VI. PROVEDENÍ, PŘEDÁNÍ A JAKOST DÍLA</h2>
            <p>
              Dílo je hotovo a předáno, když je funkční. Zhotovitel může předvést data v provozovně nebo poslat odkaz ke stažení. Objednatel musí zkontrolovat data do 5 dnů.
            </p>
            <p>
              <strong>Bezvadnost díla</strong>: Úspěšnost záchrany musí být 95 % z obsahu nepřístupného na nosiči (pokud zhotovitel předem neuvedl nižší procento). Pokud objednatel specifikuje konkrétní data, posuzuje se poměr zachráněných k specifikovaným.
            </p>
            <p>
              Zhotovitel neodpovídá za vady způsobené objednatelem a neposkytuje záruku.
            </p>
            <p>
              Objednatel musí reklamovat vady do 5 pracovních dnů od předání. Data se uchovávají na nosičích zhotovitele maximálně 10 dnů.
            </p>
            <p>
              Reklamace se podává e-mailem na <a href="mailto:info@datahelp.cz" className="text-blue-600 hover:underline">info@datahelp.cz</a> nebo písemně na Jirsíkova 541/1, Praha 8-Karlín.
            </p>
            <p>
              <strong>Datový nosič se vrací</strong> objednateli jen na jeho výslovné přání (sdělí se při přijetí návrhu). Vrácení je na náklady objednatele; skladování se účtuje dle ceníku. Nevyzvednutý nosič bude po dalších lhůtách zlikvidován.
            </p>
            <p>
              <strong>Zašifrovaná data</strong>: Objednatel musí sdělit šifrování a poskytnout hesla v objednávce. Jinak zhotovitel účtuje dešifrování nebo předá jen bitovou kopii.
            </p>
            <p>
              <strong>Metoda RAW</strong>: Při shodě na metodě RAW (záchranu bez ohledu na souborový systém) objednatel akceptuje, že data nemusí být pojmenovaná, seřazená či úplná. Bezvadnost se posuzuje i pod 95 %.
            </p>
          </section>

          {/* VII. DALŠÍ PRÁVA */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">VII. DALŠÍ PRÁVA A POVINNOSTI</h2>
            <p>
              <strong>Mimosoudní řešení sporů</strong>: Česká obchodní inspekce (<a href="https://www.coi.cz/informace-o-adr/" className="text-blue-600 hover:underline">https://www.coi.cz/informace-o-adr/</a>). Spotřebitel je osoba jednající mimo svou podnikatelskou činnost.
            </p>
            <p>
              <strong>Rozhodné právo</strong>: Česká republika. <strong>Soudní příslušnost</strong>: Soudy České republiky.
            </p>
            <p>
              <strong>Změna okolností</strong>: Obě strany přebírají riziko změn a vylučují články 1765-1766, 2000 občanského zákoníku (nelze zrušit smlouvu pro změnu okolností či hrubý nepoměr).
            </p>
            <p>
              <strong>Prodlení se zaplacením</strong>: Dlužník platí úrok z prodlení dle zákona a může být vymáhána náhrada škody.
            </p>
            <p>
              <strong>Mimosmluvní vady</strong>: Není-li smluvou s podnikatelem, vylučují se články 1799-1800, 2158-2174 občanského zákoník.
            </p>
            <p>
              <strong>Obchodní zvyklosti</strong>: Nemají přednost před smlouvou a právními předpisy.
            </p>
          </section>

          {/* VIII. OCHRANA OSOBNÍCH ÚDAJŮ */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">VIII. OCHRANA OSOBNÍCH ÚDAJŮ</h2>
            <p>
              Zpracování se řídí zákonem č. 110/2019 Sb. a GDPR (Nařízení EU 2016/679).
            </p>
            <p>
              <strong>Zpracovávané údaje</strong>: Jméno, příjmení, adresa, e-mail, telefon.
            </p>
            <p>
              <strong>Účely zpracování</strong>:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Plnění smluvního vztahu (uzavření, plnění, reklamace, fakturace, vymáhání, soud, pojišťovna)</li>
              <li>Splnění právních povinností (daně, statistika, orgány činné v trestním řízení)</li>
              <li>Zasílání obchodních sdělení (s vašim souhlasem)</li>
            </ul>
            <p>
              <strong>Třetí osoby</strong>: Zhotovitel může pověřit zpracovatele.
            </p>
            <p>
              <strong>Doba zpracování</strong>: Jen pokud je nezbytné pro daný účel.
            </p>
            <p>
              <strong>Vaše práva</strong>:
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li><strong>Přístup k datům</strong>: Zjistit, jaká data se zpracovávají. Opakovanou žádost lze zpoplatnit.</li>
              <li><strong>Oprava</strong>: Požadovat opravu nepřesných/nepravdivých údajů.</li>
              <li><strong>Vysvětlení</strong>: Požadovat vysvětlení, pokud je porušena ochrana osobnosti.</li>
              <li><strong>Žaloba</strong>: Obrátit se na Úřad pro ochranu osobních údajů (Pplk. Sochora 27, Praha 7, IČ: 70837627).</li>
              <li><strong>Výmaz</strong>: Požadovat smazání, nejsou-li údaje potřebné.</li>
              <li><strong>Omezení</strong>: Požadovat dočasné omezení zpracování.</li>
              <li><strong>Přenositelnost</strong>: Požadovat předání dat jinému subjektu (pokud to nepoškodí práva třetích osob).</li>
              <li><strong>Námitka</strong>: Vznést námitku proti zpracování; zhotovitel musí ukončit zpracování, pokud není závažný důvod.</li>
              <li><strong>Odvolání souhlasu</strong>: Kdykoliv odvolat souhlas se zpracováním.</li>
            </ol>
            <p>
              <strong>Kontakt</strong>: Jirsíkova 541/1, Praha 8-Karlín nebo <a href="mailto:info@datahelp.cz" className="text-blue-600 hover:underline">info@datahelp.cz</a>
            </p>
            <p>
              <strong>Lhůta odpovědi</strong>: Do 30 dnů (prodloužitelná až o 2 měsíce).
            </p>
          </section>

          {/* Podpis */}
          <div className="border-t pt-6 mt-8 text-center text-gray-600">
            <p className="font-semibold">Podepsáno v Praze dne 25. září 2023</p>
            <p>DataHelp s.r.o., Aleš Wagner - jednatel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
