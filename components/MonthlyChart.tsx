import { useMemo, useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { COMPONENTS, COLORS, TYPOGRAPHY } from '../design-system';
import type { Transaction } from '../types';
import { TransactionType } from '../types';

interface MonthlyChartProps {
  transactions: Transaction[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomCursor = (props: any) => {
  const { x, y, width, height } = props;
  return <rect x={x} y={y} width={width} height={height} fill='rgba(238, 242, 255, 0.6)' />;
};

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
    <div className={COMPONENTS.card}>
      <h2 className={`${TYPOGRAPHY.heading.lg} mb-3 md:mb-4 ${COLORS.neutral.text.secondary}`}>
        Monthly Overview
      </h2>
      <div ref={chartWrapperRef} className='w-full h-64 md:h-80'>
        {transactions.length > 0 && chartWidth > 0 ? (
          <BarChart
            width={chartWidth}
            height={chartWrapperRef.current?.offsetHeight || 320}
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: -15,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
            <XAxis dataKey='name' tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={value => `$${value}`} />
            <Tooltip
              cursor={<CustomCursor />}
              contentStyle={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                fontSize: '14px',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '14px' }} />
            <Bar dataKey='income' fill='#10b981' name='Income' radius={[8, 8, 0, 0]} />
            <Bar dataKey='expense' fill='#f43f5e' name='Expense' radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <div className={`flex items-center justify-center h-full ${COLORS.neutral.text.muted}`}>
            <p>No transactions this month to display in the chart.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyChart;
