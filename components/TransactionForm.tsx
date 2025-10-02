import React, { useState, useEffect } from 'react';
import type { Transaction } from '../types';
import { TransactionType } from '../types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../constants';

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

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-8">
      <h2 className="text-xl font-bold mb-6 text-slate-700">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${type === TransactionType.INCOME ? 'bg-green-200 text-green-800 ring-2 ring-green-400' : 'bg-slate-100 text-slate-500'}`}>
            <input type="radio" name="type" value={TransactionType.INCOME} checked={type === TransactionType.INCOME} onChange={() => setType(TransactionType.INCOME)} className="hidden" />
            Income
          </label>
          <label className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${type === TransactionType.EXPENSE ? 'bg-red-200 text-red-800 ring-2 ring-red-400' : 'bg-slate-100 text-slate-500'}`}>
            <input type="radio" name="type" value={TransactionType.EXPENSE} checked={type === TransactionType.EXPENSE} onChange={() => setType(TransactionType.EXPENSE)} className="hidden" />
            Expense
          </label>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 mb-1">Description</label>
          <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Coffee" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300" required />
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-600 mb-1">Amount</label>
          <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300" required />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-1">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300" required>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-600 mb-1">Date</label>
          <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300" required />
        </div>

        <button type="submit" className="w-full bg-sky-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-500 transition-colors duration-300 shadow-md">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;