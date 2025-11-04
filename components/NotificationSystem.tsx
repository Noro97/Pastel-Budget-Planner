import { useState, useEffect, FC, useCallback } from 'react';

import { COLORS, COMPONENTS, TYPOGRAPHY } from '../design-system';
import { BillReminder, Subscription } from '../types';

interface NotificationSystemProps {
  reminders: BillReminder[];
  subscriptions: Subscription[];
  onMarkAsRead: (reminderId: string) => void;
  onDismissReminder: (reminderId: string) => void;
  onProcessPayment: (subscriptionId: string) => void;
}

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  duration?: number;
}

const NotificationSystem: FC<NotificationSystemProps> = ({
  reminders,
  subscriptions,
  onMarkAsRead,
  onDismissReminder,
  onProcessPayment,
}) => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [showReminders, setShowReminders] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getSubscriptionDetails = useCallback(
    (subscriptionId: string) => {
      return subscriptions.find(sub => sub.id === subscriptionId);
    },
    [subscriptions]
  );

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'due_today':
        return '🔔';
      case 'overdue':
        return '🚨';
      case 'upcoming':
        return '⏰';
      default:
        return '📅';
    }
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case 'due_today':
        return { bg: 'bg-amber-100', text: 'text-amber-800' };
      case 'overdue':
        return { bg: 'bg-red-100', text: 'text-red-600' };
      case 'upcoming':
        return { bg: 'bg-sky-100', text: 'text-sky-600' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-600' };
    }
  };

  const addToast = useCallback((toast: Omit<ToastNotification, 'id'>) => {
    const id = crypto.randomUUID();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const unreadReminders = reminders.filter(reminder => !reminder.isRead);
  const hasHighPriorityReminders = reminders.some(
    reminder =>
      !reminder.isDismissed && (reminder.type === 'due_today' || reminder.type === 'overdue')
  );

  // Generate smart notifications
  useEffect(() => {
    reminders.forEach(reminder => {
      if (!reminder.isRead && !reminder.isDismissed) {
        const subscription = getSubscriptionDetails(reminder.subscriptionId);
        if (!subscription) {
          return;
        }

        const existingToast = toasts.find(
          toast =>
            toast.message.includes(subscription.name) &&
            toast.message.includes(formatCurrency(reminder.amount))
        );

        if (!existingToast) {
          let title = '';
          let type: ToastNotification['type'] = 'info';
          let duration = 5000;

          switch (reminder.type) {
            case 'due_today':
              title = 'Payment Due Today';
              type = 'warning';
              duration = 10000;
              break;
            case 'overdue':
              title = 'Payment Overdue';
              type = 'error';
              duration = 15000;
              break;
            case 'upcoming':
              title = 'Upcoming Payment';
              type = 'info';
              duration = 7000;
              break;
          }

          addToast({
            title,
            message: `${subscription.name} - ${formatCurrency(reminder.amount)} due ${formatDate(reminder.dueDate)}`,
            type,
            duration,
          });

          // Mark as read after showing toast
          setTimeout(() => onMarkAsRead(reminder.id), 1000);
        }
      }
    });
  }, [reminders, addToast, getSubscriptionDetails, onMarkAsRead, toasts]);

  const getToastIcon = (type: ToastNotification['type']) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getToastColors = (type: ToastNotification['type']) => {
    switch (type) {
      case 'success':
        return { bg: 'bg-green-100', text: 'text-green-600' };
      case 'error':
        return { bg: 'bg-red-100', text: 'text-red-600' };
      case 'warning':
        return { bg: 'bg-amber-100', text: 'text-amber-800' };
      case 'info':
      default:
        return { bg: 'bg-sky-100', text: 'text-sky-600' };
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <div className='relative'>
        <button
          onClick={() => setShowReminders(!showReminders)}
          className={`
            relative p-2 rounded-lg transition-colors
            ${
              hasHighPriorityReminders
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }
          `}
        >
          <span className='text-xl'>🔔</span>
          {unreadReminders.length > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
              {unreadReminders.length > 9 ? '9+' : unreadReminders.length}
            </span>
          )}
        </button>

        {/* Reminders Dropdown */}
        {showReminders && (
          <div
            className={`
            absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto
            ${COMPONENTS.card} shadow-xl z-50
          `}
          >
            <div className='flex items-center justify-between mb-4'>
              <h4 className={`${TYPOGRAPHY.heading.md} ${COLORS.neutral.text.primary}`}>
                Bill Reminders
              </h4>
              <button
                onClick={() => setShowReminders(false)}
                className={`${COLORS.neutral.text.light} hover:${COLORS.neutral.text.secondary}`}
              >
                ✕
              </button>
            </div>

            {reminders.length === 0 ? (
              <div className='text-center py-6'>
                <div className='text-4xl mb-2'>📅</div>
                <p className={`${COLORS.neutral.text.muted}`}>No upcoming bill reminders</p>
              </div>
            ) : (
              <div className='space-y-3'>
                {reminders
                  .filter(reminder => !reminder.isDismissed)
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map(reminder => {
                    const subscription = getSubscriptionDetails(reminder.subscriptionId);
                    if (!subscription) {
                      return null;
                    }

                    const colors = getReminderColor(reminder.type);

                    return (
                      <div
                        key={reminder.id}
                        className={`
                          p-3 rounded-lg border-l-4 transition-all
                          ${reminder.isRead ? 'opacity-60' : ''}
                          ${colors.bg} ${colors.text}
                        `}
                        style={{ borderLeftColor: subscription.color }}
                      >
                        <div className='flex items-start justify-between gap-2'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-1'>
                              <span className='text-lg'>{getReminderIcon(reminder.type)}</span>
                              <h5 className='font-semibold'>{subscription.name}</h5>
                            </div>
                            <p className='text-sm opacity-90 mb-2'>
                              {formatCurrency(reminder.amount)} due {formatDate(reminder.dueDate)}
                            </p>
                            <div className='flex gap-2'>
                              <button
                                onClick={() => onProcessPayment(subscription.id)}
                                className='px-2 py-1 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors'
                              >
                                Pay Now
                              </button>
                              <button
                                onClick={() => onDismissReminder(reminder.id)}
                                className='px-2 py-1 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors'
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className='fixed top-4 right-4 z-50 space-y-2'>
        {toasts.map(toast => {
          const colors = getToastColors(toast.type);

          return (
            <div
              key={toast.id}
              className={`
                max-w-sm p-4 rounded-lg shadow-lg border transition-all transform
                ${colors.bg} ${colors.text} border-opacity-50
                animate-in slide-in-from-right duration-300
              `}
            >
              <div className='flex items-start gap-3'>
                <span className='text-lg'>{getToastIcon(toast.type)}</span>
                <div className='flex-1'>
                  <h5 className='font-semibold mb-1'>{toast.title}</h5>
                  <p className='text-sm opacity-90'>{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className='text-lg opacity-60 hover:opacity-100 transition-opacity'
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NotificationSystem;
