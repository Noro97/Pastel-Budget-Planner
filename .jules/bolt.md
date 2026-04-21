## 2025-03-01 - Date parsing overhead in sort and loop equality checks

**Learning:** Instantiating `new Date()` excessively inside array sorting operations (e.g., `new Date(a).getTime() - new Date(b).getTime()`) or inside tight loops causes a noticeable performance drop. This application consistently stores dates in the 'YYYY-MM-DD' ISO format.
**Action:** When dates are strictly formatted as 'YYYY-MM-DD', avoid `new Date()` and use direct string comparison (e.g., `a.localeCompare(b)`) for sorting chronologically, and `===` for equality checks. This leverages the strict lexical ordering of ISO strings without incurring the runtime cost of Date parsing.
