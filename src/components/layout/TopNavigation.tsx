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
    <nav className={`fixed w-full z-50 transition-all ${
      isScrolled ? 'bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-sm py-4' : 'bg-slate-900 dark:bg-slate-800 py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white">
            <div className="font-bold text-2xl">Amit Jha</div>
            <div className="text-sm text-slate-300">Architecting Digital Excellence</div>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-slate-300 hover:text-white transition-colors ${
                    location.pathname === item.path ? 'text-white' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="pl-4 md:pl-8">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-700 text-white transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 text-slate-300 hover:text-white transition-colors ${
                  location.pathname === item.path ? 'text-white' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}