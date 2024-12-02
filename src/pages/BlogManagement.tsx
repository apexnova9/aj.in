import React, { useState, useEffect } from 'react';
import { BlogPost, BlogPostInput } from '../types/blog';
import { BlogPostForm } from '../components/blog/BlogPostForm';
import { BlogPostList } from '../components/blog/BlogPostList';
import { blogService } from '../services/blogService';
import { useNavigate } from 'react-router-dom';

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      const fetchedPosts = await blogService.getPosts();
      setPosts(fetchedPosts.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (err) {
      console.error('Error loading posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (data: BlogPostInput) => {
    try {
      setError(null);
      setActionInProgress(true);
      const response = await blogService.createPost(data);
      await loadPosts();
      setIsFormVisible(false);
      navigate(`/blog/${response.slug}`);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleUpdatePost = async (data: BlogPostInput) => {
    if (!selectedPost?.id) return;
    try {
      setError(null);
      setActionInProgress(true);
      await blogService.updatePost(Number(selectedPost.id), data);
      await loadPosts();
      setSelectedPost(null);
      setIsFormVisible(false);
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleDeletePost = async (post: BlogPost) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      setError(null);
      setActionInProgress(true);
      await blogService.deletePost(Number(post.id));
      await loadPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsFormVisible(true);
    setError(null);
  };

  const handleCancel = () => {
    setSelectedPost(null);
    setIsFormVisible(false);
    setError(null);
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Blog Management</h1>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Blog Management
        </h1>
        {!isFormVisible && (
          <button
            onClick={() => setIsFormVisible(true)}
            disabled={actionInProgress}
            className="rounded-md bg-[#022A5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#022A5E]/90 focus:outline-none focus:ring-2 focus:ring-[#034694] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create New Post
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setError(null)}
                className="inline-flex text-red-400 hover:text-red-500 focus:outline-none"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {isFormVisible ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
            {selectedPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <BlogPostForm
            initialData={selectedPost || undefined}
            onSubmit={selectedPost ? handleUpdatePost : handleCreatePost}
            onCancel={handleCancel}
            disabled={actionInProgress}
          />
        </div>
      ) : (
        <BlogPostList
          posts={posts}
          onEdit={handleEdit}
          onDelete={handleDeletePost}
          onView={(post) => window.open(`/blog/${post.slug}`, '_blank')}
          disabled={actionInProgress}
        />
      )}

      {actionInProgress && <LoadingSpinner />}
    </div>
  );
}
