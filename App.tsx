import { useMemo, useState } from 'react';

import GamificationDashboard from './components/GamificationDashboard';
import Header from './components/Header';
import MonthlyChart from './components/MonthlyChart';
import SubscriptionDashboard from './components/SubscriptionDashboard';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { initializeSampleData } from './data/sampleSubscriptions';
import { COLORS, SPACING } from './design-system';
import { useGamification, getInitialGamificationData } from './hooks/useGamification';
import type { Transaction, GamificationData, Subscription } from './types';
import { TransactionType } from './types';

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activeTab, setActiveTab] = useState<'budget' | 'subscriptions'>('budget');
  const [gamificationData, setGamificationData] = useState<GamificationData>(
    getInitialGamificationData()
  );

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
      balance: income - expense,
    };
  }, [transactions]);

  const currentMonthTransactions = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
      );
    });
  }, [transactions]);

  useGamification(transactions, gamificationData, setGamificationData, { balance });

  return (
    <div
      className={`min-h-screen ${COLORS.neutral.bg.primary} ${COLORS.neutral.text.primary} font-sans`}
    >
      <Header />

      {/* Tab Navigation */}
      <div className={`${SPACING.container} px-4 md:px-6 lg:px-8 pt-6`}>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4'>
          <div className='flex gap-4'>
            <button
              onClick={() => setActiveTab('budget')}
              className={`
                px-4 py-2 rounded-lg font-semibold transition-colors
                ${
                  activeTab === 'budget'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }
              `}
            >
              💰 Budget Tracker
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`
                px-4 py-2 rounded-lg font-semibold transition-colors
                ${
                  activeTab === 'subscriptions'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }
              `}
            >
              📱 Subscriptions
            </button>
          </div>

          {/* Demo Button */}
          {activeTab === 'subscriptions' && subscriptions.length === 0 && (
            <button
              onClick={() => initializeSampleData(setSubscriptions)}
              className='px-4 py-2 bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800 rounded-lg font-medium hover:from-pink-300 hover:to-purple-300 transition-all shadow-sm'
            >
              ✨ Load Demo Data
            </button>
          )}
        </div>
      </div>

      <main className={`${SPACING.container} p-4 md:p-6 lg:p-8`}>
        {activeTab === 'budget' ? (
          <div className={`grid grid-cols-1 lg:grid-cols-3 ${SPACING.gap.lg}`}>
            <div className={`lg:col-span-2 space-y-8`}>
              <Summary totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
              <MonthlyChart transactions={currentMonthTransactions} />
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>
            <div className={`lg:col-span-1 space-y-8`}>
              <TransactionForm onAddTransaction={addTransaction} />
              <GamificationDashboard gamificationData={gamificationData} />
            </div>
          </div>
        ) : (
          <SubscriptionDashboard
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            addTransaction={addTransaction}
          />
        )}
      </main>
    </div>
  );
};

export default App;
