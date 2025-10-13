import { useState, useEffect, FormEvent } from 'react';

import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../constants';
import { COMPONENTS, COLORS, TYPOGRAPHY } from '../design-system';
import type { Transaction } from '../types';
import { TransactionType } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (type === TransactionType.INCOME) {
      setCategory(INCOME_CATEGORIES[0]);
    } else {
      setCategory(EXPENSE_CATEGORIES[0]);
    }
  }, [type]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) {
      alert('Please fill all fields');
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid positive amount');
      return;
    }

    onAddTransaction({
      type,
      description,
      amount: numericAmount,
      category,
      date,
    });

    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const categories = type === TransactionType.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className={`${COMPONENTS.card} lg:sticky lg:top-8`}>
      <h2 className={`${TYPOGRAPHY.heading.lg} mb-4 md:mb-6 ${COLORS.neutral.text.secondary}`}>
        Add New Transaction
      </h2>
      <form onSubmit={handleSubmit} className='space-y-3 md:space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <label
            className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${type === TransactionType.INCOME ? `${COLORS.status.success.bg} ${COLORS.status.success.text} ring-2 ${COLORS.status.success.ring}` : `${COLORS.neutral.bg.muted} ${COLORS.neutral.text.muted}`}`}
          >
            <input
              type='radio'
              name='type'
              value={TransactionType.INCOME}
              checked={type === TransactionType.INCOME}
              onChange={() => setType(TransactionType.INCOME)}
              className='hidden'
            />
            Income
          </label>
          <label
            className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${type === TransactionType.EXPENSE ? `${COLORS.status.error.bg} ${COLORS.status.error.text} ring-2 ${COLORS.status.error.ring}` : `${COLORS.neutral.bg.muted} ${COLORS.neutral.text.muted}`}`}
          >
            <input
              type='radio'
              name='type'
              value={TransactionType.EXPENSE}
              checked={type === TransactionType.EXPENSE}
              onChange={() => setType(TransactionType.EXPENSE)}
              className='hidden'
            />
            Expense
          </label>
        </div>

        <div>
          <label
            htmlFor='description'
            className={`block text-sm font-medium ${COLORS.neutral.text.muted} mb-1`}
          >
            Description
          </label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='e.g. Coffee'
            className={COMPONENTS.input}
            required
          />
        </div>

        <div>
          <label
            htmlFor='amount'
            className={`block text-sm font-medium ${COLORS.neutral.text.muted} mb-1`}
          >
            Amount
          </label>
          <input
            type='number'
            id='amount'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder='0.00'
            className={COMPONENTS.input}
            required
          />
        </div>

        <div>
          <label
            htmlFor='category'
            className={`block text-sm font-medium ${COLORS.neutral.text.muted} mb-1`}
          >
            Category
          </label>
          <select
            id='category'
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={COMPONENTS.input}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor='date'
            className={`block text-sm font-medium ${COLORS.neutral.text.muted} mb-1`}
          >
            Date
          </label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={e => setDate(e.target.value)}
            className={COMPONENTS.input}
            required
          />
        </div>

        <button type='submit' className={`w-full ${COMPONENTS.button.primary}`}>
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
