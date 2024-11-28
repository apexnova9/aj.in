import React from 'react';
import { Code2, Cloud, Database, Brain, Network, Layers, Cpu, GitGraph, Settings } from 'lucide-react';

const expertiseAreas = [
  {
    icon: Code2,
    title: 'Programming Languages',
    skills: ['Java (Core, Enterprise)', 'JavaScript', 'Python'],
    description: 'Expert in modern development practices and enterprise applications.'
  },
  {
    icon: GitGraph,
    title: 'DSA & System Design',
    skills: ['Data Structures', 'Algorithms', 'System Design', 'Performance Optimization'],
    description: 'Strong foundation in computer science fundamentals and system design principles.'
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
    skills: ['Apache Spark', 'ElasticSearch', 'Vector Databases', 'Apache Kafka'],
    description: 'Building robust data processing pipelines and storage solutions.'
  },
  {
    icon: Brain,
    title: 'AI & ML',
    skills: ['Prompt Engineering', 'Machine Learning', 'Neural Networks'],
    description: 'Implementing cutting-edge AI solutions for business problems.'
  },
  {
    icon: Layers,
    title: 'Big Data',
    skills: ['Hadoop', 'PostgreSQL', 'MongoDB', 'Data Lakes'],
    description: 'Designing and implementing large-scale data solutions.'
  },
  {
    icon: Settings,
    title: 'DevOps & Infrastructure',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
    description: 'Implementing modern DevOps practices and infrastructure automation.'
  },
  {
    icon: Cpu,
    title: 'Technology Leadership',
    skills: ['Enterprise Architecture', 'Team Leadership', 'Technical Strategy', 'Innovation Management'],
    description: 'Leading technical teams and driving organizational transformation.'
  }
];

export function TechExpertise() {
  return (
    <section className="py-16 bg-white dark:bg-slate-800" id="expertise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Technical Expertise</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">Comprehensive skill set across modern technologies and practices</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertiseAreas.map((area) => (
            <div 
              key={area.title} 
              className="group p-6 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                <area.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {area.title}
              </h3>
              <ul className="space-y-2 mb-4">
                {area.skills.map((skill) => (
                  <li key={skill} className="text-slate-600 dark:text-slate-300 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}