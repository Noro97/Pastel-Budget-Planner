import { useState, FC } from 'react';

import { COLORS, COMPONENTS, TYPOGRAPHY } from '../design-system';
import { Subscription, SubscriptionStatus, SubscriptionFrequency } from '../types';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onUpdateSubscription: (id: string, updates: Partial<Subscription>) => void;
  onCancelSubscription: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onProcessPayment: (id: string) => void;
}

const SubscriptionList: FC<SubscriptionListProps> = ({
  subscriptions,
  onUpdateSubscription: _onUpdateSubscription,
  onCancelSubscription,
  onToggleStatus,
  onProcessPayment,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'amount' | 'nextPayment'>('nextPayment');

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
      year: 'numeric',
    });
  };

  const getFrequencyLabel = (frequency: SubscriptionFrequency) => {
    switch (frequency) {
      case SubscriptionFrequency.WEEKLY:
        return 'Weekly';
      case SubscriptionFrequency.MONTHLY:
        return 'Monthly';
      case SubscriptionFrequency.QUARTERLY:
        return 'Quarterly';
      case SubscriptionFrequency.YEARLY:
        return 'Yearly';
      default:
        return frequency;
    }
  };

  const getDaysUntilPayment = (nextPaymentDate: string) => {
    const today = new Date();
    const paymentDate = new Date(nextPaymentDate);
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'Overdue';
    }
    if (diffDays === 0) {
      return 'Due today';
    }
    if (diffDays === 1) {
      return 'Due tomorrow';
    }
    return `${diffDays} days`;
  };

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return COLORS.status.success;
      case SubscriptionStatus.PAUSED:
        return COLORS.status.warning;
      case SubscriptionStatus.CANCELLED:
        return COLORS.status.error;
      default:
        return COLORS.neutral;
    }
  };

  const filteredAndSortedSubscriptions = subscriptions
    .filter(sub => {
      if (filter === 'all') {
        return true;
      }
      return sub.status === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'amount':
          return b.amount - a.amount;
        case 'nextPayment':
          return new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime();
        default:
          return 0;
      }
    });

  const handleEdit = (_subscription: Subscription) => {
    // Edit functionality can be implemented here when needed
  };

  const isPaymentDue = (nextPaymentDate: string) => {
    const today = new Date();
    const paymentDate = new Date(nextPaymentDate);
    return paymentDate <= today;
  };

  return (
    <div className={`${COMPONENTS.card} space-y-6`}>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h3 className={`${TYPOGRAPHY.heading.lg} ${COLORS.neutral.text.primary}`}>
          Subscriptions ({subscriptions.length})
        </h3>

        <div className='flex flex-col sm:flex-row gap-3'>
          {/* Filter */}
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as 'all' | 'active' | 'paused' | 'cancelled')}
            className={`${COMPONENTS.input} w-full sm:w-auto`}
          >
            <option value='all'>All Status</option>
            <option value='active'>Active</option>
            <option value='paused'>Paused</option>
            <option value='cancelled'>Cancelled</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'name' | 'amount' | 'nextPayment')}
            className={`${COMPONENTS.input} w-full sm:w-auto`}
          >
            <option value='nextPayment'>Next Payment</option>
            <option value='name'>Name</option>
            <option value='amount'>Amount</option>
          </select>
        </div>
      </div>

      {/* Subscription List */}
      <div className='space-y-4'>
        {filteredAndSortedSubscriptions.length === 0 ? (
          <div className='text-center py-8'>
            <div className={`text-gray-400 text-6xl mb-4`}>📋</div>
            <p className={`${COLORS.neutral.text.muted} text-lg`}>
              {filter === 'all' ? 'No subscriptions yet' : `No ${filter} subscriptions`}
            </p>
          </div>
        ) : (
          filteredAndSortedSubscriptions.map(subscription => (
            <div
              key={subscription.id}
              className={`
                p-4 rounded-xl border transition-all
                ${subscription.status === SubscriptionStatus.ACTIVE ? 'border-slate-200' : 'border-slate-300 opacity-75'}
                hover:shadow-md
              `}
              style={{ borderLeftColor: subscription.color, borderLeftWidth: '4px' }}
            >
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                {/* Subscription Info */}
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: subscription.color }}
                    />
                    <h4 className={`${TYPOGRAPHY.heading.md} ${COLORS.neutral.text.primary}`}>
                      {subscription.name}
                    </h4>
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${getStatusColor(subscription.status).bg}
                        ${getStatusColor(subscription.status).text}
                      `}
                    >
                      {subscription.status}
                    </span>
                  </div>

                  {subscription.description && (
                    <p className={`${COLORS.neutral.text.muted} text-sm mb-2`}>
                      {subscription.description}
                    </p>
                  )}

                  <div className='flex flex-wrap items-center gap-4 text-sm'>
                    <span className={`font-semibold ${COLORS.neutral.text.primary}`}>
                      {formatCurrency(subscription.amount)} /{' '}
                      {getFrequencyLabel(subscription.frequency)}
                    </span>
                    <span className={COLORS.neutral.text.muted}>
                      Category: {subscription.category}
                    </span>
                    {subscription.status === SubscriptionStatus.ACTIVE && (
                      <span
                        className={`
                          font-medium
                          ${
                            isPaymentDue(subscription.nextPaymentDate)
                              ? 'text-red-600'
                              : COLORS.neutral.text.muted
                          }
                        `}
                      >
                        Next: {formatDate(subscription.nextPaymentDate)} (
                        {getDaysUntilPayment(subscription.nextPaymentDate)})
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-2'>
                  {subscription.status === SubscriptionStatus.ACTIVE &&
                    isPaymentDue(subscription.nextPaymentDate) && (
                      <button
                        onClick={() => onProcessPayment(subscription.id)}
                        className={`px-3 py-2 text-sm ${COLORS.status.success.bg} ${COLORS.status.success.text} rounded-lg hover:opacity-80 transition-opacity`}
                      >
                        Pay Now
                      </button>
                    )}

                  <button
                    onClick={() => onToggleStatus(subscription.id)}
                    className={`
                      px-3 py-2 text-sm rounded-lg transition-colors
                      ${
                        subscription.status === SubscriptionStatus.ACTIVE
                          ? `${COLORS.status.warning.bg} ${COLORS.status.warning.text} hover:opacity-80`
                          : `${COLORS.status.success.bg} ${COLORS.status.success.text} hover:opacity-80`
                      }
                    `}
                    disabled={subscription.status === SubscriptionStatus.CANCELLED}
                  >
                    {subscription.status === SubscriptionStatus.ACTIVE ? 'Pause' : 'Resume'}
                  </button>

                  <button
                    onClick={() => handleEdit(subscription)}
                    className={`px-3 py-2 text-sm ${COMPONENTS.button.secondary}`}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onCancelSubscription(subscription.id)}
                    className={`px-3 py-2 text-sm ${COLORS.status.error.bg} ${COLORS.status.error.text} rounded-lg hover:opacity-80 transition-opacity`}
                    disabled={subscription.status === SubscriptionStatus.CANCELLED}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubscriptionList;
