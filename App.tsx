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
      className={`min-h-screen ${COLORS.neutral.bg.primary} ${COLORS.neutral.text.primary} font-sans gradient-bg`}
    >
      <Header />

      {/* Tab Navigation */}
      <div className={`${SPACING.container} px-4 md:px-6 lg:px-8 pt-4 md:pt-6`}>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4'>
          <div className='flex gap-2 md:gap-3 flex-wrap'>
            <button
              onClick={() => setActiveTab('budget')}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all text-sm md:text-base liquid-glass
                ${
                  activeTab === 'budget'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }
              `}
            >
              💰 Budget Tracker
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all text-sm md:text-base liquid-glass
                ${
                  activeTab === 'subscriptions'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
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
              className='px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-sm text-sm md:text-base pulse'
            >
              ✨ Load Demo Data
            </button>
          )}
        </div>
      </div>

      <main className={`${SPACING.container} p-4 md:p-6 lg:p-8 fade-in`}>
        {activeTab === 'budget' ? (
          <div className={`grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8`}>
            <div className={`xl:col-span-2 space-y-4 md:space-y-6 lg:space-y-8`}>
              <Summary totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
              <MonthlyChart transactions={currentMonthTransactions} />
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>
            <div className={`xl:col-span-1 space-y-4 md:space-y-6 lg:space-y-8`}>
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
