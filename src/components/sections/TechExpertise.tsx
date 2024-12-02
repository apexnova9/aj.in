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
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Technical Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {expertiseAreas.map((area) => (
          <div
            key={area.title}
            className="group bg-white dark:bg-[#022A5E]/5 rounded-xl p-6 
              transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-[#034694]/20
              hover:border-blue-200 dark:hover:border-[#034694]/30 backdrop-blur-sm"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/90 to-blue-600/90 
                dark:from-blue-400/90 dark:to-blue-500/90 rounded-lg flex items-center justify-center 
                shadow-md group-hover:shadow-lg transition-all duration-300 
                group-hover:from-blue-500 group-hover:to-blue-600 
                dark:group-hover:from-blue-400 dark:group-hover:to-blue-500"
              >
                <area.icon className="w-5 h-5 text-white/90 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold ml-3 text-gray-900 dark:text-gray-100">
                {area.title}
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
              {area.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {area.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-500/10 
                    text-blue-700 dark:text-blue-300 rounded-full border border-transparent
                    dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 
                    transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}