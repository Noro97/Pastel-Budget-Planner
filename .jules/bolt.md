## 2024-04-14 - Optimize Date Parsing in Arrays

**Learning:** Parsing ISO date strings to JS Dates (e.g. `new Date(t.date)`) is a significant performance bottleneck in tight loops over large arrays.
**Action:** Use string prefix matching (`startsWith` or `slice`) instead of parsing when filtering by month/year on ISO strings like 'YYYY-MM-DD'.
## 2024-04-14 - Optimize Date String Filtering
**Learning:** Parsing `YYYY-MM-DD` string into a `Date` object and calling `getMonth()` uses local timezone. If it evaluates to e.g. UTC, local timezone might shift the month down by 1 if not done carefully. String matching `startsWith` is fast but inherently compares against local year-month strictly, so if timezone bug happens string parsing is better.
**Action:** When evaluating months of `YYYY-MM-DD` formatted dates, cache the splits string.
