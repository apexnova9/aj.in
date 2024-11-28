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
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-[#022A5E] dark:text-blue-200 mb-6">
                Technology Leader & Solution Architect
              </h2>
              
              <div className="space-y-6 text-slate-600 dark:text-slate-300">
                <p className="text-lg leading-relaxed">
                  An accomplished technology leader and Solution Architect with over 16+ years of experience in driving enterprise-level 
                  technical solutions. Specializing in architecting complex, mission-critical systems across Banking & Finance, 
                  Healthcare, eCommerce, and Staffing & Recruitment sectors, with a focus on AI integration, cloud technologies, 
                  and Big Data platforms.
                </p>

                <div className="my-8">
                  <h3 className="text-xl font-semibold text-[#022A5E] dark:text-blue-200 mb-4">
                    Key Areas of Excellence
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200 flex items-center">
                        <span className="w-2 h-2 mr-2 rounded-full bg-[#022A5E] dark:bg-blue-400"></span>
                        AI & Cloud Innovation
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 ml-4">
                        Led AI integration using AWS Bedrock, implementing cutting-edge solutions in AML and fraud detection systems.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200 flex items-center">
                        <span className="w-2 h-2 mr-2 rounded-full bg-[#022A5E] dark:bg-blue-400"></span>
                        Technical Architecture
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 ml-4">
                        Expertise in microservices, cloud-native architectures, and enterprise-scale distributed systems.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200 flex items-center">
                        <span className="w-2 h-2 mr-2 rounded-full bg-[#022A5E] dark:bg-blue-400"></span>
                        Search & Big Data
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 ml-4">
                        Advanced implementation of ElasticSearch, Hadoop, and Apache Spark for high-scale data processing.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200 flex items-center">
                        <span className="w-2 h-2 mr-2 rounded-full bg-[#022A5E] dark:bg-blue-400"></span>
                        Security & Compliance
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 ml-4">
                        Implementation of robust security frameworks and compliance standards in regulated industries.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#022A5E] dark:text-blue-200 mb-4">
                    Professional Impact
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#022A5E] dark:bg-blue-400"></span>
                      <span>Spearheaded AWS Cloud Infrastructure Design and microservices adoption, ensuring high availability and operational efficiency.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#022A5E] dark:bg-blue-400"></span>
                      <span>Led multiple end-to-end product development initiatives in eCommerce, banking, and healthcare sectors.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#022A5E] dark:bg-blue-400"></span>
                      <span>Developed real-time transaction monitoring systems for AML and fraud detection using AI and machine learning.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-[#022A5E] dark:bg-blue-400"></span>
                      <span>Drove Agile transformation and fostered a culture of continuous learning and innovation.</span>
                    </li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-12">
                  Committed to driving technical excellence and innovation, with a focus on integrating AI solutions into 
                  real-world applications. Proven track record in leading teams to create impactful, scalable products that 
                  solve complex business challenges while ensuring sustained growth and operational success.
                </p>

                <h3 className="text-2xl font-bold text-[#022A5E] dark:text-blue-200 mb-6">
                  Technical Expertise
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800
                        hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#022A5E] to-[#034694] rounded-lg flex items-center justify-center shadow-md mb-4">
                        {React.cloneElement(skill.icon, { className: "w-6 h-6 text-white" })}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
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