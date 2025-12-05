/**
 * GDPR / Privacy Policy stránka
 * DOSLOVNÝ text z www.datahelp.cz/ochrana-osobnich-udaju
 */

import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů (GDPR) | DataHelp.cz',
  description: 'Informace o zpracování osobních údajů v souladu s GDPR.',
  alternates: {
    canonical: 'https://www.datahelp.cz/ochrana-osobnich-udaju',
  },
  openGraph: {
    title: 'Ochrana osobních údajů (GDPR) | DataHelp.cz',
    description: 'Informace o zpracování osobních údajů v souladu s GDPR.',
    url: 'https://www.datahelp.cz/ochrana-osobnich-udaju',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Ochrana osobních údajů</h1>
          <p className="text-lg md:text-xl">Informace o zpracování údajů dle GDPR</p>
        </div>
      </div>

      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-lg max-w-none">
          <h2>Ochrana osobních údajů</h2>
          <p>
            Ochrana vašich osobních údajů a dat je pro nás prioritou. Veškeré činnosti spojené se zpracováním dat provádíme v souladu s platnou legislativou a důrazem na bezpečnost a důvěrnost.
          </p>

          <p>
            Ochrana osobních údajů se řídí zákonem č. 110/2019 Sb., o zpracování osobních údajů, a Nařízením Evropského parlamentu a Rady (EU) 2016/679 ze dne 27. dubna 2016 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů a o zrušení směrnice 95/46/ES.
          </p>

          <p>
            Objednatel si je vědom toho, že po odeslání objednávky, případně po uzavření smlouvy o dílo budou zhotovitelem zpracovávány osobní údaje objednatele obsažené ve smlouvě o dílo (objednávce), a to zejména jméno a příjmení, adresa bydliště, adresa elektronické pošty, telefonní číslo (dále jen „osobní údaje").
          </p>

          <p>Zhotovitel zpracovává osobní údaje objednatele za účelem:</p>
          <ul>
            <li>plnění smluvního vztahu (zejména za účelem uzavření smlouvy o dílo, plnění smlouvy o dílo, vyřizování reklamací, vyřizování objednávek, vystavování a zasílání faktur, vymáhání pohledávek, včetně uplatnění práv u soudů, pojišťoven apod.),</li>
            <li>plnění povinností stanovených obecně závaznými právními předpisy (zejména plnění daňových povinností, povinností v oblasti statistiky, povinností vůči orgánům činným v trestním řízení apod.),</li>
            <li>zasílání nabídek nových a stávajících produktů zhotovitele (obchodních sdělení zhotovitele), a to za podmínky udělení souhlasu objednatele se zasíláním těchto nabídek.</li>
          </ul>

          <p>
            Zpracováním osobních údajů objednatele může zhotovitel pověřit třetí osobu, jakožto zpracovatele.
          </p>

          <p>
            Výše uvedené osobní údaje budou zhotovitelem zpracovávány pouze po dobu nezbytnou pro daný účel jejich zpracování. Osobní údaje budou zpracovávány zejména v elektronické podobě automatizovaným způsobem nebo v tištěné podobě neautomatizovaným způsobem.
          </p>

          <p>
            Objednatel jako subjekt údajů má ohledně ochrany osobních údajů práva, která pro něj vyplývají z právních předpisů na ochranu osobních údajů a která je oprávněn uplatnit vůči zhotoviteli, a to:
          </p>

          <h3>Právo na přístup k osobním údajům</h3>
          <p>
            V případě, že má objednatel zájem zjistit, jaké o něm zhotovitel zpracovává osobní údaje, má právo získat od zhotovitele informace o tom, jestli jsou jeho osobní údaje zpracovávány, a pokud tomu tak je, má současně právo získat k těmto osobním údajům přístup. V případě opakované žádosti objednatele je zhotovitel oprávněn za poskytnutí informace požadovat od objednatele přiměřený poplatek, a to formou zálohy, a pokud objednatel tuto zálohu neuhradí, nebude mu informace poskytnuta.
          </p>

          <h3>Právo na opravu nepřesných či nepravdivých osobních údajů</h3>
          <p>
            V případě, že zhotovitel zpracovává o objednateli nepřesné či nepravdivé osobní údaje, má objednatel právo požadovat jejich opravu. Zhotovitel je povinen provést opravu osobních údajů bez zbytečného odkladu, avšak vždy s ohledem na jeho personální a technické možnosti.
          </p>

          <h3>Právo požadovat vysvětlení</h3>
          <p>
            V případě, že by zpracováním osobních údajů objednatele zhotovitel narušoval ochranu jeho osobnosti či soukromí nebo by byly osobní údaje zpracovávány v rozporu s právními předpisy, je objednatel oprávněn požadovat po zhotoviteli vysvětlení.
          </p>

          <h3>Právo obrátit se na Úřad pro ochranu osobních údajů</h3>
          <p>
            V případě, že bude objednatel přesvědčen o tom, že ze strany zhotovitele dochází k porušení práva objednatele na ochranu soukromí, má právo obrátit se na dozorový úřad, kterým je Úřad pro ochranu osobních údajů, IČ: 70837627, se sídlem Pplk. Sochora 27, 170 00 Praha 7.
          </p>

          <h3>Právo na výmaz osobních údajů</h3>
          <p>
            V případě, že osobní údaje objednatele již nejsou potřebné pro účely, pro které byly zpracovávány, anebo jsou zhotovitelem zpracovávány neoprávněně, má objednatel právo požadovat jejich výmaz.
          </p>

          <h3>Právo na omezení zpracování osobních údajů</h3>
          <p>
            V případě, že objednatel nemá zájem o výmaz jeho osobních údajů, ale pouze na dočasném omezení rozsahu zpracování jeho osobních údajů, má právo požadovat po zhotoviteli omezení zpracování těchto osobních údajů.
          </p>

          <h3>Právo na přenositelnost osobních údajů</h3>
          <p>
            V případě, že má objednatel zájem na tom, aby zhotovitel předal jeho osobní údaje dalšímu subjektu, má právo na přenositelnost údajů k tomuto subjektu. Pokud by však výkonem tohoto práva mohlo dojít k nepříznivému dotčení práv a svobod třetích osob, nevyhoví zhotovitel takové žádosti.
          </p>

          <h3>Právo vznést námitku</h3>
          <p>
            Objednatel má právo kdykoliv vznést námitku proti zpracování osobních údajů, které jsou zpracovávány pro účely splnění úkolu prováděného ve veřejném zájmu nebo při výkonu veřejné moci nebo pro účely ochrany oprávněných zájmů zhotovitele. V případě, že zhotovitel neprokáže, že existuje závažný oprávněný důvod pro zpracování osobních údajů objednatele, který převažuje nad zájmy nebo právy a svobodami objednatele, je zhotovitel povinen zpracování osobních údajů na základě námitky objednatele ukončit bez zbytečného odkladu.
          </p>

          <h3>Právo na odvolání souhlasu se zpracováním osobních údajů</h3>
          <p>
            V případě, že zhotovitel zpracovává osobní údaje na základě souhlasu uděleného objednatelem, je objednatel oprávněn tento souhlas kdykoliv odvolat.
          </p>

          <p>
            Při výkonu práv uvedených v předchozím odstavci může objednatel kontaktovat zhotovitele písemně na adrese provozovny: DataHelp s.r.o., Jirsíkova 541/1, 186 00 Praha 8 ‑ Karlín nebo e-mailem na e-mailovou adresu zhotovitele <a href="mailto:info@datahelp.cz">info@datahelp.cz</a>.
          </p>

          <p>
            Na žádost objednatele dle tohoto článku VIII. obchodních podmínek, bude zhotovitel reagovat nejpozději do 30 dnů ode dne obdržení žádosti. V případě nutnosti je zhotovitel oprávněn prodloužit lhůtu nejdéle o 2 měsíce. O prodloužení lhůty včetně důvodů pro její prodloužení je zhotovitel povinen informovat objednatele.
          </p>
        </div>
      </div>
    </div>
  );
}
