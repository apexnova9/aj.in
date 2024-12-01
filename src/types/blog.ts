export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
  author: {
    name: string;
    avatar?: string;
  };
}

export interface BlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  status: 'draft' | 'published';
}
