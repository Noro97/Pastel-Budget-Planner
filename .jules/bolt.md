## 2024-05-04 - [Performance optimization of useEffect dependency checking in hooks/useGamification.ts]
**Learning:** Using `JSON.stringify` on large arrays inside `useEffect` for deep comparison executes on every render and creates a hidden O(N) bottleneck.
**Action:** Replace `JSON.stringify` with O(1) reference equality checks and fast primitive comparisons instead.
