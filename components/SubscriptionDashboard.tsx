import { useState, FC, Dispatch, SetStateAction } from 'react';

import { COLORS, COMPONENTS, TYPOGRAPHY } from '../design-system';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { Subscription, Transaction } from '../types';

import NotificationSystem from './NotificationSystem';
import SubscriptionCalendar from './SubscriptionCalendar';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionList from './SubscriptionList';

interface SubscriptionDashboardProps {
  subscriptions: Subscription[];
  setSubscriptions: Dispatch<SetStateAction<Subscription[]>>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const SubscriptionDashboard: FC<SubscriptionDashboardProps> = ({
  subscriptions,
  setSubscriptions,
  addTransaction,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'list' | 'add'>('overview');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const {
    reminders,
    upcomingSubscriptions,
    totalMonthlySubscriptionCost,
    addSubscription,
    updateSubscription,
    cancelSubscription,
    toggleSubscriptionStatus,
    processSubscriptionPayment,
    markReminderAsRead,
    dismissReminder,
  } = useSubscriptions(subscriptions, setSubscriptions, addTransaction);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getQuickStats = () => {
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
    const pausedSubscriptions = subscriptions.filter(sub => sub.status === 'paused');
    const cancelledSubscriptions = subscriptions.filter(sub => sub.status === 'cancelled');

    const upcomingThisWeek = upcomingSubscriptions.filter(sub => sub.daysUntilPayment <= 7);
    const overduePayments = upcomingSubscriptions.filter(sub => sub.daysUntilPayment < 0);

    return {
      totalSubscriptions: subscriptions.length,
      activeSubscriptions: activeSubscriptions.length,
      pausedSubscriptions: pausedSubscriptions.length,
      cancelledSubscriptions: cancelledSubscriptions.length,
      upcomingThisWeek: upcomingThisWeek.length,
      overduePayments: overduePayments.length,
      totalMonthlySubscriptionCost,
    };
  };

  const stats = getQuickStats();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'list', label: 'Manage', icon: '📋' },
    { id: 'add', label: 'Add New', icon: '➕' },
  ];

