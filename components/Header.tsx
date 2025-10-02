import React from 'react';
import { COLORS, SPACING, TYPOGRAPHY } from '../design-system';

const Header = () => {
  return (
    <header className={`${COLORS.primary.teal[200]} shadow-md`}>
      <div className={`${SPACING.container} px-4 md:px-6 py-4`}>
        <h1 className={`${TYPOGRAPHY.heading.xl} ${COLORS.primary.teal[800]} tracking-wide`}>
          Pastel Budget Planner
        </h1>
      </div>
    </header>
  );
};

export default Header;