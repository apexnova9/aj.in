import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Code2, Database, Brain, Layers, Building2, Search, GitGraph } from 'lucide-react';

export default function About() {
  const skills = [
    {
      icon: <Code2 className="w-8 h-8 text-blue-500" aria-hidden="true" />,
      title: "Core Technologies",
      description: "Expert in Java Core & Enterprise Stack with 16 years of hands-on experience building scalable applications."
    },
    {
      icon: <GitGraph className="w-8 h-8 text-rose-500" aria-hidden="true" />,
      title: "DSA & Problem Solving",
      description: "Strong foundation in Data Structures, Algorithms, and System Design with expertise in optimizing complex solutions."
    },
    {
      icon: <Database className="w-8 h-8 text-green-500" aria-hidden="true" />,
      title: "Big Data & Analytics",
      description: "Specialized in Big Data technologies including Apache Spark, Hadoop, and distributed data processing at scale."
    },
    {
      icon: <Search className="w-8 h-8 text-amber-500" aria-hidden="true" />,
      title: "Search & Discovery",
      description: "Expert in Elasticsearch, Lucene, and implementing advanced search solutions with high performance and relevancy."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" aria-hidden="true" />,
      title: "AI & Machine Learning",
      description: "Implementing cutting-edge AI and ML solutions to solve complex business problems and drive innovation."
    },
    {
      icon: <Layers className="w-8 h-8 text-sky-500" aria-hidden="true" />,
      title: "Cloud Architecture",
      description: "Extensive experience with AWS services, cloud architecture, and implementing scalable cloud-native solutions."
    },
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" aria-hidden="true" />,
      title: "Domain Expertise",
      description: "Deep understanding of Finance, Anti Money Laundering, HR/Recruitment, Retail and E-commerce domains, delivering mission-critical solutions."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Amit Jha - Professional Background & Expertise</title>
        <meta name="description" content="Learn about Amit Jha's 16+ years of experience in Java Enterprise, Big Data, AI/ML, and Cloud Architecture. Discover his expertise in building scalable solutions." />
        <meta name="keywords" content="About Amit Jha, Java Expert, Big Data Engineer, Python Developer, Cloud Architect, Enterprise Solutions" />
        <meta property="og:title" content="About Amit Jha - Professional Background" />
        <meta property="og:description" content="Distinguished Engineer with 16+ years of experience in Java, Big Data, and Cloud Architecture." />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href="https://amitjha.in/about" />
      </Helmet>
      <div 
        className="container mx-auto px-4 py-28 lg:py-32 flex-grow"
        role="main"
        aria-label="About page content"
      >
        <div className="lg:grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 mb-8 lg:mb-0">
            <div className="sticky top-24">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Distinguished Engineer
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                Transforming complex challenges into elegant solutions with 16+ years of expertise
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Core Expertise</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li>• Java Enterprise Stack</li>
                    <li>• Big Data Processing</li>
                    <li>• AI/ML Solutions</li>
                    <li>• Cloud Architecture</li>
                    <li>• Python Development</li>
                  </ul>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Domains</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li>• Finance</li>
                    <li>• E-commerce</li>
                    <li>• Enterprise Solutions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="prose dark:prose-invert max-w-none mb-12">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                With over 16 years of experience in software engineering, I've dedicated my career to building robust, 
                scalable solutions that drive business success. As a Distinguished Engineer, I combine deep technical 
                expertise with strategic thinking to tackle complex challenges in the ever-evolving technology landscape.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <div className="mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Technical Proficiency
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Enterprise Development</h3>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>Spring Framework & Spring Boot</li>
                    <li>Microservices Architecture</li>
                    <li>RESTful APIs & GraphQL</li>
                    <li>Enterprise Integration Patterns</li>
                    <li>Python & Django/Flask</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Big Data & Analytics</h3>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>Apache Spark & Hadoop Ecosystem</li>
                    <li>Elasticsearch & ELK Stack</li>
                    <li>Data Warehousing & ETL</li>
                    <li>Real-time Analytics</li>
                    <li>Apache Kafka</li>
                    <li>Python Data Science Stack (NumPy, Pandas)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Cloud & DevOps</h3>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>AWS Cloud Services</li>
                    <li>Docker & Kubernetes</li>
                    <li>CI/CD Pipelines</li>
                    <li>Infrastructure as Code</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Database Technologies</h3>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>SQL (Oracle, PostgreSQL, MySQL)</li>
                    <li>NoSQL (MongoDB, Cassandra)</li>
                    <li>Database Design & Optimization</li>
                    <li>Data Modeling & Schema Design</li>
                    <li>Hbase, Parquet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}