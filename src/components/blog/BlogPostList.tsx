import React from 'react';
import { BlogPost } from '../../types/blog';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface BlogPostListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  onView: (post: BlogPost) => void;
}

export function BlogPostList({ posts, onEdit, onDelete, onView }: BlogPostListProps) {
  return (
    <div className="overflow-x-auto">
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
        <tbody className="bg-white dark:bg-transparent divide-y divide-slate-200 dark:divide-slate-700">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {post.title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {post.excerpt.substring(0, 100)}...
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${post.status === 'published' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                  }`}>
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                <button
                  onClick={() => onView(post)}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEdit(post)}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(post)}
                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
