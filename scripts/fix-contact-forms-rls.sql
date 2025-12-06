-- Fix RLS policy pro tabulku contact_forms
-- Umožní anonymním uživatelům vkládat záznamy (potřebné pro kontaktní formulář)

-- 1. Zkontroluj, jestli RLS je zapnuté
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- 2. Smaž staré policies (pokud existují)
DROP POLICY IF EXISTS "Allow anonymous insert" ON contact_forms;
DROP POLICY IF EXISTS "Allow public insert" ON contact_forms;
DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_forms;

-- 3. Vytvoř novou policy pro INSERT (anonymní uživatelé mohou vkládat)
CREATE POLICY "Enable insert for anonymous users" ON contact_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Vytvoř policy pro SELECT (pouze autentizovaní uživatelé mohou číst)
DROP POLICY IF EXISTS "Enable select for authenticated users" ON contact_forms;
CREATE POLICY "Enable select for authenticated users" ON contact_forms
  FOR SELECT
  TO authenticated
  USING (true);

-- 5. Otestuj strukturu tabulky
-- Toto je očekávaná struktura:
--
-- CREATE TABLE contact_forms (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   name text NOT NULL,
--   email text,
--   phone text,
--   message text NOT NULL,
--   user_agent text,
--   created_at timestamptz DEFAULT now(),
--   updated_at timestamptz DEFAULT now()
-- );
--
-- Pokud tabulka neexistuje nebo má jinou strukturu, vytvoř ji:

-- DROP TABLE IF EXISTS contact_forms;
-- CREATE TABLE contact_forms (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   name text NOT NULL,
--   email text,
--   phone text,
--   message text NOT NULL,
--   user_agent text,
--   created_at timestamptz DEFAULT now(),
--   updated_at timestamptz DEFAULT now()
-- );

-- POZNÁMKA:
-- - anon = anonymní uživatelé (používají SUPABASE_ANON_KEY)
-- - authenticated = přihlášení uživatelé
-- - WITH CHECK (true) = povolí všechny INSERT operace bez omezení
