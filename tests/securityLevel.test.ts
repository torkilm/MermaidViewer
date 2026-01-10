import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Test to verify Mermaid security level configuration
 * 
 * This test documents the security level change from 'loose' to 'strict'
 * and validates that the configuration is set correctly.
 * 
 * Security Levels in Mermaid:
 * - 'strict': Prevents arbitrary HTML and JavaScript injection (RECOMMENDED)
 * - 'loose': Allows arbitrary HTML/JS (SECURITY RISK - XSS vulnerability)
 * - 'sandbox': Uses iframe sandbox (most secure but may have compatibility issues)
 * 
 * Expected behavior with 'strict' mode:
 * - All standard diagram types should render correctly:
 *   * flowchart/graph
 *   * sequenceDiagram
 *   * classDiagram
 *   * erDiagram
 *   * stateDiagram
 *   * gantt
 *   * pie
 *   * journey
 *   * etc.
 * - XSS attacks via HTML/JavaScript injection should be prevented
 */

// Test diagrams for different types
const TEST_DIAGRAMS = {
  flowchart: `graph TD
    A[Start] --> B{Is it mobile?}
    B -- Yes --> C[Use Mermaid Studio]
    B -- No --> D[Still use it!]
    C --> E[Fast Rendering]
    D --> E`,
  
  sequenceDiagram: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hello Bob, how are you?
    Bob-->>Alice: Great!
    Alice-)Bob: See you later!`,
  
  classDiagram: `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    class Duck{
      +String beakColor
      +swim()
    }`,
  
  erDiagram: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`
};

describe('Mermaid Security Level Configuration', () => {
  const mermaidServicePath = join(__dirname, '../services/mermaidService.ts');
  const mermaidServiceContent = readFileSync(mermaidServicePath, 'utf-8');

  test('Security level is set to strict', () => {
    // Verify that the security level is set to 'strict' in mermaidService.ts
    expect(mermaidServiceContent).toContain("securityLevel: 'strict'");
  });

  test('Does not use loose security level', () => {
    // Ensure 'loose' is not used (which would be a security vulnerability)
    expect(mermaidServiceContent).not.toContain("securityLevel: 'loose'");
  });

  test('Test diagrams are defined', () => {
    // Verify that test diagrams exist for validation
    expect(Object.keys(TEST_DIAGRAMS)).toContain('flowchart');
    expect(Object.keys(TEST_DIAGRAMS)).toContain('sequenceDiagram');
    expect(Object.keys(TEST_DIAGRAMS)).toContain('classDiagram');
    expect(Object.keys(TEST_DIAGRAMS)).toContain('erDiagram');
  });
});

export { TEST_DIAGRAMS };

