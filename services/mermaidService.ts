
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter',
});

// Basic check to see if the string looks like Mermaid code
const MERMAID_KEYWORDS = [
  'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 
  'erDiagram', 'journey', 'gantt', 'pie', 'quadrantChart', 'requirementDiagram',
  'mindmap', 'timeline', 'gitGraph', 'C4Context'
];

export const renderDiagram = async (id: string, code: string): Promise<string> => {
  const trimmed = code.trim();
  if (!trimmed) {
    throw new Error("Diagram code is empty.");
  }

  // Quick check for standard Mermaid keywords
  const firstWord = trimmed.split(/[\s\n(]/)[0];
  if (!MERMAID_KEYWORDS.includes(firstWord) && !trimmed.startsWith('%%')) {
    throw new Error(`No diagram type detected (like 'graph', 'sequenceDiagram', etc.). Please ensure your code starts with a valid Mermaid keyword.`);
  }

  try {
    const { svg } = await mermaid.render(id, code);
    return svg;
  } catch (error: any) {
    console.error("Mermaid rendering failed:", error);
    // Extract a cleaner error message if possible
    const msg = error?.message || "Syntax error in Mermaid code.";
    throw new Error(msg);
  }
};
