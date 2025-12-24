
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter',
});

export const renderDiagram = async (id: string, code: string): Promise<string> => {
  try {
    const { svg } = await mermaid.render(id, code);
    return svg;
  } catch (error) {
    console.error("Mermaid rendering failed:", error);
    throw error;
  }
};
