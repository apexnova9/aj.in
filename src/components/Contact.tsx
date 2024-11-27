import React from 'react';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-24 bg-slate-900" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Let's Connect</h2>
          <p className="text-slate-300 mb-12">
            Interested in discussing your next project or technical challenges?
            I'm always open to new opportunities and collaborations.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a
              href="mailto:contact@example.com"
              className="flex flex-col items-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <Mail className="text-blue-400 mb-3" size={24} />
              <span className="text-white">Email</span>
            </a>
            
            <a
              href="#"
              className="flex flex-col items-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <Linkedin className="text-blue-400 mb-3" size={24} />
              <span className="text-white">LinkedIn</span>
            </a>
            
            <a
              href="#"
              className="flex flex-col items-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <Github className="text-blue-400 mb-3" size={24} />
              <span className="text-white">GitHub</span>
            </a>
            
            <a
              href="#"
              className="flex flex-col items-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <FileText className="text-blue-400 mb-3" size={24} />
              <span className="text-white">Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}