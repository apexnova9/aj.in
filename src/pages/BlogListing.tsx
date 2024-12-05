import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, Category } from '../types/blog';
import { categoryService } from '../services/categoryService';
import { ChevronRight } from 'lucide-react';

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
  const renderCategoryTree = (cats: Category[], level = 0) => {
    return cats.map((category) => (
      <div key={category.id} style={{ marginLeft: `${level * 16}px` }}>
        <button
          onClick={() => onSelectCategory(category.id === selectedCategory ? null : category.id)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            category.id === selectedCategory
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-100 dark:hover:bg-blue-900'
          }`}
        >
          {category.name}
          {category.post_count > 0 && (
            <span className="ml-2 text-xs opacity-70">({category.post_count})</span>
          )}
        </button>
        {(category as any).children?.length > 0 && renderCategoryTree((category as any).children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          !selectedCategory
            ? 'bg-blue-500 text-white'
            : 'hover:bg-blue-100 dark:hover:bg-blue-900'
        }`}
      >
        All Posts
      </button>
      {renderCategoryTree(categoryService.buildCategoryTree(categories))}
    </div>
  );
};

const BlogListing: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          fetch('/api/posts').then(res => res.json()),
          categoryService.getCategories()
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter(post => 
        post.categories.some(cat => 
          cat.id === selectedCategory || 
          categoryService.getCategoryPath(cat, categories).includes(
            categories.find(c => c.id === selectedCategory)?.name || ''
          )
        )
      )
    : posts;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-3">
                <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-slate-800"
              >
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map(category => (
                      <span
                        key={category.id}
                        className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListing;
