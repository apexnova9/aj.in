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
    <div>
      <h2 className="text-2xl font-bold mb-8">Client Testimonials</h2>
      <div className="grid gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-slate-50 p-6 rounded-xl relative">
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
  );
}