## 2025-04-08 - [Single-Pass Reduction]
**Learning:** For large arrays, chaining `.filter()` and `.reduce()` iterates the array twice, causing extra iterations and memory allocations. It's significantly faster to use a single-pass `.reduce()` where you check the filtering condition inside the reducer. This was observed in `useSubscriptions.ts` and `SubscriptionDashboard.tsx`.
**Action:** Always prefer a single-pass `.reduce()` over a chained `.filter().reduce()` sequence when processing data in arrays, especially for large datasets.
