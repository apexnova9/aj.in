import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogPost } from '../types/blog';
import { blogService } from '../services/blogService';
import { Search, Tag } from 'lucide-react';

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

  // Split posts into featured (first post) and regular posts
  const [featuredPost, ...regularPosts] = filteredPosts;

  return (
    <>
      <Helmet>
        <title>Blog - Amit Jha's Technical Insights & Articles</title>
        <meta name="description" content="Read Amit Jha's insights on Java, Big Data, AI/ML, and Cloud Architecture. Technical articles and professional experiences shared." />
        <meta name="keywords" content="Amit Jha Blog, Technical Articles, Java, Big Data, Cloud Architecture, Engineering Blog" />
        <meta property="og:title" content="Amit Jha's Technical Blog" />
        <meta property="og:description" content="Technical insights and articles on Java, Big Data, and Cloud Architecture." />
        <meta property="og:type" content="blog" />
        <link rel="canonical" href="https://amitjha.in/blog" />
      </Helmet>
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-28 lg:py-32" role="main" aria-label="Blog content">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4" tabIndex={0}>
                Technical Blog
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Insights and articles about Java, Big Data, Cloud Architecture, and more.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {allTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <Tag className="h-5 w-5 text-slate-400" />
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                            ${selectedTag === tag
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900'
                            }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center" role="alert">
                <div className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
                  {error}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  Please make sure the backend server is running on port 3002
                </div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {posts.length === 0 ? "No blog posts available yet" : "No matching posts found"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {posts.length === 0 
                    ? "Check back soon for new content!"
                    : "Try adjusting your search or filter criteria"}
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-16">
                    <BlogCard post={featuredPost} featured={true} />
                  </div>
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}

                {filteredPosts.length < posts.length && (
                  <div className="text-center mt-8 text-slate-600 dark:text-slate-400">
                    Showing {filteredPosts.length} of {posts.length} posts
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}