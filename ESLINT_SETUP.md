# ESLint & Prettier Setup Guide

This project is configured with a comprehensive ESLint and Prettier setup for React TypeScript development.

## 🚀 What's Included

### ESLint Configuration

- **Modern Flat Config**: Using the latest ESLint v9 flat configuration format
- **TypeScript Support**: Full TypeScript parsing and rules
- **React & JSX**: Comprehensive React and JSX linting
- **React Hooks**: Hooks rules for proper hook usage
- **Accessibility**: JSX a11y rules for accessibility compliance
- **Import Organization**: Automatic import sorting and organization
- **Browser Globals**: Configured for browser environment (window, document, etc.)

### Prettier Configuration

- **Consistent Formatting**: Automatic code formatting
- **Customized Rules**: Tailored for React TypeScript projects
- **ESLint Integration**: Configured to work seamlessly with ESLint

### Git Hooks

- **Pre-commit Hooks**: Automatic linting and formatting before commits
- **Husky**: Git hooks management
- **Lint-staged**: Run linters only on staged files for performance

## 📋 Available Scripts

```bash
# Linting
npm run lint          # Check for linting errors
npm run lint:fix      # Fix auto-fixable linting errors
npm run lint:check    # Check with zero warnings tolerance

# Formatting
npm run format        # Format all files with Prettier
npm run format:check  # Check if files are properly formatted
```

## 🔧 VS Code Integration

The project includes VS Code configuration for optimal development experience:

### Extensions

Install the recommended extensions from `.vscode/extensions.json`:

- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features

### Settings

The project includes VS Code settings that:

- Auto-format on save
- Auto-fix ESLint issues on save
- Set proper rulers and formatting preferences

## 🎯 ESLint Rules Overview

### TypeScript Rules

- Unused variables detection (with underscore prefix exception)
- No explicit `any` warnings
- Prefer const over let where applicable

### React Rules

- No React import needed (new JSX transform)
- JSX key requirements
- Proper hook usage patterns
- Accessibility compliance

### Code Quality Rules

- Prefer const over let/var
- Template literals over string concatenation
- Consistent equality checking (===)
- Proper error handling patterns

### Import Rules

- Alphabetical import sorting
- Grouped imports (external, internal, relative)
- No duplicate imports
- Proper import organization

## 🚫 What Gets Ignored

The following files and directories are ignored by ESLint:

- `dist/` - Build output
- `build/` - Build output
- `node_modules/` - Dependencies
- `.vite/` - Vite cache
- `*.config.js` and `*.config.ts` - Configuration files

## 🔄 Pre-commit Hooks

Git pre-commit hooks automatically:

1. Run ESLint on staged TypeScript/JavaScript files
2. Format staged files with Prettier
3. Prevent commits if linting fails

## 🛠️ Customization

### Adding New Rules

Edit `eslint.config.js` to add or modify rules:

```javascript
rules: {
  'your-custom-rule': 'error',
  // ... other rules
}
```

### Prettier Customization

Edit `.prettierrc` to change formatting preferences:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100
}
```

### Disabling Rules

For specific lines or files, use ESLint disable comments:

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = unknownData;
```

## 🚨 Common Issues & Solutions

### "crypto is not defined"

This is expected in browser environments. The configuration includes browser globals to handle this.

### React Hook Dependencies

ESLint will warn about missing dependencies in useEffect. Either:

1. Add the dependency to the dependency array
2. Use useCallback for function dependencies
3. Add `// eslint-disable-next-line react-hooks/exhaustive-deps` if intentional

### Import Order Issues

Run `npm run lint:fix` to automatically fix import ordering issues.

## 📈 Benefits

1. **Consistent Code Style**: Automatic formatting ensures consistency across the team
2. **Early Bug Detection**: Catch common React and TypeScript issues before runtime
3. **Accessibility**: Built-in a11y rules help create accessible applications
4. **Performance**: Lint-staged ensures fast pre-commit checks
5. **Developer Experience**: VS Code integration provides real-time feedback

## 🔄 Maintenance

This setup is designed to be:

- **Future-proof**: Uses latest ESLint flat config format
- **Maintainable**: Clear separation of concerns between linting and formatting
- **Extensible**: Easy to add new rules or plugins as needed
- **Team-friendly**: Consistent experience across different development environments
