export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  featured_image?: File | string;
  status: 'draft' | 'published';
  tags: string[];
}
