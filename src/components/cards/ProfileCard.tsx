import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export function ProfileCard() {
  return (
    <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl shadow-sm overflow-hidden border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm">
      <div className="aspect-square relative">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
          alt="Professional headshot"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@example.com"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
          </a>
        </div>
        
        <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow">
          <FileText size={20} />
          Download Resume
        </button>
      </div>
    </div>
  );
}