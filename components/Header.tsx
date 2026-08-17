import React from 'react';

import { COLORS, SPACING, TYPOGRAPHY } from '../design-system';

const Header = () => {
  return (
    <header className={`bg-gradient-to-r from-blue-600 to-emerald-500 shadow-lg`}>
      <div className={`${SPACING.container} px-4 md:px-6 lg:px-8 py-5 md:py-6`}>
        <h1 className={`${TYPOGRAPHY.heading.xl} text-white tracking-tight`}>
          Budget Planner
        </h1>
        <p className='text-blue-50 text-sm md:text-base mt-1'>
          Manage your finances and subscriptions
        </p>
      </div>
    </header>
  );
};

export default Header;
