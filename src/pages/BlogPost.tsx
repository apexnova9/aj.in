import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BlogPost as BlogPostType } from '../types/blog';
import { blogService } from '../services/blogService';
import { format, parseISO } from 'date-fns';
import { Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adjacentPosts, setAdjacentPosts] = useState<{
    previous: BlogPostType | null;
    next: BlogPostType | null;
  }>({ previous: null, next: null });

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const [fetchedPost, allPosts] = await Promise.all([
          blogService.getPostBySlug(slug),
          blogService.getPosts()
        ]);
        
        setPost(fetchedPost);

        // Find adjacent posts
        const publishedPosts = allPosts.filter(p => p.status === 'published');
        const currentIndex = publishedPosts.findIndex(p => p.slug === slug);
        
        setAdjacentPosts({
          previous: currentIndex > 0 ? publishedPosts[currentIndex - 1] : null,
          next: currentIndex < publishedPosts.length - 1 ? publishedPosts[currentIndex + 1] : null
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = async () => {
    const shareData = {
      title: post?.title,
      text: post?.excerpt,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">
            {error || 'Post not found'}
          </div>
          <Link 
            to="/blog" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.created_at 
    ? format(parseISO(post.created_at), 'MMMM d, yyyy')
    : 'Date not available';

  return (
    <>
      <Helmet>
        <title>{post.title} - Amit Jha</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:author" content="Amit Jha" />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>
      
      {/* Banner Section */}
      <div className="relative bg-gradient-to-br from-[#022A5E] to-[#034694] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-blue-100 text-sm">
                <time dateTime={post.created_at}>{formattedDate}</time>
                <span className="text-blue-300">•</span>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1 text-blue-100 hover:text-white transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-slate-50 dark:bg-[#011633]/50">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: 'Blog', path: '/blog' },
                { label: post.title }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {post.featured_image && (
                <div className="mb-8">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}
              
              <div 
                className="prose dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Navigation Section */}
              {(adjacentPosts.previous || adjacentPosts.next) && (
                <nav className="border-t border-slate-200 dark:border-slate-700 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {adjacentPosts.previous && (
                      <Link
                        to={`/blog/${adjacentPosts.previous.slug}`}
                        className="group flex flex-col p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <ChevronLeft className="h-4 w-4" />
                          Previous Post
                        </span>
                        <span className="text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {adjacentPosts.previous.title}
                        </span>
                      </Link>
                    )}
                    {adjacentPosts.next && (
                      <Link
                        to={`/blog/${adjacentPosts.next.slug}`}
                        className="group flex flex-col p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 md:text-right md:items-end"
                      >
                        <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          Next Post
                          <ChevronRight className="h-4 w-4" />
                        </span>
                        <span className="text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {adjacentPosts.next.title}
                        </span>
                      </Link>
                    )}
                  </div>
                </nav>
              )}
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Author Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/images/profile.jpg"
                    alt="Amit Jha"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Amit Jha</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Software Engineer</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Passionate about building scalable systems and sharing knowledge through writing.
                </p>
              </div>

              {/* Ad Space */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
                <div className="text-center text-slate-600 dark:text-slate-400">
                  <p className="text-sm">Advertisement Space</p>
                  <div className="mt-4 aspect-[4/3] bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                    <span className="text-sm">Your Ad Here</span>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Related Posts</h3>
                <div className="space-y-4">
                  {[adjacentPosts.previous, adjacentPosts.next].filter(Boolean).map((relatedPost) => (
                    relatedPost && (
                      <Link
                        key={relatedPost.slug}
                        to={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {relatedPost.excerpt?.substring(0, 100)}...
                        </p>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
