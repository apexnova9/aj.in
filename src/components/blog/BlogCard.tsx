import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { Tag, Calendar, FolderTree } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="group bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
      {post.featured_image && (
        <Link to={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      
      <div className="p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <FolderTree className="w-4 h-4 text-blue-500" />
            <div className="flex flex-wrap gap-2">
              {post.categories.map(category => (
                <Link
                  key={category.id}
                  to={`/blog?category=${category.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-500 transition-colors">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.created_at}>
              {formatDate(post.created_at)}
            </time>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
