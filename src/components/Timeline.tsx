import React from 'react';

const timelineEvents = [
  {
    year: '2023',
    company: 'Tech Innovation Corp',
    role: 'Lead Solutions Architect',
    achievement: 'Led digital transformation initiative resulting in 40% cost reduction'
  },
  {
    year: '2020',
    company: 'Global Systems Inc',
    role: 'Senior Cloud Architect',
    achievement: 'Designed cloud-native architecture serving 1M+ users'
  },
  {
    year: '2017',
    company: 'Data Dynamics Ltd',
    role: 'Technical Lead',
    achievement: 'Implemented AI-driven analytics platform increasing efficiency by 60%'
  }
];

export function Timeline() {
  return (
    <section className="py-24 bg-slate-50" id="experience">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Professional Journey</h2>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-5/12"></div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="w-5/12 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-blue-600 font-bold mb-2">{event.year}</div>
                  <h3 className="text-xl font-semibold mb-1">{event.company}</h3>
                  <div className="text-slate-600 mb-2">{event.role}</div>
                  <p className="text-slate-500">{event.achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}