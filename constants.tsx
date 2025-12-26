
export const DEFAULT_MERMAID_CODE = `graph TD
    A[Start] --> B{Is it mobile?}
    B -- Yes --> C[Use Mermaid Studio]
    B -- No --> D[Still use it!]
    C --> E[Fast Rendering]
    D --> E
    E --> F[Download PNG]
    F --> G[Done]`;

export const APP_TITLE = "Mermaid Studio";
