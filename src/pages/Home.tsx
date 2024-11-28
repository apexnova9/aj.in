import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '../components/layout/MainLayout';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Amit Jha - Distinguished Engineer | Java & Big Data Expert</title>
        <meta name="description" content="Distinguished Engineer with 16+ years of experience in Java, Big Data, AI/ML, and Cloud Architecture. Expert in building scalable enterprise solutions." />
        <meta name="keywords" content="Amit Jha, Distinguished Engineer, Java, Big Data, Python, AI/ML, Cloud Architecture, Enterprise Solutions" />
        <meta property="og:title" content="Amit Jha - Distinguished Engineer" />
        <meta property="og:description" content="Distinguished Engineer with expertise in Java, Big Data, AI/ML, and Cloud Architecture." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://amitjha.in" />
      </Helmet>
      <div 
        className="container mx-auto px-4 py-28 lg:py-32 flex-grow"
        role="main"
        aria-label="Home page content"
      >
        <MainLayout />
      </div>
    </>
  );
}