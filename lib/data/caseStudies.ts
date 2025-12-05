/**
 * Případové studie pro různé typy zařízení
 * Strukturovaná data pro HDD, SSD a RAID záchrana dat
 */

export interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  result: string;
  duration: string;
  recoveryRate: string;
  image: string;
}

export const caseStudiesCS = {
  title: 'Případové studie',
  description: 'Reálné příklady úspěšné záchrany dat z poškozených zařízení',
  problem: 'Problém:',
  solution: 'Řešení:',
  result: 'Výsledek:',
  duration: 'Doba řešení:',
  recoveryRate: 'Úspěšnost:',
  documentation: 'Kompletní dokumentace',
  contactUs: 'Máte podobný problém?',
  hdd: [
    {
      title: "Mechanické poškození plotny Western Digital",
      problem: "Disk po pádu vykazoval hlasité zvuky a nebyl detekován systémem. Klient potřeboval obnovit důležité firemní dokumenty a účetnictví.",
      solution: "V čistém prostředí jsme provedli výměnu poškozených hlav a rekonstrukci servisní zóny. Následně jsme použili specializovaný hardware pro obnovu dat.",
      result: "Úspěšně jsme obnovili 98% dat včetně všech kritických dokumentů. Cena 520 EUR",
      duration: "5 dní",
      recoveryRate: "98%",
      image: "https://images.unsplash.com/photo-1601737487795-dab272f52420"
    },
    {
      title: "Selhání elektroniky Seagate Barracuda",
      problem: "Disk se nerozběhl kvůli vadě elektroniky. Obsahoval kritická výrobní data průmyslového podniku.",
      solution: "Diagnostikovali jsme závadu na PCB a provedli vyčtení a rekonstrukci FW. Poté jsme pomocí PC-3000 obnovili přístup k datům.",
      result: "Kompletní obnova všech dat. Cena 380 EUR",
      duration: "3 dny",
      recoveryRate: "100%",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
    },
    {
      title: "Poškození firmware Toshiba",
      problem: "Disk byl poškozen po výpadku proudu, firmware byl částečně přepsán. Obsahoval rodinné fotografie za posledních 10 let.",
      solution: "Pomocí specializovaného vybavení jsme obnovili původní firmware a následně provedli rekonstrukci systémové oblasti.",
      result: "Zachránili jsme všechny fotografie a osobní dokumenty.",
      duration: "4 dny",
      recoveryRate: "99%",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
    }
  ] as CaseStudy[],
  ssd: [
    {
      title: "Poškozený řadič Samsung NVMe SSD",
      problem: "SSD disk přestal být detekován po aktualizaci firmware. Obsahoval kritická data vývojářského týmu včetně zdrojových kódů.",
      solution: "Provedli jsme bypass poškozeného řadiče a přímé čtení NAND čipů. Data byla následně rekonstruována pomocí specializovaného softwaru.",
      result: "Obnovení kompletní adresářové struktury a všech zdrojových kódů.",
      duration: "4 dny",
      recoveryRate: "100%",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
    },
    {
      title: "Selhání flash paměti USB disku",
      problem: "USB flash disk vykazoval pouze část své kapacity a soubory byly poškozené. Obsahoval důležité pracovní prezentace.",
      solution: "Pomocí PC-3000 Flash jsme analyzovali poškozené bloky a provedli rekonstrukci souborového systému.",
      result: "Záchrana všech prezentací a dokumentů v původní kvalitě.",
      duration: "2 dny",
      recoveryRate: "95%",
      image: "https://images.unsplash.com/photo-1601737487795-dab272f52420"
    },
    {
      title: "Zašifrovaný firemní SSD Kingston",
      problem: "SSD disk byl zašifrovaný a po hardwarovém selhání nebylo možné získat přístup k datům. Obsahoval účetní databázi.",
      solution: "Opravili jsme fyzické poškození a pomocí specializovaných nástrojů obnovili přístup k zašifrovaným datům.",
      result: "Úspěšná obnova celé účetní databáze včetně všech transakcí.",
      duration: "6 dní",
      recoveryRate: "99%",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
    }
  ] as CaseStudy[],
  raid: [
    {
      title: "Havárie RAID 5 serveru s účetními daty",
      problem: "Selhání dvou disků v RAID 5 poli současně. Server obsahoval kompletní účetnictví a ERP systém střední výrobní firmy.",
      solution: "Specializovanou diagnostikou jsme identifikovali příčinu selhání a obnovili data z poškozených disků. Následně jsme rekonstruovali RAID pole a obnovili přístup k datům.",
      result: "Kompletní obnova účetnictví a ERP dat bez ztráty transakcí.",
      duration: "7 dní",
      recoveryRate: "100%",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
    },
    {
      title: "Ztráta konfigurace QNAP NAS",
      problem: "Po aktualizaci firmware došlo ke ztrátě konfigurace RAID. NAS obsahoval 8 disků v RAID 6 s kritickými projektovými daty.",
      solution: "Provedli jsme analýzu původní konfigurace a pomocí specializovaného software rekonstruovali RAID pole včetně všech parametrů.",
      result: "Úspěšná obnova všech projektových dat a dokumentace.",
      duration: "5 dní",
      recoveryRate: "99%",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    },
    {
      title: "Ransomware na Synology NAS",
      problem: "Firemní NAS byl zasažen ransomwarem, který zašifroval kritická data. Zálohy byly neúplné.",
      solution: "Pomocí forenzní analýzy jsme identifikovali a obnovili původní data ze snapshots a žurnálových souborů.",
      result: "Záchrana 95% dat bez nutnosti platit výkupné.",
      duration: "6 dní",
      recoveryRate: "95%",
      image: "https://images.unsplash.com/photo-1588508065123-287b28e013da"
    }
  ] as CaseStudy[]
};

// TODO: Přidat anglickou verzi až budou hotové překlady
export const caseStudiesEN = caseStudiesCS;
