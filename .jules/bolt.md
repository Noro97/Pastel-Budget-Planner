## 2024-05-15 - Fast Date Filtering via String Matching

**Learning:** Instantiating `new Date(string)` inside `.filter()` or `.map()` loops is a significant O(N) performance bottleneck. When date strings are strictly formatted as ISO strings (e.g., `YYYY-MM-DD`), string matching (like `.startsWith()` or `.localeCompare()`) is ~85% faster. This approach also prevents elusive UTC vs local timezone offset bugs that can occur when converting strict date strings back and forth to Date objects.
**Action:** When filtering dates inside loops, verify if the date format is strictly stringified. If so, use string manipulation (`startsWith`) or comparison (`localeCompare`) instead of Date object parsing to dramatically reduce memory allocation and CPU overhead.
