import React, { useMemo } from 'react';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import MonthlyChart from './components/MonthlyChart';
import GamificationDashboard from './components/GamificationDashboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGamification, getInitialGamificationData } from './hooks/useGamification';
import type { Transaction, GamificationData } from './types';
import { TransactionType } from './types';

const App = () => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [gamificationData, setGamificationData] = useLocalStorage<GamificationData>('gamificationData', getInitialGamificationData());

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...transaction, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    };
  }, [transactions]);
  
  const currentMonthTransactions = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });
  }, [transactions]);

  useGamification(transactions, gamificationData, setGamificationData, { balance });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Summary totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
            <MonthlyChart transactions={currentMonthTransactions} />
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <TransactionForm onAddTransaction={addTransaction} />
            <GamificationDashboard gamificationData={gamificationData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
