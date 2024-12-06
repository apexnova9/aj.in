import axios from 'axios';
import { Category } from '../types/blog';
import { CategoryCache } from './categoryCache';

// Cache implementation
class CategoryCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes cache TTL

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new CategoryCache();

class CategoryError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'CategoryError';
  }
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      // Check cache first
      const cached = cache.get('categories');
      if (cached) {
        return cached;
      }

      const response = await axios.get(`${API_URL}/categories`);
      if (!response.data) {
        throw new CategoryError(
          'Failed to fetch categories',
          'FETCH_CATEGORIES_ERROR'
        );
      }

      const categories = response.data;
      
      // Validate category structure
      this.validateCategories(categories);
      
      // Store in cache
      cache.set('categories', categories);
      
      return categories;
    } catch (error) {
      if (error instanceof CategoryError) {
        throw error;
      }
      throw new CategoryError(
        'An error occurred while fetching categories',
        'UNKNOWN_ERROR'
      );
    }
  },

  validateCategories(categories: Category[]): void {
    // Check for circular references
    const validateNoCycles = (categoryId: number, path = new Set<number>()): void => {
      if (path.has(categoryId)) {
        throw new CategoryError(
          'Circular reference detected in category hierarchy',
          'CIRCULAR_REFERENCE'
        );
      }

      path.add(categoryId);
      const category = categories.find(c => c.id === categoryId);
      if (category?.parent_id) {
        validateNoCycles(category.parent_id, new Set(path));
      }
      path.delete(categoryId);
    };

    categories.forEach(category => {
      // Validate required fields
      if (!category.id || !category.name || !category.slug) {
        throw new CategoryError(
          'Invalid category structure: missing required fields',
          'INVALID_CATEGORY'
        );
      }

      // Check for circular references
      if (category.parent_id) {
        validateNoCycles(category.id);
      }
    });
  },

  buildCategoryTree(categories: Category[]): Category[] {
    try {
      const categoryMap = new Map<number, Category & { children?: Category[] }>();
      const rootCategories: Category[] = [];

      // First pass: Create category objects with empty children arrays
      categories.forEach(category => {
        categoryMap.set(category.id, { ...category, children: [] });
      });

      // Second pass: Organize into hierarchy
      categories.forEach(category => {
        const categoryWithChildren = categoryMap.get(category.id)!;
        if (category.parent_id === null) {
          rootCategories.push(categoryWithChildren);
        } else {
          const parent = categoryMap.get(category.parent_id);
          if (parent && parent.children) {
            parent.children.push(categoryWithChildren);
          } else {
            // Handle orphaned categories
            rootCategories.push(categoryWithChildren);
          }
        }
      });

      return rootCategories;
    } catch (error) {
      throw new CategoryError(
        'Failed to build category tree',
        'BUILD_TREE_ERROR'
      );
    }
  },

  getCategoryPath(category: Category | undefined, allCategories: Category[]): Category[] {
    if (!category) return [];

    const path: Category[] = [category];
    let currentCategory: Category | undefined = category;

    while (currentCategory?.parent_id) {
      currentCategory = allCategories.find(c => c.id === currentCategory?.parent_id);
      if (currentCategory) {
        path.unshift(currentCategory);
      }
    }

    return path;
  },

  async createCategory(data: Omit<Category, 'id'>): Promise<Category> {
    try {
      const response = await axios.post(`${API_URL}/categories`, data);

      if (!response.data) {
        throw new CategoryError(
          'Failed to create category',
          'CREATE_CATEGORY_ERROR'
        );
      }

      const category = response.data;
      cache.clear(); // Clear cache to fetch fresh data
      return category;
    } catch (error) {
      if (error instanceof CategoryError) {
        throw error;
      }
      throw new CategoryError(
        'An error occurred while creating category',
        'UNKNOWN_ERROR'
      );
    }
  },

  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    try {
      const response = await axios.put(`${API_URL}/categories/${id}`, data);

      if (!response.data) {
        throw new CategoryError(
          'Failed to update category',
          'UPDATE_CATEGORY_ERROR'
        );
      }

      const category = response.data;
      cache.clear(); // Clear cache to fetch fresh data
      return category;
    } catch (error) {
      if (error instanceof CategoryError) {
        throw error;
      }
      throw new CategoryError(
        'An error occurred while updating category',
        'UNKNOWN_ERROR'
      );
    }
  },

  async deleteCategory(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${API_URL}/categories/${id}`);

      if (!response.data) {
        throw new CategoryError(
          'Failed to delete category',
          'DELETE_CATEGORY_ERROR'
        );
      }

      cache.clear(); // Clear cache to fetch fresh data
    } catch (error) {
      if (error instanceof CategoryError) {
        throw error;
      }
      throw new CategoryError(
        'An error occurred while deleting category',
        'UNKNOWN_ERROR'
      );
    }
  },

  clearCache(): void {
    cache.clear();
  }
};
