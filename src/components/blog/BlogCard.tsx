import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { Tag, Calendar, FolderTree } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUtils';

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
    <article className="group bg-white dark:bg-[#022A5E]/90 rounded-xl shadow-sm hover:shadow-md 
      transition-all border border-slate-200/50 dark:border-[#034694]/30 overflow-hidden flex flex-col h-full">
      {/* Featured Image */}
      {post.featured_image && (
        <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
          <img
            src={getImageUrl(post.featured_image)}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex items-center gap-2 text-sm mb-3">
            <FolderTree className="w-4 h-4 text-blue-500 shrink-0" />
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

        {/* Title */}
        <h2 className="text-lg font-semibold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2 flex-grow">
          {post.excerpt}
        </p>

        {/* Tags and Date */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-auto">
          {/* Date */}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.created_at}>
              {formatDate(post.created_at)}
            </time>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="hover:text-blue-500 dark:hover:text-blue-400"
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
