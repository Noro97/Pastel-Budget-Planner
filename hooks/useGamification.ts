import React, { useEffect, useRef } from 'react';
import type { Transaction, GamificationData } from '../types';
import { TransactionType } from '../types';
import { BADGE_DATA, checkBadgeConditions } from '../gamification/badgeData';

// Utility to get the start of the week (Monday)
const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
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
  setGamificationData: React.Dispatch<React.SetStateAction<GamificationData>>,
  stats: { balance: number }
) => {
  const prevDataRef = useRef<string>('');

  useEffect(() => {
    if (transactions.length === 0) return;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const lastTransaction = transactions[0];
    const lastTransactionDate = new Date(lastTransaction.date);
    const lastTransactionDateStr = lastTransaction.date;

    let updatedData = { ...gamificationData };

    // 1. Check for new badge unlocks
    const newBadgeIds = checkBadgeConditions(transactions, stats);
    const allUnlockedIds = [...new Set([...updatedData.unlockedBadgeIds, ...newBadgeIds])];
    if (allUnlockedIds.length > updatedData.unlockedBadgeIds.length) {
      updatedData.unlockedBadgeIds = allUnlockedIds;
    }

    // 2. Update Weekly Challenge
    const startOfWeek = getStartOfWeek(today);
    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    
    // Reset challenge if it's a new week
    if (updatedData.challenge.startDate !== startOfWeekStr) {
      updatedData.challenge = getInitialGamificationData().challenge;
    }

    const weeklyTransactions = transactions.filter(t => t.date >= startOfWeekStr);
    const weeklyIncome = weeklyTransactions.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
    const weeklyExpense = weeklyTransactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);
    const weeklySavings = weeklyIncome - weeklyExpense;
    
    updatedData.challenge.progress = Math.max(0, weeklySavings);
    updatedData.challenge.isComplete = weeklySavings >= updatedData.challenge.target;
    

    // 3. Update Positive Day Streak
    if (lastTransactionDateStr !== updatedData.lastStreakUpdateDate) {
        const transactionsForLastDay = transactions.filter(t => t.date === lastTransactionDateStr);
        const dayIncome = transactionsForLastDay.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
        const dayExpense = transactionsForLastDay.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);

        if (dayIncome > dayExpense) {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (updatedData.lastStreakUpdateDate === yesterdayStr) {
                updatedData.positiveDayStreak += 1; // Continue streak
            } else {
                updatedData.positiveDayStreak = 1; // New streak
            }
            updatedData.lastStreakUpdateDate = lastTransactionDateStr;
        } else {
            // If the last day was negative, the streak is potentially broken
            // But only reset if the negative day is today or yesterday relative to the last streak update
            const lastUpdate = updatedData.lastStreakUpdateDate ? new Date(updatedData.lastStreakUpdateDate) : new Date(0);
            const timeDiff = lastTransactionDate.getTime() - lastUpdate.getTime();
            const dayDiff = timeDiff / (1000 * 3600 * 24);
            if (dayDiff <= 1) {
              updatedData.positiveDayStreak = 0;
            }
        }
    }

    // Only update if data has actually changed
    const updatedDataString = JSON.stringify(updatedData);
    if (prevDataRef.current !== updatedDataString) {
      prevDataRef.current = updatedDataString;
      setGamificationData(updatedData);
    }

  }, [transactions, gamificationData, stats, setGamificationData]); // Dependency array
};
