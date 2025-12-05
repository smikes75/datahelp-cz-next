/**
 * Blog utility funkce pro práci s blog posty ze Supabase
 * Používá se v Server Components
 */

import { createStaticClient } from '@/lib/supabase/server';
import { BlogPost, BlogCategoryWithCount, BlogFilter, PaginatedBlogPosts } from '@/lib/types/blog';

/**
 * Získá tagy pro blog post (zatím prázdné - tabulka blog_tags neexistuje)
 */
const getPostTags = async (_postId: string, _locale: string): Promise<string[]> => {
  return [];
};

/**
 * Získá všechny publikované blog posty
 */
export const getBlogPosts = async (locale: string): Promise<BlogPost[]> => {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const posts = await Promise.all(data.map(async (post) => {
      const tags = await getPostTags(post.id, locale);
      return {
        slug: post.slug,
        title: post[`title_${locale}`] || post.title_en,
        excerpt: post[`excerpt_${locale}`] || post.excerpt_en,
        date: post.published_at,
        author: post.author,
        coverImage: post.image_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
        tags,
        seoDescription: post[`excerpt_${locale}`] || post.excerpt_en,
        content: post[`content_${locale}`] || post.content_en,
        locale: locale,
        readingTime: post.reading_time_minutes,
        sourceName: post.source_name,
        sourceUrl: post.source_url
      };
    }));

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

/**
 * Získá jeden blog post podle slug
 * Inkrementuje view count
 */
export const getBlogPost = async (slug: string, locale: string): Promise<BlogPost | null> => {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    // Inkrementuj view count
    await supabase
      .from('blog_posts')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id);

    const tags = await getPostTags(data.id, locale);

    return {
      slug: data.slug,
      title: data[`title_${locale}`] || data.title_en,
      excerpt: data[`excerpt_${locale}`] || data.excerpt_en,
      date: data.published_at,
      author: data.author,
      coverImage: data.image_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      tags,
      seoDescription: data[`excerpt_${locale}`] || data.excerpt_en,
      content: data[`content_${locale}`] || data.content_en,
      locale: locale,
      readingTime: data.reading_time_minutes,
      sourceName: data.source_name,
      sourceUrl: data.source_url
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

/**
 * Získá kategorie s počtem postů
 */
export const getBlogCategoriesWithCount = async (_locale: string): Promise<BlogCategoryWithCount[]> => {
  try {
    const supabase = createStaticClient();
    const { data: categories, error: catError } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name_cs', { ascending: true });

    if (catError) throw catError;
    if (!categories) return [];

    const categoriesWithCount: BlogCategoryWithCount[] = [];

    for (const category of categories) {
      const { count, error: countError } = await supabase
        .from('blog_post_categories')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id);

      if (countError) {
        console.error('Error counting posts for category:', countError);
        continue;
      }

      categoriesWithCount.push({
        ...category,
        postCount: count || 0
      });
    }

    return categoriesWithCount;
  } catch (error) {
    console.error('Error fetching categories with count:', error);
    return [];
  }
};

/**
 * Získá stránkované blog posty s filtry
 */
export const getPaginatedBlogPosts = async (filter: BlogFilter): Promise<PaginatedBlogPosts> => {
  try {
    const { category, page = 1, limit = 9, locale = 'cs' } = filter;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const supabase = createStaticClient();
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('is_published', true);

    // Filtrování podle kategorie
    if (category && category !== 'all') {
      const { data: categoryData } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', category)
        .maybeSingle();

      if (categoryData) {
        const { data: postIds } = await supabase
          .from('blog_post_categories')
          .select('post_id')
          .eq('category_id', categoryData.id);

        if (postIds && postIds.length > 0) {
          const ids = postIds.map(p => p.post_id);
          query = query.in('id', ids);
        } else {
          return {
            posts: [],
            total: 0,
            page,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false
          };
        }
      }
    }

    const { data, count, error } = await query
      .order('published_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    const posts: BlogPost[] = await Promise.all((data || []).map(async (post) => {
      const tags = await getPostTags(post.id, locale);
      return {
        slug: post.slug,
        title: post[`title_${locale}`] || post.title_en,
        excerpt: post[`excerpt_${locale}`] || post.excerpt_en,
        date: post.published_at,
        author: post.author,
        coverImage: post.image_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
        tags,
        seoDescription: post[`excerpt_${locale}`] || post.excerpt_en,
        content: post[`content_${locale}`] || post.content_en,
        locale: locale,
        readingTime: post.reading_time_minutes,
        views: post.view_count,
        sourceName: post.source_name,
        sourceUrl: post.source_url
      };
    }));

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      posts,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    };
  } catch (error) {
    console.error('Error fetching paginated blog posts:', error);
    return {
      posts: [],
      total: 0,
      page: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
};
