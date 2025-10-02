// Fix: Import ReactElement to use as the type for React components.
import type { ReactElement } from 'react';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  category: string;
  date: string;
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  // Fix: Use ReactElement instead of JSX.Element.
  Icon: (props: { unlocked: boolean }) => ReactElement;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  target: number;
  progress: number;
  isComplete: boolean;
  startDate: string;
}

export interface GamificationData {
  unlockedBadgeIds: string[];
  positiveDayStreak: number;
  lastStreakUpdateDate: string | null;
  challenge: Challenge;
}