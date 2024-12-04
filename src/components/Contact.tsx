import React from 'react';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Let's Connect</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-12">
            Interested in discussing your next project or technical challenges?
            I'm always open to new opportunities and collaborations.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a
              href="mailto:your.email@example.com"
              className="flex flex-col items-center p-6 bg-white dark:bg-[#022A5E]/90 rounded-xl hover:bg-slate-100 dark:hover:bg-[#022A5E] transition-colors border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm"
            >
              <Mail className="text-blue-500 mb-3" size={24} />
              <span className="text-slate-900 dark:text-slate-300">Email</span>
            </a>
            
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white dark:bg-[#022A5E]/90 rounded-xl hover:bg-slate-100 dark:hover:bg-[#022A5E] transition-colors border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm"
            >
              <Linkedin className="text-blue-500 mb-3" size={24} />
              <span className="text-slate-900 dark:text-slate-300">LinkedIn</span>
            </a>
            
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white dark:bg-[#022A5E]/90 rounded-xl hover:bg-slate-100 dark:hover:bg-[#022A5E] transition-colors border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm"
            >
              <Github className="text-blue-500 mb-3" size={24} />
              <span className="text-slate-900 dark:text-slate-300">GitHub</span>
            </a>
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white dark:bg-[#022A5E]/90 rounded-xl hover:bg-slate-100 dark:hover:bg-[#022A5E] transition-colors border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm"
            >
              <FileText className="text-blue-500 mb-3" size={24} />
              <span className="text-slate-900 dark:text-slate-300">Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}