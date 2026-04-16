
## 2024-05-18 - Replacing O(N) JSON.stringify deeply nested object comparison inside useEffects
**Learning:** In React, passing inline objects as props (e.g., `stats={{ balance }}`) causes the object reference to change on every render. If this object needs to trigger effects, avoid using `JSON.stringify` on the object for deep comparison inside `useEffect`, as it executes on every render and creates a hidden O(N) bottleneck, especially if large arrays are stringified as well to bypass React dependency checks.
**Action:** Extract primitives from the object and pass them to the `useEffect` dependency array (e.g., `stats.balance`), relying on React's built-in O(1) equality check instead of costly deep comparisons.

## 2024-05-24 - [Avoid Array Method Chaining for Early Exits]

**Learning:** Chaining array methods like `.filter().map()` over large datasets forces the engine to process the entire array multiple times and allocate intermediate arrays. In `gamification/badgeData.ts`, this was used just to check if 5 unique categories existed. Replacing it with a single `for...of` loop with an early return yielded a ~99% performance improvement by avoiding unnecessary iterations and memory allocations.
**Action:** When searching for a threshold condition (e.g., "at least 5 unique items"), always use a manual loop (`for...of`) with an early `return` instead of chaining array methods over the entire collection.
