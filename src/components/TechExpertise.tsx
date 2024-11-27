import React from 'react';
import { Code2, Cloud, Database, Brain } from 'lucide-react';

const expertiseAreas = [
  {
    icon: Code2,
    title: 'Programming Languages',
    skills: ['Java (Core, Enterprise)', 'JavaScript', 'Python'],
    description: 'Expert in modern development practices and enterprise applications.'
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    skills: ['AWS Services', 'Azure', 'GCP'],
    description: 'Designing and implementing scalable cloud solutions.'
  },
  {
    icon: Database,
    title: 'Data Engineering',
    skills: ['Hadoop', 'PostgreSQL', 'MongoDB'],
    description: 'Building robust data processing pipelines and storage solutions.'
  },
  {
    icon: Brain,
    title: 'AI & ML',
    skills: ['Prompt Engineering', 'Machine Learning', 'Neural Networks'],
    description: 'Implementing cutting-edge AI solutions for business problems.'
  }
];

export function TechExpertise() {
  return (
    <section className="py-24 bg-white" id="expertise">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Technical Expertise</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseAreas.map((area) => (
            <div key={area.title} className="p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <area.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
              <ul className="space-y-2 mb-4">
                {area.skills.map((skill) => (
                  <li key={skill} className="text-slate-600">{skill}</li>
                ))}
              </ul>
              <p className="text-slate-500">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}