## 2025-01-20 - [Date parsing performance & Timezone bugs]
**Learning:** Re-evaluating `new Date(string)` inside `.filter()` is extremely slow (O(N)). Also, standard JavaScript `.getMonth()` on locally parsed standard strings (`YYYY-MM-DD`) leads to timezone off-by-one errors.
**Action:** When working with ISO-8601 or similar formatted date strings, avoid converting to `Date` objects inside loops. Opt for string comparison (like `.startsWith()` or splitting on `-`) for huge performance gains (>60%) and better timezone safety.
