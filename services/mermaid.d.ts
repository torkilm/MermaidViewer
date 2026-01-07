// Type declarations for Mermaid CDN import
declare module 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs' {
  export interface MermaidConfig {
    startOnLoad?: boolean;
    theme?: string;
    securityLevel?: 'strict' | 'loose' | 'sandbox';
    fontFamily?: string;
    [key: string]: any;
  }

  export interface RenderResult {
    svg: string;
    bindFunctions?: (element: Element) => void;
  }

  export interface Mermaid {
    initialize(config: MermaidConfig): void;
    render(id: string, text: string): Promise<RenderResult>;
  }

  const mermaid: Mermaid;
  export default mermaid;
}
