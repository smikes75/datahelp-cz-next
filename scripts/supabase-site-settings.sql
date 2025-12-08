-- ================================================
-- SQL Script pro vytvoření tabulky site_settings
-- Spusťte v Supabase SQL Editor
-- ================================================

-- Vytvoření tabulky site_settings
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Výchozí nastavení banneru
INSERT INTO site_settings (key, value) VALUES
('banner', '{
  "enabled": false,
  "type": "contact",
  "text": "Svoz médií ZDARMA po celé ČR!",
  "bgColor": "blue-900"
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Povolení čtení pro anon (veřejné)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Politika pro čtení - všichni mohou číst
CREATE POLICY "Allow public read" ON site_settings
  FOR SELECT USING (true);

-- Politika pro zápis - pouze authenticated (nebo můžete omezit)
CREATE POLICY "Allow authenticated write" ON site_settings
  FOR ALL USING (true);

-- Index pro rychlejší vyhledávání
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
