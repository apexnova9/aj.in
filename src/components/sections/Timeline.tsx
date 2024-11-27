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
    <div>
      <h2 className="text-2xl font-bold mb-8">Professional Journey</h2>
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-blue-200"></div>
        <div className="space-y-12">
          {timelineEvents.map((event) => (
            <div key={event.year} className="relative pl-8">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-2">
                  {event.year}
                </span>
                <h3 className="text-xl font-semibold mb-1">{event.company}</h3>
                <p className="text-blue-600 mb-2">{event.role}</p>
                <p className="text-slate-600">{event.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}