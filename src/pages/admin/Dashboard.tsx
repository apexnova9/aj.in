import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LogOut, PlusCircle } from 'lucide-react';
import { BlogPost, BlogPostInput } from '../../types/blog';
import { BlogPostList } from '../../components/blog/BlogPostList';
import { BlogPostForm } from '../../components/blog/BlogPostForm';
import { useAuth } from '../../context/AuthContext';

// Temporary mock data
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-with-react-and-typescript',
    content: 'This is a sample blog post content...',
    excerpt: 'Learn how to set up a new React project with TypeScript and start building type-safe applications.',
    tags: ['React', 'TypeScript', 'Web Development'],
    publishedAt: '2024-01-20T12:00:00Z',
    updatedAt: '2024-01-20T12:00:00Z',
    status: 'published',
    author: {
      name: 'Amit Jha',
    },
  },
  {
    id: '2',
    title: 'Building a Blog with Next.js',
    slug: 'building-blog-with-nextjs',
    content: 'Another sample blog post content...',
    excerpt: 'Discover how to create a modern blog using Next.js, MDX, and Tailwind CSS.',
    tags: ['Next.js', 'MDX', 'Tailwind CSS'],
    publishedAt: '2024-01-19T12:00:00Z',
    updatedAt: '2024-01-19T12:00:00Z',
    status: 'draft',
    author: {
      name: 'Amit Jha',
    },
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [posts] = useState<BlogPost[]>(mockPosts);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleCreatePost = (data: BlogPostInput) => {
    // TODO: Implement post creation
    console.log('Creating post:', data);
    setShowNewPostForm(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
  };

  const handleUpdatePost = (data: BlogPostInput) => {
    // TODO: Implement post update
    console.log('Updating post:', data);
    setEditingPost(null);
  };

  const handleDeletePost = (post: BlogPost) => {
    // TODO: Implement post deletion
    console.log('Deleting post:', post);
  };

  const handleViewPost = (post: BlogPost) => {
    // TODO: Implement post view
    console.log('Viewing post:', post);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Amit Jha</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <header className="bg-white dark:bg-[#022A5E]/10 border-b border-slate-200 dark:border-[#034694]/20">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/50 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {showNewPostForm ? (
            <div className="bg-white dark:bg-[#022A5E]/5 p-6 rounded-lg border border-slate-200 dark:border-[#034694]/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Create New Post</h2>
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>
              <BlogPostForm onSubmit={handleCreatePost} onCancel={() => setShowNewPostForm(false)} />
            </div>
          ) : editingPost ? (
            <div className="bg-white dark:bg-[#022A5E]/5 p-6 rounded-lg border border-slate-200 dark:border-[#034694]/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Edit Post</h2>
                <button
                  onClick={() => setEditingPost(null)}
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>
              <BlogPostForm
                initialData={editingPost}
                onSubmit={handleUpdatePost}
                onCancel={() => setEditingPost(null)}
              />
            </div>
          ) : (
            <div className="bg-white dark:bg-[#022A5E]/5 p-6 rounded-lg border border-slate-200 dark:border-[#034694]/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Blog Posts</h2>
                <button
                  onClick={() => setShowNewPostForm(true)}
                  className="flex items-center px-4 py-2 text-sm bg-[#022A5E] text-white rounded-md hover:bg-[#022A5E]/90 transition-colors"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Post
                </button>
              </div>
              <BlogPostList
                posts={posts}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onView={handleViewPost}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
