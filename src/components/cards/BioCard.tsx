import React from 'react';

export function BioCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">About Me</h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        With 14+ years of experience in enterprise architecture and software development,
        I specialize in designing and implementing scalable solutions that drive business
        transformation. My expertise spans cloud architecture, AI/ML implementation, and
        enterprise systems integration. I'm passionate about leveraging cutting-edge
        technologies to solve complex business challenges while maintaining a focus on
        security, scalability, and maintainability.
      </p>
    </div>
  );
}