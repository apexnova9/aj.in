import React from 'react';
import { Code2, Cloud, Database, Brain, Network, Layers, Cpu, GitGraph, Settings } from 'lucide-react';

const expertiseAreas = [
  {
    icon: Cpu,
    title: 'Technology Leadership',
    skills: ['Enterprise Architecture', 'Team Leadership', 'Technical Strategy', 'Innovation Management'],
    description: 'Leading technical teams and driving organizational transformation.'
  },
  {
    icon: Brain,
    title: 'AI & ML',
    skills: ['Prompt Engineering', 'Machine Learning', 'Neural Networks'],
    description: 'Implementing cutting-edge AI solutions for business problems.'
  },
  {
    icon: Database,
    title: 'Data Engineering',
    skills: ['Apache Spark', 'ElasticSearch', 'Vector Databases', 'Apache Kafka'],
    description: 'Building robust data processing pipelines and storage solutions.'
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
    icon: Layers,
    title: 'Big Data',
    skills: ['Hadoop', 'PostgreSQL', 'MongoDB', 'Data Lakes'],
    description: 'Designing and implementing large-scale data solutions.'
  },
  {
    icon: Settings,
    title: 'DevOps & Infrastructure',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Jenkins', 'Ansible'],
    description: 'Implementing modern DevOps practices and infrastructure automation.'
  },
  {
    icon: Code2,
    title: 'Programming Languages',
    skills: ['Java (Core, Enterprise)', 'Spring Framework', 'Scala', 'Python', 'PySpark and Spark SQL', 'JavaScript', 'Shell Scripting', 'SQL', 'HTML', 'CSS'],
    description: 'Proficient in multiple programming languages and frameworks.'
  }
];

export default function TechExpertise() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#022A5E] dark:text-blue-100">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {expertiseAreas.map((area) => (
            <div
              key={area.title}
              className="group p-6 bg-white/50 dark:bg-[#022A5E]/5 rounded-xl shadow-md hover:shadow-lg 
                transition-all duration-300 hover:scale-[1.02] border border-slate-100 dark:border-[#034694]/10 
                hover:border-[#022A5E]/20 dark:hover:border-[#034694]/20 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#022A5E] to-[#034694] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-slate-800 dark:text-blue-50">
                  {area.title}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-[#022A5E]/5 dark:bg-[#034694]/10 text-[#022A5E] dark:text-blue-100 
                      rounded-full hover:bg-[#022A5E]/10 dark:hover:bg-[#034694]/20 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}