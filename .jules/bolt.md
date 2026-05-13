
## 2024-05-18 - Replacing O(N) JSON.stringify deeply nested object comparison inside useEffects
**Learning:** In React, passing inline objects as props (e.g., `stats={{ balance }}`) causes the object reference to change on every render. If this object needs to trigger effects, avoid using `JSON.stringify` on the object for deep comparison inside `useEffect`, as it executes on every render and creates a hidden O(N) bottleneck, especially if large arrays are stringified as well to bypass React dependency checks.
**Action:** Extract primitives from the object and pass them to the `useEffect` dependency array (e.g., `stats.balance`), relying on React's built-in O(1) equality check instead of costly deep comparisons.
