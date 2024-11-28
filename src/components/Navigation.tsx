import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Expertise', 'Experience', 'Portfolio', 'Blog', 'Testimonials', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gradient-to-r from-[#022A5E] to-[#034694]/95 backdrop-blur-sm shadow-lg py-4' : 'bg-gradient-to-r from-[#022A5E] to-[#034694] py-6'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white hover:text-blue-200 transition-all duration-300 transform hover:scale-105">
            IT Architect
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-blue-100 hover:text-white hover:scale-105 transform transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-white hover:text-blue-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gradient-to-r from-[#022A5E] to-[#034694]/95 backdrop-blur-sm rounded-lg p-4 shadow-xl">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-blue-100 hover:text-white hover:translate-x-2 transform transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}