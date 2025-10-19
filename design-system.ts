export const COLORS = {
  primary: {
    blue: {
      50: 'bg-blue-50',
      100: 'bg-blue-100',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
      700: 'bg-blue-700',
      text: {
        600: 'text-blue-600',
        700: 'text-blue-700',
        800: 'text-blue-800',
      },
    },
    emerald: {
      50: 'bg-emerald-50',
      500: 'bg-emerald-500',
      600: 'bg-emerald-600',
      text: {
        600: 'text-emerald-600',
        700: 'text-emerald-700',
      },
    },
  },

  status: {
    success: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-300',
      ring: 'ring-emerald-400',
    },
    error: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-300',
      ring: 'ring-rose-400',
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-300',
    },
  },

  neutral: {
    bg: {
      primary: 'bg-gray-50',
      secondary: 'bg-white',
      muted: 'bg-gray-100',
      dark: 'bg-gray-800',
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      muted: 'text-gray-500',
      light: 'text-gray-400',
    },
    border: 'border-gray-200',
  },

  badge: {
    emerald: 'text-emerald-500',
    blue: 'text-blue-500',
    amber: 'text-amber-500',
    rose: 'text-rose-500',
  },

  interactive: {
    focus: 'focus:ring-2 focus:ring-blue-400 focus:outline-none',
    hover: 'hover:bg-blue-600',
    transition: 'transition-all duration-200',
  },
} as const;

export const SPACING = {
  container: 'container mx-auto',
  padding: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
  margin: {
    sm: 'm-4',
    md: 'm-6',
    lg: 'm-8',
  },
  gap: {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  },
} as const;

export const TYPOGRAPHY = {
  heading: {
    xl: 'text-2xl md:text-3xl font-bold',
    lg: 'text-xl font-bold',
    md: 'text-lg font-semibold',
  },
  body: {
    base: 'text-base',
    sm: 'text-sm',
    lg: 'text-lg',
  },
} as const;

export const COMPONENTS = {
  card: `bg-white border border-gray-100 p-4 md:p-6 rounded-xl liquid-glass`,
  button: {
    primary: `text-white font-semibold py-2.5 px-5 rounded-lg ${COLORS.interactive.transition} shadow-sm hover:shadow-md liquid-glass`,
    secondary: `text-white font-medium py-2 px-4 rounded-lg ${COLORS.interactive.transition} liquid-glass`,
    success: `text-white font-semibold py-2.5 px-5 rounded-lg ${COLORS.interactive.transition} shadow-sm liquid-glass`,
    danger: `text-white font-semibold py-2.5 px-5 rounded-lg ${COLORS.interactive.transition} shadow-sm liquid-glass`,
  },
  input: `w-full px-4 py-2.5 border-gray-300 rounded-lg ${COLORS.interactive.focus} ${COLORS.interactive.transition} placeholder:text-gray-400 liquid-glass`,
} as const;
