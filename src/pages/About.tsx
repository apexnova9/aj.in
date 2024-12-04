import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Code2, Database, Brain, Layers, Building2, Search, GitGraph } from 'lucide-react';

export default function About() {
  const skills = [
    {
      icon: <Code2 className="w-8 h-8 text-white" aria-hidden="true" />,
      title: "Core Technologies",
      description: "Expert in Java Core & Enterprise Stack with 14+ years of hands-on experience building scalable applications."
    },
    {
      icon: <GitGraph className="w-8 h-8 text-white" aria-hidden="true" />,
      title: "DSA & Problem Solving",
      description: "Strong foundation in Data Structures, Algorithms, and System Design with expertise in optimizing complex solutions."
    },
    {
      icon: <Database className="w-8 h-8 text-white" aria-hidden="true" />,
      title: "Big Data & Analytics",
      description: "Specialized in Big Data technologies including Apache Spark, Hadoop, and distributed data processing at scale."
    },
    {
      icon: <Search className="w-8 h-8 text-white" aria-hidden="true" />,
      title: "Search & Discovery",
      description: "Expert in Elasticsearch, Lucene, and implementing advanced search solutions with high performance and relevancy."
    },
    {
      icon: <Brain className="w-8 h-8 text-white" aria-hidden="true" />,
      title: "AI & Machine Learning",
      description: "Implementing cutting-edge AI and ML solutions to solve complex business problems and drive innovation."
    },
    {
      icon: <Layers className="w-8 h-8 text-white" aria-hidden="true" />,
      title: "Cloud Architecture",
      description: "Extensive experience with AWS services, cloud architecture, and implementing scalable cloud-native solutions."
    },
    {
      icon: <Building2 className="w-8 h-8 text-white" aria-hidden="true" />,
      title: "Domain Expertise",
      description: "Deep understanding of Finance, Anti Money Laundering, HR/Recruitment, Retail and E-commerce domains, delivering mission-critical solutions."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Amit Jha - Professional Background & Expertise</title>
        <meta name="description" content="Learn about Amit Jha's 14+ years of experience in Java Enterprise, Big Data, AI/ML, and Cloud Architecture. Discover his expertise in building scalable solutions." />
        <meta name="keywords" content="About Amit Jha, Java Expert, Big Data Engineer, Python Developer, Cloud Architect, Enterprise Solutions" />
        <meta property="og:title" content="About Amit Jha - Professional Background" />
        <meta property="og:description" content="Distinguished Engineer with 16+ years of experience in Java, Big Data, and Cloud Architecture." />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href="https://amitjha.in/about" />
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-[#022A5E]/5">
        <div className="container mx-auto px-6 py-24">
          <div className="grid gap-12 md:grid-cols-[320px_1fr]">
            <div className="space-y-8">
              <div className="sticky top-28">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-300 mb-6">
                  Distinguished Engineer
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Transforming complex challenges into elegant solutions with 14+ years of expertise
                </p>
                <div className="space-y-6">
                  <div className="p-6 bg-white dark:bg-[#022A5E]/90 rounded-xl border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm
                    hover:shadow-lg transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 dark:text-slate-300 mb-4">Core Expertise</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li>• Java Enterprise Stack</li>
                      <li>• Big Data Processing</li>
                      <li>• AI/ML Solutions</li>
                      <li>• Cloud Architecture</li>
                      <li>• Python Development</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-white dark:bg-[#022A5E]/90 rounded-xl border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm
                    hover:shadow-lg transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 dark:text-slate-300 mb-4">Domains</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li>• Finance</li>
                      <li>• E-commerce</li>
                      <li>• Enterprise Solutions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-slate-300">
                Technology Leader & Solution Architect
              </h2>
              
              <div className="space-y-8 text-gray-600 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  An accomplished technology leader and Solution Architect with over 14+ years of experience in driving enterprise-level 
                  technical solutions. Specializing in architecting complex, mission-critical systems across Banking & Finance, 
                  Healthcare, eCommerce, and Staffing & Recruitment sectors, with a focus on AI integration, cloud technologies, 
                  and Big Data platforms.
                </p>

                <div className="my-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-300 mb-6">
                    Key Areas of Excellence
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-slate-300 flex items-center">
                        <span className="w-2 h-2 mr-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        AI & Cloud Innovation
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 ml-4">
                        Led AI integration using AWS Bedrock, implementing cutting-edge solutions in AML and fraud detection systems.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-slate-300 flex items-center">
                        <span className="w-2 h-2 mr-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        Technical Architecture
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 ml-4">
                        Expertise in microservices, cloud-native architectures, and enterprise-scale distributed systems.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-slate-300 flex items-center">
                        <span className="w-2 h-2 mr-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        Search & Big Data
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 ml-4">
                        Advanced implementation of ElasticSearch, Hadoop, and Apache Spark for high-scale data processing.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-slate-300 flex items-center">
                        <span className="w-2 h-2 mr-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        Security & Compliance
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 ml-4">
                        Implementation of robust security frameworks and compliance standards in regulated industries.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="my-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-300 mb-6">
                    Professional Impact
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                      Spearheaded AWS Cloud Infrastructure Design and microservices adoption, ensuring high availability and operational efficiency.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                      Led multiple end-to-end product development initiatives in eCommerce, banking, and healthcare sectors.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                      Developed real-time transaction monitoring systems for AML and fraud detection using AI and machine learning.
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                      Drove Agile transformation and fostered a culture of continuous learning and innovation.
                    </li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed">
                  Committed to driving technical excellence and innovation, with a focus on integrating AI solutions into 
                  real-world applications. Proven track record in leading teams to create impactful, scalable products that 
                  solve complex business challenges while ensuring sustained growth and operational success.
                </p>

                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-slate-300">
                  Technical Expertise
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="group bg-white dark:bg-[#022A5E]/90 rounded-xl p-6 
                        transition-all duration-300 hover:shadow-lg border border-slate-200/50 dark:border-[#034694]/30 
                        backdrop-blur-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 
                          dark:from-blue-400 dark:to-blue-500 rounded-lg flex items-center justify-center 
                          shadow-md"
                        >
                          {skill.icon}
                        </div>
                        <h3 className="text-lg font-semibold ml-3 text-gray-900 dark:text-slate-300">
                          {skill.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}