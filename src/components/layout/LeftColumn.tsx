import React from 'react';
import { ProfileCard } from '../cards/ProfileCard';
import { BioCard } from '../cards/BioCard';
import type { ContentSection } from './MainLayout';

interface LeftColumnProps {
  activeSection: ContentSection;
  onSectionChange: (section: ContentSection) => void;
}

export function LeftColumn({ activeSection, onSectionChange }: LeftColumnProps) {
  return (
    <div className="space-y-8 sticky top-24">
      <ProfileCard />
      <BioCard />
    </div>
  );
}