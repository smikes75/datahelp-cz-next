# Návod: Vložení referenčních článků do Supabase

## Popis
Tento script vloží **5 reálných referenčních článků** zobrazených na stránce `/reference`:
1. **Ondřej Pýcha** - Záchrana milionových fotografií (fotograf)
2. **Check Czech Fashion** - Záchrana dat módního portálu
3. **Michal Pavlíček** - Záchrana hudebních projektů (legendární kytarista)
4. **Kamila Špráchalová** - Obnova vzpomínek (herečka a dabérka - hlas Fiony ze Shreka)
5. **Štěpánka Hilgertová** - Záchrana 200 GB (dvojnásobná olympijská vítězka)

## Postup

### 1. Otevřete Supabase SQL Editor
- Přejděte na https://supabase.com/dashboard
- Vyberte projekt: `oqcvqquecshienabwkxu`
- Klikněte na **SQL Editor** v levém menu

### 2. Spusťte SQL script
- Otevřete soubor `scripts/insert-reference-articles.sql`
- Zkopírujte celý obsah
- Vložte do SQL Editoru v Supabase
- Klikněte na **Run** (nebo stiskněte Ctrl/Cmd + Enter)

### 3. Ověřte vložení
```sql
-- Zkontrolujte, že články byly vloženy
SELECT slug, title_cs, published_at, is_published
FROM blog_posts
WHERE slug IN (
  'jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy',
  'jak-jsme-zachranovali-cenna-data-check-czech-fashion',
  'vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka'
)
ORDER BY published_at DESC;
```

## Testování na webu

Po vložení dat:
1. Otevřete `http://localhost:3000/reference`
2. Ověřte, že se zobrazují 3 karty s příběhy
3. Klikněte na kartu a ověřte, že článek se otevře na `/clanky/[slug]`

## Poznámky

- Články mají `is_published = true`, takže se zobrazí okamžitě
- Datum publikace je nastaveno zpětně (30-60 dní)
- Obrázky jsou z Unsplash (placeholder)
- Obsah je v HTML formátu s českým i anglickým překladem

## Přiřazení ke kategorii (volitelné)

Pokud chcete články přiřadit ke kategorii "Naše aktivity":

```sql
-- Najděte ID kategorie
SELECT id, name_cs FROM blog_categories WHERE slug = 'nase-aktivity';

-- Přiřaďte články ke kategorii (nahraďte CATEGORY_ID skutečným ID)
INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, 'CATEGORY_ID'
FROM blog_posts bp
WHERE bp.slug IN (
  'jak-jsme-zachranovali-milionove-fotografie-ondreje-pychy',
  'jak-jsme-zachranovali-cenna-data-check-czech-fashion',
  'vykouzlili-jsme-usmev-na-tvari-maga-rockove-kytary-michala-pavlicka'
);
```
