import React, { useState, useEffect } from 'react';
import { BlogPost, BlogPostInput } from '../types/blog';
import { BlogPostForm } from '../components/blog/BlogPostForm';
import { BlogPostList } from '../components/blog/BlogPostList';
import { blogService } from '../services/blogService';

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await blogService.getPosts();
      setPosts(fetchedPosts);
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

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600 dark:text-red-400">
        Error: {error}
        <button
          onClick={loadPosts}
          className="ml-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          Retry
        </button>
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
            initialData={selectedPost || undefined}
            onSubmit={selectedPost ? handleUpdatePost : handleCreatePost}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <BlogPostList
          posts={posts}
          onEdit={handleEdit}
          onDelete={handleDeletePost}
          onView={(post) => window.open(`/blog/${post.slug}`, '_blank')}
        />
      )}
    </div>
  );
}
