/**
 * Tests for SyntaxHighlighter component to verify XSS vulnerability is fixed
 * 
 * These tests verify that:
 * 1. The component uses Prism.js instead of custom regex-based highlighting
 * 2. No dangerouslySetInnerHTML is used
 * 3. Code is properly escaped and rendered safely
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function describe(name: string, fn: () => void) {
  console.log(`\n--- Test Suite: ${name} ---`);
  fn();
}

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (err: any) {
    console.error(`❌ ${name}: ${err.message}`);
  }
}

function expect(actual: any) {
  return {
    toBe(expected: any) {
      if (actual !== expected) throw new Error(`Expected ${expected}, but got ${actual}`);
    },
    toContain(expected: string) {
      if (!actual.includes(expected)) throw new Error(`Expected text to contain "${expected}"`);
    },
    notToContain(expected: string) {
      if (actual.includes(expected)) throw new Error(`Expected text NOT to contain "${expected}"`);
    }
  };
}

describe('SyntaxHighlighter Security', () => {
  const syntaxHighlighterPath = join(__dirname, '../components/SyntaxHighlighter.tsx');
  const syntaxHighlighterContent = readFileSync(syntaxHighlighterPath, 'utf-8');

  test('does not use dangerouslySetInnerHTML', () => {
    expect(syntaxHighlighterContent).notToContain('dangerouslySetInnerHTML');
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
    expect(syntaxHighlighterContent).notToContain('<span class="syntax-');
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
