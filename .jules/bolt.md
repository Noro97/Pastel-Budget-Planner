## 2023-10-27 - Hoisting O(N) calculations from loops

**Learning:** In React render logic (like progress bars or lists), normalizing data with `Math.max` or similar operations inside a `.map()` loop recalculates the maximum on every iteration, leading to O(N^2) complexity. This is a common pattern in dashboards dealing with dynamic totals.
**Action:** Always extract O(N) calculations (like `Math.max(...Object.values(data))`) outside the mapping loop and assign them to a constant before generating the UI array, especially for data visualizations that can grow dynamically.
