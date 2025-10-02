import { FC } from 'react';

import { COLORS, COMPONENTS, TYPOGRAPHY } from '../design-system';
import { NotificationSettings, NotificationFrequency } from '../types';

interface SubscriptionSettingsProps {
  settings: NotificationSettings;
  onUpdateSettings: (settings: NotificationSettings) => void;
}

const SubscriptionSettings: FC<SubscriptionSettingsProps> = ({ settings, onUpdateSettings }) => {
  const updateSetting = <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  const toggleReminderFrequency = (frequency: NotificationFrequency) => {
    const currentFrequencies = settings.reminderFrequency;
    const updatedFrequencies = currentFrequencies.includes(frequency)
      ? currentFrequencies.filter(f => f !== frequency)
      : [...currentFrequencies, frequency];

    updateSetting('reminderFrequency', updatedFrequencies);
  };

  return (
    <div className={`${COMPONENTS.card} space-y-6`}>
      <h3 className={`${TYPOGRAPHY.heading.lg} ${COLORS.neutral.text.primary}`}>
        Notification Settings
      </h3>

      {/* Notification Types */}
      <div className='space-y-4'>
        <h4 className={`${TYPOGRAPHY.heading.md} ${COLORS.neutral.text.secondary}`}>
          Notification Types
        </h4>

        <div className='space-y-3'>
          <label className='flex items-center gap-3'>
            <input
              type='checkbox'
              checked={settings.emailNotifications}
              onChange={e => updateSetting('emailNotifications', e.target.checked)}
              className='rounded border-slate-300 text-sky-600 focus:ring-sky-300'
            />
            <div>
              <span className='font-medium'>Email Notifications</span>
              <p className='text-sm text-slate-600'>Receive payment reminders via email</p>
            </div>
          </label>

          <label className='flex items-center gap-3'>
            <input
              type='checkbox'
              checked={settings.pushNotifications}
              onChange={e => updateSetting('pushNotifications', e.target.checked)}
              className='rounded border-slate-300 text-sky-600 focus:ring-sky-300'
            />
            <div>
              <span className='font-medium'>Push Notifications</span>
              <p className='text-sm text-slate-600'>Receive in-app notifications</p>
            </div>
          </label>
        </div>
      </div>

      {/* Reminder Timing */}
      <div className='space-y-4'>
        <h4 className={`${TYPOGRAPHY.heading.md} ${COLORS.neutral.text.secondary}`}>
          Reminder Timing
        </h4>

        <div className='space-y-2'>
          <p className='text-sm text-slate-600 mb-3'>
            Choose how many days before payment you want to be reminded:
          </p>

          {[
            { value: NotificationFrequency.ONE_DAY, label: '1 Day Before' },
            { value: NotificationFrequency.THREE_DAYS, label: '3 Days Before' },
            { value: NotificationFrequency.ONE_WEEK, label: '1 Week Before' },
          ].map(({ value, label }) => (
            <label key={value} className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={settings.reminderFrequency.includes(value)}
                onChange={() => toggleReminderFrequency(value)}
                className='rounded border-slate-300 text-sky-600 focus:ring-sky-300'
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className='space-y-4'>
        <h4 className={`${TYPOGRAPHY.heading.md} ${COLORS.neutral.text.secondary}`}>Quiet Hours</h4>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Start Time</label>
            <input
              type='time'
              value={settings.quietHours.start}
              onChange={e =>
                updateSetting('quietHours', {
                  ...settings.quietHours,
                  start: e.target.value,
                })
              }
              className={COMPONENTS.input}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>End Time</label>
            <input
              type='time'
              value={settings.quietHours.end}
              onChange={e =>
                updateSetting('quietHours', {
                  ...settings.quietHours,
                  end: e.target.value,
                })
              }
              className={COMPONENTS.input}
            />
          </div>
        </div>

        <p className='text-sm text-slate-600'>No notifications will be sent during these hours</p>
      </div>

      {/* Smart Reminders Info */}
      <div className='bg-sky-50 border border-sky-200 rounded-lg p-4'>
        <h4 className='font-semibold text-sky-800 mb-2'>💡 Smart Reminders</h4>
        <ul className='text-sm text-sky-700 space-y-1'>
          <li>• Reminders are automatically generated based on your preferences</li>
          <li>• High-priority reminders (due today/overdue) bypass quiet hours</li>
          <li>• Notifications adapt to your usage patterns over time</li>
          <li>• One-click payment processing from notifications</li>
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionSettings;
