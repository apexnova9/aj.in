import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BlogPost as BlogPostType } from '../types/blog';
import { blogService } from '../services/blogService';
import { format, parseISO } from 'date-fns';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const fetchedPost = await blogService.getPostBySlug(slug);
        setPost(fetchedPost);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          {error || 'Post not found'}
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
      </Helmet>
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
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
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Published on {formattedDate}
            </div>
          </header>
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </>
  );
}
