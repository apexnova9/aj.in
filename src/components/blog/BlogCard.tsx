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
      group bg-white dark:bg-[#022A5E]/90 rounded-xl border border-slate-200/50 dark:border-[#034694]/30 
      backdrop-blur-sm transition-all duration-300 hover:shadow-lg
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
                className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 
                  rounded-full text-sm font-medium border border-transparent dark:border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link
          to={`/blog/${post.slug}`}
          className="text-xl font-bold text-gray-900 dark:text-gray-100 
            group-hover:text-blue-600 dark:group-hover:text-blue-400 
            transition-colors duration-300 mb-3"
        >
          {post.title}
        </Link>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {estimatedReadTime} min read
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <div className="mt-auto">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 
              hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </article>
  );
}
