export const COLORS = {
  primary: {
    teal: {
      200: 'bg-teal-200',
      800: 'text-teal-800',
    },
    sky: {
      400: 'bg-sky-400',
      500: 'text-sky-500',
    },
  },

  status: {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'bg-green-300',
      ring: 'ring-green-400',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'bg-red-300',
      ring: 'ring-red-400',
    },
    warning: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
    },
  },

  neutral: {
    bg: {
      primary: 'bg-slate-50',
      secondary: 'bg-white',
      muted: 'bg-slate-100',
    },
    text: {
      primary: 'text-slate-800',
      secondary: 'text-slate-700',
      muted: 'text-slate-500',
      light: 'text-slate-400',
    },
    border: 'border-slate-300',
  },

  badge: {
    emerald: 'text-emerald-500',
    sky: 'text-sky-500',
    amber: 'text-amber-500',
    violet: 'text-violet-500',
  },

  interactive: {
    focus: 'focus:ring-2 focus:ring-sky-300',
    hover: 'hover:bg-sky-500',
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
  card: `${COLORS.neutral.bg.secondary} ${SPACING.padding.md} rounded-2xl shadow-lg`,
  button: {
    primary: `${COLORS.primary.sky[400]} text-white font-bold py-3 px-4 rounded-lg ${COLORS.interactive.hover} transition-colors duration-300 shadow-md`,
    secondary: `${COLORS.neutral.bg.muted} ${COLORS.neutral.text.muted} font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors`,
  },
  input: `w-full px-3 py-2 ${COLORS.neutral.border} rounded-lg focus:outline-none ${COLORS.interactive.focus}`,
} as const;
