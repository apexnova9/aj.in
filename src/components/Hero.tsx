import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Senior IT Solutions Architect & AI Engineer
              </h1>
              <p className="text-xl text-slate-300">
                Transforming business challenges into elegant technical solutions with
                16 years of expertise in enterprise architecture and AI innovation.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors">
                Download Resume
                <ArrowRight size={20} />
              </button>
              <div className="flex gap-4">
                <a href="#" className="p-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="p-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
              alt="Professional headshot"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}