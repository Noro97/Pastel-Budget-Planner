import React from 'react';
import type { Badge, Transaction } from '../types';
import { TransactionType } from '../types';

// --- Badge Icon Components ---
// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const FirstStepIcon = ({ unlocked }: { unlocked: boolean }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: `h-8 w-8 ${unlocked ? 'text-emerald-500' : 'text-slate-300'}`,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  }))
);

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const BudgetBossIcon = ({ unlocked }: { unlocked: boolean }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: `h-8 w-8 ${unlocked ? 'text-sky-500' : 'text-slate-300'}`,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
  }))
);

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const SuperSaverIcon = ({ unlocked }: { unlocked: boolean }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: `h-8 w-8 ${unlocked ? 'text-amber-500' : 'text-slate-300'}`,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01M12 14c-1.657 0-3-.895-3-2s1.343-2 3-2 3-.895 3-2-1.343-2-3-2m0 8c1.11 0 2.08-.402 2.599-1M12 14v.01V15m0 1v.01V17m0-1.99V14"
  }))
);

// Fix: Converted JSX to React.createElement to be valid in a .ts file.
const CategoryExplorerIcon = ({ unlocked }: { unlocked: boolean }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: `h-8 w-8 ${unlocked ? 'text-violet-500' : 'text-slate-300'}`,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  }, React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0h8a4 4 0 004-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4z"
  }))
);


// --- Badge Definitions ---
type UnlockCondition = (transactions: Transaction[], stats: { balance: number }) => boolean;

interface BadgeWithCondition extends Badge {
  unlockCondition: UnlockCondition;
}

export const BADGE_DATA: BadgeWithCondition[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Add your first transaction.',
    Icon: FirstStepIcon,
    unlockCondition: (transactions) => transactions.length > 0,
  },
  {
    id: 'budget-boss',
    name: 'Budget Boss',
    description: 'Reach a balance of over $1,000.',
    Icon: BudgetBossIcon,
    unlockCondition: (_, stats) => stats.balance >= 1000,
  },
  {
    id: 'super-saver',
    name: 'Super Saver',
    description: 'Have a month where your income is double your expenses.',
    Icon: SuperSaverIcon,
    unlockCondition: (transactions) => {
      const monthlyTotals: { [key: string]: { income: number, expense: number } } = {};
      transactions.forEach(t => {
        const monthKey = t.date.substring(0, 7); // YYYY-MM
        if (!monthlyTotals[monthKey]) {
          monthlyTotals[monthKey] = { income: 0, expense: 0 };
        }
        if (t.type === TransactionType.INCOME) {
          monthlyTotals[monthKey].income += t.amount;
        } else {
          monthlyTotals[monthKey].expense += t.amount;
        }
      });
      return Object.values(monthlyTotals).some(month => month.income >= month.expense * 2 && month.expense > 0);
    },
  },
  {
    id: 'category-explorer',
    name: 'Category Explorer',
    description: 'Use 5 different expense categories.',
    Icon: CategoryExplorerIcon,
    unlockCondition: (transactions) => {
      const expenseCategories = new Set(
        transactions
          .filter(t => t.type === TransactionType.EXPENSE)
          .map(t => t.category)
      );
      return expenseCategories.size >= 5;
    },
  },
];

export const checkBadgeConditions = (transactions: Transaction[], stats: { balance: number }): string[] => {
  return BADGE_DATA
    .filter(badge => badge.unlockCondition(transactions, stats))
    .map(badge => badge.id);
};