import { useState, FC, FormEvent } from 'react';

import { COLORS, COMPONENTS, TYPOGRAPHY } from '../design-system';
import { Subscription, SubscriptionFrequency, NotificationFrequency } from '../types';

interface SubscriptionFormProps {
  onAddSubscription: (
    subscription: Omit<Subscription, 'id' | 'nextPaymentDate' | 'status'>
  ) => void;
  onClose?: () => void;
}

const PASTEL_COLORS = [
  '#FFE4E1', // Misty Rose
  '#E0E6FF', // Lavender
  '#E1F5FE', // Light Cyan
  '#F1F8E9', // Light Green
  '#FFF3E0', // Orange
  '#FCE4EC', // Pink
  '#F3E5F5', // Purple
  '#E8F5E8', // Mint
];

const CATEGORIES = [
  'Entertainment',
  'Software',
  'Health & Fitness',
  'News & Media',
  'Music & Audio',
  'Gaming',
  'Cloud Storage',
  'Productivity',
  'Education',
  'Food & Drink',
  'Transportation',
  'Utilities',
  'Other',
];

const SubscriptionForm: FC<SubscriptionFormProps> = ({ onAddSubscription, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    frequency: SubscriptionFrequency.MONTHLY,
    category: 'Entertainment',
    startDate: new Date().toISOString().split('T')[0],
    autoRenew: true,
    reminderDays: [NotificationFrequency.THREE_DAYS, NotificationFrequency.ONE_DAY],
    color: PASTEL_COLORS[0],
    icon: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const subscription: Omit<Subscription, 'id' | 'nextPaymentDate' | 'status'> = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      amount: parseFloat(formData.amount),
      frequency: formData.frequency,
      category: formData.category,
      startDate: formData.startDate,
      autoRenew: formData.autoRenew,
      reminderDays: formData.reminderDays,
      color: formData.color,
      icon: formData.icon.trim(),
    };

    onAddSubscription(subscription);

    // Reset form
    setFormData({
      name: '',
      description: '',
      amount: '',
      frequency: SubscriptionFrequency.MONTHLY,
      category: 'Entertainment',
      startDate: new Date().toISOString().split('T')[0],
      autoRenew: true,
      reminderDays: [NotificationFrequency.THREE_DAYS, NotificationFrequency.ONE_DAY],
      color: PASTEL_COLORS[0],
      icon: '',
    });

    setErrors({});
    if (onClose) {
      onClose();
    }
  };

  const toggleReminderDay = (day: NotificationFrequency) => {
    setFormData(prev => ({
      ...prev,
      reminderDays: prev.reminderDays.includes(day)
        ? prev.reminderDays.filter(d => d !== day)
        : [...prev.reminderDays, day],
    }));
  };

  return (
    <div className={`${COMPONENTS.card} space-y-4 md:space-y-6`}>
      <div className='flex items-center justify-between'>
        <h3 className={`${TYPOGRAPHY.heading.lg} ${COLORS.neutral.text.primary}`}>
          Add New Subscription
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className={`${COLORS.neutral.text.light} hover:${COLORS.neutral.text.secondary} transition-colors text-xl`}
            aria-label='Close'
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className='space-y-3 md:space-y-4'>
        {/* Name */}
        <div>
          <label
            className={`block ${TYPOGRAPHY.body.sm} font-medium ${COLORS.neutral.text.secondary} mb-1`}
          >
            Service Name *
          </label>
          <input
            type='text'
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`${COMPONENTS.input} ${errors.name ? 'border-rose-400 ring-rose-400' : ''}`}
            placeholder='Netflix, Spotify, etc.'
          />
          {errors.name && <p className='text-rose-600 text-sm mt-1'>{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label
            className={`block ${TYPOGRAPHY.body.sm} font-medium ${COLORS.neutral.text.secondary} mb-1`}
          >
            Description (Optional)
          </label>
          <input
            type='text'
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className={COMPONENTS.input}
            placeholder='Premium plan, family subscription...'
          />
        </div>

        {/* Amount and Frequency */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              className={`block ${TYPOGRAPHY.body.sm} font-medium ${COLORS.neutral.text.secondary} mb-1`}
            >
              Amount *
            </label>
            <input
              type='number'
              step='0.01'
              value={formData.amount}
              onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className={`${COMPONENTS.input} ${errors.amount ? 'border-rose-400 ring-rose-400' : ''}`}
              placeholder='9.99'
            />
            {errors.amount && <p className='text-rose-600 text-sm mt-1'>{errors.amount}</p>}
          </div>

          <div>
            <label
              className={`block ${TYPOGRAPHY.body.sm} font-medium ${COLORS.neutral.text.secondary} mb-1`}
            >
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  frequency: e.target.value as SubscriptionFrequency,
                }))
              }
              className={COMPONENTS.input}
            >
              <option value={SubscriptionFrequency.WEEKLY}>Weekly</option>
              <option value={SubscriptionFrequency.MONTHLY}>Monthly</option>
              <option value={SubscriptionFrequency.QUARTERLY}>Quarterly</option>
              <option value={SubscriptionFrequency.YEARLY}>Yearly</option>
            </select>
          </div>
        </div>

        {/* Category and Color */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              className={`block ${TYPOGRAPHY.body.sm} font-medium ${COLORS.neutral.text.secondary} mb-1`}
            >
              Category
            </label>
            <select
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className={COMPONENTS.input}
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block ${TYPOGRAPHY.body.sm} font-medium ${COLORS.neutral.text.secondary} mb-1`}
            >
              Color Theme
            </label>
            <div className='flex gap-2 flex-wrap'>
              {PASTEL_COLORS.map(color => (
                <button
                  key={color}
                  type='button'
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all ${
                    formData.color === color
                      ? 'border-blue-500 scale-110 ring-2 ring-blue-200'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label
            className={`block ${TYPOGRAPHY.body.sm} font-medium ${COLORS.neutral.text.secondary} mb-1`}
          >
            Start Date *
          </label>
          <input
            type='date'
            value={formData.startDate}
            onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className={`${COMPONENTS.input} ${errors.startDate ? 'border-rose-400 ring-rose-400' : ''}`}
          />
          {errors.startDate && <p className='text-rose-600 text-sm mt-1'>{errors.startDate}</p>}
        </div>

        {/* Reminder Settings */}
        <div>
          <label
            className={`block ${TYPOGRAPHY.body.sm} font-medium ${COLORS.neutral.text.secondary} mb-2`}
          >
            Reminder Days Before Payment
          </label>
          <div className='flex gap-2 flex-wrap'>
            {[
              { value: NotificationFrequency.ONE_DAY, label: '1 Day' },
              { value: NotificationFrequency.THREE_DAYS, label: '3 Days' },
              { value: NotificationFrequency.ONE_WEEK, label: '1 Week' },
            ].map(({ value, label }) => (
              <button
                key={value}
                type='button'
                onClick={() => toggleReminderDay(value)}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  formData.reminderDays.includes(value)
                    ? 'bg-blue-100 text-blue-700 border border-blue-400'
                    : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Renew */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='autoRenew'
            checked={formData.autoRenew}
            onChange={e => setFormData(prev => ({ ...prev, autoRenew: e.target.checked }))}
            className='rounded border-gray-300 text-blue-600 focus:ring-blue-400 w-4 h-4'
          />
          <label
            htmlFor='autoRenew'
            className={`${TYPOGRAPHY.body.sm} ${COLORS.neutral.text.secondary}`}
          >
            Auto-renew subscription
          </label>
        </div>

        {/* Submit Button */}
        <div className='flex gap-3 pt-4'>
          <button type='submit' className={`flex-1 ${COMPONENTS.button.primary}`}>
            Add Subscription
          </button>
          {onClose && (
            <button
              type='button'
              onClick={onClose}
              className={`px-6 ${COMPONENTS.button.secondary}`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;
