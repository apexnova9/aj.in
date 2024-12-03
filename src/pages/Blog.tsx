import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogPost } from '../types/blog';
import { blogService } from '../services/blogService';
import { Search, Tag } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await blogService.getPosts();
        const publishedPosts = fetchedPosts.filter(post => post.status === 'published');
        const tags = Array.from(new Set(publishedPosts.flatMap(post => post.tags || [])));
        setAllTags(tags);
        setPosts(publishedPosts);
      } catch (err) {
        console.error('Error in Blog component:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || 
      (post.tags && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

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
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Blog', path: '/blog' }
            ]}
          />
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#022A5E]/90 border border-slate-200/50 
                  dark:border-[#034694]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                  dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 
                  dark:placeholder-gray-500 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${!selectedTag 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-transparent dark:border-blue-500/20'
                }`}
            >
              All
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

        {/* Blog Posts Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-400">{error}</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No blog posts found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}