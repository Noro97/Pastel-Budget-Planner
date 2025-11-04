import React from 'react';

import { COMPONENTS, COLORS } from '../design-system';

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
    <div className={`${COMPONENTS.card} flex-1 min-w-[240px] hover:shadow-md transition-shadow`}>
      <h3
        className={`text-sm md:text-base font-medium ${COLORS.neutral.text.muted} uppercase tracking-wide`}
      >
        {title}
      </h3>
      <p className={`text-2xl md:text-3xl lg:text-4xl font-bold mt-2 md:mt-3 ${color}`}>
        ${amount.toFixed(2)}
      </p>
    </div>
  );
};

const Summary = ({ totalIncome, totalExpense, balance }: SummaryProps) => {
  return (
    <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
      <SummaryCard title='Total Income' amount={totalIncome} color={COLORS.status.success.text} />
      <SummaryCard title='Total Expense' amount={totalExpense} color={COLORS.status.error.text} />
      <SummaryCard title='Balance' amount={balance} color={COLORS.primary.blue.text[700]} />
    </div>
  );
};

export default Summary;
