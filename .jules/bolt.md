## 2026-04-12 - Optimize currentMonthTransactions date filtering
**Learning:** Parsing ISO string dates to JS Date objects inside array iteration (filter, map, reduce) is significantly slower than string matching operations (like startsWith), especially on large data. It is a common bottleneck.
**Action:** Use string matching / padding for date comparisons instead of creating Date objects when you only need YYYY-MM filtering.
