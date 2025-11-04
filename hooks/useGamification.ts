import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

import { checkBadgeConditions } from '../gamification/badgeData';
import type { Transaction, GamificationData } from '../types';
import { TransactionType } from '../types';

const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

export const getInitialGamificationData = (): GamificationData => {
  const today = new Date();
  const startOfWeek = getStartOfWeek(today);

  return {
    unlockedBadgeIds: [],
    positiveDayStreak: 0,
    lastStreakUpdateDate: null,
    challenge: {
      id: 'weekly-savings-50',
      name: 'Weekly Savings Challenge',
      description: 'Save $50 this week!',
      target: 50,
      progress: 0,
      isComplete: false,
      startDate: startOfWeek.toISOString().split('T')[0],
    },
  };
};

export const useGamification = (
  transactions: Transaction[],
  gamificationData: GamificationData,
  setGamificationData: Dispatch<SetStateAction<GamificationData>>,
  stats: { balance: number }
) => {
  const prevDataRef = useRef<string>('');
  const prevTransactionsRef = useRef<string>('');
  const prevStatsRef = useRef<string>('');

  useEffect(() => {
    if (transactions.length === 0) {
      return;
    }

    const transactionsString = JSON.stringify(transactions);
    const statsString = JSON.stringify(stats);

    if (
      prevTransactionsRef.current === transactionsString &&
      prevStatsRef.current === statsString
    ) {
      return;
    }

    prevTransactionsRef.current = transactionsString;
    prevStatsRef.current = statsString;

    const today = new Date();
    const lastTransaction = transactions[0];
    const lastTransactionDate = new Date(lastTransaction.date);
    const lastTransactionDateStr = lastTransaction.date;

    const updatedData = { ...gamificationData };

    const newBadgeIds = checkBadgeConditions(transactions, stats);
    const allUnlockedIds = [...new Set([...updatedData.unlockedBadgeIds, ...newBadgeIds])];
    if (allUnlockedIds.length > updatedData.unlockedBadgeIds.length) {
      updatedData.unlockedBadgeIds = allUnlockedIds;
    }

    const startOfWeek = getStartOfWeek(today);
    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];

    if (updatedData.challenge.startDate !== startOfWeekStr) {
      updatedData.challenge = getInitialGamificationData().challenge;
    }

    const weeklyTransactions = transactions.filter(t => t.date >= startOfWeekStr);
    const weeklyIncome = weeklyTransactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const weeklyExpense = weeklyTransactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    const weeklySavings = weeklyIncome - weeklyExpense;

    updatedData.challenge.progress = Math.max(0, weeklySavings);
    updatedData.challenge.isComplete = weeklySavings >= updatedData.challenge.target;

    if (lastTransactionDateStr !== updatedData.lastStreakUpdateDate) {
      const transactionsForLastDay = transactions.filter(t => t.date === lastTransactionDateStr);
      const dayIncome = transactionsForLastDay
        .filter(t => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + t.amount, 0);
      const dayExpense = transactionsForLastDay
        .filter(t => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0);

      if (dayIncome > dayExpense) {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (updatedData.lastStreakUpdateDate === yesterdayStr) {
          updatedData.positiveDayStreak += 1;
        } else {
          updatedData.positiveDayStreak = 1;
        }
        updatedData.lastStreakUpdateDate = lastTransactionDateStr;
      } else {
        const lastUpdate = updatedData.lastStreakUpdateDate
          ? new Date(updatedData.lastStreakUpdateDate)
          : new Date(0);
        const timeDiff = lastTransactionDate.getTime() - lastUpdate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        if (dayDiff <= 1) {
          updatedData.positiveDayStreak = 0;
        }
      }
    }

    const updatedDataString = JSON.stringify(updatedData);
    if (prevDataRef.current !== updatedDataString) {
      prevDataRef.current = updatedDataString;
      setGamificationData(updatedData);
    }
  }, [transactions, stats, gamificationData, setGamificationData]);
};
