import React from 'react';

import { COMPONENTS, COLORS, TYPOGRAPHY } from '../design-system';
import type { Transaction } from '../types';
import { TransactionType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const DeleteIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    />
  </svg>
);

const TransactionItem = ({ transaction, onDelete }: TransactionItemProps) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  const amountColor = isIncome ? COLORS.status.success.text : COLORS.status.error.text;
  const borderColor = isIncome ? COLORS.status.success.border : COLORS.status.error.border;
  const sign = isIncome ? '+' : '-';

  return (
    <li
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 md:p-4 ${COLORS.neutral.bg.secondary} rounded-xl border ${COLORS.neutral.border} hover:shadow-md transition-all`}
    >
      <div className='flex items-center space-x-3 sm:space-x-4 flex-1'>
        <div className={`w-1 sm:w-1.5 h-12 sm:h-10 rounded-full ${borderColor}`}></div>
        <div className='flex-1 min-w-0'>
          <p
            className={`font-semibold ${COLORS.neutral.text.primary} text-sm md:text-base truncate`}
          >
            {transaction.description}
          </p>
          <p className={`text-xs md:text-sm ${COLORS.neutral.text.muted} mt-0.5`}>
            {transaction.category} &bull; {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 w-full sm:w-auto'>
        <p className={`font-bold text-base md:text-lg ${amountColor}`}>
          {sign}${transaction.amount.toFixed(2)}
        </p>
        <button
          onClick={() => onDelete(transaction.id)}
          className={`${COLORS.neutral.text.light} hover:text-rose-600 transition-colors p-1`}
          aria-label='Delete transaction'
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  return (
    <div className={COMPONENTS.card}>
      <h2 className={`${TYPOGRAPHY.heading.lg} mb-4 ${COLORS.neutral.text.secondary}`}>
        Recent Transactions
      </h2>
      {transactions.length === 0 ? (
        <p className={`${COLORS.neutral.text.muted} text-center py-8`}>
          No transactions yet. Add one to get started!
        </p>
      ) : (
        <ul className='space-y-3'>
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
