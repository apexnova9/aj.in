export type PostStatus = 'draft' | 'published';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  parent_name: string | null;
  post_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  status: PostStatus;
  created_at: string;
  updated_at: string;
  tags: string[];
  categories: Category[];
}

export interface BlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  featured_image?: File | string | null;
  status: PostStatus;
  tags: string[];
  category_ids: number[];
}

export interface BlogPostResponse {
  id: number;
  slug: string;
}

export interface BlogPostError {
  error: string;
  details?: string;
}

export interface BlogListFilters {
  status?: PostStatus;
  tag?: string;
  search?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
