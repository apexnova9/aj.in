import React, { useState } from 'react';
import { BlogPost } from '../../types/blog';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface BlogPostListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  onView: (post: BlogPost) => void;
  disabled?: boolean;
}

export function BlogPostList({ posts, onEdit, onDelete, onView, disabled = false }: BlogPostListProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const truncateExcerpt = (text: string, maxLength: number = 100) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.substring(0, text.lastIndexOf(' ', maxLength));
    return `${truncated}...`;
  };

  const handleAction = async (actionType: 'edit' | 'delete' | 'view', post: BlogPost) => {
    if (disabled || loadingStates[`${actionType}-${post.id}`]) return;
    
    setLoadingStates(prev => ({ ...prev, [`${actionType}-${post.id}`]: true }));
    try {
      switch (actionType) {
        case 'edit':
          await onEdit(post);
          break;
        case 'delete':
          await onDelete(post);
          break;
        case 'view':
          await onView(post);
          break;
      }
    } finally {
      setLoadingStates(prev => ({ ...prev, [`${actionType}-${post.id}`]: false }));
    }
  };

  const handleImageError = (postId: number) => {
    setFailedImages(prev => new Set(prev).add(postId.toString()));
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow">
        <svg
          className="mx-auto h-12 w-12 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">No posts</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Get started by creating a new post.
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {posts.map((post) => (
            <tr 
              key={post.id} 
              className={`${
                disabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {post.featured_image && !failedImages.has(post.id.toString()) && (
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="h-10 w-10 rounded-lg object-cover mr-3"
                      onError={() => handleImageError(post.id)}
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {post.title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {truncateExcerpt(post.excerpt)}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${post.status === 'published' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                  }`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                {formatDate(post.created_at)}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleAction('view', post)}
                    disabled={disabled || loadingStates[`view-${post.id}`]}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="View post"
                  >
                    <Eye className={`h-5 w-5 ${loadingStates[`view-${post.id}`] ? 'animate-pulse' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleAction('edit', post)}
                    disabled={disabled || loadingStates[`edit-${post.id}`]}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Edit post"
                  >
                    <Edit2 className={`h-5 w-5 ${loadingStates[`edit-${post.id}`] ? 'animate-pulse' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleAction('delete', post)}
                    disabled={disabled || loadingStates[`delete-${post.id}`]}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete post"
                  >
                    <Trash2 className={`h-5 w-5 ${loadingStates[`delete-${post.id}`] ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
