import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const estimatedReadTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <article className={`
      group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg 
      transition-all duration-300 overflow-hidden
      ${featured ? 'lg:grid lg:grid-cols-2 lg:gap-8' : 'flex flex-col h-full'}
    `}>
      {post.featured_image && (
        <Link 
          to={`/blog/${post.slug}`}
          className={`
            block overflow-hidden
            ${featured ? 'lg:h-[500px] h-64' : 'h-48'}
          `}
        >
          <img
            src={post.featured_image}
            alt={`Cover image for ${post.title}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      
      <div className={`
        flex flex-col
        ${featured ? 'p-8 lg:py-12' : 'p-6'}
        ${featured ? 'justify-center' : ''}
      `}>
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className={`
          font-semibold text-slate-900 dark:text-white mb-3 
          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors
          ${featured ? 'text-3xl lg:text-4xl' : 'text-xl line-clamp-2'}
        `}>
          <Link to={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.created_at}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{estimatedReadTime} min read</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className={`
          text-slate-600 dark:text-slate-400 mb-6
          ${featured ? 'text-lg' : 'line-clamp-3'}
        `}>
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <div className={featured ? 'mt-auto' : ''}>
          <Link
            to={`/blog/${post.slug}`}
            className={`
              inline-flex items-center gap-1 font-medium transition-all group-hover:gap-2
              ${featured 
                ? 'text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                : 'text-blue-600 dark:text-blue-400'
              }
            `}
          >
            Read More <ArrowRight className={`h-4 w-4 ${featured ? 'h-5 w-5' : ''}`} />
          </Link>
        </div>
      </div>
    </article>
  );
}
