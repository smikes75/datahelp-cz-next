-- Fix: Email sloupec musí být nullable
-- Formulář "Osobní předání" nesbírá email, jen telefon

-- Změň email na nullable
ALTER TABLE contact_forms
ALTER COLUMN email DROP NOT NULL;

-- Ověř strukturu
-- Očekávaný výsledek:
-- - name: NOT NULL
-- - email: NULL (nullable) ✅
-- - phone: NULL (nullable) ✅
-- - message: NOT NULL
-- - user_agent: NULL (nullable)

-- Poznámka:
-- Email a phone jsou oba nullable, protože různé formuláře
-- vyžadují různá pole:
-- - Kontaktní formulář: email NEBO phone (alespoň jedno)
-- - Osobní předání: pouze phone (bez emailu)
