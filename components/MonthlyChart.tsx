import React, { useMemo, useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { Transaction } from '../types';
import { TransactionType } from '../types';

interface MonthlyChartProps {
  transactions: Transaction[];
}

const MonthlyChart = ({ transactions }: MonthlyChartProps) => {
  const chartWrapperRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (chartWrapperRef.current) {
        setChartWidth(chartWrapperRef.current.offsetWidth);
      }
    };

    handleResize(); // Set initial size

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const chartData = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, t) => acc + t.amount, 0);

    return [{ name: 'Current Month', income, expense }];
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Monthly Overview</h2>
      <div ref={chartWrapperRef} style={{ width: '100%', height: 320 }}>
        {transactions.length > 0 && chartWidth > 0 ? (
          <BarChart
            width={chartWidth}
            height={320}
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
            <YAxis tick={{ fill: '#64748b' }} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              cursor={{ fill: 'rgba(238, 242, 255, 0.6)' }}
              contentStyle={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="income" fill="#6ee7b7" name="Income" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" fill="#f7a8a8" name="Expense" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p>No transactions this month to display in the chart.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyChart;