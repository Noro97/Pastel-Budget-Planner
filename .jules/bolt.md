## 2025-03-09 - Avoid JSON.stringify on inline object dependencies
**Learning:** In React, passing inline objects as props (e.g., `stats={{ balance }}`) causes the object reference to change on every render. If these objects are then deeply compared inside a hook like `useEffect` using `JSON.stringify(stats)`, it introduces a hidden O(N) recalculation on every render.
**Action:** Replace `JSON.stringify` on inline dependencies with O(1) primitive value checks (e.g., `stats.balance`) and rely on reference equality for state arrays.
