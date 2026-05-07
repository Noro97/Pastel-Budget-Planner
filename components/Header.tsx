import React from 'react';

import { SPACING, TYPOGRAPHY } from '../design-system';

const Header = () => {
  return (
    <header className={`shadow-lg`}>
      <div className={`${SPACING.container} px-4 md:px-6 lg:px-8 py-5 md:py-6`}>
        <h1 className={`${TYPOGRAPHY.heading.xl} gradient-text tracking-tight`}>Budget Planner</h1>
        <p className='text-gray-600 text-sm md:text-base mt-1'>
          Manage your finances and subscriptions
        </p>
      </div>
    </header>
  );
};

export default Header;
