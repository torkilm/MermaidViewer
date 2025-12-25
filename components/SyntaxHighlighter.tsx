import React from 'react';

interface SyntaxHighlighterProps {
  code: string;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({ code }) => {
  const highlightSyntax = (text: string): string => {
    // Mermaid keywords
    const keywords = [
      'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 
      'stateDiagram-v2', 'erDiagram', 'journey', 'gantt', 'pie', 'gitGraph',
      'TD', 'TB', 'BT', 'RL', 'LR', 'participant', 'actor', 'Note', 'loop', 
      'alt', 'opt', 'par', 'and', 'end', 'activate', 'deactivate', 'title',
      'section', 'class', 'state', 'note', 'dateFormat', 'axisFormat'
    ];

    // Operators and symbols
    const operators = ['-->', '---', '-.->',  '-.-', '==>', '==>>', '--', '->>', 
                       '---|', '-->|', '-.', '->', '=>', '==', ':::', ':::'];

    let highlighted = text;

    // Escape HTML
    highlighted = highlighted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Highlight comments
    highlighted = highlighted.replace(
      /%%.*$/gm,
      '<span class="syntax-comment">$&</span>'
    );

    // Highlight strings in quotes
    highlighted = highlighted.replace(
      /"([^"\\]*(\\.[^"\\]*)*)"/g,
      '<span class="syntax-string">"$1"</span>'
    );

    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      highlighted = highlighted.replace(
        regex,
        '<span class="syntax-keyword">$1</span>'
      );
    });

    // Highlight node IDs and labels
    highlighted = highlighted.replace(
      /\b([A-Za-z_][A-Za-z0-9_]*)\[/g,
      '<span class="syntax-node">$1</span>['
    );
    highlighted = highlighted.replace(
      /\[([^\]]+)\]/g,
      '[<span class="syntax-label">$1</span>]'
    );

    // Highlight arrows and operators (escape special regex chars)
    operators.forEach(op => {
      const escaped = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      highlighted = highlighted.replace(
        regex,
        `<span class="syntax-operator">${op}</span>`
      );
    });

    // Highlight numbers
    highlighted = highlighted.replace(
      /\b(\d+)\b/g,
      '<span class="syntax-number">$1</span>'
    );

    return highlighted;
  };

  return (
    <pre
      className="absolute inset-0 p-6 font-mono text-[15px] leading-relaxed pointer-events-none whitespace-pre-wrap break-words overflow-hidden"
      dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}
    />
  );
};
