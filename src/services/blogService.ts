import { BlogPost, BlogPostInput } from '../types/blog';

const API_URL = 'http://localhost:3002/api'; // Fixed SQLite server URL

export const blogService = {
  async getPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getPosts:', error);
      throw error;
    }
  },

  async getPost(id: number): Promise<BlogPost> {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const post = await response.json();
      
      // Ensure category_ids is properly formatted
      if (post.categories) {
        post.category_ids = post.categories.map((cat: Category) => cat.id);
      }
      
      return post;
    } catch (error) {
      console.error('Error in getPost:', error);
      throw error;
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost> {
    try {
      console.log('Fetching post with slug:', slug);
      const response = await fetch(`${API_URL}/posts/slug/${slug}`);
      console.log('Response:', response);
      
      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(text || 'Failed to fetch post');
      }
      
      const post = await response.json();
      
      // Ensure category_ids is properly formatted
      if (post.categories) {
        post.category_ids = post.categories.map((cat: Category) => cat.id);
      }
      
      console.log('Fetched post:', post);
      return post;
    } catch (error) {
      console.error('Error in getPostBySlug:', error);
      throw error;
    }
  },

  async createPost(data: BlogPostInput): Promise<BlogPost> {
    try {
      const formData = new FormData();
      
      // Add all fields to FormData
      formData.append('title', data.title);
      formData.append('content', data.content || '');
      formData.append('excerpt', data.excerpt || '');
      formData.append('status', data.status || 'draft');
      
      // Handle featured image
      if (data.featured_image instanceof File) {
        formData.append('featured_image', data.featured_image);
      }
      
      // Handle tags - ensure it's sent as a JSON string array
      if (Array.isArray(data.tags)) {
        formData.append('tags', JSON.stringify(data.tags));
      }
      
      // Handle category_ids - ensure it's sent as a JSON string array of numbers
      if (Array.isArray(data.category_ids)) {
        const categoryIds = data.category_ids.map(id => 
          typeof id === 'string' ? parseInt(id, 10) : id
        );
        formData.append('category_ids', JSON.stringify(categoryIds));
      }

      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create post');
      }
      return response.json();
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  },

  async updatePost(id: number, data: BlogPostInput): Promise<BlogPost> {
    try {
      console.log('Updating post with data:', data);
      const formData = new FormData();
      
      // Add all fields to FormData
      formData.append('title', data.title);
      formData.append('content', data.content || '');
      formData.append('excerpt', data.excerpt || '');
      formData.append('status', data.status || 'draft');
      
      // Handle featured image
      if (data.featured_image instanceof File) {
        formData.append('featured_image', data.featured_image);
      }
      
      // Handle tags - ensure it's sent as a JSON string array
      if (Array.isArray(data.tags)) {
        formData.append('tags', JSON.stringify(data.tags));
      }
      
      // Handle category_ids - ensure it's sent as a JSON string array of numbers
      if (Array.isArray(data.category_ids)) {
        const categoryIds = data.category_ids.map(id => 
          typeof id === 'string' ? parseInt(id, 10) : id
        );
        formData.append('category_ids', JSON.stringify(categoryIds));
      }

      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update post');
      }
      return response.json();
    } catch (error) {
      console.error('Error in updatePost:', error);
      throw error;
    }
  },

  async deletePost(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error in deletePost:', error);
      throw error;
    }
  },
};
