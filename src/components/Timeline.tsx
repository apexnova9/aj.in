import React from 'react';
import { BriefcaseIcon } from 'lucide-react';

interface TimelineItem {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

const experiences: TimelineItem[] = [
  {
    role: "Sr. Technical Lead",
    company: "Compunnel Technology India Pvt Ltd",
    location: "Noida",
    startDate: "September 2017",
    endDate: "August 2019",
    responsibilities: [
      "Technical Mentor to the team and ownership of technical delivery",
      "Worked as individual contributor"
    ]
  },
  {
    role: "Technical Lead",
    company: "Mindtek India Pvt Ltd (Contractor HP Enterprise)",
    location: "Bengaluru",
    startDate: "May 2017",
    endDate: "September 2017",
    responsibilities: [
      "Individual Contributor/Contractor"
    ]
  },
  {
    role: "Technical Lead",
    company: "Eli Research India Pvt Ltd",
    location: "Faridabad",
    startDate: "August 2016",
    endDate: "November 2016",
    responsibilities: [
      "Programming and Development",
      "Technical Leadership and Mentoring"
    ]
  },
  {
    role: "Technical Lead",
    company: "Hays Business Solutions Pvt Ltd",
    location: "Noida",
    startDate: "October 2012",
    endDate: "August 2016",
    responsibilities: [
      "Solutions Design and Implementation",
      "Coding and Development",
      "Technical Leadership and Mentoring",
      "Communication and Co-ordination in cross functional team in onshore and offshore model"
    ]
  },
  {
    role: "Professional Freelancer",
    company: "Freelancer with POW New Media and Elance Inc",
    location: "Remote",
    startDate: "October 2008",
    endDate: "September 2012",
    responsibilities: [
      "Programming and Development"
    ]
  },
  {
    role: "Analyst Programmer",
    company: "Binary Semantics Ltd",
    location: "Gurgaon",
    startDate: "February 2007",
    endDate: "September 2008",
    responsibilities: []
  }
];

export function Timeline() {
  return (
    <div className="relative container mx-auto px-4">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200 dark:bg-slate-700"></div>
      
      {experiences.map((experience, index) => (
        <div key={index} className={`relative flex items-center mb-12 ${
          index % 2 === 0 ? 'flex-row-reverse' : ''
        }`}>
          <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-[#022A5E] dark:text-[#034694] mb-1">
                {experience.role}
              </h3>
              <div className="text-slate-600 dark:text-slate-300 font-medium mb-2">
                {experience.company}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                {experience.location}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                {experience.startDate} - {experience.endDate}
              </div>
              {experience.responsibilities.length > 0 && (
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  {experience.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#022A5E] dark:bg-[#034694] rounded-full flex items-center justify-center shadow-lg">
              <BriefcaseIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
