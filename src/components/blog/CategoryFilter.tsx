import React, { useMemo } from 'react';
import { Category } from '../../types/blog';
import { categoryService } from '../../services/categoryService';
import { FolderTree } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  // Memoize category tree to prevent unnecessary rebuilds
  const categoryTree = useMemo(() => {
    try {
      return categoryService.buildCategoryTree(categories);
    } catch (err) {
      console.error('Error building category tree:', err);
      return [];
    }
  }, [categories]);

  const renderCategoryItem = (category: Category & { children?: Category[] }, level = 0) => {
    const isSelected = selectedCategory === category.id;
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div key={category.id} className="category-item" style={{ marginLeft: `${level * 1}rem` }}>
        <button
          onClick={() => onSelectCategory(isSelected ? null : category.id)}
          className={`
            w-full text-left px-3 py-2 rounded-lg text-sm
            transition-colors duration-200
            ${isSelected
              ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
          title={categoryService.getCategoryPath(category, categories)}
        >
          <span className="flex items-center">
            {hasChildren && (
              <span className="mr-2 text-gray-400">
                {isSelected ? '▼' : '▶'}
              </span>
            )}
            {category.name}
            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              {category.post_count || 0}
            </span>
          </span>
        </button>
        
        {hasChildren && isSelected && (
          <div className="mt-1">
            {category.children?.map(child =>
              renderCategoryItem(child as Category & { children?: Category[] }, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  if (!categories.length) {
    return null;
  }

  return (
    <div className="category-filter space-y-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/5 rounded-lg">
        <FolderTree className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium text-slate-900 dark:text-slate-100">Categories</h3>
      </div>
      <div className="space-y-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${!selectedCategory
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-700 dark:text-slate-300'
            }`}
        >
          All Posts
        </button>
        {categoryTree.map(category => renderCategoryItem(category))}
      </div>
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(CategoryFilter);