  return (
    <div className='space-y-6'>
      {/* Header with Notification System */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className={`${TYPOGRAPHY.heading.xl} ${COLORS.neutral.text.primary}`}>
            Subscription Manager
          </h2>
          <p className={`${COLORS.neutral.text.muted} mt-1`}>
            Track and manage your recurring payments
          </p>
        </div>
        <NotificationSystem
          reminders={reminders}
          subscriptions={subscriptions}
          onMarkAsRead={markReminderAsRead}
          onDismissReminder={dismissReminder}
          onProcessPayment={processSubscriptionPayment}
        />
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4'>
        <div className={`${COMPONENTS.card} text-center hover:shadow-md transition-shadow`}>
          <div className='text-2xl md:text-3xl mb-2'>💰</div>
          <div className={`text-xl md:text-2xl font-bold ${COLORS.neutral.text.primary}`}>
            {formatCurrency(stats.totalMonthlySubscriptionCost)}
          </div>
          <div className={`text-xs md:text-sm ${COLORS.neutral.text.muted} mt-1`}>Monthly Cost</div>
        </div>

        <div className={`${COMPONENTS.card} text-center hover:shadow-md transition-shadow`}>
          <div className='text-2xl md:text-3xl mb-2'>📱</div>
          <div className={`text-xl md:text-2xl font-bold ${COLORS.neutral.text.primary}`}>
            {stats.activeSubscriptions}
          </div>
          <div className={`text-xs md:text-sm ${COLORS.neutral.text.muted} mt-1`}>Active Subscriptions</div>
        </div>

        <div className={`${COMPONENTS.card} text-center hover:shadow-md transition-shadow`}>
          <div className='text-2xl md:text-3xl mb-2'>⏰</div>
          <div
            className={`text-xl md:text-2xl font-bold ${stats.upcomingThisWeek > 0 ? 'text-amber-600' : COLORS.neutral.text.primary}`}
          >
            {stats.upcomingThisWeek}
          </div>
          <div className={`text-xs md:text-sm ${COLORS.neutral.text.muted} mt-1`}>Due This Week</div>
        </div>

        <div className={`${COMPONENTS.card} text-center hover:shadow-md transition-shadow`}>
          <div className='text-2xl md:text-3xl mb-2'>{stats.overduePayments > 0 ? '🚨' : '✅'}</div>
          <div
            className={`text-xl md:text-2xl font-bold ${stats.overduePayments > 0 ? 'text-rose-600' : COLORS.neutral.text.primary}`}
          >
            {stats.overduePayments}
          </div>
          <div className={`text-xs md:text-sm ${COLORS.neutral.text.muted} mt-1`}>Overdue</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`${COMPONENTS.card}`}>
        <div className='flex flex-wrap gap-2 mb-4 md:mb-6'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'calendar' | 'list' | 'add')}
              className={`
                flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all text-sm md:text-base
                ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span className='hidden sm:inline'>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className='min-h-[400px]'>
          {activeTab === 'overview' && (
            <div className='space-y-6'>
              {/* Upcoming Payments */}
              <div>
                <h3 className={`${TYPOGRAPHY.heading.lg} ${COLORS.neutral.text.primary} mb-4`}>
                  Upcoming Payments
                </h3>
                {upcomingSubscriptions.length === 0 ? (
                  <div className='text-center py-8'>
                    <div className='text-4xl mb-2'>🎉</div>
                    <p className={`${COLORS.neutral.text.muted}`}>
                      No upcoming payments in the next 30 days
                    </p>
                  </div>
                ) : (
                  <div className='grid gap-3'>
                    {upcomingSubscriptions.slice(0, 5).map(subscription => (
                      <div
                        key={subscription.id}
                        className={`
                          flex items-center justify-between p-4 rounded-lg border
                          ${
                            subscription.daysUntilPayment <= 0
                              ? 'border-red-300 bg-red-50'
                              : subscription.daysUntilPayment <= 3
                                ? 'border-amber-300 bg-amber-50'
                                : 'border-slate-200 bg-white'
                          }
                        `}
                      >
                        <div className='flex items-center gap-3'>
                          <div
                            className='w-4 h-4 rounded-full'
                            style={{ backgroundColor: subscription.color }}
                          />
                          <div>
                            <h4 className='font-semibold'>{subscription.name}</h4>
                            <p className='text-sm text-slate-600'>
                              {formatCurrency(subscription.amount)} due in{' '}
                              {subscription.daysUntilPayment <= 0 ? (
                                <span className='text-red-600 font-medium'>overdue</span>
                              ) : subscription.daysUntilPayment === 1 ? (
                                <span className='text-amber-600 font-medium'>1 day</span>
                              ) : (
                                `${subscription.daysUntilPayment} days`
                              )}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => processSubscriptionPayment(subscription.id)}
                          className={`px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium ${
                            subscription.daysUntilPayment <= 0
                              ? 'bg-rose-600 text-white hover:bg-rose-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          } transition-all shadow-sm`}
                        >
                          Pay Now
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Breakdown */}
              <div>
                <h3 className={`${TYPOGRAPHY.heading.lg} ${COLORS.neutral.text.primary} mb-4`}>
                  Spending by Category
                </h3>
                {(() => {
                  const categoryTotals = subscriptions
                    .filter(sub => sub.status === 'active')
                    .reduce(
                      (acc, sub) => {
                        const monthlyAmount =
                          sub.frequency === 'weekly'
                            ? sub.amount * 4.33
                            : sub.frequency === 'monthly'
                              ? sub.amount
                              : sub.frequency === 'quarterly'
                                ? sub.amount / 3
                                : sub.amount / 12;
                        acc[sub.category] = (acc[sub.category] || 0) + monthlyAmount;
                        return acc;
                      },
                      {} as Record<string, number>
                    );

                  const sortedCategories = Object.entries(categoryTotals)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .slice(0, 6);

                  return sortedCategories.length > 0 ? (
                    <div className='grid gap-2'>
                      {sortedCategories.map(([category, amount]) => (
                        <div key={category} className='flex items-center justify-between py-2'>
                          <span className='text-slate-700'>{category}</span>
                          <div className='flex items-center gap-2'>
                            <div className='w-20 md:w-24 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-blue-500 h-2 rounded-full transition-all'
                                style={{
                                  width: `${((amount as number) / Math.max(...(Object.values(categoryTotals) as number[]))) * 100}%`,
                                }}
                              />
                            </div>
                            <span className='font-semibold text-slate-800 w-20 text-right'>
                              {formatCurrency(amount as number)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`${COLORS.neutral.text.muted} text-center py-4`}>
                      No active subscriptions to analyze
                    </p>
                  );
                })()}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <SubscriptionCalendar
              subscriptions={subscriptions.filter(sub => sub.status === 'active')}
              onSubscriptionClick={setSelectedSubscription}
            />
          )}

          {activeTab === 'list' && (
            <SubscriptionList
              subscriptions={subscriptions}
              onUpdateSubscription={updateSubscription}
              onCancelSubscription={cancelSubscription}
              onToggleStatus={toggleSubscriptionStatus}
              onProcessPayment={processSubscriptionPayment}
            />
          )}

          {activeTab === 'add' && (
            <SubscriptionForm
              onAddSubscription={addSubscription}
              onClose={() => setActiveTab('list')}
            />
          )}
        </div>
      </div>

      {/* Subscription Details Modal */}
      {selectedSubscription && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className={`${COMPONENTS.card} max-w-md w-full max-h-[90vh] overflow-y-auto`}>
            <div className='flex items-center justify-between mb-4'>
              <h3 className={`${TYPOGRAPHY.heading.lg} ${COLORS.neutral.text.primary}`}>
                Subscription Details
              </h3>
              <button
                onClick={() => setSelectedSubscription(null)}
                className={`${COLORS.neutral.text.light} hover:${COLORS.neutral.text.secondary}`}
              >
                ✕
              </button>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div
                  className='w-6 h-6 rounded-full'
                  style={{ backgroundColor: selectedSubscription.color }}
                />
                <h4 className={`${TYPOGRAPHY.heading.md} ${COLORS.neutral.text.primary}`}>
                  {selectedSubscription.name}
                </h4>
              </div>

              {selectedSubscription.description && (
                <p className={`${COLORS.neutral.text.muted}`}>{selectedSubscription.description}</p>
              )}

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className={`block ${COLORS.neutral.text.muted}`}>Amount</span>
                  <span className='font-semibold'>
                    {formatCurrency(selectedSubscription.amount)}
                  </span>
                </div>
                <div>
                  <span className={`block ${COLORS.neutral.text.muted}`}>Frequency</span>
                  <span className='font-semibold'>{selectedSubscription.frequency}</span>
                </div>
                <div>
                  <span className={`block ${COLORS.neutral.text.muted}`}>Category</span>
                  <span className='font-semibold'>{selectedSubscription.category}</span>
                </div>
                <div>
                  <span className={`block ${COLORS.neutral.text.muted}`}>Status</span>
                  <span className='font-semibold'>{selectedSubscription.status}</span>
                </div>
                <div>
                  <span className={`block ${COLORS.neutral.text.muted}`}>Next Payment</span>
                  <span className='font-semibold'>
                    {new Date(selectedSubscription.nextPaymentDate).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className={`block ${COLORS.neutral.text.muted}`}>Auto Renew</span>
                  <span className='font-semibold'>
                    {selectedSubscription.autoRenew ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              <div className='flex gap-2 pt-4'>
                <button
                  onClick={() => processSubscriptionPayment(selectedSubscription.id)}
                  className={`flex-1 ${COMPONENTS.button.primary}`}
                >
                  Process Payment
                </button>
                <button
                  onClick={() => {
                    toggleSubscriptionStatus(selectedSubscription.id);
                    setSelectedSubscription(null);
                  }}
                  className={`flex-1 ${COMPONENTS.button.secondary}`}
                >
                  {selectedSubscription.status === 'active' ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDashboard;
