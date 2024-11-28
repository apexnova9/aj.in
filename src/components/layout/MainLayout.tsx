import React, { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { Footer } from './Footer';

export type ContentSection = 'expertise' | 'experience' | 'portfolio' | 'recommendations' | 'education' | 'certificates';

export function MainLayout() {
  const [activeSection, setActiveSection] = useState<ContentSection>('expertise');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-white transition-colors flex flex-col">
      <TopNavigation />
      
      <main className="container mx-auto px-4 py-20 lg:py-24 flex-grow">
        <div className="lg:grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 mb-8 lg:mb-0">
            <LeftColumn activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>
          <div className="lg:col-span-8">
            <RightColumn activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}