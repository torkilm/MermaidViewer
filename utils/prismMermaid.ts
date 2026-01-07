import Prism from 'prismjs';

/**
 * Custom Mermaid language definition for Prism.js
 * This provides secure syntax highlighting for Mermaid diagram code.
 */
export function registerMermaidLanguage(): void {
  // Only register once
  if (Prism.languages.mermaid) {
    return;
  }

  // Mermaid keywords - diagram types and common directives
  const keywords = [
    'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 
    'stateDiagram-v2', 'erDiagram', 'journey', 'gantt', 'pie', 'gitGraph',
    'TD', 'TB', 'BT', 'RL', 'LR', 'participant', 'actor', 'Note', 'loop', 
    'alt', 'opt', 'par', 'and', 'end', 'activate', 'deactivate', 'title',
    'section', 'class', 'state', 'note', 'dateFormat', 'axisFormat'
  ];

  // Mermaid operators and arrows
  const operators = [
    '-->', '---', '-.->',  '-.-', '==>', '==>>', '--', '->>', 
    '---|', '-->|', '-.', '->', '=>', '==', ':::', '::'
  ];

  // Escape special regex characters and create pattern
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const keywordPattern = keywords.map(escapeRegex).join('|');
  const operatorPattern = operators.map(escapeRegex).join('|');

  Prism.languages.mermaid = {
    'comment': {
      pattern: /%%.*$/m,
      greedy: true
    },
    'string': {
      pattern: /"(?:[^"\\]|\\.)*"/,
      greedy: true
    },
    'keyword': {
      pattern: new RegExp(`\\b(?:${keywordPattern})\\b`),
      greedy: true
    },
    'operator': {
      pattern: new RegExp(operatorPattern),
      greedy: true
    },
    'node-id': {
      pattern: /\b[A-Za-z_][A-Za-z0-9_]*(?=\[)/,
      greedy: true,
      alias: 'variable'
    },
    'label': {
      pattern: /\[([^\]]+)\]/,
      greedy: true,
      inside: {
        'punctuation': /[\[\]]/,
        'content': /[^\[\]]+/
      }
    },
    'number': {
      pattern: /\b\d+\b/,
      greedy: true
    },
    'punctuation': /[{}[\]();,.:]/
  };
}
