/**
 * Zameen Project Design System
 * Centralized design tokens and rules for consistent component styling
 */

// Color Palette
export const colors = {
  // Chart colors
  chart: {
    primary: '#0ea5e9', // Sky blue for main bars/data
    accent: '#f97316', // Orange for secondary data
    success: '#22c55e', // Green for positive indicators
    warning: '#ef4444', // Red for attention
  },

  // R² strength colors (SizeVsPriceSummary)
  rSquared: {
    strong: '#3b82f6', // Dark blue for R² >= 0.45
    moderate: '#60a5fa', // Medium blue for R² >= 0.30
    weak: '#93c5fd', // Light blue for R² < 0.30
  },

  // Bargain indicator colors
  bargain: {
    flag: '#ef4444', // Red for bargains
    other: '#f3f4f6', // Gray for non-bargains
  },

  // Dark theme - slate palette
  dark: {
    bg950: '#030712', // Darkest background
    bg900: '#0f172a', // Dark background
    slate900: '#0f172a',
    slate800: '#1e293b',
    slate700: '#334155',
    slate600: '#475569',
    slate500: '#64748b',
    slate400: '#94a3b8',
    slate300: '#cbd5e1',
    slate200: '#e2e8f0',
  },

  // Text colors
  text: {
    primary: '#f1f5f9', // Almost white for headings
    secondary: '#cbd5e1', // Lighter gray for body
    muted: '#94a3b8', // Muted gray for labels
    hint: '#64748b', // Even more muted
  },
}

// Chart configuration
export const chartConfig = {
  // Tooltip styling
  tooltip: {
    bg: 'bg-slate-900',
    border: 'border border-slate-700',
    padding: 'p-3',
    rounded: 'rounded',
    textColor: 'text-slate-200',
    fontSize: 'text-xs',
  },

  // Grid styling
  grid: {
    stroke: '#475569',
    strokeDasharray: '5 5',
  },

  // Axis styling
  axis: {
    stroke: '#64748b',
    labelFill: '#94a3b8',
    labelFontSize: 13,
    tickFontSize: 14,
    tickFill: '#94a3b8',
    tickFontWeight: 500,
  },

  // Bar styling
  bar: {
    primaryFill: '#0ea5e9',
    radius: [0, 4, 4, 0] as [number, number, number, number],
  },

  // Spacing
  spacing: {
    chartPadding: { top: 10, right: 100, left: 80, bottom: 10 },
    tooltipPadding: 3,
  },
}

// Typography
export const typography = {
  heading: {
    h1: 'text-4xl md:text-5xl font-semibold',
    h2: 'text-2xl font-semibold',
    h3: 'text-2xl font-bold',
    h4: 'text-sm font-bold',
    label: 'text-xs font-medium uppercase tracking-wide',
  },

  body: {
    base: 'text-base', // Default body text size
    large: 'text-lg',
    small: 'text-sm',
    xs: 'text-xs',
  },
}

// Component sizing
export const sizing = {
  // Chart sizing
  chart: {
    construction: {
      height: 'h-64',
      margin: { top: 10, right: 100, left: 80, bottom: 10 },
    },
    sizeVsPrice: {
      height: 'h-72',
      margin: { top: 30, right: 30, bottom: 20, left: 60 },
    },
    bargain: {
      donut: {
        width: 'w-56',
        height: 'h-56',
      },
      bars: {
        height: 'h-40',
      },
    },
  },
}

// Presets for common component patterns
export const presets = {
  // Tooltip component preset
  customTooltip: {
    containerClasses: 'bg-slate-900 border border-slate-700 p-3 rounded text-slate-200 text-xs',
    labelClasses: 'font-medium',
    valueClasses: 'text-slate-300',
  },

  // Narrative text preset
  narrativeText: {
    color: 'text-slate-300',
    fontSize: '', // Default/base size - no explicit font-size class
  },

  // Metric card preset
  metricCard: {
    bg: 'bg-slate-800',
    border: 'border border-slate-700',
    padding: 'p-6',
    rounded: 'rounded-lg',
    labelColor: 'text-slate-400',
    valueColor: 'text-sky-400',
  },
}
