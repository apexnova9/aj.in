import React from 'react';

export function Certificates() {
  const certificates = [
   /* {
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      year: '2023',
      id: 'AWS-SAP-123456'
    },*/
    {
      name: 'Diploma in Computer Science',
      issuer: 'APTECH',
      year: '2003',
      id: '0005938'
    },
    {
      name: 'Certificate in Computing',
      issuer: 'IGNOU',
      year: '2002',
      id: '0027363'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 dark:text-white">Professional Certificates</h2>
      <div className="space-y-8">
        {certificates.map((cert) => (
          <div 
            key={cert.id} 
            className="border-l-4 border-blue-600 dark:border-blue-500 pl-6"
          >
            <h3 className="text-xl font-semibold dark:text-white">
              {cert.name}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 mb-2">
              {cert.issuer} • {cert.year}
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-mono text-sm">
              Certificate ID: {cert.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}