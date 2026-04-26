## 2024-05-18 - String Date Sorting

**Learning:** Dates formatted consistently as 'YYYY-MM-DD' ISO strings can be sorted chronologically using direct string comparison (`a.localeCompare(b)` or `a < b`).
**Action:** Use this method to avoid the significant performance overhead (approx 10x slower) of parsing string dates into `Date` objects repeatedly during array sort operations, as seen when sorting items by date properties (e.g. `nextPaymentDate`).
