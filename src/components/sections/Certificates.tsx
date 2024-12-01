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
      <div className="grid gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{cert.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 mb-1">{cert.issuer}</p>
            <p className="text-slate-600 dark:text-slate-300">Issued {cert.year} • ID: {cert.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}