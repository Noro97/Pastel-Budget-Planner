/* global console */
const { performance } = require('perf_hooks');

const TransactionType = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

function generateTransactions(count) {
  const transactions = [];
  for (let i = 0; i < count; i++) {
    transactions.push({
      id: `id-${i}`,
      type: Math.random() > 0.5 ? TransactionType.INCOME : TransactionType.EXPENSE,
      amount: Math.random() * 100,
      date: new Date().toISOString().split('T')[0],
      description: 'test',
      category: 'test',
    });
  }
  return transactions;
}

const count = 1_000_000;
const transactions = generateTransactions(count);

console.log(`Benchmarking with ${count} transactions...`);

// Original Approach (MonthlyChart.tsx / App.tsx style)
function originalApproach(transactions) {
  const start = performance.now();
  const income = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => acc + t.amount, 0);
  const end = performance.now();
  return { income, expense, time: end - start };
}

// Optimized Approach
function optimizedApproach(transactions) {
  const start = performance.now();
  const { income, expense } = transactions.reduce(
    (acc, t) => {
      if (t.type === TransactionType.INCOME) {
        acc.income += t.amount;
      } else if (t.type === TransactionType.EXPENSE) {
        acc.expense += t.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  const end = performance.now();
  return { income, expense, time: end - start };
}

// Warmup
originalApproach(transactions);
optimizedApproach(transactions);

const originalResults = [];
const optimizedResults = [];
const iterations = 10;

for (let i = 0; i < iterations; i++) {
  originalResults.push(originalApproach(transactions).time);
  optimizedResults.push(optimizedApproach(transactions).time);
}

const avgOriginal = originalResults.reduce((a, b) => a + b) / iterations;
const avgOptimized = optimizedResults.reduce((a, b) => a + b) / iterations;

console.log(`Original Approach (Avg): ${avgOriginal.toFixed(2)}ms`);
console.log(`Optimized Approach (Avg): ${avgOptimized.toFixed(2)}ms`);
console.log(`Improvement: ${(((avgOriginal - avgOptimized) / avgOriginal) * 100).toFixed(2)}%`);
