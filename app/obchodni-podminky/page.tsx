/**
 * Obchodní podmínky - Terms of Service
 * DOSLOVNÝ text jako na https://www.datahelp.cz/obchodni-podminky/
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obchodní podmínky | DataHelp.cz',
  description: 'Všeobecné obchodní podmínky poskytování služeb záchrany dat.',
  alternates: {
    canonical: 'https://www.datahelp.cz/obchodni-podminky',
  },
  openGraph: {
    title: 'Obchodní podmínky | DataHelp.cz',
    description: 'Všeobecné obchodní podmínky poskytování služeb záchrany dat.',
    url: 'https://www.datahelp.cz/obchodni-podminky',
    siteName: 'DataHelp.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Obchodní podmínky</h1>

        <div className="text-sm text-gray-800 space-y-4 leading-relaxed">
          {/* I. ÚVODNÍ USTANOVENÍ */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">I.<br />ÚVODNÍ USTANOVENÍ A PŘEDMĚT DÍLA</h2>
            <p>
              Tyto obchodní podmínky upravují vztahy mezi smluvními stranami smlouvy o dílo uzavírané mezi společností DataHelp s.r.o., IČO: 273 87 712, se sídlem U třetí baterie 1056/5, 162 00 Praha 6 ‑ Břevnov, adresa provozovny: Jirsíkova 541/1, 186 00 Praha 8 ‑ Karlín, zapsanou v obchodním rejstříku vedeném Městským soudem v Praze pod sp. zn.: C 115695, jako zhotovitelem, a objednatelem. Objednatelem se rozumí jakákoliv fyzická nebo právnická osoba, která uzavřela se zhotovitelem smlouvu o dílo dle ust. § 2586 a násl. zákona č. 89/2012 Sb., občanský zákoník a dle těchto obchodních podmínek. Objednatel a zhotovitel společně jsou dále v těchto obchodních podmínkách označeni také pouze jako „smluvní strany".
            </p>
            <p>
              Zhotovitel je podnikatelem zaměřeným na podnikání v oblasti záchrany dat, resp. zpřístupnění (obnovy) nepřístupných datových informací umístěných na datových nosičích, tj. na paměťových nosičích datových informací používajících k uchování dat nějaký fyzikální princip (zejména pevné a externí paměťové disky, raid pole, paměťové karty, SSD disky, NAS úložiště, USB flash disky, interní paměti zařízení se systémem Android, interní paměti zařízení se systémem iOS apod.) [dále jen „datový nosič"].
            </p>
            <p>
              Předmětem smlouvy o dílo je nejprve posouzení/prověření možnosti provedení záchrany dat, resp. zpřístupnění nepřístupných datových informací umístěných na datovém nosiči zhotovitelem pro objednatele (dále jen „posouzení") a závazek objednatele zaplatit zhotoviteli cenu za toto posouzení dle aktuálního ceníku zhotovitele, který je nedílnou součástí těchto obchodních podmínek.
            </p>
            <p>
              Na základě výsledku posouzení bude zhotovitelem objednateli zaslán návrh na uzavření smlouvy o dílo, jejímž předmětem bude samotné provedení záchrany dat, resp. zpřístupnění nepřístupných datových informací (dále jen „záchrana dat"), nebo bude objednateli oznámeno, že záchranu dat nelze provést.
            </p>
            <p>
              Aktuální ceník zhotovitele je umístěn na internetových stránkách zhotovitele pod odkazem <a href="https://www.datahelp.cz/cenik-zachrany-dat/" className="text-blue-600 hover:underline">https://www.datahelp.cz/cenik-zachrany-dat/</a>.
            </p>
          </section>

          {/* II. UZAVŘENÍ SMLOUVY */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">II.<br />UZAVŘENÍ SMLOUVY O DÍLO</h2>
            <p>
              Smlouva o dílo je uzavírána písemně, elektronicky e-mailem či prostřednictvím formuláře umístěného na internetových stránkách zhotovitele (objednací formulář pro diagnostiku a svoz zdarma umístěný na internetových stránkách pod odkazem <a href="https://www.datahelp.cz/svoz-dat/" className="text-blue-600 hover:underline">https://www.datahelp.cz/svoz-dat/</a>) nebo konkludentně předáním datového nosiče zhotoviteli. V písemné formě je smlouva o dílo uzavřena podpisem příjmového protokolu objednatelem a zhotovitelem, resp. vystavením příjmového protokolu zhotovitelem objednateli.
            </p>
            <p>
              V případě uzavření smlouvy o dílo dle odst. 3 článku I. těchto obchodních podmínek za pomoci prostředku komunikace na dálku objednatel zašle zhotoviteli objednávku elektronicky e‑mailem či prostřednictvím formuláře umístěného na internetových stránkách zhotovitele. Objednatel je mimo jiné povinen zhotoviteli sdělit jeho identifikační údaje, tzn. v případě fyzické osoby zejména jméno, příjmení, datum narození a bydliště nebo v případě právnické osoby firmu, sídlo, identifikační číslo, a pokud je objednatel plátcem DPH uvede rovněž daňové identifikační číslo, případně uvede rovněž adresu pro doručování, pokud bude tato adresa odlišná od adresy bydliště či sídla, dále e-mailovou adresu a telefonní číslo. Po obdržení objednávky provede zhotovitel posouzení a na základě výsledku posouzení zašle zhotovitel objednateli návrh na uzavření smlouvy o dílo dle odst. 4 článku I. těchto obchodních podmínek elektronicky e-mailem a současně sdělí objednateli cenu díla (např. zasláním aktuálního ceníku zhotovitele), předpokládaný termín dokončení díla a zašle objednateli tyto obchodní podmínky, nebo objednateli sdělí, že záchranu dat nelze provést.
            </p>
            <p>
              Smlouva o dílo je uzavřena:
            </p>
            <p>
              V případě smluv o dílo dle odst. 3 článku I. těchto obchodních podmínek okamžikem obdržení objednávky zhotovitelem, nebo okamžikem podpisu příjmového protokolu smluvními stranami, resp. vystavením příjmového protokolu zhotovitelem (v případě písemně uzavřené smlouvy o dílo) nebo převzetím datového nosiče zhotovitelem k posouzení (v případě konkludentního uzavření smlouvy o dílo).
            </p>
            <p>
              Smlouva o dílo dle odst. 4 článku I. těchto obchodních podmínek je uzavřena okamžikem přijetí návrhu zhotovitele na uzavření smlouvy o dílo objednatelem, tj. sdělením objednatele adresovaným zhotoviteli, že má záchranu dat provést.
            </p>
            <p>
              Zhotovitel nepřijme návrh na uzavření smlouvy o dílo, případně je oprávněn od již uzavřené smlouvy o dílo odstoupit zejména v případě:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>nedostatečných kapacit či nedostupnosti náhradních dílů v případě mechanického poškození datového nosiče;</li>
              <li>nezaplacení zálohy, ceny díla či její části nebo nákladů na dopravu;</li>
              <li>vyšší moci.</li>
            </ul>
          </section>

          {/* III. CENA DÍLA */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">III.<br />CENA DÍLA A PLATEBNÍ PODMÍNKY</h2>
            <p>
              Cena díla je uvedena v aktuálním ceníku zhotovitele, který je součástí těchto obchodních podmínek, nebo je uvedena v návrhu na uzavření smlouvy o dílo dle odst. 4 článku I. těchto obchodních podmínek s tím, že k ceně díla budou připočteny náklady na dopravu, pokud nebude ujednáno něco jiného, a daň z přidané hodnoty.
            </p>
            <p>
              Objednatel je povinen uhradit cenu díla nejpozději při předání díla, pokud se smluvní strany nedohodnou jinak.
            </p>
            <p>
              Zhotovitel je oprávněn před započetím se zhotovením díla požadovat od objednatele zaplacení zálohy, ceny díla či její části nebo nákladů na dopravu, pokud nejde o dopravu, kterou zajišťuje zhotovitel pro objednatele na vlastní náklady.
            </p>
          </section>

          {/* IV. ODSTOUPENÍ */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">IV.<br />ODSTOUPENÍ OD SMLOUVY</h2>
            <p>
              Žádná ze smluvních stran není oprávněna odstoupit od smlouvy o dílo, vypovědět ji, či ji jinak jednostranně ukončit z jiných než zákonných důvodů, nebo z důvodů výslovně uvedených v těchto obchodních podmínkách nebo ve smlouvě o dílo, přičemž smluvní strany výslovně vylučují použití ust. § 1977 až § 1979, § 1999, § 2000, § 2002 a § 2003 zákona č. 89/2012 Sb., občanský zákoník.
            </p>
            <p>
              V případě, že dojde k odstoupení od smlouvy o dílo, je zhotovitel oprávněn vyúčtovat objednateli odměnu, na kterou mu v souvislosti s prováděním díla vzniklo právo do doby odstoupení, a to dle hodinové sazby uvedené v aktuálním ceníku zhotovitele, pokud se smluvní strany nedohodnou jinak. V případě odstoupení od smlouvy o dílo má zhotovitel rovněž právo na náhradu nákladů vynaložených v souvislosti s prováděním díla.
            </p>
          </section>

          {/* V. PŘEPRAVA */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">V.<br />PŘEPRAVA DATOVÉHO NOSIČE</h2>
            <p>
              Na základě objednávky objednatele jako příkazce se může zhotovitel jako zasílatel zavázat obstarat pro objednatele vlastním jménem a na účet objednatele přepravu zásilky obsahující datový nosič z určitého místa do jiného určitého místa, případně i obstarat nebo provést úkony s přepravou související, a objednatel se zavazuje zaplatit zhotoviteli odměnu, pokud se smluvní strany nedohodnou jinak. Zhotovitel tak v případě přepravy datového nosiče vystupuje vždy jako zasílatel a nikoli jako dopravce, vlastník zboží či objednatel přepravy.
            </p>
            <p>
              Před odesláním datového nosiče zhotoviteli, resp. před předáním datového nosiče dopravci k doručení zhotoviteli, je objednatel povinen datový nosič pečlivě zabalit, aby nedošlo k jeho dalšímu poškození, a to vždy alespoň do lepenkové krabice (nikoli pouze do obálky či bublinkové nebo jiné folie), přičemž minimální rozměr zásilky je 15 cm x 10 cm x 1 cm a maximální rozměr zásilky činí u nejdelší strany nejvýše 100 cm a obvodová délka nejvýše 250 cm (obvodová délka se počítá 2× šířka + 2× výška + délka) s tím, že hmotnost zásilky nesmí přesáhnout 20 kg.
            </p>
            <p>
              Při vrácení datového nosiče objednateli, bude datový nosič dodán na adresu uvedenou objednatelem v objednávce obstarání přepravy či v objednávce, přičemž adresa uvedená v objednávce obstarání přepravy má přednost.
            </p>
            <p>
              V případě objednávky obstarání přepravy ze strany objednatele splní zhotovitel svoji povinnost předat dílo či věc (zboží v případě koupě datového nosiče objednatelem) předáním datového nosiče prvnímu dopravci k přepravě na adresu uvedenou objednatelem. Nebezpečí škody na datovém nosiči v takovém případě přechází na objednatele jeho předáním prvnímu dopravci k přepravě na adresu uvedenou objednatelem.
            </p>
            <p>
              V případě, že je obstarání zvláštního způsobu přepravy dohodnuto na základě zvláštního požadavku objednatele, nese objednatel riziko s tím spojené a případné dodatečné náklady spojené s tímto způsobem přepravy.
            </p>
            <p>
              Objednatel je povinen převzít datový nosič na jím uvedené adrese. Pokud objednatel nepřevezme zboží na jím uvedené adrese, není zhotovitel v prodlení s předáním díla a objednatel ponese náklady spojené s případným opakovaným doručením datového nosiče či jeho vrácením zhotoviteli.
            </p>
            <p>
              Při převzetí datového nosiče od dopravce je objednatel povinen zkontrolovat neporušenost obalů datového nosiče a v případě jakýchkoliv závad tyto závady okamžitě oznámit dopravci a poté rovněž zhotoviteli. V případě porušení obalu svědčícího o neoprávněném vniknutí do zásilky nemusí objednatel zásilku od dopravce převzít.
            </p>
          </section>

          {/* VI. PROVEDENÍ A PŘEDÁNÍ */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">VI.<br />PROVEDENÍ, PŘEDÁNÍ A JAKOST DÍLA A PRÁVA Z VADNÉHO PLNĚNÍ</h2>
            <p>
              Dílo je provedeno, je-li dokončeno a  předáno.
            </p>
            <p>
              Dílo je dokončeno, je-li předvedena jeho způsobilost sloužit svému účelu. Pokud dochází k předání díla (datového nosiče obsahujícího zachráněné datové informace) v provozovně zhotovitele, předvede zhotovitel na základě žádosti objednatele zachráněné (zpřístupněné) datové informace objednateli. Dílo může být objednateli předáno rovněž zasláním odkazu na stažení zachráněných (zpřístupněných) datových informací. V případě většího množství datových informací nebo v případě, že objednatel nepožádal zhotovitele o předvedení zachráněných (zpřístupněných) datových informaci v provozovně při předání díla, nebo je-li datový nosič objednateli dopravován či předáván zasláním (odesláním) odkazu na stažení zachráněných (zpřístupněných) datových informací, je objednatel povinen zkontrolovat datové informace a jejich způsobilost sloužit svému účelu bez zbytečného odkladu po převzetí datového nosiče či odeslání odkazu na stažení datových informací, a to nejpozději do 5 dnů ode dne předání díla.
            </p>
            <p>
              Dílo se považuje za předané buď předáním datového nosiče objednateli v provozovně zhotovitele, nebo zasláním (odesláním) odkazu na stažení zachráněných (zpřístupněných) datových informací objednateli na e-mailovou adresu sdělenou zhotoviteli, anebo předáním datového nosiče se zachráněnými (zpřístupněnými) datovými informacemi dopravci k doručení na adresu uvedenou objednatelem, a to podle toho, co nastane dříve. Při předání datového nosiče v provozovně zhotovitele je objednatel povinen předložit zhotoviteli doklad totožnosti (občanský průkaz či cestovní pas), jinak mu datový nosič nebude zhotovitelem předán. V takovém případě není zhotovitel v prodlení s provedením díla. O předání datového nosiče bude mezi objednatelem a zhotovitelem sepsán, resp. zhotovitelem vystaven výdejový protokol.
            </p>
            <p>
              Dílo dle odst. 3 článku I. těchto obchodních podmínek je považováno za provedené sdělením výsledku posouzení objednateli.
            </p>
            <p>
              Dílo dle odst. 4 článku I. těchto obchodních podmínek je považováno za provedené předáním díla a za bezvadné, pokud dosáhne úspěšnost zachráněných (zpřístupněných) datových informací 95 % z celkového obsahu nepřístupných datových informací obsažených na datovém nosiči. Upozorní-li zhotovitel před započetím díla objednatele, že není schopen zaručit úspěšnost 95 % zachráněných (zpřístupněných) datových informací, bude dílo považováno za bezvadné, i pokud bude úspěšnost zachráněných (zpřístupněných) datových informací nižší než 95 %. Uvede-li objednatel konkrétní datové informace, jejichž záchranu (zpřístupnění) požaduje, může být zhotovitelem přikročeno k záchraně datových informací dle této specifikace s tím, že úspěšnost záchrany se v takovém případě posoudí jako poměr objemu zachráněných (zpřístupněných) datových informací k celkového objemu objednatelem konkrétně specifikovaných datových informací.
            </p>
            <p>
              Zhotovitel neodpovídá za vady způsobené objednatelem.
            </p>
            <p>
              Zhotovitel neposkytuje objednateli záruku za jakost.
            </p>
            <p>
              Práva a povinnosti smluvních stran ohledně práv z vadného plnění se řídí příslušnými obecně závaznými právními předpisy, zejména zákonem č. 89/2012 Sb., občanský zákoník a těmito obchodními podmínkami a v případě datového nosiče (nikoli datových informací obsažených na datovém nosiči) dodaného zhotovitelem objednateli za účelem předání zachráněných (zpřístupněných) datových informací se na práva z vadného plnění použijí příslušná ustanovení zákona č. 89/2012 Sb., občanský zákoník, o kupní smlouvě a tyto obchodní podmínky.
            </p>
            <p>
              Objednatel je povinen podle svých možností zkontrolovat co nejdříve po předání díla zachráněné (zpřístupněné) datové informace za účelem zjištění případných vad a vady je povinen oznámit zhotoviteli (reklamovat) nejpozději do 5 pracovních dnů od předání díla. Zachráněné datové informace jsou zejména pro případ vadného datového nosiče, ztráty či poškození datového nosiče při přepravě apod. vždy umístěny rovněž na datových nosičích zhotovitele, avšak nejdéle po dobu 10 dnů ode dne předání díla, a proto mohou být objednateli v této lhůtě znovu nahrány na jiný datový nosič, případně mu může být zhotovitelem zaslán odkaz pro jejich stažení.
            </p>
            <p>
              Objednatel je oprávněn uplatnit práva z vadného plnění (reklamaci) zasláním e‑mailové zprávy na e-mailovou adresu zhotovitele <a href="mailto:info@datahelp.cz" className="text-blue-600 hover:underline">info@datahelp.cz</a> nebo zasláním písemného sdělení na adresu provozovny zhotovitele: Jirsíkova 541/1, 186 00 Praha 8 ‑ Karlín.
            </p>
            <p>
              Je-li datový nosič se zachráněnými (zpřístupněnými) datovými informacemi objednateli zasílán prostřednictvím dopravce či poskytovatele poštovních služeb a zásilka je zjevně poškozena, je objednatel povinen uplatnit reklamaci sepsáním protokolu o poškození zásilky v okamžiku jejího převzetí od dopravce či poskytovatele poštovních služeb, nebo odmítnout převzetí takto poškozené zásilky, v opačném případě nemá objednatel právo na uplatnění reklamace u zhotovitele.
            </p>
            <p>
              Objednatelem zhotoviteli za účelem zhotovení díla předaný datový nosič se považuje za zničenou věc (odpad) a zhotovitel není povinen datový nosič objednateli po předání díla vrátit a je oprávněn jej nenávratně zlikvidovat, pokud se smluvní strany nedohodnou jinak. V případě, že bude objednatel požadovat vrácení datového nosiče, je povinen zhotoviteli tuto informaci sdělit nejpozději při přijetí návrhu na uzavření smlouvy o dílo týkající se záchrany dat. Vrácení datového nosiče provede zhotovitel na náklady a odpovědnost objednatele, přičemž za opětovné složení datového nosiče do původního stavu si zhotovitel účtuje odměnu dle aktuálního ceníku zhotovitele. Pokud je datový nosič vracen objednateli, bude zhotovitelem vždy složen do původního stavu, ve kterém byl zhotoviteli předán, aby nedošlo ke ztrátě či poškození jeho součástek. V případě neúspěšné záchrany dat nebo v případě, že dojde pouze k posouzení a záchrana dat již nebude zhotovitelem prováděna, bude datový nosič vždy vrácen objednateli, pokud se smluvní strany nedohodnou jinak. Objednatel je povinen datový nosič vyzvednout nejpozději do 14 dnů ode dne, kdy k tomu bude zhotovitelem vyzván. Nevyzvedne-li objednatel datový nosič ve lhůtě uvedené v předchozí větě, určí zhotovitel objednateli dodatečnou lhůtu k jeho vyzvednutí a nevyzvedne-li si objednatel datový nosič ani v této dodatečné lhůtě, je zhotovitel oprávněn datový nosič nenávratně zlikvidovat. V případě prodlení objednatele s vyzvednutím datového nosiče, je objednatel povinen uhradit zhotoviteli skladné a případné náklady na likvidaci datového nosiče ve výši dle aktuálního ceníku zhotovitele.
            </p>
            <p>
              Pokud je objednatelem zhotoviteli předaný datový nosič zašifrovaný či zaheslovaný, je objednatel povinen tyto skutečnosti oznámit zhotoviteli již v objednávce a poskytnout veškeré nezbytné kódy a hesla. V případě, že objednatel zhotovitele na skutečnosti uvedené v tomto odstavci neupozornil v objednávce, je zhotovitel oprávněn objednateli navíc účtovat odměnu za dešifrování. V případě, že objednatel kódy a hesla zhotoviteli vůbec nepředá, nemůže zhotovitel provést dešifrování ani výstupní kontrolu zachráněných datových informací a objednateli předá pouze bitovou kopii a dešifrování a kontrolu dat bude muset provést objednatel. V takovém případě však bude dílo považováno za bezvadné, bude-li bitová kopie obsahovat alespoň 95 % z celkového množství kapacity datového nosiče.
            </p>
            <p>
              Dohodnou-li se smluvní strany na záchraně dat metodou „RAW", což představuje záchranu dat bez ohledu na souborový systém a označení či pojmenování souborů, je objednatel srozuměn s tím, že zachráněné (zpřístupněné) datové informace nemusí být označené či pojmenované a seřazené způsobem, jakým byly označeny či pojmenovány a seřazeny původně objednatelem, datové informace mohou být rovněž částečně nečitelné, neúplné, případně nemusí obsahovat objednatelem přímo specifikované datové informace. V případě použití metody „RAW" bude dílo považováno za bezvadné, i pokud nedosáhne úspěšnosti zachráněných (zpřístupněných) datových informací 95 % z celkového obsahu nepřístupných datových informací obsažených na datovém nosiči.
            </p>
            <p>
              V případě, že bude k provedení díla nezbytná součinnost objednatele a objednatel takovou součinnost zhotoviteli odmítne poskytnout nebo ji neposkytne ani v dodatečné lhůtě, je zhotovitel oprávněn od smlouvy o dílo odstoupit.
            </p>
          </section>

          {/* VII. DALŠÍ PRÁVA */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">VII.<br />DALŠÍ PRÁVA A POVINNOSTI SMLUVNÍCH STRAN</h2>
            <p>
              Subjektem mimosoudního řešení spotřebitelských porů je Česká obchodní inspekce s tím, že informace o řešení těchto sporů jsou k dispozici na internetových stránkách <a href="https://www.coi.cz" className="text-blue-600 hover:underline">https://www.coi.cz</a>, konkrétně pod odkazem <a href="https://www.coi.cz/informace-o-adr/" className="text-blue-600 hover:underline">https://www.coi.cz/informace-o-adr/</a>. Spotřebitelem se rozumí každý člověk, který mimo rámec své podnikatelské činnosti nebo mimo rámec samostatného výkonu svého povolání uzavírá smlouvu o dílo se zhotovitelem nebo s ním jinak jedná.
            </p>
            <p>
              Smluvní strany si pro smlouvu o dílo a právní vztahy z ní vyplývající a s ní související, které obsahují mezinárodní prvek, sjednávají jako rozhodné právo České republiky.
            </p>
            <p>
              Smluvní strany si k řešení sporů sjednávají příslušnost soudů České republiky.
            </p>
            <p>
              Smluvní strany prohlašují, že na sebe přebírají nebezpečí změny okolností a že jakákoliv změna okolností nezakládá žádné ze smluvních stran právo uplatňovat jakékoliv nároky s tím související, přičemž smluvní strany výslovně vylučují použití ust. § 1765 odst. 1, § 1766 a § 2000 zákona č. 89/2012 Sb., občanský zákoník. Smluvní strany se vzdávají jakéhokoliv práva na zrušení smlouvy o dílo a navrácení do původního stavu, pokud by byla vzájemná plnění dle této smlouvy o dílo v hrubém nepoměru, a výslovně vylučují použití ust. § 1793 až § 1796 zákona č. 89/2012 Sb., občanský zákoník.
            </p>
            <p>
              Pokud je smluvní strana v prodlení se zaplacením peněžitého dluhu, pak je taková smluvní strana jako dlužník povinna zaplatit druhé smluvní straně jako věřiteli úrok z prodlení z dlužné částky ve výši dle platných právních předpisů. Věřitel má rovněž právo na náhradu škody vzniklé nesplněním peněžitého dluhu v plné výši, a to bez ohledu na to, zda je či není kryta úrokem z prodlení.
            </p>
            <p>
              Není-li smlouva o dílo uzavírána se spotřebitelem, pak smluvní strany výslovně vylučují použití ust. § 1799, § 1800 a § 2158 až § 2174 zákona č. 89/2012 Sb., občanský zákoník.
            </p>
            <p>
              Obchodní zvyklosti, ať už zachovávané obecně či v daném odvětví, nemají přednost před ustanoveními smlouvy o dílo, těchto obchodních podmínek nebo platných právních předpisů.
            </p>
          </section>

          {/* VIII. OCHRANA OSOBNÍCH ÚDAJŮ */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">VIII.<br />OCHRANA OSOBNÍCH ÚDAJŮ</h2>
            <p>
              Ochrana osobních údajů se řídí zákonem č. 110/2019 Sb., o zpracování osobních údajů, a Nařízením Evropského parlamentu a Rady (EU) 2016/679 ze dne 27. dubna 2016 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů a o zrušení směrnice 95/46/ES.
            </p>
            <p>
              Objednatel si je vědom toho, že po odeslání objednávky, případně po uzavření smlouvy o dílo budou zhotovitelem zpracovávány osobní údaje objednatele obsažené ve smlouvě o dílo (objednávce), a to zejména jméno a příjmení, adresa bydliště, adresa elektronické pošty, telefonní číslo (dále jen „osobní údaje").
            </p>
            <p>
              Zhotovitel zpracovává osobní údaje objednatele za účelem:
            </p>
            <ul className="list-disc ml-6 space-y-1">
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
            <ol className="list-decimal ml-6 space-y-2">
              <li>
                <strong>Právo na přístup k osobním údajům</strong><br />
                V případě, že má objednatel zájem zjistit, jaké o něm zhotovitel zpracovává osobní údaje, má právo získat od zhotovitele informace o tom, jestli jsou jeho osobní údaje zpracovávány, a pokud tomu tak je, má současně právo získat k těmto osobním údajům přístup. V případě opakované žádosti objednatele je zhotovitel oprávněn za poskytnutí informace požadovat od objednatele přiměřený poplatek, a to formou zálohy, a pokud objednatel tuto zálohu neuhradí, nebude mu informace poskytnuta.
              </li>
              <li>
                <strong>Právo na opravu nepřesných či nepravdivých osobních údajů</strong><br />
                V případě, že zhotovitel zpracovává o objednateli nepřesné či nepravdivé osobní údaje, má objednatel právo požadovat jejich opravu. Zhotovitel je povinen provést opravu osobních údajů bez zbytečného odkladu, avšak vždy s ohledem na jeho personální a technické možnosti.
              </li>
              <li>
                <strong>Právo požadovat vysvětlení</strong><br />
                V případě, že by zpracováním osobních údajů objednatele zhotovitel narušoval ochranu jeho osobnosti či soukromí nebo by byly osobní údaje zpracovávány v rozporu s právními předpisy, je objednatel oprávněn požadovat po zhotoviteli vysvětlení.
              </li>
              <li>
                <strong>Právo obrátit se na Úřad pro ochranu osobních údajů</strong><br />
                V případě, že bude objednatel přesvědčen o tom, že ze strany zhotovitele dochází k porušení práva objednatele na ochranu soukromí, má právo obrátit se na dozorový úřad, kterým je Úřad pro ochranu osobních údajů, IČ: 70837627, se sídlem Pplk. Sochora 27, 170 00 Praha 7.
              </li>
              <li>
                <strong>Právo na výmaz osobních údajů</strong><br />
                V případě, že osobní údaje objednatele již nejsou potřebné pro účely, pro které byly zpracovávány, anebo jsou zhotovitelem zpracovávány neoprávněně, má objednatel právo požadovat jejich výmaz.
              </li>
              <li>
                <strong>Právo na omezení zpracování osobních údajů</strong><br />
                V případě, že objednatel nemá zájem o výmaz jeho osobních údajů, ale pouze na dočasném omezení rozsahu zpracování jeho osobních údajů, má právo požadovat po zhotoviteli omezení zpracování těchto osobních údajů.
              </li>
              <li>
                <strong>Právo na přenositelnost osobních údajů</strong><br />
                V případě, že má objednatel zájem na tom, aby zhotovitel předal jeho osobní údaje dalšímu subjektu, má právo na přenositelnost údajů k tomuto subjektu. Pokud by však výkonem tohoto práva mohlo dojít k nepříznivému dotčení práv a svobod třetích osob, nevyhoví zhotovitel takové žádosti.
              </li>
              <li>
                <strong>Právo vznést námitku</strong><br />
                Objednatel má právo kdykoliv vznést námitku proti zpracování osobních údajů, které jsou zpracovávány pro účely splnění úkolu prováděného ve veřejném zájmu nebo při výkonu veřejné moci nebo pro účely ochrany oprávněných zájmů zhotovitele. V případě, že zhotovitel neprokáže, že existuje závažný oprávněný důvod pro zpracování osobních údajů objednatele, který převažuje nad zájmy nebo právy a svobodami objednatele, je zhotovitel povinen zpracování osobních údajů na základě námitky objednatele ukončit bez zbytečného odkladu.
              </li>
              <li>
                <strong>Právo na odvolání souhlasu se zpracováním osobních údajů</strong><br />
                V případě, že zhotovitel zpracovává osobní údaje na základě souhlasu uděleného objednatelem, je objednatel oprávněn tento souhlas kdykoliv odvolat.
              </li>
            </ol>
            <p>
              Při výkonu práv uvedených v předchozím odstavci může objednatel kontaktovat zhotovitele písemně na adrese provozovny: DataHelp s.r.o., Jirsíkova 541/1, 186 00 Praha 8 ‑ Karlín nebo e-mailem na e-mailovou adresu zhotovitele <a href="mailto:info@datahelp.cz" className="text-blue-600 hover:underline">info@datahelp.cz</a>.
            </p>
            <p>
              Na žádost objednatele dle tohoto článku VIII. obchodních podmínek, bude zhotovitel reagovat nejpozději do 30 dnů ode dne obdržení žádosti. V případě nutnosti je zhotovitel oprávněn prodloužit lhůtu nejdéle o 2 měsíce. O prodloužení lhůty včetně důvodů pro její prodloužení je zhotovitel povinen informovat objednatele.
            </p>
          </section>

          {/* Podpis */}
          <div className="border-t pt-6 mt-8 text-center text-gray-600">
            <p className="mb-2">V Praze dne 25. září 2023</p>
            <p className="font-semibold">DataHelp s.r.o.</p>
            <p>Aleš Wagner - jednatel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
