import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('SyntaxHighlighter Security', () => {
  const syntaxHighlighterPath = join(__dirname, '../components/SyntaxHighlighter.tsx');
  const syntaxHighlighterContent = readFileSync(syntaxHighlighterPath, 'utf-8');

  test('does not use dangerouslySetInnerHTML', () => {
    expect(syntaxHighlighterContent).not.toContain('dangerouslySetInnerHTML');
  });

  test('imports Prism.js', () => {
    expect(syntaxHighlighterContent).toContain("from 'prismjs'");
  });

  test('imports custom Mermaid language definition', () => {
    expect(syntaxHighlighterContent).toContain("'../utils/prismMermaid'");
  });

  test('uses Prism.highlightElement instead of regex replacements', () => {
    expect(syntaxHighlighterContent).toContain('Prism.highlightElement');
  });

  test('does not use custom HTML string manipulation', () => {
    expect(syntaxHighlighterContent).not.toContain('<span class="syntax-');
  });
});

describe('Prism Mermaid Language Definition', () => {
  const prismMermaidPath = join(__dirname, '../utils/prismMermaid.ts');
  const prismMermaidContent = readFileSync(prismMermaidPath, 'utf-8');

  test('defines Mermaid language for Prism', () => {
    expect(prismMermaidContent).toContain('Prism.languages.mermaid');
  });

  test('registers language patterns safely', () => {
    expect(prismMermaidContent).toContain('registerMermaidLanguage');
  });

  test('includes all major Mermaid diagram types', () => {
    expect(prismMermaidContent).toContain('sequenceDiagram');
    expect(prismMermaidContent).toContain('flowchart');
    expect(prismMermaidContent).toContain('classDiagram');
  });
});
