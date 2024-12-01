import React from 'react';

export function Education() {
  const education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Sikkim Manipal University - DE',
      year: '2017',
      description: 'Focus on Software Engineering and Database Systems'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 dark:text-white">Education</h2>
      <div className="space-y-8">
        {education.map((edu) => (
          <div key={edu.degree} className="border-l-4 border-blue-600 dark:border-blue-500 pl-6">
            <h3 className="text-xl font-semibold dark:text-white">{edu.degree}</h3>
            <p className="text-blue-600 dark:text-blue-400 mb-2">{edu.school} • {edu.year}</p>
            <p className="text-slate-600 dark:text-slate-300">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}