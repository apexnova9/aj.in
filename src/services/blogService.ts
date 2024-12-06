import axios from 'axios';
import { BlogPost } from '../types/blog';
import { API_ENDPOINTS } from '../config/api';

interface PaginatedResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
}

export const blogService = {
  getPosts: async (page: number = 1, limit: number = 20): Promise<PaginatedResponse> => {
    const response = await axios.get(API_ENDPOINTS.POSTS.LIST);
    
    // If the API returns an array (non-paginated), convert it to paginated format
    if (Array.isArray(response.data)) {
      const allPosts = response.data;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return {
        posts: allPosts.slice(start, end),
        total: allPosts.length,
        page,
        limit
      };
    }
    
    // If it's already paginated, return as is
    return response.data;
  },

  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await axios.get(API_ENDPOINTS.POSTS.GET_BY_SLUG(slug));
    return response.data;
  },

  getPostsByCategory: async (categoryId: number): Promise<BlogPost[]> => {
    const response = await axios.get(`${API_ENDPOINTS.POSTS.LIST}/category/${categoryId}`);
    return response.data;
  },

  getPostsByTag: async (tag: string): Promise<BlogPost[]> => {
    const response = await axios.get(`${API_ENDPOINTS.POSTS.LIST}/tag/${tag}`);
    return response.data;
  }
};
