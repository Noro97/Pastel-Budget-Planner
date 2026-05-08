## 2024-05-24 - Repository Cleanup Before Committing
**Learning:** When using the `patch` tool or debugging code, temporary backup files (`*.orig`, `*.rej`) or test diffs (`*.diff`) can inadvertently pollute the working directory and be included in commits if not cleaned up properly.
**Action:** Always run `git status` before committing and use `rm` to explicitly clean up `.orig`, `.rej`, `.diff` files and unexpected modifications to lockfiles (like `pnpm-lock.yaml`) unless explicitly instructed to commit them.
