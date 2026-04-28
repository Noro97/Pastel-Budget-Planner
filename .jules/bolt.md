## 2025-04-28 - Avoid localeCompare for date sorting
**Learning:** While replacing `new Date(a).getTime() - new Date(b).getTime()` with `a.localeCompare(b)` for `YYYY-MM-DD` strings avoids parsing objects, `localeCompare` is notoriously slow in JavaScript due to complex locale-aware alphabet rules.
**Action:** For strictly formatted ISO strings (`YYYY-MM-DD`), standard relational operators (`a < b ? -1 : (a > b ? 1 : 0)`) are ~4x faster than `localeCompare` and ~10x faster than Date parsing. Always use comparison operators for simple predictable ISO strings.
