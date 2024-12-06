import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogPost, Category } from '../types/blog';
import { blogService } from '../services/blogService';
import { categoryService } from '../services/categoryService';
import { Search, Tag, Filter, FolderTree, ChevronLeft, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import CategoryFilter from '../components/blog/CategoryFilter';
import { getImageUrl } from '../utils/imageUtils';
import { Link } from 'react-router-dom';
import { API_CONFIG } from '../config/api';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage] = useState(API_CONFIG.POSTS_PER_PAGE);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, fetchedCategories] = await Promise.all([
          blogService.getPosts(currentPage, postsPerPage),
          categoryService.getCategories()
        ]);

        if (!postsData?.posts) {
          throw new Error('Invalid response format: posts array is missing');
        }

        // Get unique tags from posts that have tags
        const tags = Array.from(new Set(
          postsData.posts
            .filter(post => post?.tags && Array.isArray(post.tags))
            .flatMap(post => post.tags || [])
        ));
        
        // Get active categories (categories that have posts)
        const activeCategoryIds = new Set(
          postsData.posts
            .filter(post => post?.categories && Array.isArray(post.categories))
            .flatMap(post => post.categories.map(cat => cat?.id).filter(Boolean))
        );
        
        const activeCategories = fetchedCategories
          .filter(cat => cat?.id && activeCategoryIds.has(cat.id));

        setAllTags(tags);
        setPosts(postsData.posts);
        setTotalPosts(postsData.total);
        setCategories(fetchedCategories);
        setActiveCategories(activeCategories);
      } catch (err) {
        console.error('Error in Blog component:', err);
        if (err instanceof Error && err.name === 'CategoryError') {
          setCategoryError('Failed to load categories. Some features may be limited.');
          try {
            const postsData = await blogService.getPosts(currentPage, postsPerPage);
            const tags = Array.from(new Set(
              postsData.posts
                .filter(post => post?.tags && Array.isArray(post.tags))
                .flatMap(post => post.tags || [])
            ));
            setAllTags(tags);
            setPosts(postsData.posts);
            setTotalPosts(postsData.total);
          } catch (postErr) {
            setError('Failed to load blog posts. Please try again later.');
          }
        } else {
          setError('Failed to load blog posts. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, postsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()));

      // Tag filter
      const matchesTag = !selectedTag || 
        (post.tags && post.tags.includes(selectedTag));

      // Category filter
      const matchesCategory = !selectedCategory || 
        (post.categories && post.categories.some(cat => cat.id === selectedCategory));

      return matchesSearch && matchesTag && matchesCategory;
    });
  }, [posts, searchTerm, selectedTag, selectedCategory]);

  // Calculate total pages based on filtered posts, not total posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Get current page's posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Blog | Amit Jha</title>
        <meta name="description" content="Insights on enterprise architecture, AI innovation, and cloud solutions." />
        <link rel="canonical" href="https://amitjha.in/blog" />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#022A5E] to-[#034694] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Insights & Perspectives
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Exploring enterprise architecture, AI innovation, and cloud solutions. 
              Join me in discussing the latest trends and best practices in technology leadership.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 py-12">
        <div>
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: 'Blog', path: '/blog' },
                ...(selectedCategory ? 
                  categoryService.getCategoryPath(
                    categories.find(c => c.id === selectedCategory),
                    categories
                  ).map((cat, index) => ({
                    label: cat.name,
                    path: index === 0 ? `/blog?category=${cat.id}` : `/blog?category=${cat.id}&parent=${cat.parentId}`
                  }))
                  : []
                )
              ]}
            />
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#022A5E]/90 border border-slate-200/50 dark:border-[#034694]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 backdrop-blur-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors md:w-auto"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="mb-8 p-6 bg-white dark:bg-[#022A5E]/90 rounded-xl border border-slate-200/50 dark:border-[#034694]/30">
              {/* Categories */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FolderTree className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">Categories</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${!selectedCategory 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-transparent dark:border-blue-500/20'
                      }`}
                  >
                    All Categories
                  </button>
                  {activeCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${selectedCategory === category.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-transparent dark:border-blue-500/20'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${!selectedTag 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-transparent dark:border-blue-500/20'
                      }`}
                  >
                    All Tags
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${selectedTag === tag
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-transparent dark:border-blue-500/20'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center py-12 text-red-500 dark:text-red-400">{error}</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No blog posts found matching your criteria.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
                      disabled:opacity-50 disabled:cursor-not-allowed
                      bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 
                      hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-500/20'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
                      disabled:opacity-50 disabled:cursor-not-allowed
                      bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 
                      hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}