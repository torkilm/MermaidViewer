export interface SyntaxError {
  line: number;
  message: string;
  severity: 'error' | 'warning';
}

const MERMAID_KEYWORDS = [
  'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 
  'stateDiagram-v2', 'erDiagram', 'journey', 'gantt', 'pie', 'gitGraph',
  'quadrantChart', 'requirementDiagram', 'mindmap', 'timeline', 'C4Context'
];

const GRAPH_DIRECTIONS = ['TD', 'TB', 'BT', 'RL', 'LR'];

export const validateMermaidSyntax = (code: string): SyntaxError[] => {
  const errors: SyntaxError[] = [];
  const lines = code.split('\n');
  
  if (!code.trim()) {
    return [{
      line: 1,
      message: 'Diagram code is empty. Start with a diagram type like "graph TD" or "sequenceDiagram"',
      severity: 'error'
    }];
  }

  // Find first non-comment, non-empty line
  let firstCodeLine = -1;
  let firstCodeLineIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed && !trimmed.startsWith('%%')) {
      firstCodeLine = i + 1;
      firstCodeLineIndex = i;
      break;
    }
  }

  if (firstCodeLine === -1) {
    return [{
      line: 1,
      message: 'No diagram code found. Only comments detected.',
      severity: 'error'
    }];
  }

  // Check if first code line starts with valid keyword
  const firstLine = lines[firstCodeLineIndex].trim();
  const firstWord = firstLine.split(/[\s\n(]/)[0];
  
  if (!MERMAID_KEYWORDS.includes(firstWord)) {
    errors.push({
      line: firstCodeLine,
      message: `Invalid diagram type "${firstWord}". Expected one of: ${MERMAID_KEYWORDS.slice(0, 5).join(', ')}, etc.`,
      severity: 'error'
    });
  }

  // Check graph direction if it's a graph/flowchart
  if (firstWord === 'graph' || firstWord === 'flowchart') {
    const parts = firstLine.split(/\s+/);
    if (parts.length > 1 && !GRAPH_DIRECTIONS.includes(parts[1])) {
      errors.push({
        line: firstCodeLine,
        message: `Invalid graph direction "${parts[1]}". Use one of: ${GRAPH_DIRECTIONS.join(', ')}`,
        severity: 'error'
      });
    }
  }

  // Check for common syntax issues
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('%%')) continue;

    // Check for unmatched brackets
    const openBrackets = (line.match(/\[/g) || []).length;
    const closeBrackets = (line.match(/\]/g) || []).length;
    if (openBrackets !== closeBrackets) {
      errors.push({
        line: i + 1,
        message: 'Unmatched brackets [ ]. Make sure each "[" has a matching "]"',
        severity: 'error'
      });
    }

    // Check for unmatched parentheses
    const openParens = (line.match(/\(/g) || []).length;
    const closeParens = (line.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push({
        line: i + 1,
        message: 'Unmatched parentheses ( ). Make sure each "(" has a matching ")"',
        severity: 'error'
      });
    }

    // Check for unmatched curly braces
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push({
        line: i + 1,
        message: 'Unmatched braces { }. Make sure each "{" has a matching "}"',
        severity: 'error'
      });
    }

    // Check for unclosed quotes
    const quotes = (line.match(/"/g) || []).length;
    if (quotes % 2 !== 0) {
      errors.push({
        line: i + 1,
        message: 'Unclosed quote ". Strings must be enclosed in matching quotes',
        severity: 'error'
      });
    }
  }

  return errors;
};
