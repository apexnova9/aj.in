import React from 'react';
import { Code2, Cloud, Database, Brain, Network, Layers, Cpu } from 'lucide-react';

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
    icon: Cpu,
    title: 'Technology Leadership',
    skills: ['Enterprise Architecture', 'Team Leadership', 'Technical Strategy', 'Innovation Management'],
    description: 'Leading technical teams and driving organizational transformation.'
  }
];

export function TechExpertise() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Technical Expertise</h2>
      <div className="grid md:grid-cols-2 gap-6">
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
  );
}