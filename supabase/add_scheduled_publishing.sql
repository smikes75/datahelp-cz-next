-- SQL pro pridani planovaneho publikovani do blog_posts
-- Spust tento script v Supabase SQL Editor

-- Pridame sloupec pro planovane publikovani
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Index pro rychlejsi vyhledavani planovanych clanku
CREATE INDEX IF NOT EXISTS idx_blog_posts_scheduled
ON blog_posts (scheduled_at)
WHERE scheduled_at IS NOT NULL AND is_published = false;

-- Funkce pro automaticke publikovani planovanych clanku
-- Tuto funkci muzete volat pres Supabase Edge Function nebo cron job
CREATE OR REPLACE FUNCTION publish_scheduled_posts()
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE blog_posts
  SET
    is_published = true,
    published_at = scheduled_at,
    scheduled_at = NULL
  WHERE
    scheduled_at IS NOT NULL
    AND scheduled_at <= NOW()
    AND is_published = false;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Test: Zobrazit existujici clanky
SELECT id, slug, is_published, published_at, scheduled_at
FROM blog_posts
ORDER BY created_at DESC
LIMIT 10;
