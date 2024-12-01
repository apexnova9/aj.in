import React from 'react';

const timelineEvents = [
  {
    year: '2021',
    company: 'Genpact LLC (RiskCanvas)',
    location: 'USA',
    role: 'Assistant Vice President',
    duration: 'Nov 2021 - Present',
    achievements: [
      'Solution Architecture and design',
      'Programming and Development',
      'Technical Leadership and Mentoring',
      'Anti Money Laundering fintech product'

    ]
  },
  {
    year: '2021',
    company: 'Genpact India (RiskCanvas)',
    location: 'Noida',
    role: 'Assistant Vice President',
    duration: 'Sep 2021 - Nov 2021',
    achievements: [
      'Solution Architecture and design',
      'Programming and Development',
      'Technical Leadership and Mentoring',
      'Communication and Co-ordination in cross functional team in onshore and offshore model',
      'Anti Money Laundering fintech product'
    ]
  },
  {
    year: '2019',
    company: 'Genpact India (RiskCanvas)',
    location: 'Noida',
    role: 'Sr. Manager',
    duration: 'Aug 2019 - Aug 2021',
    achievements: [
      'Architect Design, Programming and Development',
      'Technical Leadership and Mentoring',
      'Communication and Co-ordination in cross functional team in onshore and offshore model',
      'Anti Money Laundering fintech product'
    ]
  },
  {
    year: '2017',
    company: 'Compunnel Technology India Pvt Ltd',
    location: 'Noida',
    role: 'Sr. Technical Lead',
    duration: 'Sep 2017 - Aug 2019',
    achievements: [
      'Technical Mentor to the team',
      'Individul Contributor to the team as Sr Technical Lead',
      'Solution Architecture and design',
      'Programming and Development',
      'Worked as individual contributor'
    ]
  },
  {
    year: '2017',
    company: 'Mindtek India Pvt Ltd (HP Enterprise)',
    location: 'Bengaluru',
    role: 'Technical Lead',
    duration: 'May 2017 - Sep 2017',
    achievements: [
      'Individual Contributor/Contractor at HP Enterprise'
    ]
  },
  {
    year: '2016',
    company: 'Eli Research India Pvt Ltd',
    location: 'Faridabad',
    role: 'Technical Lead',
    duration: 'Aug 2016 - Nov 2016',
    achievements: [
      'Programming and Development',
      'Technical Leadership and Mentoring'
    ]
  },
  {
    year: '2012',
    company: 'Hays Business Solutions Pvt Ltd',
    location: 'Noida',
    role: 'Technical Lead',
    duration: 'Oct 2012 - Aug 2016',
    achievements: [
      'Solutions Design and Implementation',
      'Coding and Development',
      'Technical Leadership and Mentoring',
      'Communication and Co-ordination in cross functional team in onshore and offshore model'
    ]
  },
  {
    year: '2008',
    company: 'Professional Freelancer',
    role: 'Independent Consultant',
    duration: 'Oct 2008 - Sep 2012',
    achievements: [
      'Programming and Development'
    ]
  },
  {
    year: '2007',
    company: 'Binary Semantics Ltd',
    location: 'Gurgaon',
    role: 'Analyst Programmer',
    duration: 'Feb 2007 - Sep 2008',
    achievements: [
      'Programming and Development',
      'Client communication and interaction'
    ]
  }
];

export function Timeline() {
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-8 dark:text-white">Professional Experience</h2>
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-[#034694] dark:bg-[#022A5E] opacity-20"></div>
        <div className="space-y-12">
          {timelineEvents.map((event) => (
            <div key={event.year + event.company} className="relative pl-8">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#034694] dark:border-[#022A5E] bg-white dark:bg-slate-900"></div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <span className="inline-block px-3 py-1 bg-[#034694] bg-opacity-10 dark:bg-[#022A5E] dark:bg-opacity-20 text-[#034694] dark:text-[#022A5E] rounded-full text-sm font-medium">
                    {event.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1 dark:text-white">{event.company}</h3>
                {event.location && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{event.location}</p>
                )}
                <p className="text-[#034694] dark:text-[#022A5E] mb-2 font-medium">{event.role}</p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                  {event.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm">{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}