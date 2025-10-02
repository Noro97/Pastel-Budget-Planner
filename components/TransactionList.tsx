import React from 'react';
import type { Transaction } from '../types';
import { TransactionType } from '../types';
import { COMPONENTS, COLORS, TYPOGRAPHY } from '../design-system';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const TransactionItem = ({ transaction, onDelete }: TransactionItemProps) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  const amountColor = isIncome ? COLORS.status.success.text : COLORS.status.error.text;
  const borderColor = isIncome ? COLORS.status.success.border : COLORS.status.error.border;
  const sign = isIncome ? '+' : '-';

  return (
    <li className={`flex items-center justify-between p-4 ${COLORS.neutral.bg.secondary} rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-center space-x-4">
        <div className={`w-1.5 h-10 rounded-full ${borderColor}`}></div>
        <div>
          <p className={`font-semibold ${COLORS.neutral.text.primary}`}>{transaction.description}</p>
          <p className={`text-sm ${COLORS.neutral.text.muted}`}>{transaction.category} &bull; {new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className={`font-bold text-lg ${amountColor}`}>
          {sign}${transaction.amount.toFixed(2)}
        </p>
        <button onClick={() => onDelete(transaction.id)} className={`${COLORS.neutral.text.light} hover:text-red-500 transition-colors`}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};


const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  return (
    <div className={COMPONENTS.card}>
      <h2 className={`${TYPOGRAPHY.heading.lg} mb-4 ${COLORS.neutral.text.secondary}`}>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className={`${COLORS.neutral.text.muted} text-center py-8`}>No transactions yet. Add one to get started!</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;