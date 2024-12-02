import React from 'react';

export function BioCard() {
  const tags = ['Cloud Architecture', 'AI/ML', 'Enterprise Systems Integration'];

  return (
    <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl shadow-sm p-6 border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Amit Jha
        </h1>
        <h2 className="text-lg text-blue-600 dark:text-blue-300 font-medium">
          Senior Software Engineer
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Experienced software engineer specializing in building scalable web applications 
          and distributed systems. Passionate about clean code, performance optimization, 
          and creating exceptional user experiences.
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 
                rounded-full text-sm font-medium border border-transparent dark:border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}