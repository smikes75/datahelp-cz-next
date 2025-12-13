-- SQL pro pridani novych kategorii do blog_categories
-- Spust tento script v Supabase SQL Editor

-- Nejprve zkontrolujeme existujici kategorie
SELECT * FROM blog_categories ORDER BY name_cs;

-- Pridame nove kategorie (pokud jeste neexistuji)
INSERT INTO blog_categories (id, slug, name_cs, name_en)
VALUES
  (gen_random_uuid(), 'zachrana-dat-hdd', 'Záchrana dat z HDD', 'HDD Data Recovery'),
  (gen_random_uuid(), 'zachrana-dat-ssd', 'Záchrana dat z SSD', 'SSD Data Recovery'),
  (gen_random_uuid(), 'zachrana-dat-raid', 'Záchrana dat z RAID', 'RAID Data Recovery'),
  (gen_random_uuid(), 'zachrana-dat-flash', 'Záchrana dat z flash', 'Flash Data Recovery'),
  (gen_random_uuid(), 'zalohovani-dat', 'Zálohování dat', 'Data Backup'),
  (gen_random_uuid(), 'prvni-pomoc', 'První pomoc', 'First Aid'),
  (gen_random_uuid(), 'technologie', 'Technologie', 'Technology'),
  (gen_random_uuid(), 'nase-aktivity', 'Naše aktivity', 'Our Activities'),
  (gen_random_uuid(), 'novinky', 'Novinky', 'News')
ON CONFLICT (slug) DO NOTHING;

-- Zobrazime vysledek
SELECT * FROM blog_categories ORDER BY name_cs;
