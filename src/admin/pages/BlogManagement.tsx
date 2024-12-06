import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost, BlogPostInput } from '../../types/blog';
import { BlogPostForm } from '../components/BlogPostForm';
import { BlogPostList } from '../components/BlogPostList';
import { blogService } from '../services/blogService';

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await blogService.getPosts({ page, limit: POSTS_PER_PAGE });
      setPosts(response.items);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (data: BlogPostInput) => {
    try {
      await blogService.createPost(data);
      await loadPosts();
      setIsFormVisible(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    }
  };

  const handleUpdatePost = async (data: BlogPostInput) => {
    if (!selectedPost?.id) return;
    try {
      await blogService.updatePost(Number(selectedPost.id), data);
      await loadPosts();
      setSelectedPost(null);
      setIsFormVisible(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    }
  };

  const handleDeletePost = async (post: BlogPost) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await blogService.deletePost(Number(post.id));
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setSelectedPost(null);
    setIsFormVisible(false);
  };

  const convertToFormData = (post: BlogPost): BlogPostInput => {
    return {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      featured_image: post.featured_image,
      status: post.status,
      tags: post.tags || [],
      category_ids: post.categories?.map(cat => cat.id) || []
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          Error: {error}
          <button
            onClick={loadPosts}
            className="ml-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog Management - Amit Jha</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Blog Management
            </h1>
            {!isFormVisible && (
              <button
                onClick={() => setIsFormVisible(true)}
                className="rounded-md bg-[#022A5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#022A5E]/90 focus:outline-none focus:ring-2 focus:ring-[#034694] focus:ring-offset-2"
              >
                Create New Post
              </button>
            )}
          </div>

          {isFormVisible ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
                {selectedPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <BlogPostForm
                initialData={selectedPost ? convertToFormData(selectedPost) : undefined}
                onSubmit={selectedPost ? handleUpdatePost : handleCreatePost}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <>
              <BlogPostList
                posts={posts}
                onEdit={handleEdit}
                onDelete={handleDeletePost}
                onView={(post) => {
                  const url = new URL(`/blog/${post.slug}`, window.location.origin);
                  window.open(url.toString(), '_blank', 'noopener,noreferrer');
                }}
              />
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
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
