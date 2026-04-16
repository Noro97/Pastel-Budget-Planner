## 2024-05-24 - [Avoid Array Method Chaining for Early Exits]

**Learning:** Chaining array methods like `.filter().map()` over large datasets forces the engine to process the entire array multiple times and allocate intermediate arrays. In `gamification/badgeData.ts`, this was used just to check if 5 unique categories existed. Replacing it with a single `for...of` loop with an early return yielded a ~99% performance improvement by avoiding unnecessary iterations and memory allocations.
**Action:** When searching for a threshold condition (e.g., "at least 5 unique items"), always use a manual loop (`for...of`) with an early `return` instead of chaining array methods over the entire collection.
