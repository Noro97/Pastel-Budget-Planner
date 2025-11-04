import { useState, useEffect, useMemo, Dispatch, SetStateAction, useCallback } from 'react';

import {
  Subscription,
  SubscriptionFrequency,
  SubscriptionStatus,
  BillReminder,
  NotificationSettings,
  NotificationFrequency,
  Transaction,
  TransactionType,
} from '../types';

export const getInitialNotificationSettings = (): NotificationSettings => ({
  emailNotifications: true,
  pushNotifications: true,
  reminderFrequency: [NotificationFrequency.THREE_DAYS, NotificationFrequency.ONE_DAY],
  quietHours: {
    start: '22:00',
    end: '08:00',
  },
});

export const useSubscriptions = (
  subscriptions: Subscription[],
  setSubscriptions: Dispatch<SetStateAction<Subscription[]>>,
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
) => {
  const [reminders, setReminders] = useState<BillReminder[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(
    getInitialNotificationSettings()
  );

  // Calculate next payment date based on frequency
  const calculateNextPaymentDate = (date: string, frequency: SubscriptionFrequency): string => {
    const nextDate = new Date(date);

    switch (frequency) {
      case SubscriptionFrequency.WEEKLY:
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case SubscriptionFrequency.MONTHLY:
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case SubscriptionFrequency.QUARTERLY:
        nextDate.setMonth(nextDate.getMonth() + 3);
        break;
      case SubscriptionFrequency.YEARLY:
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    return nextDate.toISOString().split('T')[0];
  };

  // Add a new subscription
  const addSubscription = (
    subscription: Omit<Subscription, 'id' | 'nextPaymentDate' | 'status'>
  ) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: crypto.randomUUID(),
      status: SubscriptionStatus.ACTIVE,
      nextPaymentDate: calculateNextPaymentDate(subscription.startDate, subscription.frequency),
    };

    setSubscriptions(prev => [...prev, newSubscription]);
  };

  // Update subscription
  const updateSubscription = (id: string, updates: Partial<Subscription>) => {
    setSubscriptions(prev =>
      prev.map(sub => {
        if (sub.id === id) {
          const updated = { ...sub, ...updates };
          // Recalculate next payment date if frequency changed
          if (updates.frequency && updates.frequency !== sub.frequency) {
            updated.nextPaymentDate = calculateNextPaymentDate(
              updated.lastPaymentDate || updated.startDate,
              updated.frequency
            );
          }
          return updated;
        }
        return sub;
      })
    );
  };

  // Cancel subscription
  const cancelSubscription = (id: string) => {
    updateSubscription(id, { status: SubscriptionStatus.CANCELLED });
  };

  // Pause/Resume subscription
  const toggleSubscriptionStatus = (id: string) => {
    setSubscriptions(prev =>
      prev.map(sub => {
        if (sub.id === id) {
          return {
            ...sub,
            status:
              sub.status === SubscriptionStatus.ACTIVE
                ? SubscriptionStatus.PAUSED
                : SubscriptionStatus.ACTIVE,
          };
        }
        return sub;
      })
    );
  };

  // Process subscription payment (when due)
  const processSubscriptionPayment = (subscriptionId: string) => {
    const subscription = subscriptions.find(sub => sub.id === subscriptionId);
    if (!subscription || subscription.status !== SubscriptionStatus.ACTIVE) {
      return;
    }

    // Add transaction for the payment
    addTransaction({
      type: TransactionType.EXPENSE,
      description: `${subscription.name} subscription`,
      amount: subscription.amount,
      category: subscription.category,
      date: new Date().toISOString().split('T')[0],
    });

    // Update subscription with new payment date
    updateSubscription(subscriptionId, {
      lastPaymentDate: subscription.nextPaymentDate,
      nextPaymentDate: calculateNextPaymentDate(
        subscription.nextPaymentDate,
        subscription.frequency
      ),
    });

    // Remove processed reminders
    setReminders(prev => prev.filter(reminder => reminder.subscriptionId !== subscriptionId));
  };

  // Generate reminders for upcoming subscriptions
  const generateReminders = useCallback(() => {
    const today = new Date();
    const newReminders: BillReminder[] = [];

    subscriptions
      .filter(sub => sub.status === SubscriptionStatus.ACTIVE)
      .forEach(subscription => {
        const nextPaymentDate = new Date(subscription.nextPaymentDate);
        const daysDifference = Math.ceil(
          (nextPaymentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        subscription.reminderDays.forEach(reminderDay => {
          if (daysDifference === reminderDay || daysDifference === 0) {
            const existingReminder = reminders.find(
              r =>
                r.subscriptionId === subscription.id &&
                new Date(r.dueDate).getTime() === nextPaymentDate.getTime()
            );

            if (!existingReminder) {
              newReminders.push({
                id: crypto.randomUUID(),
                subscriptionId: subscription.id,
                dueDate: subscription.nextPaymentDate,
                amount: subscription.amount,
                isRead: false,
                isDismissed: false,
                type:
                  daysDifference === 0 ? 'due_today' : daysDifference < 0 ? 'overdue' : 'upcoming',
              });
            }
          }
        });
      });

    if (newReminders.length > 0) {
      setReminders(prev => [...prev, ...newReminders]);
    }
  }, [reminders, subscriptions]);

  // Mark reminder as read
  const markReminderAsRead = (reminderId: string) => {
    setReminders(prev =>
      prev.map(reminder => (reminder.id === reminderId ? { ...reminder, isRead: true } : reminder))
    );
  };

  // Dismiss reminder
  const dismissReminder = (reminderId: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === reminderId ? { ...reminder, isDismissed: true } : reminder
      )
    );
  };

  // Get upcoming subscriptions for calendar view
  const upcomingSubscriptions = useMemo(() => {
    const upcoming = subscriptions
      .filter(sub => sub.status === SubscriptionStatus.ACTIVE)
      .map(sub => ({
        ...sub,
        daysUntilPayment: Math.ceil(
          (new Date(sub.nextPaymentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        ),
      }))
      .sort((a, b) => a.daysUntilPayment - b.daysUntilPayment);

    return upcoming;
  }, [subscriptions]);

  // Get active reminders (not dismissed)
  const activeReminders = useMemo(() => {
    return reminders
      .filter(reminder => !reminder.isDismissed)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [reminders]);

  // Calculate total monthly subscription cost
  const totalMonthlySubscriptionCost = useMemo(() => {
    return subscriptions
      .filter(sub => sub.status === SubscriptionStatus.ACTIVE)
      .reduce((total, sub) => {
        switch (sub.frequency) {
          case SubscriptionFrequency.WEEKLY:
            return total + sub.amount * 4.33; // Average weeks per month
          case SubscriptionFrequency.MONTHLY:
            return total + sub.amount;
          case SubscriptionFrequency.QUARTERLY:
            return total + sub.amount / 3;
          case SubscriptionFrequency.YEARLY:
            return total + sub.amount / 12;
          default:
            return total;
        }
      }, 0);
  }, [subscriptions]);

  // Auto-generate reminders periodically
  useEffect(() => {
    generateReminders();
    const interval = setInterval(generateReminders, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [subscriptions, notificationSettings.reminderFrequency, generateReminders]);

  return {
    subscriptions,
    reminders: activeReminders,
    notificationSettings,
    upcomingSubscriptions,
    totalMonthlySubscriptionCost,
    addSubscription,
    updateSubscription,
    cancelSubscription,
    toggleSubscriptionStatus,
    processSubscriptionPayment,
    markReminderAsRead,
    dismissReminder,
    setNotificationSettings,
    calculateNextPaymentDate,
  };
};
