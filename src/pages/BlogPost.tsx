import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BlogPost as BlogPostType } from '../types/blog';
import { blogService } from '../services/blogService';
import { format, parseISO } from 'date-fns';
import { Share2, ChevronLeft, ChevronRight } from 'lucide-react';

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
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
          >
            ← Back to Blog
          </Link>
          
          {post.featured_image && (
            <div className="mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <time dateTime={post.created_at}>{formattedDate}</time>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          
          <div 
            className="prose dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
        </article>
      </div>
    </>
  );
}
