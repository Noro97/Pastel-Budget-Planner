## 2024-05-24 - [Date parsing bottleneck in loops]

**Learning:** Parsing ISO strings to JS `Date` objects inside tight `.filter()` or `.map()` loops over large arrays (like transactions) introduces a significant performance overhead (approx. ~3x slower).
**Action:** When filtering dates by month/year on ISO strings (`YYYY-MM-DD`), construct a search prefix outside the loop (e.g., `YYYY-MM-`) and use `String.prototype.startsWith()` instead of parsing `new Date()` per item.
