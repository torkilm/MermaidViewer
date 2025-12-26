# **Agents.md \- Context & Engineering Guidelines for Mermaid Studio**

## **1\. Project Overview**

* **Product Name:** Mermaid Studio  
* **Domain:** mermaidstudio.io  
* **Tagline:** A premium, "light" web-based IDE for Mermaid.js diagrams.  
* **Vision:** Moving beyond a basic editor to a "Studio" experience focusing on aesthetics, team collaboration, and AI-assisted diagramming.

## **2\. Ideal Customer Profiles (ICPs)**

Agents should keep these users in mind when proposing features or UI:

1. **The Software Architect:** Needs version control, technical precision, and system maintainability.  
2. **The Technical Product Manager (TPM):** Needs speed, AI-generation, and visual clarity for stakeholder alignment.  
3. **The Content Creator:** Needs high-quality, branded exports (SVG/PNG) and consistent aesthetics.

## **3\. Technology Stack**

* **Framework:** \[Specify: e.g., Next.js / React / Vite\]  
* **Styling:** Tailwind CSS (Utility-first, responsive).  
* **Diagram Engine:** Mermaid.js.  
* **State Management:** \[Specify: e.g., Zustand / Jotai / Signals\] for real-time preview.  
* **Icons:** Lucide React.

## **4\. Design System & Brand Voice (Deep Sea Professional)**

Adhere to these tokens for all UI generation:

* **Primary Brand Color:** \#0F172A (Deep Navy / Slate 900\)  
* **Secondary Surface:** \#1E293B (Slate 800\)  
* **Accent/Action:** \#06B6D4 (Cyan 500\) \- For buttons and AI features.  
* **Success/Flow:** \#10B981 (Emerald 500).  
* **Warning/Alert:** \#F59E0B (Amber 500).  
* **Typography:** \- UI: Sans-serif (Inter or Geist).  
  * Code: Monospaced (Fira Code or JetBrains Mono).  
* **Aesthetics:** Clean, "Studio-grade", subtle borders (border-slate-700), hover transitions, and ample whitespace.

## **5\. Technical Standards & Best Practices**

### **5.1 Performance & Rendering**

* **Lazy Loading:** Mermaid.js is heavy. Never include it in the main bundle. Load dynamically/on-demand.  
* **Debounced Updates:** Implement a 300-500ms debounce on the editor input before re-rendering diagrams to save CPU/battery.  
* **Responsive Canvas:** Ensure the diagram container handles overflow and resizing gracefully without breaking the layout.

### **5.2 Code Quality & Architecture**

* **KISS & DRY:** Keep logic simple; extract reusable UI patterns into atomic components.  
* **TypeScript:** Strict typing only. No any. Define interfaces for all data structures (Themes, DiagramData, Config).  
* **Functional State:** Treat state as immutable. Use functional updates in hooks and stores.  
* **Zod Validation:** Validate all external inputs (API responses, LocalStorage) using Zod schemas.

### **5.3 Styling (Tailwind)**

* **Responsive First:** Design for mobile-first, but optimize for desktop "Studio" workflow.  
* **Design Tokens:** Use Tailwind variables (e.g., bg-brand-dark) defined in tailwind.config.js rather than hardcoded hex values.  
* **Accessible UI:** Ensure WCAG compliance for contrast and keyboard navigation.

### **5.4 Error Handling**

* **Graceful Degradation:** If syntax fails, show a helpful hint but keep the last valid diagram visible to avoid UI flickering.  
* **User Messaging:** Use custom toast/modal components; avoid native alert().

### **5.5 Testing Standards**

* **Test-Driven Thinking:** When generating complex logic (parsing, theme-engine, state-transitions), always provide accompanying unit tests.  
* **Unit Testing:** Use Vitest/Jest for pure functions and utility logic.  
* **Integration Testing:** Focus on the "Editor-to-Canvas" flow. Ensure that valid Mermaid syntax results in a rendered SVG.  
* **Visual Regression:** Since aesthetics are a core value, use visual snapshot testing (e.g., Playwright) for key diagram themes to prevent styling breakage.  
* **Component Testing:** Test UI components for accessibility and expected interaction states (hover, focus, active).

## **6\. Product Roadmap Context**

Consider these future features when building foundations:

* **AI-Native Workflow:** Natural language to diagram generation.  
* **Theming Engine:** Dynamic injection of CSS/Themes into Mermaid configs.  
* **Live Collaboration:** Real-time multi-user editing (CRDT-ready state).  
* **Workspace Management:** Folder-based organization for diagrams.

## **7\. Prohibited Practices**

* **No Legacy CSS:** Do not use Bootstrap or global CSS files for component styling.  
* **No Heavy Deps:** Avoid adding libraries for features that can be built with 10-20 lines of vanilla JS.  
* **No Hardcoding:** Never hardcode styles that should be part of the theme engine.  
* **No Cluttered UIs:** Prioritize the canvas. Keep controls organized and unobtrusive.

## **8\. Git & Workflow**

* **Conventional Commits:** feat:, fix:, docs:, style:, refactor:, perf:.  
* **Branching:** Short-lived feature branches; Merge via Pull Request.