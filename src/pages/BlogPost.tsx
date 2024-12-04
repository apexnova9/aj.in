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
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const [fetchedPost, fetchedPosts] = await Promise.all([
          blogService.getPostBySlug(slug),
          blogService.getPosts()
        ]);
        
        setPost(fetchedPost);
        setAllPosts(fetchedPosts);

        // Find adjacent posts
        const publishedPosts = fetchedPosts.filter(p => p.status === 'published');
        const currentIndex = publishedPosts.findIndex(p => p.slug === slug);
        
        setAdjacentPosts({
          previous: currentIndex > 0 ? publishedPosts[currentIndex - 1] : null,
          next: currentIndex < publishedPosts.length - 1 ? publishedPosts[currentIndex + 1] : null
        });

        // Find related posts based on tags with relevance scoring
        const related = publishedPosts
          .filter(p => p.slug !== slug) // Exclude current post
          .map(post => {
            // Calculate relevance score
            const sharedTags = post.tags.filter(tag => fetchedPost.tags.includes(tag));
            const score = {
              tagMatch: sharedTags.length / Math.max(post.tags.length, fetchedPost.tags.length), // Tag similarity ratio
              recency: (new Date(post.created_at)).getTime(), // More recent posts get higher score
            };
            
            return {
              post,
              relevanceScore: score.tagMatch * 0.7 + // 70% weight to tag matches
                             (score.recency / Date.now()) * 0.3 // 30% weight to recency
            };
          })
          .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance score
          .slice(0, 3) // Take top 3
          .map(({ post }) => post); // Extract just the posts

        setRelatedPosts(related);
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
              
              <style jsx global>{`
                .blog-content {
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  font-size: 1.125rem;
                  line-height: 1.75;
                  color: #1a1a1a;
                }

                .dark .blog-content {
                  color: #e5e7eb;
                }

                .blog-content h1 {
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin: 2.5rem 0 1.5rem;
                  line-height: 1.2;
                }

                .blog-content h2 {
                  font-size: 2rem;
                  font-weight: 600;
                  margin: 2rem 0 1.25rem;
                  line-height: 1.3;
                }

                .blog-content h3 {
                  font-size: 1.75rem;
                  font-weight: 600;
                  margin: 1.75rem 0 1rem;
                  line-height: 1.4;
                }

                .blog-content h4 {
                  font-size: 1.5rem;
                  font-weight: 600;
                  margin: 1.5rem 0 1rem;
                  line-height: 1.4;
                }

                .blog-content p {
                  margin: 1.25rem 0;
                  font-size: 1.125rem;
                  line-height: 1.75;
                }

                .blog-content ul,
                .blog-content ol {
                  margin: 1.25rem 0;
                  padding-left: 1.75rem;
                }

                .blog-content ul {
                  list-style-type: disc;
                }

                .blog-content ol {
                  list-style-type: decimal;
                }

                .blog-content li {
                  margin: 0.5rem 0;
                  font-size: 1.125rem;
                  line-height: 1.75;
                  padding-left: 0.5rem;
                }

                .blog-content li > ul,
                .blog-content li > ol {
                  margin: 0.5rem 0;
                }

                .blog-content blockquote {
                  border-left: 4px solid #3b82f6;
                  margin: 1.5rem 0;
                  padding: 0.5rem 0 0.5rem 1.5rem;
                  font-style: italic;
                  background-color: #f8fafc;
                  border-radius: 0.25rem;
                }

                .dark .blog-content blockquote {
                  background-color: #1e293b;
                  border-left-color: #60a5fa;
                }

                .blog-content pre {
                  background-color: #1e293b;
                  color: #e2e8f0;
                  padding: 1.25rem;
                  border-radius: 0.5rem;
                  overflow-x: auto;
                  margin: 1.5rem 0;
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                  font-size: 0.875rem;
                  line-height: 1.7;
                }

                .blog-content pre code {
                  color: inherit;
                  background-color: transparent;
                  padding: 0;
                  font-size: inherit;
                }

                .blog-content .hljs-keyword {
                  color: #569CD6;
                }
                .blog-content .hljs-built_in {
                  color: #4EC9B0;
                }
                .blog-content .hljs-string {
                  color: #CE9178;
                }
                .blog-content .hljs-comment {
                  color: #6A9955;
                }
                .blog-content .hljs-function {
                  color: #DCDCAA;
                }
                .blog-content .hljs-number {
                  color: #B5CEA8;
                }
                .blog-content .hljs-class {
                  color: #4EC9B0;
                }
                .blog-content .hljs-variable {
                  color: #9CDCFE;
                }
                .blog-content .hljs-params {
                  color: #9CDCFE;
                }
                .blog-content .hljs-property {
                  color: #9CDCFE;
                }
                .blog-content .hljs-punctuation {
                  color: #D4D4D4;
                }
                .blog-content .hljs-tag {
                  color: #569CD6;
                }
                .blog-content .hljs-attr {
                  color: #9CDCFE;
                }
                .blog-content .hljs-title {
                  color: #4EC9B0;
                }

                .blog-content a {
                  color: #3b82f6;
                  text-decoration: underline;
                  text-decoration-thickness: 0.125em;
                  text-underline-offset: 0.15em;
                  transition: all 0.2s ease;
                }

                .blog-content a:hover {
                  color: #2563eb;
                }

                .dark .blog-content a {
                  color: #60a5fa;
                }

                .dark .blog-content a:hover {
                  color: #93c5fd;
                }

                .blog-content img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 0.5rem;
                  margin: 1.5rem 0;
                }

                .blog-content hr {
                  margin: 2rem 0;
                  border: 0;
                  height: 1px;
                  background-color: #e2e8f0;
                }

                .dark .blog-content hr {
                  background-color: #334155;
                }

                .blog-content table {
                  width: 100%;
                  margin: 1.5rem 0;
                  border-collapse: collapse;
                }

                .blog-content th,
                .blog-content td {
                  padding: 0.75rem;
                  border: 1px solid #e2e8f0;
                  text-align: left;
                }

                .dark .blog-content th,
                .dark .blog-content td {
                  border-color: #334155;
                }

                .blog-content th {
                  background-color: #f8fafc;
                  font-weight: 600;
                }

                .dark .blog-content th {
                  background-color: #1e293b;
                }

                .blog-content mark {
                  background-color: #fef9c3;
                  padding: 0.2em 0.4em;
                  border-radius: 0.25rem;
                }

                .dark .blog-content mark {
                  background-color: #854d0e;
                  color: #fef9c3;
                }
              `}</style>

              <article className="blog-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              {/* Social Share Section */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Share this post</h3>
                <div className="flex flex-wrap gap-3">
                  {/* Twitter/X */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Share on X</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>Share on LinkedIn</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#0C63D4] text-white rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Share on Facebook</span>
                  </a>

                  {/* Copy Link Button */}
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(window.location.href);
                      // You might want to add a toast notification here
                      alert('Link copied to clipboard!');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                    </svg>
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>

              {/* Navigation Section */}
              {(adjacentPosts.previous || adjacentPosts.next) && (
                <nav className="border-t border-slate-200 dark:border-slate-700 pt-8">
                  <div className="flex justify-between gap-4">
                    {/* Left-aligned Previous Post */}
                    <div className="flex-1">
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
                    </div>
                    
                    {/* Right-aligned Next Post */}
                    <div className="flex-1 flex justify-end">
                      {adjacentPosts.next && (
                        <Link
                          to={`/blog/${adjacentPosts.next.slug}`}
                          className="group flex flex-col p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-right"
                        >
                          <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 justify-end">
                            Next Post
                            <ChevronRight className="h-4 w-4" />
                          </span>
                          <span className="text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {adjacentPosts.next.title}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </nav>
              )}

              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <section className="border-t border-slate-200 dark:border-slate-700 pt-12 mt-12">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">More Posts You Might Like</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        to={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <div className="aspect-video mb-4 overflow-hidden rounded-xl relative">
                          {relatedPost.featured_image ? (
                            <img
                              src={relatedPost.featured_image}
                              alt={relatedPost.title}
                              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h1.833L7.084 4.126H5.117z"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            {relatedPost.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <time dateTime={relatedPost.created_at}>
                              {format(parseISO(relatedPost.created_at), 'MMM d, yyyy')}
                            </time>
                            <span>•</span>
                            <span>5 min read</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Advertisement Section */}
              <section className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Ad Space 1 */}
                  <div className="relative">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Advertisement space</div>
                    <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-slate-400 dark:text-slate-500">Your ad here</span>
                    </div>
                  </div>

                  {/* Ad Space 2 */}
                  <div className="relative">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Advertisement space</div>
                    <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-slate-400 dark:text-slate-500">Your ad here</span>
                    </div>
                  </div>

                  {/* Ad Space 3 */}
                  <div className="relative">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Advertisement space</div>
                    <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-slate-400 dark:text-slate-500">your ad here</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Author Card */}
              <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm transition-all duration-300 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/amit.jpg"
                    alt="Amit Jha"
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://avatars.githubusercontent.com/u/91959504';
                      target.onerror = null;
                    }}
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Amit Jha</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">AI and ML Enthusiast</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Passionate about building scalable systems and sharing knowledge through writing.
                </p>
              </div>

              {/* First Ad Space */}
              <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm transition-all duration-300 p-6">
                <div className="text-center text-slate-600 dark:text-slate-400">
                  <p className="text-sm font-medium">Advertisement Space</p>
                  <div className="mt-4 aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-slate-400 dark:text-slate-500">Your Ad Here</span>
                  </div>
                </div>
              </div>

              {/* Random Post */}
              <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm transition-all duration-300 p-2.5">
                {allPosts
                  .filter(p => p.slug !== slug && p.status === 'published')
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 1)
                  .map(post => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <div className="aspect-[3/1] mb-1.5 overflow-hidden rounded-lg">
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <time dateTime={post.created_at}>
                          {format(parseISO(post.created_at), 'MMM d, yyyy')}
                        </time>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Second Ad Space */}
              <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm transition-all duration-300 p-6">
                <div className="text-center text-slate-600 dark:text-slate-400">
                  <p className="text-sm font-medium">Advertisement Space</p>
                  <div className="mt-4 aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-slate-400 dark:text-slate-500">Your Ad Here</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
