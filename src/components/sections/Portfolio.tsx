import React from 'react';

const projects = [
  {
    title: 'Enterprise Cloud Migration',
    description: 'Led the migration of legacy systems to AWS, resulting in 35% cost reduction and improved scalability.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    tags: ['AWS', 'Cloud Architecture', 'DevOps']
  },
  {
    title: 'AI-Powered Analytics Platform',
    description: 'Developed machine learning models for predictive analytics, increasing business efficiency by 45%.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800',
    tags: ['Python', 'TensorFlow', 'Big Data']
  },
  {
    title: 'Microservices Architecture',
    description: 'Designed and implemented microservices architecture serving 2M+ daily users.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    tags: ['Java', 'Spring Boot', 'Kubernetes']
  }
];

export function Portfolio() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 dark:text-white">Featured Projects</h2>
      <div className="grid gap-8">
        {projects.map((project) => (
          <div key={project.title} className="group relative overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
            <div className="aspect-video">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}