
export const DEFAULT_MERMAID_CODE = `graph TD
    A[Start] --> B{Is it mobile?}
    B -- Yes --> C[Use Mermaid Studio]
    B -- No --> D[Still use it!]
    C --> E[Fast Rendering]
    D --> E
    E --> F[Download PNG]
    F --> G[Done]`;

export const APP_TITLE = "Mermaid Studio";

// Color Palette - Central color configuration for easy theme management
export const COLORS = {
  // Primary Brand
  primary: {
    base: '#0F172A',      // Deep Navy - Main background, headers
    light: '#1E293B',     // Lighter navy for elevated surfaces
    lighter: '#334155',   // Even lighter for hover states
  },
  // Accent/Call-to-Action
  accent: {
    base: '#06B6D4',      // Cyan - Primary buttons, links
    hover: '#0891B2',     // Darker cyan for hover
    light: '#22D3EE',     // Lighter cyan for highlights
  },
  // Success/Flow
  success: {
    base: '#10B981',      // Emerald - Success states, confirmations
    hover: '#059669',     // Darker emerald for hover
    light: '#34D399',     // Lighter emerald for highlights
  },
  // Warning/Alert
  warning: {
    base: '#F59E0B',      // Amber - Warnings, alerts
    hover: '#D97706',     // Darker amber for hover
    light: '#FBBF24',     // Lighter amber for highlights
  },
  // Text
  text: {
    primary: '#F1F5F9',   // Off-white - Primary text
    secondary: '#CBD5E1', // Lighter gray - Secondary text
    muted: '#94A3B8',     // Even lighter - Muted text
    dark: '#64748B',      // Dark gray - Disabled/placeholder
  },
  // Semantic colors
  error: {
    base: '#EF4444',      // Red for errors
    hover: '#DC2626',     // Darker red for hover
    light: '#F87171',     // Lighter red for backgrounds
  },
  // Borders and dividers
  border: {
    base: '#334155',      // Default border color
    light: '#475569',     // Lighter border
    lighter: '#64748B',   // Even lighter border
  },
} as const;
