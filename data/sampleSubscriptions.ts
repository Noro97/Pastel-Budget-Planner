import { Dispatch, SetStateAction } from 'react';

import {
  Subscription,
  SubscriptionFrequency,
  SubscriptionStatus,
  NotificationFrequency,
} from '../types';

export const SAMPLE_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'netflix-001',
    name: 'Netflix',
    description: 'Premium Family Plan',
    amount: 15.99,
    frequency: SubscriptionFrequency.MONTHLY,
    category: 'Entertainment',
    startDate: '2024-01-15',
    nextPaymentDate: '2025-01-15',
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    reminderDays: [NotificationFrequency.THREE_DAYS, NotificationFrequency.ONE_DAY],
    color: '#FFE4E1', // Misty Rose
    icon: '🎬',
  },
  {
    id: 'spotify-002',
    name: 'Spotify',
    description: 'Premium Individual',
    amount: 9.99,
    frequency: SubscriptionFrequency.MONTHLY,
    category: 'Music & Audio',
    startDate: '2024-03-01',
    nextPaymentDate: '2025-01-01',
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    reminderDays: [NotificationFrequency.ONE_DAY],
    color: '#E1F5FE', // Light Cyan
    icon: '🎵',
  },
  {
    id: 'adobe-003',
    name: 'Adobe Creative Cloud',
    description: 'Photography Plan',
    amount: 19.99,
    frequency: SubscriptionFrequency.MONTHLY,
    category: 'Productivity',
    startDate: '2024-02-10',
    nextPaymentDate: '2025-01-10',
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    reminderDays: [NotificationFrequency.ONE_WEEK, NotificationFrequency.THREE_DAYS],
    color: '#F3E5F5', // Purple
    icon: '🎨',
  },
  {
    id: 'gym-004',
    name: 'Planet Fitness',
    description: 'Monthly Membership',
    amount: 22.99,
    frequency: SubscriptionFrequency.MONTHLY,
    category: 'Health & Fitness',
    startDate: '2024-01-01',
    nextPaymentDate: '2025-01-01',
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    reminderDays: [NotificationFrequency.THREE_DAYS],
    color: '#F1F8E9', // Light Green
    icon: '💪',
  },
  {
    id: 'amazon-005',
    name: 'Amazon Prime',
    description: 'Annual Subscription',
    amount: 119.0,
    frequency: SubscriptionFrequency.YEARLY,
    category: 'Shopping',
    startDate: '2024-04-15',
    nextPaymentDate: '2025-04-15',
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    reminderDays: [
      NotificationFrequency.ONE_WEEK,
      NotificationFrequency.THREE_DAYS,
      NotificationFrequency.ONE_DAY,
    ],
    color: '#FFF3E0', // Orange
    icon: '📦',
  },
  {
    id: 'medium-006',
    name: 'Medium',
    description: 'Member subscription',
    amount: 5.0,
    frequency: SubscriptionFrequency.MONTHLY,
    category: 'News & Media',
    startDate: '2024-06-01',
    nextPaymentDate: '2025-01-01',
    status: SubscriptionStatus.PAUSED,
    autoRenew: false,
    reminderDays: [NotificationFrequency.ONE_DAY],
    color: '#E0E6FF', // Lavender
    icon: '📰',
  },
  {
    id: 'dropbox-007',
    name: 'Dropbox Plus',
    description: '2TB Storage',
    amount: 9.99,
    frequency: SubscriptionFrequency.MONTHLY,
    category: 'Cloud Storage',
    startDate: '2024-05-20',
    nextPaymentDate: '2025-01-05', // Due soon
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    reminderDays: [NotificationFrequency.THREE_DAYS, NotificationFrequency.ONE_DAY],
    color: '#FCE4EC', // Pink
    icon: '☁️',
  },
  {
    id: 'disney-008',
    name: 'Disney+',
    description: 'Annual Bundle with Hulu',
    amount: 79.99,
    frequency: SubscriptionFrequency.YEARLY,
    category: 'Entertainment',
    startDate: '2024-11-01',
    nextPaymentDate: '2025-11-01',
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    reminderDays: [NotificationFrequency.ONE_WEEK],
    color: '#E8F5E8', // Mint
    icon: '🏰',
  },
];

// Sample function to populate subscriptions for demo
export const initializeSampleData = (
  setSubscriptions: Dispatch<SetStateAction<Subscription[]>>
) => {
  setSubscriptions(SAMPLE_SUBSCRIPTIONS);
};
