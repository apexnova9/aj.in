// Get the base URL from environment variable, with fallback
const BASE_API_URL = import.meta.env.VITE_API_URL;

// API Configuration
export const API_CONFIG = {
  BASE_URL: BASE_API_URL,
  POSTS_PER_PAGE: Number(import.meta.env.VITE_POSTS_PER_PAGE) || 16
};

// API Endpoints configuration
export const API_ENDPOINTS = {
  // Blog Posts
  POSTS: {
    LIST: `${BASE_API_URL}/posts`,
    GET: (id: number) => `${BASE_API_URL}/posts/${id}`,
    GET_BY_SLUG: (slug: string) => `${BASE_API_URL}/posts/slug/${slug}`,
    CREATE: `${BASE_API_URL}/posts`,
    UPDATE: (id: number) => `${BASE_API_URL}/posts/${id}`,
    DELETE: (id: number) => `${BASE_API_URL}/posts/${id}`,
  },
  
  // Categories
  CATEGORIES: {
    LIST: `${BASE_API_URL}/categories`,
    GET: (id: number) => `${BASE_API_URL}/categories/${id}`,
    CREATE: `${BASE_API_URL}/categories`,
    UPDATE: (id: number) => `${BASE_API_URL}/categories/${id}`,
    DELETE: (id: number) => `${BASE_API_URL}/categories/${id}`,
  },

  // Tags
  TAGS: {
    LIST: `${BASE_API_URL}/tags`,
    GET: (id: number) => `${BASE_API_URL}/tags/${id}`,
    CREATE: `${BASE_API_URL}/tags`,
    UPDATE: (id: number) => `${BASE_API_URL}/tags/${id}`,
    DELETE: (id: number) => `${BASE_API_URL}/tags/${id}`,
  },

  // Auth
  AUTH: {
    LOGIN: `${BASE_API_URL}/auth/login`,
    LOGOUT: `${BASE_API_URL}/auth/logout`,
    VERIFY: `${BASE_API_URL}/auth/verify`,
  },
};

// Helper function to get media URL
export function getMediaUrl(path: string | null): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_API_URL}/${path}`;
}
