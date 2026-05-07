## 2024-05-07 - Date sorting optimization
**Learning:** Parsing `Date` objects repeatedly inside an `.sort()` comparator is an O(N log N) overhead that can be avoided because ISO date strings (YYYY-MM-DD) natively sort chronologically via string comparison (`localeCompare`).
**Action:** When sorting dates that are formatted consistently as 'YYYY-MM-DD' ISO strings, use direct string comparison instead of converting them to `Date` objects to avoid unnecessary performance overhead.
