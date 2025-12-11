# PPL Parcel CZ Return – Integrace pro DataHelp

## Přehled služby

**PPL Parcel CZ Return** je služba určená k vrácení zboží od zákazníka (C2B). Zákazník dostane kód, zabalí disk a vloží ho do PPL Parcelboxu nebo donese na Parcelshop. Přepravu hradí firma (DataHelp).

### Klíčové vlastnosti

- Zákazník nepotřebuje tiskárnu – stačí 6místný **SmartPIN** nebo QR kód
- Podání 24/7 do PPL Parcelboxů (přes 2 000 v ČR) nebo na Parcelshopy (přes 6 000)
- Sledování zásilky v reálném čase
- Základní pojištění do 50 000 Kč v ceně

---

## Workflow pro zákazníka

```
1. Zákazník vyplní formulář na webu DataHelp
2. DataHelp ověří zakázku a vygeneruje PPL Return štítek/kód
3. Zákazník obdrží e-mailem:
   - 6místný SmartPIN (nebo QR kód)
   - Instrukce k zabalení disku
   - Odkaz na mapu PPL Parcelboxů/Parcelshopů
4. Zákazník zabalí disk, napíše na balík SmartPIN
5. Zákazník vloží balík do PPL Parcelboxu (sken QR) nebo donese na Parcelshop
6. PPL doručí zásilku do DataHelp
```

---

## Ceník (platný od 1.12.2025)

| Hmotnost do | Cena bez DPH |
|-------------|--------------|
| 2 kg        | 129 Kč       |
| 5 kg        | 151 Kč       |
| 10 kg       | 210 Kč       |
| 20 kg       | 255 Kč       |
| 31,5 kg     | 328 Kč       |

### Příplatky

| Typ příplatku | Částka |
|---------------|--------|
| Mýtné | 1,10 Kč/kg |
| Palivový příplatek | cca 12,5 % (mění se měsíčně) |
| Sezónní příplatek (XI–XII) | 5 Kč/balík |
| Vyzvednutí řidičem z adresy | +60 Kč |

**Reálná cena za disk (do 2 kg): cca 155–165 Kč bez DPH (~190–200 Kč s DPH)**

---

## Parametry zásilky

| Parametr | Hodnota |
|----------|---------|
| Max. hmotnost | 31,5 kg |
| Max. rozměry | 120 × 60 × 60 cm |
| Max. obvod + délka | 360 cm |
| Základní pojištění | 50 000 Kč |
| Zvýšené pojištění | až 500 000 Kč (příplatek) |

### Rozměry pro Parcelbox

Pro vložení do PPL Parcelboxu platí menší limity:
- Max. rozměr: **60 × 43 × 43 cm**
- Pro běžný HDD/SSD v ochranném obalu bez problémů vyhovuje

---

## Jak se stát klientem PPL

### 1. Registrace

- **Formulář:** https://forms.office.com/e/MFKT5HvEpV
- **E-mail:** b2b@ppl.cz
- Potřebné údaje: název firmy, IČO, kontaktní osoba, e-mail, telefon

### 2. Co se stane po registraci

1. Obchodní zástupce PPL kontaktuje do 2 pracovních dnů
2. Domluvíte podmínky spolupráce (možné individuální ceny při větším objemu)
3. Získáte přístup do **Klientské aplikace** (klient.ppl.cz)
4. Nastavíte adresu pro doručování zpětných zásilek (DataHelp provozovna)

---

## Technická integrace

### Možnosti integrace

1. **Klientská webová aplikace** – ruční vytváření štítků na klient.ppl.cz
2. **API (MyAPI)** – plná automatizace, generování štítků přes API
3. **Hotové pluginy** – pro WooCommerce, Shoptet, Upgates atd.

### API dokumentace

- **Developer portál:** https://developer.ppl.cz/
- Po registraci jako klient získáte přístupové údaje k API

### Klíčové API endpointy (orientační)

```
POST /shipment          – vytvoření zásilky
GET  /shipment/{id}     – stav zásilky
GET  /label/{id}        – stažení štítku (PDF)
GET  /pickup-points     – seznam Parcelshopů/Parcelboxů
```

### Return URL

