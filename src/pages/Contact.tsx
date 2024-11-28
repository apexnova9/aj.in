import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Contact as ContactComponent } from '../components/Contact';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Amit Jha - Get in Touch</title>
        <meta name="description" content="Get in touch with Amit Jha, Distinguished Engineer specializing in Java, Big Data, and Cloud Architecture. Connect for consulting or collaboration opportunities." />
        <meta name="keywords" content="Contact Amit Jha, Hire Java Expert, Big Data Consultant, Cloud Architecture Expert" />
        <meta property="og:title" content="Contact Amit Jha" />
        <meta property="og:description" content="Get in touch with Amit Jha for consulting or collaboration opportunities." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://amitjha.in/contact" />
      </Helmet>
      <div 
        className="container mx-auto px-4 py-28 lg:py-32"
        role="main"
        aria-label="Contact page content"
      >
        <ContactComponent />
      </div>
    </>
  );
}