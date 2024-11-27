import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export function ProfileCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:contact@example.com"
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
        
        <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
          <FileText size={20} />
          Download Resume
        </button>
      </div>
    </div>
  );
}