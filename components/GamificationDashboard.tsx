import React from 'react';
import type { GamificationData, Badge } from '../types';
import { BADGE_DATA } from '../gamification/badgeData';

interface GamificationDashboardProps {
  gamificationData: GamificationData;
}

const BadgeItem = ({ badge, unlocked }: { badge: Badge, unlocked: boolean }) => (
  <div className="flex flex-col items-center text-center group relative">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${unlocked ? 'bg-green-100' : 'bg-slate-100'}`}>
      <badge.Icon unlocked={unlocked} />
    </div>
    <p className={`mt-2 text-sm font-semibold ${unlocked ? 'text-slate-700' : 'text-slate-400'}`}>{badge.name}</p>
    <div className="absolute bottom-full mb-2 w-48 bg-slate-800 text-white text-xs rounded-lg py-1.5 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      {badge.description}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
    </div>
  </div>
);

const GamificationDashboard = ({ gamificationData }: GamificationDashboardProps) => {
  const { challenge, positiveDayStreak, unlockedBadgeIds } = gamificationData;
  const progressPercentage = Math.min(100, (challenge.progress / challenge.target) * 100);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-slate-700">Your Achievements</h2>
      
      {/* Weekly Challenge */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold text-slate-600">{challenge.name}</h3>
          <p className="text-sm font-medium text-sky-600">
            ${challenge.progress.toFixed(2)} / ${challenge.target.toFixed(2)}
          </p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div
            className="bg-sky-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Streaks */}
      <div className="flex items-center justify-center bg-amber-100 p-3 rounded-lg space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
        <p className="font-bold text-amber-800">
          {positiveDayStreak} Day Positive Streak!
        </p>
      </div>
      
      {/* Badges */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-600">Badges</h3>
        <div className="grid grid-cols-4 gap-4">
          {BADGE_DATA.map(badge => (
            <BadgeItem key={badge.id} badge={badge} unlocked={unlockedBadgeIds.includes(badge.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationDashboard;
