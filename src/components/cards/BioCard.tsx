import React from 'react';

export function BioCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Amit Jha
        </h1>
        <h2 className="text-lg text-blue-600 dark:text-blue-300 font-medium">
        Distinguished Architect | AI & Cloud Innovation Leader
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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