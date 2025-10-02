import React from 'react';

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
    <div className="bg-white p-6 rounded-2xl shadow-lg flex-1">
      <h3 className="text-lg font-semibold text-slate-500">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${color}`}>
        ${amount.toFixed(2)}
      </p>
    </div>
  );
};

const Summary = ({ totalIncome, totalExpense, balance }: SummaryProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <SummaryCard title="Total Income" amount={totalIncome} color="text-green-500" />
      <SummaryCard title="Total Expense" amount={totalExpense} color="text-red-500" />
      <SummaryCard title="Balance" amount={balance} color="text-sky-500" />
    </div>
  );
};

export default Summary;