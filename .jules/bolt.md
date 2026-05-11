## 2024-05-18 - String Date Sorting

**Learning:** Comparing ISO date strings (YYYY-MM-DD) natively with `< / >` or `localeCompare` is ~10x faster than parsing to `Date` objects for sorting operations in arrays.
**Action:** Replace `new Date(a.date).getTime() - new Date(b.date).getTime()` with native string comparison `a.date.localeCompare(b.date)` or string operators when processing lists.
