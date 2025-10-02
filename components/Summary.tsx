import React from 'react';

import { COMPONENTS, COLORS, TYPOGRAPHY } from '../design-system';

interface SummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

interface SummaryCardProps {
  title: string;
  amount: number;
  color: string;
}

const SummaryCard = ({ title, amount, color }: SummaryCardProps) => {
  return (
    <div className={`${COMPONENTS.card} flex-1`}>
      <h3 className={`${TYPOGRAPHY.body.lg} font-semibold ${COLORS.neutral.text.muted}`}>
        {title}
      </h3>
      <p className={`text-3xl font-bold mt-2 ${color}`}>${amount.toFixed(2)}</p>
    </div>
  );
};

const Summary = ({ totalIncome, totalExpense, balance }: SummaryProps) => {
  return (
    <div className='flex flex-col md:flex-row gap-6'>
      <SummaryCard title='Total Income' amount={totalIncome} color={COLORS.status.success.text} />
      <SummaryCard title='Total Expense' amount={totalExpense} color={COLORS.status.error.text} />
      <SummaryCard title='Balance' amount={balance} color='text-sky-500' />
    </div>
  );
};

export default Summary;
