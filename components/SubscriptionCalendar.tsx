import { useState, useMemo, FC } from 'react';

import { COLORS, COMPONENTS, TYPOGRAPHY } from '../design-system';
import { Subscription } from '../types';

interface SubscriptionCalendarProps {
  subscriptions: Subscription[];
  onSubscriptionClick?: (subscription: Subscription) => void;
}

interface CalendarDay {
  date: Date;
  subscriptions: Subscription[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

const SubscriptionCalendar: FC<SubscriptionCalendarProps> = ({
  subscriptions,
  onSubscriptionClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getSubscriptionsForDate = (date: Date): Subscription[] => {
    const dateString = date.toISOString().split('T')[0];
    return subscriptions.filter(sub => sub.nextPaymentDate === dateString);
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of the month and how many days in the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Get previous month's last days
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        subscriptions: getSubscriptionsForDate(date),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        subscriptions: getSubscriptionsForDate(date),
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
      });
    }

    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        subscriptions: getSubscriptionsForDate(date),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  }, [currentDate, subscriptions]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTotalForDay = (daySubscriptions: Subscription[]) => {
    return daySubscriptions.reduce((total, sub) => total + sub.amount, 0);
  };

  return (
    <div className={`${COMPONENTS.card} space-y-4`}>
      {/* Calendar Header */}
      <div className='flex items-center justify-between'>
        <h3 className={`${TYPOGRAPHY.heading.lg} ${COLORS.neutral.text.primary}`}>
          Payment Calendar
        </h3>
        <div className='flex items-center gap-2'>
          <button
            onClick={goToToday}
            className={`px-3 py-1 text-sm ${COMPONENTS.button.secondary}`}
          >
            Today
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className='flex items-center justify-between'>
        <button
          onClick={() => navigateMonth('prev')}
          className={`p-2 rounded-lg ${COLORS.neutral.text.muted} hover:${COLORS.neutral.bg.muted} transition-colors`}
        >
          ← Previous
        </button>

        <h4 className={`${TYPOGRAPHY.heading.md} ${COLORS.neutral.text.primary}`}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>

        <button
          onClick={() => navigateMonth('next')}
          className={`p-2 rounded-lg ${COLORS.neutral.text.muted} hover:${COLORS.neutral.bg.muted} transition-colors`}
        >
          Next →
        </button>
      </div>

      {/* Days of Week Header */}
      <div className='grid grid-cols-7 gap-1 mb-2'>
        {daysOfWeek.map(day => (
          <div
            key={day}
            className={`p-2 text-center text-sm font-medium ${COLORS.neutral.text.muted}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className='grid grid-cols-7 gap-1'>
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              min-h-[80px] p-1 border rounded-lg transition-colors
              ${day.isCurrentMonth ? COLORS.neutral.bg.secondary : COLORS.neutral.bg.muted}
              ${day.isToday ? 'ring-2 ring-sky-400 bg-sky-50' : ''}
              ${COLORS.neutral.border}
              hover:bg-slate-50
            `}
          >
            <div
              className={`
              text-sm font-medium mb-1
              ${day.isCurrentMonth ? COLORS.neutral.text.primary : COLORS.neutral.text.light}
              ${day.isToday ? 'text-sky-600' : ''}
            `}
            >
              {day.date.getDate()}
            </div>

            {day.subscriptions.length > 0 && (
              <div className='space-y-1'>
                {day.subscriptions.slice(0, 2).map(subscription => (
                  <button
                    key={subscription.id}
                    onClick={() => onSubscriptionClick?.(subscription)}
                    className={`
                      w-full text-left p-1 rounded text-xs font-medium transition-transform
                      hover:scale-105 cursor-pointer
                    `}
                    style={{
                      backgroundColor: subscription.color,
                      color: '#374151', // Ensure good contrast
                    }}
                  >
                    <div className='truncate'>{subscription.name}</div>
                    <div className='text-xs opacity-75'>{formatCurrency(subscription.amount)}</div>
                  </button>
                ))}

                {day.subscriptions.length > 2 && (
                  <div className='text-xs text-center text-slate-500 font-medium'>
                    +{day.subscriptions.length - 2} more
                  </div>
                )}

                {day.subscriptions.length > 1 && (
                  <div className='text-xs text-center font-semibold text-slate-600 mt-1 pt-1 border-t border-slate-300'>
                    Total: {formatCurrency(getTotalForDay(day.subscriptions))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Calendar Legend */}
      <div className='flex items-center justify-center gap-4 pt-4 border-t border-slate-200'>
        <div className='flex items-center gap-2 text-sm text-slate-600'>
          <div className='w-3 h-3 rounded ring-2 ring-sky-400 bg-sky-50'></div>
          <span>Today</span>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-600'>
          <div className='w-3 h-3 rounded bg-slate-200'></div>
          <span>Has payments</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCalendar;
