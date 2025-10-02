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

export interface Badge {
  id: string;
  name: string;
  description: string;
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

export enum SubscriptionFrequency {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
}

export enum NotificationFrequency {
  ONE_DAY = 1,
  THREE_DAYS = 3,
  ONE_WEEK = 7,
}

export interface Subscription {
  id: string;
  name: string;
  description?: string;
  amount: number;
  frequency: SubscriptionFrequency;
  category: string;
  startDate: string;
  nextPaymentDate: string;
  lastPaymentDate?: string;
  status: SubscriptionStatus;
  autoRenew: boolean;
  reminderDays: NotificationFrequency[];
  color: string; // Pastel color for visual identification
  icon?: string; // Optional icon for the service
}

export interface BillReminder {
  id: string;
  subscriptionId: string;
  dueDate: string;
  amount: number;
  isRead: boolean;
  isDismissed: boolean;
  type: 'upcoming' | 'overdue' | 'due_today';
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  reminderFrequency: NotificationFrequency[];
  quietHours: {
    start: string; // HH:MM format
    end: string; // HH:MM format
  };
}
