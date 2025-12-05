/**
 * Blog types - TypeScript definice pro blog posty a kategorie
 */

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  coverImage: string;
  tags: string[];
  excerpt: string;
  seoDescription: string;
  content: string;
  locale: string;
  categories?: BlogCategory[];
  readingTime?: number;
  views?: number;
  sourceName?: string;
  sourceUrl?: string;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name_cs: string;
  name_en: string;
  name_de: string;
  name_it: string;
  created_at?: string;
}

export interface BlogCategoryWithCount extends BlogCategory {
  postCount: number;
}

export interface BlogFilter {
  category?: string;
  page?: number;
  limit?: number;
  locale?: string;
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