PPL nabízí **Return URL** – zjednodušené vytvoření zpětné zásilky odesílatelem. Zákazník může sám vytvořit štítek přes speciální odkaz, který mu pošlete.

---

## Návrh implementace na webu DataHelp

### Formulář pro zákazníka

```
Pole formuláře:
- Jméno a příjmení *
- E-mail *
- Telefon *
- Typ zařízení (HDD / SSD / Flash / RAID / jiné)
- Popis závady
- Číslo zakázky (pokud existuje)
- Souhlas s obchodními podmínkami *
```

### Backend flow

```javascript
// Pseudokód
async function createReturnShipment(customerData) {
  // 1. Validace dat
  validateCustomerData(customerData);
  
  // 2. Vytvoření zásilky v PPL API
  const shipment = await pplApi.createShipment({
    product: 'PPL_PARCEL_CZ_RETURN',
    sender: {
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone
    },
    recipient: {
      name: 'DataHelp s.r.o.',
      street: '...',
      city: '...',
      zip: '...'
    },
    weight: 2, // předpokládaná váha
    reference: customerData.orderId
  });
  
  // 3. Získání SmartPIN / QR kódu
  const label = await pplApi.getLabel(shipment.id);
  
  // 4. Odeslání e-mailu zákazníkovi
  await sendEmail({
    to: customerData.email,
    subject: 'Instrukce pro odeslání disku – DataHelp',
    template: 'return-shipment',
    data: {
      smartPin: shipment.smartPin,
      qrCode: label.qrCodeUrl,
      trackingUrl: shipment.trackingUrl
    }
  });
  
  // 5. Uložení do DB
  await saveShipment(shipment);
  
  return shipment;
}
```

### E-mail šablona pro zákazníka

```markdown
Dobrý den,

děkujeme za Vaši zakázku. Níže naleznete instrukce pro odeslání zařízení k záchraně dat.

## Váš kód pro odeslání: **[SMARTPIN]**

### Jak postupovat:

1. **Zabalte zařízení** do antistatického obalu a vložte do pevné krabice
2. **Napište na balík** kód: [SMARTPIN]
3. **Odneste balík** na nejbližší PPL Parcelbox nebo Parcelshop

📍 **Najít nejbližší místo:** https://www.ppl.cz/vyhledat-pobocku

### Důležité:
- Nemusíte nic tisknout – stačí napsat kód na balík
- Parcelbox je dostupný 24/7
- Přepravu hradíme my

Sledování zásilky: [TRACKING_URL]

S pozdravem,
Tým DataHelp
```

---

## Mapa PPL míst – widget

PPL nabízí oficiální widget pro výběr pobočky:

```html
<!-- PPL Pickup Point Widget -->
<script src="https://widget.ppl.cz/pickup-point-selector.js"></script>
<div id="ppl-widget"></div>
<script>
  PPLWidget.init({
    container: '#ppl-widget',
    country: 'CZ',
    type: ['parcelbox', 'parcelshop'], // nebo jen 'parcelbox'
    onSelect: function(point) {
      console.log('Vybrané místo:', point);
    }
  });
</script>
```

---

## Kontakty PPL

| Účel | Kontakt |
|------|---------|
| B2B obchod | b2b@ppl.cz |
| Zákaznický servis | info@ppl.cz |
| Technická podpora API | developer@ppl.cz |
| Telefonní linka | +420 225 371 111 |

---

## Checklist pro implementaci

- [ ] Registrace jako klient PPL (formulář/e-mail)
- [ ] Získání přístupu do klientské aplikace
- [ ] Nastavení adresy pro doručování vratek
- [ ] Získání API credentials (pokud chceš automatizaci)
- [ ] Implementace formuláře na webu
- [ ] Napojení na PPL API / ruční workflow
- [ ] Příprava e-mailových šablon
- [ ] Testovací zásilka
- [ ] Nasazení do produkce

---

## Alternativa: Zásilkovna

Pokud by PPL nevyhovovalo, Zásilkovna nabízí podobnou službu "Vratkový portál":
- Funguje pouze přes kamenné pobočky (ne Z-BOXy)
- Zákazník nadiktuje 8místný kód obsluze
- Cena cca 90 Kč za zásilku do 5 kg

Pro use-case DataHelp (24/7 dostupnost boxů) je **PPL lepší volba**.
