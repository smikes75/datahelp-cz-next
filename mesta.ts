// app/data/mesta.ts
// Kompletní data pro 77 měst ČR - programmatic SEO pro DataHelp.cz

export interface Mesto {
  slug: string              // URL slug (bez diakritiky, lowercase)
  name: string              // Název města
  nameLocative: string      // 6. pád - "v Brně", "v Ostravě"
  nameGenitive: string      // 2. pád - "z Brna", "z Ostravy"
  region: string            // Kraj
  isRegionalCapital: boolean // Je to krajské město?
  population: number        // Počet obyvatel
  distanceFromPrague: number // Vzdálenost v km
  deliveryTime: string      // Čas doručení kurýrem
  localInfo: string         // Unikátní text o městě (2-3 věty)
  nearbyTowns: string[]     // Okolní města pro internal linking
}

export const mesta: Mesto[] = [
  // ============================================
  // KRAJSKÁ MĚSTA (14)
  // ============================================
  {
    slug: 'praha',
    name: 'Praha',
    nameLocative: 'v Praze',
    nameGenitive: 'z Prahy',
    region: 'Hlavní město Praha',
    isRegionalCapital: true,
    population: 1309000,
    distanceFromPrague: 0,
    deliveryTime: 'Osobní převzetí možné ihned',
    localInfo: 'Naše centrála a laboratoř sídlí přímo v Praze-Karlíně. Můžete k nám přijet osobně, nebo využít bezplatný svoz z jakékoliv pražské adresy. Pro firemní klienty nabízíme expresní vyzvednutí do 2 hodin.',
    nearbyTowns: ['Kladno', 'Mladá Boleslav', 'Beroun', 'Kolín', 'Příbram', 'Benešov', 'Mělník', 'Rakovník']
  },
  {
    slug: 'brno',
    name: 'Brno',
    nameLocative: 'v Brně',
    nameGenitive: 'z Brna',
    region: 'Jihomoravský kraj',
    isRegionalCapital: true,
    population: 382000,
    distanceFromPrague: 200,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Brno je druhé největší město ČR a centrum Jihomoravského kraje. Spolupracujeme s řadou brněnských IT firem, VUT, Masarykovou univerzitou i technologickými startupy z JIC. Pro klienty z Brna zajišťujeme pravidelný svoz každý pracovní den.',
    nearbyTowns: ['Blansko', 'Vyškov', 'Znojmo', 'Břeclav', 'Hodonín', 'Kroměříž', 'Třebíč']
  },
  {
    slug: 'ostrava',
    name: 'Ostrava',
    nameLocative: 'v Ostravě',
    nameGenitive: 'z Ostravy',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: true,
    population: 290000,
    distanceFromPrague: 360,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Ostrava a celý Moravskoslezský kraj patří mezi regiony s nejvyšším počtem zakázek mimo Prahu. Spolupracujeme s průmyslovými podniky, VŠB-TU Ostrava i IT firmami v Dolní oblasti Vítkovice. Bezplatný svoz zajišťujeme pro celý region.',
    nearbyTowns: ['Havířov', 'Karviná', 'Frýdek-Místek', 'Opava', 'Třinec', 'Orlová', 'Nový Jičín']
  },
  {
    slug: 'plzen',
    name: 'Plzeň',
    nameLocative: 'v Plzni',
    nameGenitive: 'z Plzně',
    region: 'Plzeňský kraj',
    isRegionalCapital: true,
    population: 175000,
    distanceFromPrague: 90,
    deliveryTime: 'Svoz kurýrem do 24 hodin, expresně téhož dne',
    localInfo: 'Plzeň je díky blízkosti k Praze ideální pro expresní služby - disk může být v naší laboratoři již za několik hodin. Spolupracujeme se Západočeskou univerzitou, Škoda Transportation i technologickými firmami v BIC Plzeň.',
    nearbyTowns: ['Rokycany', 'Klatovy', 'Domažlice', 'Tachov', 'Stod', 'Přeštice']
  },
  {
    slug: 'liberec',
    name: 'Liberec',
    nameLocative: 'v Liberci',
    nameGenitive: 'z Liberce',
    region: 'Liberecký kraj',
    isRegionalCapital: true,
    population: 105000,
    distanceFromPrague: 110,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Liberec je centrem severních Čech s významným průmyslovým zázemím. Poskytujeme služby firmám v automobilovém průmyslu, sklářství i Technické univerzitě v Liberci. Svoz zajišťujeme pro celý Liberecký kraj včetně Jablonce a České Lípy.',
    nearbyTowns: ['Jablonec nad Nisou', 'Česká Lípa', 'Semily', 'Turnov', 'Tanvald', 'Frýdlant']
  },
  {
    slug: 'olomouc',
    name: 'Olomouc',
    nameLocative: 'v Olomouci',
    nameGenitive: 'z Olomouce',
    region: 'Olomoucký kraj',
    isRegionalCapital: true,
    population: 101000,
    distanceFromPrague: 280,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Olomouc je univerzitní město s bohatou historií a silnou akademickou obcí. Spolupracujeme s Univerzitou Palackého, fakultní nemocnicí i vědeckými institucemi. Pro Olomoucký kraj zajišťujeme komplexní pokrytí včetně Prostějova a Přerova.',
    nearbyTowns: ['Prostějov', 'Přerov', 'Šumperk', 'Jeseník', 'Hranice', 'Litovel']
  },
  {
    slug: 'ceske-budejovice',
    name: 'České Budějovice',
    nameLocative: 'v Českých Budějovicích',
    nameGenitive: 'z Českých Budějovic',
    region: 'Jihočeský kraj',
    isRegionalCapital: true,
    population: 95000,
    distanceFromPrague: 150,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'České Budějovice jsou hospodářským centrem jižních Čech. Spolupracujeme s Jihočeskou univerzitou, Budějovickým Budvarem i strojírenskými firmami v regionu. Zajišťujeme svoz pro celý Jihočeský kraj včetně Tábora a Písku.',
    nearbyTowns: ['Tábor', 'Písek', 'Strakonice', 'Jindřichův Hradec', 'Český Krumlov', 'Prachatice']
  },
  {
    slug: 'hradec-kralove',
    name: 'Hradec Králové',
    nameLocative: 'v Hradci Králové',
    nameGenitive: 'z Hradce Králové',
    region: 'Královéhradecký kraj',
    isRegionalCapital: true,
    population: 93000,
    distanceFromPrague: 115,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Hradec Králové je moderní město s významným IT sektorem a farmaceutickým průmyslem. Spolupracujeme s Univerzitou Hradec Králové, fakultní nemocnicí i technologickými firmami. Expresní svoz možný díky dobré dostupnosti po D11.',
    nearbyTowns: ['Pardubice', 'Náchod', 'Trutnov', 'Jičín', 'Rychnov nad Kněžnou', 'Dvůr Králové']
  },
  {
    slug: 'usti-nad-labem',
    name: 'Ústí nad Labem',
    nameLocative: 'v Ústí nad Labem',
    nameGenitive: 'z Ústí nad Labem',
    region: 'Ústecký kraj',
    isRegionalCapital: true,
    population: 92000,
    distanceFromPrague: 90,
    deliveryTime: 'Svoz kurýrem do 24 hodin, expresně téhož dne',
    localInfo: 'Ústí nad Labem je průmyslovým centrem severozápadních Čech. Díky blízkosti Prahy nabízíme expresní vyzvednutí. Spolupracujeme s UJEP, chemickým průmyslem i logistickými firmami v regionu.',
    nearbyTowns: ['Most', 'Teplice', 'Děčín', 'Chomutov', 'Litoměřice', 'Louny']
  },
  {
    slug: 'pardubice',
    name: 'Pardubice',
    nameLocative: 'v Pardubicích',
    nameGenitive: 'z Pardubic',
    region: 'Pardubický kraj',
    isRegionalCapital: true,
    population: 91000,
    distanceFromPrague: 120,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Pardubice jsou centrem elektrotechnického a chemického průmyslu. Spolupracujeme s Univerzitou Pardubice, Foxconnem i tradičními průmyslovými podniky. Výborná dostupnost po D11 umožňuje rychlý svoz.',
    nearbyTowns: ['Hradec Králové', 'Chrudim', 'Svitavy', 'Ústí nad Orlicí', 'Přelouč', 'Holice']
  },
  {
    slug: 'zlin',
    name: 'Zlín',
    nameLocative: 've Zlíně',
    nameGenitive: 'ze Zlína',
    region: 'Zlínský kraj',
    isRegionalCapital: true,
    population: 75000,
    distanceFromPrague: 300,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Zlín je sídlem mnoha technologických firem s tradicí Baťova podnikání. Spolupracujeme s Univerzitou Tomáše Bati, filmovými studii i gumárenským průmyslem. Zajišťujeme svoz pro celý Zlínský kraj.',
    nearbyTowns: ['Uherské Hradiště', 'Kroměříž', 'Vsetín', 'Valašské Meziříčí', 'Otrokovice', 'Luhačovice']
  },
  {
    slug: 'jihlava',
    name: 'Jihlava',
    nameLocative: 'v Jihlavě',
    nameGenitive: 'z Jihlavy',
    region: 'Kraj Vysočina',
    isRegionalCapital: true,
    population: 51000,
    distanceFromPrague: 130,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Jihlava je centrem Vysočiny s rozvinutým strojírenstvím a automobilovým průmyslem. Spolupracujeme s firmami Bosch, Automotive Lighting i lokálními výrobci. Strategická poloha mezi Prahou a Brnem zajišťuje rychlý svoz.',
    nearbyTowns: ['Havlíčkův Brod', 'Třebíč', 'Žďár nad Sázavou', 'Pelhřimov', 'Velké Meziříčí', 'Humpolec']
  },
  {
    slug: 'karlovy-vary',
    name: 'Karlovy Vary',
    nameLocative: 'v Karlových Varech',
    nameGenitive: 'z Karlových Varů',
    region: 'Karlovarský kraj',
    isRegionalCapital: true,
    population: 49000,
    distanceFromPrague: 130,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Karlovy Vary jsou lázeňským a turistickým centrem s mezinárodní klientelou. Poskytujeme služby hotelům, lázeňským domům i mezinárodním firmám v regionu. Svoz zajišťujeme pro celý Karlovarský kraj.',
    nearbyTowns: ['Sokolov', 'Cheb', 'Ostrov', 'Chodov', 'Mariánské Lázně', 'Františkovy Lázně']
  },
  {
    slug: 'kladno',
    name: 'Kladno',
    nameLocative: 'v Kladně',
    nameGenitive: 'z Kladna',
    region: 'Středočeský kraj',
    isRegionalCapital: true,
    population: 69000,
    distanceFromPrague: 25,
    deliveryTime: 'Expresní svoz do 2-3 hodin',
    localInfo: 'Kladno je největší město Středočeského kraje s výbornou dostupností do Prahy. Díky blízkosti naší laboratoře nabízíme expresní vyzvednutí během několika hodin. Spolupracujeme s průmyslovými firmami i ČVUT v Kladně.',
    nearbyTowns: ['Praha', 'Rakovník', 'Slaný', 'Beroun', 'Unhošť', 'Stochov']
  },

  // ============================================
  // OSTATNÍ OKRESNÍ MĚSTA - STŘEDOČESKÝ KRAJ
  // ============================================
  {
    slug: 'mlada-boleslav',
    name: 'Mladá Boleslav',
    nameLocative: 'v Mladé Boleslavi',
    nameGenitive: 'z Mladé Boleslavi',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 44000,
    distanceFromPrague: 60,
    deliveryTime: 'Svoz kurýrem do 24 hodin, expresně téhož dne',
    localInfo: 'Mladá Boleslav je domovem automobilky Škoda Auto a stovek dodavatelských firem. Máme bohaté zkušenosti se záchranou dat z průmyslových systémů i firemních serverů. Expresní svoz možný díky blízkosti Prahy.',
    nearbyTowns: ['Praha', 'Liberec', 'Jičín', 'Nymburk', 'Mnichovo Hradiště', 'Benátky nad Jizerou']
  },
  {
    slug: 'kolin',
    name: 'Kolín',
    nameLocative: 'v Kolíně',
    nameGenitive: 'z Kolína',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 32000,
    distanceFromPrague: 60,
    deliveryTime: 'Svoz kurýrem do 24 hodin, expresně téhož dne',
    localInfo: 'Kolín je průmyslové město s automobilkou TPCA a chemickým průmyslem. Poskytujeme služby výrobním podnikům i menším firmám v regionu. Dobrá dostupnost po D11 zajišťuje rychlý svoz.',
    nearbyTowns: ['Praha', 'Kutná Hora', 'Pardubice', 'Nymburk', 'Poděbrady', 'Český Brod']
  },
  {
    slug: 'pribram',
    name: 'Příbram',
    nameLocative: 'v Příbrami',
    nameGenitive: 'z Příbrami',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 33000,
    distanceFromPrague: 60,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Příbram je bývalé hornické město s rozvinutým strojírenstvím. Spolupracujeme s firmami v regionu i Vysokou školou báňskou. Zajišťujeme svoz pro celé Příbramsko včetně Dobříše a Sedlčan.',
    nearbyTowns: ['Praha', 'Beroun', 'Písek', 'Benešov', 'Dobříš', 'Sedlčany']
  },
  {
    slug: 'benesov',
    name: 'Benešov',
    nameLocative: 'v Benešově',
    nameGenitive: 'z Benešova',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 17000,
    distanceFromPrague: 45,
    deliveryTime: 'Svoz kurýrem do 24 hodin, expresně téhož dne',
    localInfo: 'Benešov leží na trase Praha-Tábor s výborným spojením. Poskytujeme služby firmám v regionu Posázaví. Expresní svoz možný díky krátké vzdálenosti od Prahy.',
    nearbyTowns: ['Praha', 'Tábor', 'Příbram', 'Kutná Hora', 'Vlašim', 'Votice']
  },
  {
    slug: 'rakovnik',
    name: 'Rakovník',
    nameLocative: 'v Rakovníku',
    nameGenitive: 'z Rakovníka',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 16000,
    distanceFromPrague: 55,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Rakovník je okresní město s tradicí pivovarnictví a strojírenství. Zajišťujeme svoz pro celý region včetně Loun a Kladenska.',
    nearbyTowns: ['Kladno', 'Praha', 'Louny', 'Beroun', 'Slaný', 'Křivoklát']
  },
  {
    slug: 'kutna-hora',
    name: 'Kutná Hora',
    nameLocative: 'v Kutné Hoře',
    nameGenitive: 'z Kutné Hory',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 21000,
    distanceFromPrague: 80,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Kutná Hora je historické město zapsané na seznamu UNESCO. Poskytujeme služby místním firmám, institucím i turistickému ruchu. Svoz zajišťujeme pro celý region.',
    nearbyTowns: ['Kolín', 'Čáslav', 'Pardubice', 'Benešov', 'Havlíčkův Brod']
  },
  {
    slug: 'beroun',
    name: 'Beroun',
    nameLocative: 'v Berouně',
    nameGenitive: 'z Berouna',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 20000,
    distanceFromPrague: 30,
    deliveryTime: 'Expresní svoz do 2-3 hodin',
    localInfo: 'Beroun leží na dálnici D5 s vynikající dostupností do Prahy. Expresní vyzvednutí možné během několika hodin. Zajišťujeme svoz pro Berounsko, Hořovicko i část Příbramska.',
    nearbyTowns: ['Praha', 'Kladno', 'Příbram', 'Plzeň', 'Rakovník', 'Hořovice']
  },
  {
    slug: 'melnik',
    name: 'Mělník',
    nameLocative: 'v Mělníku',
    nameGenitive: 'z Mělníka',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 19000,
    distanceFromPrague: 35,
    deliveryTime: 'Svoz kurýrem do 24 hodin, expresně téhož dne',
    localInfo: 'Mělník je vinařské město na soutoku Labe a Vltavy. Poskytujeme služby firmám v regionu i logistickým centrům. Výborná dostupnost díky blízkosti Prahy.',
    nearbyTowns: ['Praha', 'Mladá Boleslav', 'Kladno', 'Neratovice', 'Kralupy nad Vltavou']
  },
  {
    slug: 'nymburk',
    name: 'Nymburk',
    nameLocative: 'v Nymburku',
    nameGenitive: 'z Nymburka',
    region: 'Středočeský kraj',
    isRegionalCapital: false,
    population: 15000,
    distanceFromPrague: 50,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Nymburk je okresní město s potravinářským průmyslem a logistikou. Zajišťujeme svoz pro Nymbursko včetně Poděbrad a Lysé nad Labem.',
    nearbyTowns: ['Praha', 'Kolín', 'Mladá Boleslav', 'Poděbrady', 'Lysá nad Labem']
  },

  // ============================================
  // ÚSTECKÝ KRAJ
  // ============================================
  {
    slug: 'most',
    name: 'Most',
    nameLocative: 'v Mostě',
    nameGenitive: 'z Mostu',
    region: 'Ústecký kraj',
    isRegionalCapital: false,
    population: 66000,
    distanceFromPrague: 85,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Most je průmyslové město s těžebním a chemickým průmyslem. Spolupracujeme s energetickými společnostmi i průmyslovými podniky. Zajišťujeme svoz pro Mostecko a Litvínovsko.',
    nearbyTowns: ['Ústí nad Labem', 'Teplice', 'Chomutov', 'Litvínov', 'Louny', 'Žatec']
  },
  {
    slug: 'teplice',
    name: 'Teplice',
    nameLocative: 'v Teplicích',
    nameGenitive: 'z Teplic',
    region: 'Ústecký kraj',
    isRegionalCapital: false,
    population: 50000,
    distanceFromPrague: 90,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Teplice jsou lázeňské město se sklářským a strojírenským průmyslem. Poskytujeme služby lázeňským zařízením, průmyslu i firmám v regionu. Blízkost dálnice D8 zajišťuje rychlý svoz.',
    nearbyTowns: ['Ústí nad Labem', 'Most', 'Litoměřice', 'Děčín', 'Bílina', 'Duchcov']
  },
  {
    slug: 'decin',
    name: 'Děčín',
    nameLocative: 'v Děčíně',
    nameGenitive: 'z Děčína',
    region: 'Ústecký kraj',
    isRegionalCapital: false,
    population: 49000,
    distanceFromPrague: 100,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Děčín je hraniční město s významnou lodní dopravou a strojírenstvím. Poskytujeme služby logistickým firmám i průmyslu. Zajišťujeme svoz pro Děčínsko včetně Rumburka a Varnsdorfu.',
    nearbyTowns: ['Ústí nad Labem', 'Liberec', 'Teplice', 'Česká Lípa', 'Rumburk', 'Varnsdorf']
  },
  {
    slug: 'chomutov',
    name: 'Chomutov',
    nameLocative: 'v Chomutově',
    nameGenitive: 'z Chomutova',
    region: 'Ústecký kraj',
    isRegionalCapital: false,
    population: 48000,
    distanceFromPrague: 95,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Chomutov je průmyslové město s hutnictvím a strojírenstvím. Spolupracujeme s průmyslovými podniky a logistickými firmami. Zajišťujeme svoz pro celý západní Ústecký kraj.',
    nearbyTowns: ['Most', 'Ústí nad Labem', 'Karlovy Vary', 'Louny', 'Kadaň', 'Jirkov']
  },
  {
    slug: 'litomerice',
    name: 'Litoměřice',
    nameLocative: 'v Litoměřicích',
    nameGenitive: 'z Litoměřic',
    region: 'Ústecký kraj',
    isRegionalCapital: false,
    population: 24000,
    distanceFromPrague: 65,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Litoměřice jsou historické město v srdci vinařské oblasti. Poskytujeme služby místním firmám, školám i institucím. Dobrá dostupnost po D8 zajišťuje rychlý svoz.',
    nearbyTowns: ['Ústí nad Labem', 'Teplice', 'Děčín', 'Mělník', 'Roudnice nad Labem', 'Lovosice']
  },
  {
    slug: 'louny',
    name: 'Louny',
    nameLocative: 'v Lounech',
    nameGenitive: 'z Loun',
    region: 'Ústecký kraj',
    isRegionalCapital: false,
    population: 18000,
    distanceFromPrague: 65,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Louny jsou okresní město s potravinářským průmyslem a zemědělstvím. Zajišťujeme svoz pro Lounsko, Žatecko i část Rakovnicka.',
    nearbyTowns: ['Most', 'Chomutov', 'Kladno', 'Rakovník', 'Žatec', 'Slaný']
  },
  {
    slug: 'litvinov',
    name: 'Litvínov',
    nameLocative: 'v Litvínově',
    nameGenitive: 'z Litvínova',
    region: 'Ústecký kraj',
    isRegionalCapital: false,
    population: 24000,
    distanceFromPrague: 90,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Litvínov je průmyslové město s chemickým průmyslem (Unipetrol). Spolupracujeme s petrochemickými podniky i dalšími firmami v regionu.',
    nearbyTowns: ['Most', 'Teplice', 'Chomutov', 'Ústí nad Labem', 'Duchcov']
  },

  // ============================================
  // LIBERECKÝ KRAJ
  // ============================================
  {
    slug: 'jablonec-nad-nisou',
    name: 'Jablonec nad Nisou',
    nameLocative: 'v Jablonci nad Nisou',
    nameGenitive: 'z Jablonce nad Nisou',
    region: 'Liberecký kraj',
    isRegionalCapital: false,
    population: 45000,
    distanceFromPrague: 100,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Jablonec nad Nisou je světové centrum bižuterie a sklářství. Spolupracujeme s výrobci skla, bižuterie i strojírenskými firmami. Zajišťujeme svoz společně s Libercem.',
    nearbyTowns: ['Liberec', 'Tanvald', 'Turnov', 'Semily', 'Železný Brod', 'Smržovka']
  },
  {
    slug: 'ceska-lipa',
    name: 'Česká Lípa',
    nameLocative: 'v České Lípě',
    nameGenitive: 'z České Lípy',
    region: 'Liberecký kraj',
    isRegionalCapital: false,
    population: 37000,
    distanceFromPrague: 90,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Česká Lípa je průmyslové město s automobilovým a sklářským průmyslem. Poskytujeme služby firmám Johnson Controls, AGC i dalším. Zajišťujeme svoz pro celé Českolipsko.',
    nearbyTowns: ['Liberec', 'Děčín', 'Mladá Boleslav', 'Nový Bor', 'Doksy', 'Mimoň']
  },
  {
    slug: 'semily',
    name: 'Semily',
    nameLocative: 'v Semilech',
    nameGenitive: 'ze Semil',
    region: 'Liberecký kraj',
    isRegionalCapital: false,
    population: 8500,
    distanceFromPrague: 100,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Semily jsou okresní město v podhůří Krkonoš s textilní tradicí. Zajišťujeme svoz pro Semilsko, Turnovsko i část Jilemnicka.',
    nearbyTowns: ['Liberec', 'Jablonec nad Nisou', 'Turnov', 'Jilemnice', 'Železný Brod']
  },

  // ============================================
  // KRÁLOVÉHRADECKÝ KRAJ
  // ============================================
  {
    slug: 'trutnov',
    name: 'Trutnov',
    nameLocative: 'v Trutnově',
    nameGenitive: 'z Trutnova',
    region: 'Královéhradecký kraj',
    isRegionalCapital: false,
    population: 31000,
    distanceFromPrague: 150,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Trutnov je brána do Krkonoš s rozvinutým turistickým ruchem a průmyslem. Spolupracujeme s hotely, průmyslovými firmami i městskou správou. Zajišťujeme svoz pro celé Trutnovsko.',
    nearbyTowns: ['Hradec Králové', 'Náchod', 'Dvůr Králové', 'Vrchlabí', 'Úpice', 'Svoboda nad Úpou']
  },
  {
    slug: 'nachod',
    name: 'Náchod',
    nameLocative: 'v Náchodě',
    nameGenitive: 'z Náchoda',
    region: 'Královéhradecký kraj',
    isRegionalCapital: false,
    population: 20000,
    distanceFromPrague: 150,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Náchod je hraniční město s textilní a strojírenskou tradicí. Poskytujeme služby firmám v regionu i turistickému ruchu. Zajišťujeme svoz pro celé Náchodsko.',
    nearbyTowns: ['Hradec Králové', 'Trutnov', 'Rychnov nad Kněžnou', 'Broumov', 'Jaroměř', 'Česká Skalice']
  },
  {
    slug: 'jicin',
    name: 'Jičín',
    nameLocative: 'v Jičíně',
    nameGenitive: 'z Jičína',
    region: 'Královéhradecký kraj',
    isRegionalCapital: false,
    population: 16000,
    distanceFromPrague: 90,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Jičín je historické město a brána do Českého ráje. Spolupracujeme s firmami v regionu, školami i turistickým ruchem. Dobrá dostupnost po R35.',
    nearbyTowns: ['Hradec Králové', 'Mladá Boleslav', 'Liberec', 'Turnov', 'Hořice', 'Nová Paka']
  },
  {
    slug: 'rychnov-nad-kneznou',
    name: 'Rychnov nad Kněžnou',
    nameLocative: 'v Rychnově nad Kněžnou',
    nameGenitive: 'z Rychnova nad Kněžnou',
    region: 'Královéhradecký kraj',
    isRegionalCapital: false,
    population: 11000,
    distanceFromPrague: 130,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Rychnov nad Kněžnou je okresní město s textilním a strojírenským průmyslem. Zajišťujeme svoz pro Rychnovsko včetně Dobrušky a Kostelce nad Orlicí.',
    nearbyTowns: ['Hradec Králové', 'Náchod', 'Ústí nad Orlicí', 'Pardubice', 'Dobruška', 'Kostelec nad Orlicí']
  },

  // ============================================
  // PARDUBICKÝ KRAJ
  // ============================================
  {
    slug: 'chrudim',
    name: 'Chrudim',
    nameLocative: 'v Chrudimi',
    nameGenitive: 'z Chrudimi',
    region: 'Pardubický kraj',
    isRegionalCapital: false,
    population: 23000,
    distanceFromPrague: 115,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Chrudim je historické město s loutkářskou tradicí a strojírenstvím. Spolupracujeme s místními firmami i kulturními institucemi. Výborné spojení s Pardubicemi.',
    nearbyTowns: ['Pardubice', 'Hradec Králové', 'Havlíčkův Brod', 'Svitavy', 'Hlinsko', 'Přelouč']
  },
  {
    slug: 'svitavy',
    name: 'Svitavy',
    nameLocative: 've Svitavách',
    nameGenitive: 'ze Svitav',
    region: 'Pardubický kraj',
    isRegionalCapital: false,
    population: 17000,
    distanceFromPrague: 160,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Svitavy jsou okresní město s textilním a strojírenským průmyslem. Zajišťujeme svoz pro celé Svitavsko včetně Litomyšle a Poličky.',
    nearbyTowns: ['Pardubice', 'Olomouc', 'Brno', 'Litomyšl', 'Polička', 'Moravská Třebová']
  },
  {
    slug: 'usti-nad-orlici',
    name: 'Ústí nad Orlicí',
    nameLocative: 'v Ústí nad Orlicí',
    nameGenitive: 'z Ústí nad Orlicí',
    region: 'Pardubický kraj',
    isRegionalCapital: false,
    population: 14000,
    distanceFromPrague: 150,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Ústí nad Orlicí je město s textilní tradicí a strojírenstvím. Spolupracujeme s firmou Rieter i dalšími podniky. Zajišťujeme svoz pro Orlickoústecko.',
    nearbyTowns: ['Pardubice', 'Hradec Králové', 'Šumperk', 'Rychnov nad Kněžnou', 'Česká Třebová', 'Lanškroun']
  },

  // ============================================
  // JIHOČESKÝ KRAJ
  // ============================================
  {
    slug: 'tabor',
    name: 'Tábor',
    nameLocative: 'v Táboře',
    nameGenitive: 'z Tábora',
    region: 'Jihočeský kraj',
    isRegionalCapital: false,
    population: 34000,
    distanceFromPrague: 100,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Tábor je historické husitské město s moderním průmyslem. Spolupracujeme s firmami Brisk, SILON i dalšími. Dobrá dostupnost po D3 zajišťuje rychlý svoz.',
    nearbyTowns: ['České Budějovice', 'Praha', 'Písek', 'Pelhřimov', 'Benešov', 'Soběslav']
  },
  {
    slug: 'pisek',
    name: 'Písek',
    nameLocative: 'v Písku',
    nameGenitive: 'z Písku',
    region: 'Jihočeský kraj',
    isRegionalCapital: false,
    population: 30000,
    distanceFromPrague: 100,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Písek je jedno z nejstarších měst v Čechách s rozvinutým elektrotechnickým průmyslem. Spolupracujeme s firmami Schneider Electric i dalšími. Zajišťujeme svoz pro celé Písecko.',
    nearbyTowns: ['České Budějovice', 'Tábor', 'Strakonice', 'Příbram', 'Prachatice', 'Protivín']
  },
  {
    slug: 'strakonice',
    name: 'Strakonice',
    nameLocative: 've Strakonicích',
    nameGenitive: 'ze Strakonic',
    region: 'Jihočeský kraj',
    isRegionalCapital: false,
    population: 23000,
    distanceFromPrague: 110,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Strakonice jsou známé výrobou motocyklů a dudáckými tradicemi. Spolupracujeme s firmami ČZ a dalšími průmyslovými podniky. Zajišťujeme svoz pro Strakonicko.',
    nearbyTowns: ['České Budějovice', 'Písek', 'Plzeň', 'Prachatice', 'Blatná', 'Volyně']
  },
  {
    slug: 'jindrichuv-hradec',
    name: 'Jindřichův Hradec',
    nameLocative: 'v Jindřichově Hradci',
    nameGenitive: 'z Jindřichova Hradce',
    region: 'Jihočeský kraj',
    isRegionalCapital: false,
    population: 22000,
    distanceFromPrague: 130,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Jindřichův Hradec je historické město s potravinářským průmyslem. Spolupracujeme s místními firmami i turistickým ruchem. Zajišťujeme svoz pro celou Českou Kanadu.',
    nearbyTowns: ['České Budějovice', 'Tábor', 'Jihlava', 'Třeboň', 'Dačice', 'Telč']
  },
  {
    slug: 'cesky-krumlov',
    name: 'Český Krumlov',
    nameLocative: 'v Českém Krumlově',
    nameGenitive: 'z Českého Krumlova',
    region: 'Jihočeský kraj',
    isRegionalCapital: false,
    population: 13000,
    distanceFromPrague: 180,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Český Krumlov je perla UNESCO s intenzivním turistickým ruchem. Poskytujeme služby hotelům, restauracím i kulturním institucím. Zajišťujeme svoz pro Českokrumlovsko.',
    nearbyTowns: ['České Budějovice', 'Prachatice', 'Třeboň', 'Kaplice', 'Větřní']
  },
  {
    slug: 'prachatice',
    name: 'Prachatice',
    nameLocative: 'v Prachaticích',
    nameGenitive: 'z Prachatic',
    region: 'Jihočeský kraj',
    isRegionalCapital: false,
    population: 11000,
    distanceFromPrague: 150,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Prachatice jsou historické město v podhůří Šumavy. Zajišťujeme svoz pro Prachaticko včetně Vimperka a šumavského regionu.',
    nearbyTowns: ['České Budějovice', 'Český Krumlov', 'Strakonice', 'Písek', 'Vimperk', 'Volary']
  },

  // ============================================
  // PLZEŇSKÝ KRAJ
  // ============================================
  {
    slug: 'klatovy',
    name: 'Klatovy',
    nameLocative: 'v Klatovech',
    nameGenitive: 'z Klatov',
    region: 'Plzeňský kraj',
    isRegionalCapital: false,
    population: 22000,
    distanceFromPrague: 130,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Klatovy jsou brána na Šumavu s rozvinutým strojírenstvím. Spolupracujeme s průmyslovými firmami i turistickým ruchem. Zajišťujeme svoz pro Klatovsko.',
    nearbyTowns: ['Plzeň', 'Domažlice', 'Strakonice', 'Sušice', 'Horažďovice', 'Železná Ruda']
  },
  {
    slug: 'domazlice',
    name: 'Domažlice',
    nameLocative: 'v Domažlicích',
    nameGenitive: 'z Domažlic',
    region: 'Plzeňský kraj',
    isRegionalCapital: false,
    population: 11000,
    distanceFromPrague: 130,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Domažlice jsou chodské město s bohatou tradicí a turistickým ruchem. Zajišťujeme svoz pro celé Domažlicko až k hranicím.',
    nearbyTowns: ['Plzeň', 'Klatovy', 'Tachov', 'Kdyně', 'Horšovský Týn']
  },
  {
    slug: 'tachov',
    name: 'Tachov',
    nameLocative: 'v Tachově',
    nameGenitive: 'z Tachova',
    region: 'Plzeňský kraj',
    isRegionalCapital: false,
    population: 13000,
    distanceFromPrague: 120,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Tachov je okresní město s průmyslem a hraničním obchodem. Zajišťujeme svoz pro Tachovsko včetně Boru a Stříbra.',
    nearbyTowns: ['Plzeň', 'Karlovy Vary', 'Domažlice', 'Stříbro', 'Bor', 'Planá']
  },
  {
    slug: 'rokycany',
    name: 'Rokycany',
    nameLocative: 'v Rokycanech',
    nameGenitive: 'z Rokycan',
    region: 'Plzeňský kraj',
    isRegionalCapital: false,
    population: 14000,
    distanceFromPrague: 65,
    deliveryTime: 'Svoz kurýrem do 24 hodin, expresně téhož dne',
    localInfo: 'Rokycany leží na trase Praha-Plzeň s výbornou dostupností. Spolupracujeme se strojírenskými firmami v regionu. Expresní svoz možný díky blízkosti D5.',
    nearbyTowns: ['Plzeň', 'Praha', 'Beroun', 'Příbram', 'Radnice', 'Zbiroh']
  },

  // ============================================
  // KARLOVARSKÝ KRAJ
  // ============================================
  {
    slug: 'sokolov',
    name: 'Sokolov',
    nameLocative: 'v Sokolově',
    nameGenitive: 'ze Sokolova',
    region: 'Karlovarský kraj',
    isRegionalCapital: false,
    population: 23000,
    distanceFromPrague: 140,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Sokolov je průmyslové město s těžebním a chemickým průmyslem. Spolupracujeme s firmami Sokolovská uhelná, Hexion i dalšími. Zajišťujeme svoz pro celé Sokolovsko.',
    nearbyTowns: ['Karlovy Vary', 'Cheb', 'Kraslice', 'Chodov', 'Loket', 'Habartov']
  },
  {
    slug: 'cheb',
    name: 'Cheb',
    nameLocative: 'v Chebu',
    nameGenitive: 'z Chebu',
    region: 'Karlovarský kraj',
    isRegionalCapital: false,
    population: 32000,
    distanceFromPrague: 170,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Cheb je hraniční město s významným obchodem a turistikou. Spolupracujeme s firmami, hotely i obchodními centry. Zajišťujeme svoz pro Chebsko a Ašsko.',
    nearbyTowns: ['Karlovy Vary', 'Sokolov', 'Františkovy Lázně', 'Aš', 'Mariánské Lázně', 'Skalná']
  },

  // ============================================
  // JIHOMORAVSKÝ KRAJ
  // ============================================
  {
    slug: 'blansko',
    name: 'Blansko',
    nameLocative: 'v Blansku',
    nameGenitive: 'z Blanska',
    region: 'Jihomoravský kraj',
    isRegionalCapital: false,
    population: 21000,
    distanceFromPrague: 220,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Blansko je průmyslové město se strojírenstvím a blízkostí Moravského krasu. Spolupracujeme s firmami Metra Blansko, ČKD i dalšími. Výborné spojení s Brnem.',
    nearbyTowns: ['Brno', 'Vyškov', 'Boskovice', 'Kuřim', 'Tišnov', 'Adamov']
  },
  {
    slug: 'vyskov',
    name: 'Vyškov',
    nameLocative: 've Vyškově',
    nameGenitive: 'z Vyškova',
    region: 'Jihomoravský kraj',
    isRegionalCapital: false,
    population: 21000,
    distanceFromPrague: 230,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Vyškov je posádkové město s vojenskou akademií a průmyslem. Spolupracujeme s vojenskými institucemi i civilními firmami. Strategická poloha na D1.',
    nearbyTowns: ['Brno', 'Prostějov', 'Blansko', 'Kroměříž', 'Slavkov u Brna', 'Bučovice']
  },
  {
    slug: 'znojmo',
    name: 'Znojmo',
    nameLocative: 've Znojmě',
    nameGenitive: 'ze Znojma',
    region: 'Jihomoravský kraj',
    isRegionalCapital: false,
    population: 34000,
    distanceFromPrague: 210,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Znojmo je historické vinařské město s potravinářským průmyslem. Spolupracujeme s vinařstvími, firmami i turistickým ruchem. Zajišťujeme svoz pro celé Znojemsko.',
    nearbyTowns: ['Brno', 'Třebíč', 'Jihlava', 'Moravský Krumlov', 'Miroslav', 'Hrušovany nad Jevišovkou']
  },
  {
    slug: 'breclav',
    name: 'Břeclav',
    nameLocative: 'v Břeclavi',
    nameGenitive: 'z Břeclavi',
    region: 'Jihomoravský kraj',
    isRegionalCapital: false,
    population: 25000,
    distanceFromPrague: 250,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Břeclav je hraniční město s významným železničním uzlem a vinařstvím. Spolupracujeme s firmami, vinařstvími i logistickými centry. Zajišťujeme svoz pro Břeclavsko.',
    nearbyTowns: ['Brno', 'Hodonín', 'Znojmo', 'Mikulov', 'Hustopeče', 'Valtice']
  },
  {
    slug: 'hodonin',
    name: 'Hodonín',
    nameLocative: 'v Hodoníně',
    nameGenitive: 'z Hodonína',
    region: 'Jihomoravský kraj',
    isRegionalCapital: false,
    population: 25000,
    distanceFromPrague: 270,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Hodonín je rodné město T. G. Masaryka s těžebním a potravinářským průmyslem. Spolupracujeme s firmami, lázněmi i vinařstvími. Zajišťujeme svoz pro Hodonínsko.',
    nearbyTowns: ['Brno', 'Břeclav', 'Uherské Hradiště', 'Veselí nad Moravou', 'Kyjov', 'Strážnice']
  },

  // ============================================
  // OLOMOUCKÝ KRAJ
  // ============================================
  {
    slug: 'prostejov',
    name: 'Prostějov',
    nameLocative: 'v Prostějově',
    nameGenitive: 'z Prostějova',
    region: 'Olomoucký kraj',
    isRegionalCapital: false,
    population: 44000,
    distanceFromPrague: 250,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Prostějov je centrum oděvního průmyslu (OP Prostějov) a hanáckého regionu. Spolupracujeme s textilními firmami i strojírenstvím. Výborné spojení s Olomoucí.',
    nearbyTowns: ['Olomouc', 'Brno', 'Přerov', 'Vyškov', 'Konice', 'Plumlov']
  },
  {
    slug: 'prerov',
    name: 'Přerov',
    nameLocative: 'v Přerově',
    nameGenitive: 'z Přerova',
    region: 'Olomoucký kraj',
    isRegionalCapital: false,
    population: 44000,
    distanceFromPrague: 270,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Přerov je významný železniční uzel se strojírenským průmyslem. Spolupracujeme s firmami Precheza, Meopta i dalšími. Zajišťujeme svoz pro celé Přerovsko.',
    nearbyTowns: ['Olomouc', 'Prostějov', 'Zlín', 'Kroměříž', 'Hranice', 'Kojetín']
  },
  {
    slug: 'sumperk',
    name: 'Šumperk',
    nameLocative: 'v Šumperku',
    nameGenitive: 'ze Šumperka',
    region: 'Olomoucký kraj',
    isRegionalCapital: false,
    population: 26000,
    distanceFromPrague: 220,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Šumperk je brána do Jeseníků s textilním a strojírenským průmyslem. Spolupracujeme s průmyslovými firmami i turistickým ruchem. Zajišťujeme svoz pro celé Šumpersko.',
    nearbyTowns: ['Olomouc', 'Jeseník', 'Zábřeh', 'Mohelnice', 'Rapotín', 'Velké Losiny']
  },
  {
    slug: 'jesenik',
    name: 'Jeseník',
    nameLocative: 'v Jeseníku',
    nameGenitive: 'z Jeseníku',
    region: 'Olomoucký kraj',
    isRegionalCapital: false,
    population: 11000,
    distanceFromPrague: 250,
    deliveryTime: 'Svoz kurýrem do 24-48 hodin',
    localInfo: 'Jeseník je lázeňské město v srdci Jeseníků s Priessnitzovými lázněmi. Poskytujeme služby lázeňským zařízením, hotelům i firmám v regionu.',
    nearbyTowns: ['Šumperk', 'Opava', 'Bruntál', 'Zlaté Hory', 'Javorník', 'Mikulovice']
  },

  // ============================================
  // MORAVSKOSLEZSKÝ KRAJ
  // ============================================
  {
    slug: 'havirov',
    name: 'Havířov',
    nameLocative: 'v Havířově',
    nameGenitive: 'z Havířova',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 71000,
    distanceFromPrague: 350,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Havířov je nejmladší město v ČR s těžebním průmyslem. Spolupracujeme s hornickými firmami i obyvateli. Zajišťujeme svoz společně s Ostravskem.',
    nearbyTowns: ['Ostrava', 'Karviná', 'Frýdek-Místek', 'Český Těšín', 'Orlová', 'Šenov']
  },
  {
    slug: 'karvina',
    name: 'Karviná',
    nameLocative: 'v Karviné',
    nameGenitive: 'z Karviné',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 52000,
    distanceFromPrague: 360,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Karviná je hornické město s lázeňskou tradicí. Spolupracujeme s těžebními firmami, lázněmi i místními podniky. Zajišťujeme svoz pro celé Karvinsko.',
    nearbyTowns: ['Ostrava', 'Havířov', 'Český Těšín', 'Orlová', 'Bohumín', 'Petřvald']
  },
  {
    slug: 'frydek-mistek',
    name: 'Frýdek-Místek',
    nameLocative: 've Frýdku-Místku',
    nameGenitive: 'z Frýdku-Místku',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 56000,
    distanceFromPrague: 340,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Frýdek-Místek je dvojměstí s hutnictvím a strojírenstvím. Spolupracujeme s firmami ArcelorMittal, Hyundai i dalšími. Zajišťujeme svoz pro Frýdecko-Místecko.',
    nearbyTowns: ['Ostrava', 'Havířov', 'Třinec', 'Český Těšín', 'Jablunkov', 'Frýdlant nad Ostravicí']
  },
  {
    slug: 'opava',
    name: 'Opava',
    nameLocative: 'v Opavě',
    nameGenitive: 'z Opavy',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 56000,
    distanceFromPrague: 360,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Opava je historické město se strojírenstvím a Slezskou univerzitou. Spolupracujeme s univerzitou, průmyslovými firmami i institucemi. Zajišťujeme svoz pro celé Opavsko.',
    nearbyTowns: ['Ostrava', 'Bruntál', 'Krnov', 'Hlučín', 'Hradec nad Moravicí', 'Kravaře']
  },
  {
    slug: 'trinec',
    name: 'Třinec',
    nameLocative: 'v Třinci',
    nameGenitive: 'z Třince',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 35000,
    distanceFromPrague: 370,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Třinec je hutní město s Třineckými železárnami a hokejovou tradicí. Spolupracujeme s hutním průmyslem i dalšími firmami. Zajišťujeme svoz pro Třinecko a Jablunkovsko.',
    nearbyTowns: ['Frýdek-Místek', 'Český Těšín', 'Ostrava', 'Jablunkov', 'Bystřice', 'Vendryně']
  },
  {
    slug: 'orlova',
    name: 'Orlová',
    nameLocative: 'v Orlové',
    nameGenitive: 'z Orlové',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 29000,
    distanceFromPrague: 350,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Orlová je hornické město v ostravské aglomeraci. Zajišťujeme svoz společně s celým Ostravskem a Karvinskem.',
    nearbyTowns: ['Ostrava', 'Havířov', 'Karviná', 'Bohumín', 'Petřvald', 'Rychvald']
  },
  {
    slug: 'novy-jicin',
    name: 'Nový Jičín',
    nameLocative: 'v Novém Jičíně',
    nameGenitive: 'z Nového Jičína',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 23000,
    distanceFromPrague: 330,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Nový Jičín je historické město s kloboučnickou tradicí. Spolupracujeme s firmou Tonak, automobilovým průmyslem i dalšími podniky.',
    nearbyTowns: ['Ostrava', 'Olomouc', 'Frýdek-Místek', 'Kopřivnice', 'Frenštát', 'Fulnek']
  },
  {
    slug: 'koprivnice',
    name: 'Kopřivnice',
    nameLocative: 'v Kopřivnici',
    nameGenitive: 'z Kopřivnice',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 22000,
    distanceFromPrague: 320,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Kopřivnice je domov automobilky Tatra s bohatou průmyslovou historií. Spolupracujeme s Tatrou, technickým muzeem i dalšími firmami.',
    nearbyTowns: ['Nový Jičín', 'Frýdek-Místek', 'Ostrava', 'Frenštát pod Radhoštěm', 'Příbor', 'Štramberk']
  },
  {
    slug: 'bruntal',
    name: 'Bruntál',
    nameLocative: 'v Bruntále',
    nameGenitive: 'z Bruntálu',
    region: 'Moravskoslezský kraj',
    isRegionalCapital: false,
    population: 16000,
    distanceFromPrague: 280,
    deliveryTime: 'Svoz kurýrem do 24-48 hodin',
    localInfo: 'Bruntál je okresní město v podhůří Jeseníků. Zajišťujeme svoz pro Bruntálsko, Krnovsko i část Jesenicka.',
    nearbyTowns: ['Opava', 'Šumperk', 'Jeseník', 'Krnov', 'Rýmařov', 'Vrbno pod Pradědem']
  },

  // ============================================
  // ZLÍNSKÝ KRAJ
  // ============================================
  {
    slug: 'uherske-hradiste',
    name: 'Uherské Hradiště',
    nameLocative: 'v Uherském Hradišti',
    nameGenitive: 'z Uherského Hradiště',
    region: 'Zlínský kraj',
    isRegionalCapital: false,
    population: 25000,
    distanceFromPrague: 290,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Uherské Hradiště je centrum Slovácka s leteckým a potravinářským průmyslem. Spolupracujeme s firmami Aircraft Industries, Hamé i dalšími. Zajišťujeme svoz pro celé Slovácko.',
    nearbyTowns: ['Zlín', 'Hodonín', 'Kroměříž', 'Uherský Brod', 'Staré Město', 'Kunovice']
  },
  {
    slug: 'kromeriz',
    name: 'Kroměříž',
    nameLocative: 'v Kroměříži',
    nameGenitive: 'z Kroměříže',
    region: 'Zlínský kraj',
    isRegionalCapital: false,
    population: 29000,
    distanceFromPrague: 270,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Kroměříž je historické město s arcibiskupským zámkem na seznamu UNESCO. Spolupracujeme s místními institucemi, firmami i turistickým ruchem.',
    nearbyTowns: ['Zlín', 'Olomouc', 'Přerov', 'Uherské Hradiště', 'Holešov', 'Hulín']
  },
  {
    slug: 'vsetin',
    name: 'Vsetín',
    nameLocative: 've Vsetíně',
    nameGenitive: 'z Vsetína',
    region: 'Zlínský kraj',
    isRegionalCapital: false,
    population: 26000,
    distanceFromPrague: 320,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Vsetín je brána do Beskyd s tradičním sklářským a strojírenským průmyslem. Spolupracujeme s firmou Austin Detonator i dalšími. Zajišťujeme svoz pro celé Valašsko.',
    nearbyTowns: ['Zlín', 'Valašské Meziříčí', 'Rožnov pod Radhoštěm', 'Karolinka', 'Horní Lideč', 'Hovězí']
  },
  {
    slug: 'valasske-mezirici',
    name: 'Valašské Meziříčí',
    nameLocative: 've Valašském Meziříčí',
    nameGenitive: 'z Valašského Meziříčí',
    region: 'Zlínský kraj',
    isRegionalCapital: false,
    population: 22000,
    distanceFromPrague: 300,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Valašské Meziříčí je město s chemickým a sklářským průmyslem. Spolupracujeme s firmou DEZA i dalšími podniky. Zajišťujeme svoz pro Valašskomeziříčsko.',
    nearbyTowns: ['Zlín', 'Vsetín', 'Nový Jičín', 'Rožnov pod Radhoštěm', 'Kelč', 'Zašová']
  },

  // ============================================
  // KRAJ VYSOČINA
  // ============================================
  {
    slug: 'havlickuv-brod',
    name: 'Havlíčkův Brod',
    nameLocative: 'v Havlíčkově Brodě',
    nameGenitive: 'z Havlíčkova Brodu',
    region: 'Kraj Vysočina',
    isRegionalCapital: false,
    population: 23000,
    distanceFromPrague: 115,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Havlíčkův Brod je významný železniční uzel na Vysočině. Spolupracujeme se strojírenskými firmami i školami. Strategická poloha na trase Praha-Brno.',
    nearbyTowns: ['Jihlava', 'Pardubice', 'Kutná Hora', 'Pelhřimov', 'Žďár nad Sázavou', 'Chotěboř']
  },
  {
    slug: 'trebic',
    name: 'Třebíč',
    nameLocative: 'v Třebíči',
    nameGenitive: 'z Třebíče',
    region: 'Kraj Vysočina',
    isRegionalCapital: false,
    population: 36000,
    distanceFromPrague: 160,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Třebíč je historické město s židovskou čtvrtí na seznamu UNESCO. Spolupracujeme s jadernou elektrárnou Dukovany, strojírenstvím i turistickým ruchem.',
    nearbyTowns: ['Jihlava', 'Brno', 'Znojmo', 'Velké Meziříčí', 'Moravské Budějovice', 'Náměšť nad Oslavou']
  },
  {
    slug: 'zdar-nad-sazavou',
    name: 'Žďár nad Sázavou',
    nameLocative: 've Žďáru nad Sázavou',
    nameGenitive: 'ze Žďáru nad Sázavou',
    region: 'Kraj Vysočina',
    isRegionalCapital: false,
    population: 21000,
    distanceFromPrague: 140,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Žďár nad Sázavou je centrum Žďárských vrchů se strojírenským průmyslem. Spolupracujeme s firmami ŽĎAS, Tokoz i dalšími. Zajišťujeme svoz pro celý region.',
    nearbyTowns: ['Jihlava', 'Havlíčkův Brod', 'Brno', 'Nové Město na Moravě', 'Bystřice nad Pernštejnem', 'Velká Bíteš']
  },
  {
    slug: 'pelhrimov',
    name: 'Pelhřimov',
    nameLocative: 'v Pelhřimově',
    nameGenitive: 'z Pelhřimova',
    region: 'Kraj Vysočina',
    isRegionalCapital: false,
    population: 16000,
    distanceFromPrague: 115,
    deliveryTime: 'Svoz kurýrem do 24 hodin',
    localInfo: 'Pelhřimov je město rekordů a kuriozit s textilním průmyslem. Spolupracujeme s místními firmami i Muzeem rekordů. Strategická poloha na D1.',
    nearbyTowns: ['Jihlava', 'Tábor', 'Havlíčkův Brod', 'Humpolec', 'Pacov', 'Kamenice nad Lipou']
  }
]

// ============================================
// HELPER FUNKCE
// ============================================

/**
 * Najde město podle slugu
 */
export function getMestoBySlug(slug: string): Mesto | undefined {
  return mesta.find(m => m.slug === slug)
}

/**
 * Vrátí všechna krajská města
 */
export function getKrajskaMesta(): Mesto[] {
  return mesta.filter(m => m.isRegionalCapital)
}

/**
 * Vrátí města podle regionu
 */
export function getMestaByRegion(region: string): Mesto[] {
  return mesta.filter(m => m.region === region)
}

/**
 * Vrátí města seřazená podle vzdálenosti od Prahy
 */
export function getMestaByDistance(): Mesto[] {
  return [...mesta].sort((a, b) => a.distanceFromPrague - b.distanceFromPrague)
}

/**
 * Vrátí města seřazená podle počtu obyvatel
 */
export function getMestaByPopulation(): Mesto[] {
  return [...mesta].sort((a, b) => b.population - a.population)
}

/**
 * Vrátí slugy všech měst (pro generateStaticParams)
 */
export function getAllMestaSlugs(): string[] {
  return mesta.map(m => m.slug)
}

/**
 * Počet měst
 */
export const POCET_MEST = mesta.length
