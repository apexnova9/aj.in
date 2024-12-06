// Get the base URL from environment variable
const BASE_API_URL = import.meta.env.VITE_API_URL;

// API Endpoints configuration
export const API_ENDPOINTS = {
  // Blog Posts
  POSTS: {
    LIST: `${BASE_API_URL}/posts`,
    GET: (id: number) => `${BASE_API_URL}/posts/${id}`,
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

  // Media/Images
  MEDIA: {
    UPLOAD: `${BASE_API_URL}/media/upload`,
    GET: (filename: string) => `${BASE_API_URL}/media/${filename}`,
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
  return `${BASE_API_URL}/media/${path}`;
}
