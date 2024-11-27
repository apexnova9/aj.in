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
    <section className="py-24 bg-white" id="portfolio">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="group relative overflow-hidden rounded-xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-600/20 text-blue-100 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}