import axios from 'axios';
import { Category } from '../types/blog';
import { API_ENDPOINTS } from '../config/api';

interface CategoryNode extends Category {
  children: CategoryNode[];
}

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await axios.get(API_ENDPOINTS.CATEGORIES.LIST);
    return response.data;
  },

  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await axios.get(`${API_ENDPOINTS.CATEGORIES.LIST}/${slug}`);
    return response.data;
  },

  buildCategoryTree: (categories: Category[]): CategoryNode[] => {
    const categoryMap = new Map<number, CategoryNode>();
    const roots: CategoryNode[] = [];

    // First pass: Create all nodes
    categories.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Second pass: Build the tree
    categories.forEach(category => {
      const node = categoryMap.get(category.id)!;
      if (category.parent_id === null) {
        roots.push(node);
      } else {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return roots;
  },

  getCategoryPath: (category: Category | undefined, categories: Category[]): Category[] => {
    if (!category) return [];
    
    const path: Category[] = [category];
    let currentCategory = category;
    
    while (currentCategory.parent_id) {
      const parent = categories.find(c => c.id === currentCategory.parent_id);
      if (parent) {
        path.unshift(parent);
        currentCategory = parent;
      } else {
        break;
      }
    }
    
    return path;
  }
};
