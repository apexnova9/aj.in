import React from 'react';
import type { ContentSection } from '../layout/MainLayout';

interface NavigationCardProps {
  activeSection: ContentSection;
  onSectionChange: (section: ContentSection) => void;
}

export function NavigationCard({ activeSection, onSectionChange }: NavigationCardProps) {
  const menuItems: { id: ContentSection; label: string }[] = [
    { id: 'expertise', label: 'Technical Expertise' },
    { id: 'experience', label: 'Experience' },
    //{ id: 'portfolio', label: 'Portfolio' },
    //{ id: 'recommendations', label: 'Recommendations' },
    { id: 'education', label: 'Education' },
    { id: 'certificates', label: 'Certificates' }
  ];

  return (
    <nav className="flex flex-wrap gap-2">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeSection === item.id
              ? 'bg-blue-50 dark:bg-[#034694]/50 text-blue-600 dark:text-blue-300 font-medium'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#022A5E]/90'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}