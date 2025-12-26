# Color Palette Guide

This document explains how to customize and update the color palette for Mermaid Go.

## Current Color Palette

The application uses a centralized color system defined in [`constants.tsx`](constants.tsx):

```typescript
export const COLORS = {
  primary: {
    base: '#0F172A',      // Deep Navy - Main background, headers
    light: '#1E293B',     // Lighter navy for elevated surfaces
    lighter: '#334155',   // Even lighter for hover states
  },
  accent: {
    base: '#06B6D4',      // Cyan - Primary buttons, links
    hover: '#0891B2',     // Darker cyan for hover
    light: '#22D3EE',     // Lighter cyan for highlights
  },
  success: {
    base: '#10B981',      // Emerald - Success states, confirmations
    hover: '#059669',     // Darker emerald for hover
    light: '#34D399',     // Lighter emerald for highlights
  },
  warning: {
    base: '#F59E0B',      // Amber - Warnings, alerts
    hover: '#D97706',     // Darker amber for hover
    light: '#FBBF24',     // Lighter amber for highlights
  },
  text: {
    primary: '#F1F5F9',   // Off-white - Primary text
    secondary: '#CBD5E1', // Lighter gray - Secondary text
    muted: '#94A3B8',     // Even lighter - Muted text
    dark: '#64748B',      // Dark gray - Disabled/placeholder
  },
  error: {
    base: '#EF4444',      // Red for errors
    hover: '#DC2626',     // Darker red for hover
    light: '#F87171',     // Lighter red for backgrounds
  },
  border: {
    base: '#334155',      // Default border color
    light: '#475569',     // Lighter border
    lighter: '#64748B',   // Even lighter border
  },
}
```

## How to Change Colors

### 1. Update the Color Constants

Edit the `COLORS` object in [`constants.tsx`](constants.tsx) to change any color values. All components will automatically use the updated colors.

### 2. Additional Files to Update

When changing the primary brand color, also update:

- **[`index.html`](index.html)** - Update the `theme-color` meta tag (line 14)
- **[`index.html`](index.html)** - Update syntax highlighting colors in the `<style>` section if desired

### 3. Logo Colors

The Mermaid Go logo uses a gradient. To change it:

- Edit [`components/Icons.tsx`](components/Icons.tsx)
- Update the `MermaidGoLogo` component
- The gradient uses `COLORS.accent.base` → `COLORS.success.base`

## Color Usage by Component

### Editor (`components/Editor.tsx`)
- Background: `COLORS.primary.base`
- Borders: `COLORS.border.base`
- Generate button: `COLORS.accent.base` with hover effect
- Success indicator: `COLORS.success.base`
- Error indicator: `COLORS.error.base`

### Viewer (`components/Viewer.tsx`)
- Background: `COLORS.primary.base`
- Loading spinner: `COLORS.accent.base`
- Share button: `COLORS.accent.base` (or `COLORS.success.base` when copied)
- SVG export button: `COLORS.success.base`
- PNG export button: `COLORS.warning.base`
- Error messages: `COLORS.error.base`

### Footer (`components/Footer.tsx`)
- Background: `COLORS.primary.base`
- Borders: `COLORS.border.base`

## Design Philosophy

The color palette is designed to:
- Provide clear visual hierarchy
- Maintain accessibility (good contrast ratios)
- Support different UI states (hover, active, disabled)
- Create a cohesive brand identity

**Primary (Deep Navy)**: Professional, trustworthy background
**Accent (Cyan)**: Energetic, modern call-to-action color
**Success (Emerald)**: Positive feedback and completion
**Warning (Amber)**: Attention without alarm

All colors are tested for readability against the dark navy background.
