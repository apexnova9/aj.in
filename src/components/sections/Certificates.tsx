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
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Professional Certificates</h2>
      <div className="grid gap-6">
        {certificates.map((cert) => (
          <div 
            key={cert.id} 
            className="bg-white dark:bg-[#022A5E]/90 rounded-xl p-6 
              border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm
              transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {cert.name}
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-1 font-medium">
              {cert.issuer}
            </p>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
              <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-500/10 
                rounded-full border border-transparent dark:border-[#034694]/30">
                {cert.year}
              </span>
              <span>•</span>
              <span className="font-mono">ID: {cert.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}