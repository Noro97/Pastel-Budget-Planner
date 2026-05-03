## 2024-05-24 - JSON.stringify Bottleneck in React Hooks
**Learning:** `JSON.stringify` on large props or context arrays (like the `transactions` array here) creates severe, hidden O(N) performance bottlenecks when placed inside `useEffect` or render bodies, particularly because they execute on every render.
**Action:** Replace `JSON.stringify` with O(1) referential equality checks for arrays/objects (`prevTransactionsRef.current === transactions`), and explicitly destructure and compare primitives for inline objects (`prevStatsBalanceRef.current === stats.balance`).
