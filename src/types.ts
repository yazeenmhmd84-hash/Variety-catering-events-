import React from 'react';

export interface Occasion {
  id: string;
  name: string;
  malayalam: string;
  icon: React.ReactNode;
  shortDesc: string;
  detailedDesc: string;
  malayalamDetailedDesc: string;
  heroImage: string;
  highlights: string[];
  malayalamHighlights: string[];
}
