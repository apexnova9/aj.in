import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Enterprise Architecture in the AI Era',
    excerpt: 'Exploring how artificial intelligence is reshaping enterprise architecture and what it means for businesses.',
    date: '2024-03-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    tags: ['Enterprise Architecture', 'AI', 'Digital Transformation']
  },
  {
    id: 2,
    title: 'Microservices vs Monoliths: A Real-World Perspective',
    excerpt: 'A deep dive into the practical considerations when choosing between microservices and monolithic architectures.',
    date: '2024-03-10',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    tags: ['Microservices', 'Architecture', 'Best Practices']
  },
  {
    id: 3,
    title: 'Cloud Migration Strategies for Large Enterprises',
    excerpt: 'Key strategies and best practices for successful cloud migration in enterprise environments.',
    date: '2024-03-05',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    tags: ['Cloud', 'Migration', 'Enterprise']
  }
];

export function BlogList() {
  return (
    <section className="py-24 bg-white" id="blog">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Latest Insights</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-slate-900">{post.title}</h3>
                <p className="text-slate-600 mb-4">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a
                  href={`#/blog/${post.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}