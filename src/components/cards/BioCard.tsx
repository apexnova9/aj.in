import React from 'react';

export function BioCard() {
  const tagCategories = [
        {
      title: 'AI & Innovation',
      tags: ['AI', 'MachineLearning', 'DeepLearning', 'NLP', 'ComputerVision',
             'MLOps', 'DataScience', 'AIInnovation', 'ScikitLearn', 'TensorFlow']
    },
    {
      title: 'Architecture & Cloud',
      tags: ['EnterpriseArchitecture', 'CloudArchitecture', 'MicroservicesArchitecture', 'CloudNative',
             'AWS', 'Azure', 'Kubernetes', 'Docker', 'Serverless']
    },
    {
      title: 'Java & Enterprise Stack',
      tags: ['Java', 'SpringBoot', 'SpringCloud', 'SpringSecurity', 'Hibernate',
             'JPA', 'Microservices', 'ApacheCamel', 'JavaEE']
    },
    {
      title: 'Data Engineering & Big Data',
      tags: ['ApacheSpark', 'PySpark', 'Kafka', 'Airflow', 'Databricks',
             'Pandas', 'NumPy', 'Hadoop', 'DataLake', 'DataWarehouse',
             'StreamProcessing', 'BatchProcessing', 'ETL', 'DataPipelines']
    },    
    {
      title: 'Data Storage & Processing',
      tags: ['Redis', 'ElasticSearch', 'MongoDB', 'Cassandra', 'PostgreSQL',
             'GraphQL', 'RESTful', 'Snowflake', 'dbt', 'DataOps']
    },
    {
      title: 'Development & Tools',
      tags: ['React', 'NodeJS', 'Python', 'DevOps',
             'Maven', 'Gradle', 'JUnit', 'CI/CD', 'GitOps']
    },
    {
      title: 'Domain Expertise',
      tags: ['DigitalTransformation', 'SystemsIntegration', 'API-First',
             'EventDrivenArchitecture', 'DomainDrivenDesign']
    },
    {
      title: 'Best Practices',
      tags: ['CleanCode', 'AgileMethodology', 'SecurityByDesign',
             'CloudSecurity', 'PerformanceOptimization']
    }
  ];

  return (
    <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl shadow-sm p-6 border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Amit Jha
        </h1>
        <h2 className="text-lg text-blue-600 dark:text-blue-300 font-medium">
          Distinguished Architect | AI & Cloud Innovation Leader
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
        With 14+ years of experience in enterprise architecture and software development,
        I specialize in designing and implementing scalable solutions that drive business
        transformation. My expertise spans cloud architecture, AI/ML implementation, and
        enterprise systems integration. I'm passionate about leveraging cutting-edge
        technologies to solve complex business challenges while maintaining a focus on
        security, scalability, and maintainability.
      </p>
      
      {/* Technology Tags */}
      <div className="border-t border-slate-200/50 dark:border-[#034694]/30 pt-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Technology Expertise
        </h3>
        <div className="space-y-8">
          {tagCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              <h4 className="text-base font-semibold text-blue-600 dark:text-blue-300 flex items-center">
                <span className="mr-2">{category.title}</span>
                <div className="flex-grow h-px bg-slate-200/50 dark:bg-[#034694]/30"></div>
              </h4>
              <div className="flex flex-wrap gap-2 pl-2">
                {category.tags.map((tag) => {
                  const isAIStack = category.title === 'AI & Innovation';
                  const isDataStack = category.title === 'Data Engineering & Big Data' || 
                                    category.title === 'Data Storage & Processing';
                  const isJavaStack = category.title === 'Java & Enterprise Stack';
                  
                  let tagStyle = '';
                  if (isAIStack) {
                    tagStyle = 'bg-purple-100 dark:bg-purple-800/40 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700/50';
                  } else if (isDataStack) {
                    tagStyle = 'bg-green-100 dark:bg-green-800/40 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700/50';
                  } else if (isJavaStack) {
                    tagStyle = 'bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700/50';
                  } else {
                    tagStyle = 'bg-slate-100 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700/50';
                  }
                  
                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${tagStyle}
                        border hover:bg-opacity-90 transition-all duration-200
                        transform hover:scale-105`}
                    >
                      #{tag}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}