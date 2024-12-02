import React from 'react';
import { NavigationCard } from '../cards/NavigationCard';
import TechExpertise from '../sections/TechExpertise';
import { Timeline } from '../sections/Timeline';
import { Portfolio } from '../sections/Portfolio';
import { Testimonials } from '../sections/Testimonials';
import { Education } from '../sections/Education';
import { Certificates } from '../sections/Certificates';
import type { ContentSection } from './MainLayout';

interface RightColumnProps {
  activeSection: ContentSection;
  onSectionChange: (section: ContentSection) => void;
}

export function RightColumn({ activeSection, onSectionChange }: RightColumnProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'expertise':
        return <TechExpertise />;
      case 'experience':
        return <Timeline />;
      case 'portfolio':
        return <Portfolio />;
      case 'recommendations':
        return <Testimonials />;
      case 'education':
        return <Education />;
      case 'certificates':
        return <Certificates />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl shadow-sm p-4 mb-8 overflow-x-auto 
        border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm">
        <NavigationCard activeSection={activeSection} onSectionChange={onSectionChange} />
      </div>
      <div className="bg-white dark:bg-[#022A5E]/90 rounded-xl shadow-sm pt-12 px-8 pb-12
        border border-slate-200/50 dark:border-[#034694]/30 backdrop-blur-sm">
        {renderContent()}
      </div>
    </div>
  );
}