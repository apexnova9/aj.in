import React, { useState } from 'react';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';

export type ContentSection = 'expertise' | 'experience' | 'portfolio' | 'recommendations' | 'education' | 'certificates';

export function MainLayout() {
  const [activeSection, setActiveSection] = useState<ContentSection>('expertise');

  return (
    <div className="lg:grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 mb-8 lg:mb-0">
        <LeftColumn activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>
      <div className="lg:col-span-8">
        <RightColumn activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>
    </div>
  );
}