import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog - Amit Jha's Technical Insights & Articles</title>
        <meta name="description" content="Read Amit Jha's insights on Java, Big Data, AI/ML, and Cloud Architecture. Technical articles and professional experiences shared." />
        <meta name="keywords" content="Amit Jha Blog, Technical Articles, Java, Big Data, Cloud Architecture, Engineering Blog" />
        <meta property="og:title" content="Amit Jha's Technical Blog" />
        <meta property="og:description" content="Technical insights and articles on Java, Big Data, and Cloud Architecture." />
        <meta property="og:type" content="blog" />
        <link rel="canonical" href="https://amitjha.in/blog" />
      </Helmet>
      <div 
        className="container mx-auto px-4 py-28 lg:py-32 flex-grow"
        role="main"
        aria-label="Blog content"
      >
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl font-bold text-slate-900 dark:text-white mb-8"
            tabIndex={0}
          >
            Blog
          </h1>
          <div 
            className="prose dark:prose-invert max-w-none"
            role="article"
            aria-label="Blog coming soon message"
          >
            <p className="text-slate-600 dark:text-slate-300">
              Blog content coming soon...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}