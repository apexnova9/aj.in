import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

export function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#022A5E]/95 backdrop-blur-sm shadow-lg py-2' 
        : 'bg-[#022A5E] py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div>
              <div className="font-bold text-xl sm:text-2xl text-white group-hover:text-blue-200 transition-all duration-300">
                Amit Jha
              </div>
              <div className="text-xs sm:text-sm text-blue-200 group-hover:text-white transition-all duration-300">
                Architecting Digital Excellence
              </div>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-blue-100 hover:text-white transition-all duration-300 text-sm relative
                    after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-200 
                    after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full
                    ${location.pathname === item.path ? 'text-white after:w-full' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-blue-200" />
              ) : (
                <Moon className="w-5 h-5 text-blue-200" />
              )}
            </button>

            <button
              className="md:hidden text-white hover:text-blue-200 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full mt-2 mx-4 bg-[#022A5E] rounded-lg shadow-lg border border-blue-900/20">
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-2 text-sm text-blue-100 hover:text-white hover:bg-white/10
                    transition-all duration-300 ${location.pathname === item.path ? 'text-white bg-white/5' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}