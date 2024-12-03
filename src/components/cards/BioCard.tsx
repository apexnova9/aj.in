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
        <div className="space-y-6">
          {tagCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => {
                  const isDataStack = tag.includes('Data') || tag.includes('Spark') || 
                                    tag.includes('Kafka') || tag.includes('ETL') ||
                                    tag.includes('Pipeline');
                  const isJavaStack = tag.includes('Java') || tag.includes('Spring') || 
                                    tag.includes('Hibernate') || tag.includes('JPA');
                  
                  let tagStyle = '';
                  if (isDataStack) {
                    tagStyle = 'bg-green-100 dark:bg-green-800/40 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700/50';
                  } else if (isJavaStack) {
                    tagStyle = 'bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700/50';
                  } else {
                    tagStyle = 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-transparent dark:border-[#034694]/30';
                  }
                  
                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${tagStyle}
                        border hover:bg-opacity-80 transition-colors duration-200`}
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