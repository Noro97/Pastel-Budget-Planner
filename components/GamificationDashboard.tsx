import React from 'react';

import { COMPONENTS, COLORS, TYPOGRAPHY } from '../design-system';
import { BADGE_DATA } from '../gamification/badgeData';
import type { GamificationData, Badge } from '../types';

interface GamificationDashboardProps {
  gamificationData: GamificationData;
}

const BadgeItem = ({ badge, unlocked }: { badge: Badge; unlocked: boolean }) => (
  <div className='flex flex-col items-center text-center group relative'>
    <div
      className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${unlocked ? COLORS.status.success.bg : COLORS.neutral.bg.muted}`}
    >
      <badge.Icon unlocked={unlocked} />
    </div>
    <p
      className={`mt-1.5 md:mt-2 text-xs md:text-sm font-semibold ${unlocked ? COLORS.neutral.text.secondary : COLORS.neutral.text.light}`}
    >
      {badge.name}
    </p>
    <div
      className={`absolute bottom-full mb-2 w-40 md:w-48 bg-gray-800 text-white text-xs rounded-lg py-1.5 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10`}
    >
      {badge.description}
      <div className='absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800'></div>
    </div>
  </div>
);

const GamificationDashboard = ({ gamificationData }: GamificationDashboardProps) => {
  const { challenge, positiveDayStreak, unlockedBadgeIds } = gamificationData;
  const progressPercentage = Math.min(100, (challenge.progress / challenge.target) * 100);

  return (
    <div className={`${COMPONENTS.card} space-y-4 md:space-y-6`}>
      <h2 className={`${TYPOGRAPHY.heading.lg} ${COLORS.neutral.text.secondary}`}>
        Your Achievements
      </h2>

      <div className='space-y-2'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1'>
          <h3 className={`font-semibold ${COLORS.neutral.text.muted} text-sm md:text-base`}>{challenge.name}</h3>
          <p className='text-xs md:text-sm font-medium text-blue-600'>
            ${challenge.progress.toFixed(2)} / ${challenge.target.toFixed(2)}
          </p>
        </div>
        <div className={`w-full ${COLORS.neutral.bg.muted} rounded-full h-2.5`}>
          <div
            className={`bg-blue-500 h-2.5 rounded-full transition-all duration-500`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div
        className={`flex items-center justify-center ${COLORS.status.warning.bg} p-2.5 md:p-3 rounded-lg gap-2 md:gap-3`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 md:h-6 md:w-6 text-amber-500 flex-shrink-0'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'
          />
        </svg>
        <p className={`font-bold ${COLORS.status.warning.text} text-sm md:text-base`}>
          {positiveDayStreak} Day Positive Streak!
        </p>
      </div>

      <div className='space-y-3'>
        <h3 className={`font-semibold ${COLORS.neutral.text.muted} text-sm md:text-base`}>Badges</h3>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4'>
          {BADGE_DATA.map(badge => (
            <BadgeItem
              key={badge.id}
              badge={badge}
              unlocked={unlockedBadgeIds.includes(badge.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationDashboard;
