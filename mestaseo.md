# Programmatic SEO - Městské landing pages

> **Status**: Uloženo pro pozdější implementaci
> **Strategie**: Začít s 14 krajskými městy (regional capitals), poté rozšířit na okresní města
> **Data**: `mesta.ts` v root adresáři projektu

---

## Prompt pro implementaci

### Úkol: Implementace programatického SEO pro městské landing pages

Vytvoř systém městských landing pages pro záchranu dat, které budou cílit na lokální vyhledávání.

#### Struktura URL
```
/zachrana-dat/[mesto]
např. /zachrana-dat/brno, /zachrana-dat/ostrava
```

#### Datový soubor
Použij existující `mesta.ts` který obsahuje:
- 14 krajských měst (isRegionalCapital: true)
- 63 okresních měst
- Pro každé město: slug, name, nameLocative, nameGenitive, region, population, distanceFromPrague, deliveryTime, localInfo, nearbyTowns

#### Požadavky na stránku

1. **Hero sekce**
   - Nadpis: "Záchrana dat v {nameLocative}"
   - Popis služeb s důrazem na lokální dostupnost
   - CTA tlačítko na objednání diagnostiky

2. **Sekce služeb**
   - Seznam všech služeb (HDD, SSD, RAID, NAS, mobily, paměťové karty)
   - Každá služba s odkazem na detail

3. **Lokální informace**
   - Vzdálenost od Prahy a doba doručení
   - Informace o svozu zdarma
   - Blízká města která obsluhujeme

4. **SEO požadavky**
   - Unikátní meta title a description pro každé město
   - Schema.org LocalBusiness + Service markup
   - Breadcrumbs
   - Canonical URL
   - Hreflang pro CS/EN

5. **Obsah**
   - Každé město má `localInfo` s unikátním textem
   - Zobrazit `nearbyTowns` pro rozšíření dosahu

#### Technické požadavky
- Next.js 14 App Router
- generateStaticParams pro všechna města
- generateMetadata pro SEO
- Revalidate: 86400 (1 den)

---

## Analýza a doporučení

### Potenciální konflikt URL
Současná struktura `/zachrana-dat/[service]` může kolidovat s `/zachrana-dat/[mesto]`.

**Řešení**: Next.js App Router zvládne obě cesty, pokud:
- Města mají unikátní slugy (brno, ostrava, plzen...)
- Služby mají jiné slugy (hdd, ssd, raid...)
- Žádný slug se nepřekrývá

### Riziko duplicitního obsahu
77 stránek s podobným obsahem může být Google vnímáno jako thin content.

**Řešení**:
1. Každé město má unikátní `localInfo` text
2. Dynamicky generovat statistiky (vzdálenost, doba doručení)
3. Zobrazit relevantní `nearbyTowns`
4. Případně přidat lokální reference/case studies

### Doporučený postup
1. **Fáze 1**: Implementovat 14 krajských měst (nejdůležitější, největší traffic potenciál)
2. **Fáze 2**: Po indexaci a ověření v GSC přidat okresní města
3. **Fáze 3**: Monitorovat metriky a optimalizovat obsah

### Konkurence
- DATA112 - má městské stránky
- EXALAB - má městské stránky
- Tato strategie nás staví na stejnou úroveň v lokálním SEO

---

## Data soubor

Soubor `mesta.ts` obsahuje kompletní data pro 77 měst:

```typescript
interface Mesto {
  slug: string;           // URL slug (brno, ostrava...)
  name: string;           // Název města (Brno, Ostrava...)
  nameLocative: string;   // 6. pád - kde? (v Brně, v Ostravě...)
  nameGenitive: string;   // 2. pád - čeho? (Brna, Ostravy...)
  region: string;         // Kraj
  isRegionalCapital: boolean;  // Je krajské město?
  population: number;     // Počet obyvatel
  distanceFromPrague: number;  // Vzdálenost v km
  deliveryTime: string;   // Doba doručení
  localInfo: string;      // Unikátní lokální text
  nearbyTowns: string[];  // Blízká města
}
```

### 14 Krajských měst (Fáze 1)
1. Praha
2. Brno
3. Ostrava
4. Plzeň
5. Liberec
6. Olomouc
7. České Budějovice
8. Hradec Králové
9. Ústí nad Labem
10. Pardubice
11. Zlín
12. Jihlava
13. Karlovy Vary
14. (+ další dle dat)

---

## Poznámky

- **Vytvořeno**: Prosinec 2024
- **Autor**: Claude Code session
- **Priorita**: Střední (SEO improvement, ne kritická funkcionalita)
- **Závislosti**: Žádné, může být implementováno kdykoliv
