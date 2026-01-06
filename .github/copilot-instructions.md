# Copilot Instructions for Mermaid Studio

## Project Overview

**Mermaid Studio** is a mobile-first, ultra-lightweight Mermaid diagram renderer built with React and TypeScript. It provides a seamless editing and viewing experience for Mermaid diagrams with live preview, export functionality, and URL-based sharing.

**Live Demo:** https://torkilm.github.io/MermaidViewer/

**For detailed agent context, see:** [Agents.md](../Agents.md)

## Technology Stack

- **Framework:** React 19 with TypeScript (strict mode)
- **Build Tool:** Vite 6
- **Styling:** Inline styles using a centralized color system (see [COLOR_GUIDE.md](../COLOR_GUIDE.md))
- **Diagram Engine:** Mermaid.js (dynamically loaded)
- **State Management:** React hooks with local state
- **Testing:** Custom test runner (tests in `/tests` directory)

## Project Structure

```
/
├── .github/              # GitHub configuration and workflows
├── components/           # React components
│   ├── Editor.tsx       # Code editor component
│   ├── Viewer.tsx       # Diagram viewer with zoom/pan
│   ├── Footer.tsx       # App footer
│   ├── Icons.tsx        # Icon components
│   ├── ConsentBanner.tsx # Cookie consent banner
│   └── SyntaxHighlighter.tsx # Code syntax highlighting
├── services/            # External services (e.g., Mermaid rendering, Gemini API)
├── utils/               # Utility functions
├── tests/               # Test files
├── App.tsx              # Main application component
├── constants.tsx        # Centralized constants and color system
├── types.ts             # TypeScript type definitions
└── index.tsx            # Application entry point
```

## Coding Standards

### TypeScript

- **Strict mode enabled:** All compiler strict flags are on
- **No `any` types:** Use proper type definitions
- **No unused variables/parameters:** Compiler will reject these
- Use interfaces for object shapes and types for unions/primitives
- Leverage type inference where obvious, but be explicit for public APIs

### React

- **Functional components only:** Use React hooks for state and side effects
- **Prefer `useCallback`** for event handlers to avoid unnecessary re-renders
- **Use `React.FC`** type for component definitions
- Components should be organized with hooks at the top, then render logic

### Styling

- **Centralized color system:** Always use `COLORS` from `constants.tsx`
- **No external CSS files:** Use inline styles with the color constants
- **Mobile-first:** Design for mobile, enhance for desktop
- See [COLOR_GUIDE.md](../COLOR_GUIDE.md) for detailed color usage guidelines

### Code Organization

- **KISS & DRY:** Keep code simple and avoid duplication
- **Small, focused components:** Each component should have a single responsibility
- **Extract reusable logic:** Create utility functions in `/utils` for shared logic
- **Type-safe utilities:** All utility functions should have explicit return types

## Key Architectural Decisions

### Performance Optimization

1. **Debounced rendering:** Diagram updates are debounced to prevent excessive re-renders
2. **Dynamic Mermaid loading:** Mermaid.js is loaded on-demand, not bundled
3. **URL-based state:** Diagrams are encoded in URL hash for sharing without server dependency

### State Management

- Local state using React hooks (`useState`, `useEffect`, `useCallback`)
- History management with undo/redo support using state arrays
- Auto-save to localStorage with 1-second debounce

### Error Handling

- Graceful degradation: Show helpful error messages while keeping last valid diagram
- No `alert()`: Use custom UI feedback components
- Validate and sanitize all external inputs (especially for XSS prevention in SVG exports)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

- Test files are located in `/tests` directory
- Currently uses a custom test runner (see `tests/exportUtils.test.ts`)
- Focus on testing pure utility functions and security-sensitive code (e.g., SVG sanitization)
- No formal test command in package.json - tests are demonstration files

## Common Patterns

### Adding a New Component

1. Create component file in `/components` directory
2. Use `React.FC` type and proper TypeScript interfaces for props
3. Import colors from `constants.tsx`
4. Use inline styles with color constants
5. Keep components focused and composable

### Adding a New Utility Function

1. Create or update file in `/utils` directory
2. Use strict TypeScript types (no `any`)
3. Export named functions with clear, descriptive names
4. Add JSDoc comments for complex functions
5. Consider adding tests if function handles security or complex logic

### Modifying Colors

1. Update the `COLORS` object in `constants.tsx`
2. Check [COLOR_GUIDE.md](../COLOR_GUIDE.md) for component-specific color usage
3. Update `theme-color` meta tag in `index.html` if changing primary brand color

## Important Conventions

- **No Bootstrap or external CSS frameworks:** Use inline styles only
- **Avoid heavy dependencies:** Prefer vanilla JS/React solutions for simple features
- **URL encoding:** Diagrams are encoded in URL hash using `updateUrlWithDiagram()` utility
- **Git workflow:** Use conventional commits (`feat:`, `fix:`, `docs:`, etc.)

## Security Considerations

- **SVG sanitization:** Always sanitize SVG exports to prevent XSS attacks
- **Input validation:** Validate all user inputs and external data
- **No inline event handlers in SVG exports:** Strip `onclick`, `onload`, etc.
- See `sanitizeSvg()` in `utils/exportUtils.ts` for the sanitization approach

## Documentation

- **Agents.md:** Comprehensive context for AI agents with design philosophy
- **COLOR_GUIDE.md:** Complete guide to the color system and how to customize it
- **README.md:** User-facing documentation with features and deployment instructions

## Do NOT

- Add Tailwind CSS or other CSS frameworks (conflicts with current styling approach)
- Use class-based React components
- Hardcode colors (always use `COLORS` constants)
- Add heavy libraries for features that can be done with simple vanilla code
- Use `any` type in TypeScript
- Create cluttered UIs - prioritize the diagram canvas

## When Making Changes

1. **Check existing documentation:** Review Agents.md and COLOR_GUIDE.md first
2. **Maintain consistency:** Follow existing patterns in the codebase
3. **Think mobile-first:** Ensure changes work on small screens
4. **Test manually:** Run `npm run dev` and verify changes in the browser
5. **Keep it lightweight:** This is a fast, simple app - preserve that quality
