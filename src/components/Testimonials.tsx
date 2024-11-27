import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "An exceptional architect who consistently delivers innovative solutions. Their technical leadership transformed our enterprise architecture.",
    author: "Sarah Chen",
    role: "CTO, Tech Innovations Inc"
  },
  {
    text: "Remarkable ability to translate complex technical concepts into actionable business solutions. A true technology visionary.",
    author: "Michael Rodriguez",
    role: "VP Engineering, Global Systems"
  },
  {
    text: "Their expertise in AI and cloud architecture helped us achieve unprecedented efficiency gains. A invaluable technical leader.",
    author: "David Kumar",
    role: "Director of Innovation, Future Tech"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50" id="testimonials">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Client Testimonials</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg relative">
              <Quote className="absolute top-4 right-4 text-blue-100" size={48} />
              <p className="text-slate-600 mb-6 relative z-10">{testimonial.text}</p>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-slate-500 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}