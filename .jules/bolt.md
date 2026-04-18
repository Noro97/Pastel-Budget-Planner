## 2025-03-01 - React Re-render Redundant Calculations

**Learning:** Hoisting calculations like `Math.max` outside of a `.map` loop during rendering reduces rendering complexity from O(N^2) to O(N). The previous implementation repetitively computed `Math.max` over the entire `categoryTotals` object values for every category element rendered in `SubscriptionDashboard.tsx`.
**Action:** Always scan for aggregations over entire datasets (`Math.max`, `.reduce`, `.filter`) embedded within rendering loops (`.map`, `.forEach`). Hoist these outside the loop to be computed once per render block.
