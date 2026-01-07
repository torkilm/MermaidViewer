
import { formatExportFilename, sanitizeSvg, sanitizeSvgString } from '../utils/exportUtils';

/**
 * Simple test runner mock for demonstration. 
 * In a real environment, you'd use Vitest, Jest, or similar.
 */
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

describe('exportUtils - formatExportFilename', () => {
  test('formats correctly for a standard date and title', () => {
    const mockDate = new Date(2023, 11, 25, 14, 30, 15); // Dec 25, 2023, 14:30:15
    const filename = formatExportFilename('Cool Diagram', mockDate);
    expect(filename).toBe('20231225-143015-cool-diagram.png');
  });

  test('sanitizes special characters in title', () => {
    const mockDate = new Date(2023, 0, 1, 1, 1, 1);
    const filename = formatExportFilename('My Awesome! @Diagram#123', mockDate);
    expect(filename).toContain('-my-awesome-diagram-123.png');
  });

  test('handles empty title', () => {
    const mockDate = new Date(2023, 0, 1, 1, 1, 1);
    const filename = formatExportFilename('', mockDate);
    expect(filename).toContain('-diagram.png');
  });
});

describe('exportUtils - sanitizeSvg', () => {
  test('removes scripts and event handlers', () => {
    // Mocking browser APIs for the test
    const mockSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const script = document.createElementNS('http://www.w3.org/2000/svg', 'script');
    script.textContent = 'alert("xss")';
    mockSvg.appendChild(script);
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('onclick', 'doSomething()');
    rect.setAttribute('fill', 'red');
    mockSvg.appendChild(rect);

    const result = sanitizeSvg(mockSvg);
    
    expect(result).notToContain('<script>');
    expect(result).notToContain('onclick');
    expect(result).toContain('fill="red"');
    expect(result).toContain('xmlns="http://www.w3.org/2000/svg"');
  });
});

describe('exportUtils - sanitizeSvgString', () => {
  test('removes script tags from SVG string', () => {
    const maliciousSvg = '<svg><script>alert("xss")</script><rect width="100" height="100" fill="blue"/></svg>';
    const result = sanitizeSvgString(maliciousSvg);
    
    expect(result).notToContain('<script>');
    expect(result).notToContain('alert');
    expect(result).toContain('rect');
    expect(result).toContain('fill="blue"');
  });

  test('removes onclick event handlers from SVG string', () => {
    const maliciousSvg = '<svg><rect onclick="alert(1)" width="100" height="100" fill="red"/></svg>';
    const result = sanitizeSvgString(maliciousSvg);
    
    expect(result).notToContain('onclick');
    expect(result).toContain('rect');
    expect(result).toContain('fill="red"');
  });

  test('removes multiple event handlers from SVG string', () => {
    const maliciousSvg = '<svg><rect onload="bad()" onmouseover="evil()" onclick="xss()" fill="green"/></svg>';
    const result = sanitizeSvgString(maliciousSvg);
    
    expect(result).notToContain('onload');
    expect(result).notToContain('onmouseover');
    expect(result).notToContain('onclick');
    expect(result).toContain('fill="green"');
  });

  test('removes javascript: URLs in href attributes', () => {
    const maliciousSvg = '<svg><a href="javascript:alert(1)"><text>Click me</text></a></svg>';
    const result = sanitizeSvgString(maliciousSvg);
    
    expect(result).notToContain('javascript:');
    expect(result).toContain('<text>Click me</text>');
  });

  test('removes javascript: URLs in xlink:href attributes', () => {
    const maliciousSvg = '<svg xmlns:xlink="http://www.w3.org/1999/xlink"><a xlink:href="javascript:alert(1)"><text>Link</text></a></svg>';
    const result = sanitizeSvgString(maliciousSvg);
    
    expect(result).notToContain('javascript:');
    expect(result).toContain('<text>Link</text>');
  });

  test('preserves legitimate href attributes', () => {
    const legitimateSvg = '<svg><a href="https://example.com"><text>Link</text></a></svg>';
    const result = sanitizeSvgString(legitimateSvg);
    
    expect(result).toContain('href="https://example.com"');
    expect(result).toContain('<text>Link</text>');
  });

  test('adds xmlns attribute if missing', () => {
    const svgWithoutNs = '<svg><rect width="100" height="100"/></svg>';
    const result = sanitizeSvgString(svgWithoutNs);
    
    expect(result).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  test('handles complex nested structures', () => {
    const complexSvg = `
      <svg>
        <g onclick="bad()">
          <rect width="100" height="100" fill="blue"/>
          <script>alert("xss")</script>
          <text>Safe text</text>
        </g>
        <a href="javascript:void(0)">
          <circle cx="50" cy="50" r="40" onmouseover="evil()"/>
        </a>
      </svg>
    `;
    const result = sanitizeSvgString(complexSvg);
    
    expect(result).notToContain('<script>');
    expect(result).notToContain('onclick');
    expect(result).notToContain('onmouseover');
    expect(result).notToContain('javascript:');
    expect(result).toContain('Safe text');
    expect(result).toContain('fill="blue"');
    expect(result).toContain('circle');
  });

  test('removes encoded javascript: URLs', () => {
    const encodedSvg = '<svg><a href="&#106;avascript:alert(1)"><text>Encoded</text></a></svg>';
    const result = sanitizeSvgString(encodedSvg);
    
    expect(result).notToContain('javascript');
    expect(result).notToContain('&#106;');
    expect(result).toContain('<text>Encoded</text>');
  });

  test('removes javascript: URLs with named entities', () => {
    const namedEntitySvg = '<svg><a href="java&colon;script:alert(1)"><text>Named</text></a></svg>';
    const result = sanitizeSvgString(namedEntitySvg);
    
    expect(result).notToContain('javascript');
    expect(result).notToContain('&colon;');
    expect(result).toContain('<text>Named</text>');
  });

  test('removes javascript: URLs with whitespace obfuscation', () => {
    const whitespaceSvg = '<svg><a href=" &#9;java&#10;script:alert(1)"><text>Whitespace</text></a></svg>';
    const result = sanitizeSvgString(whitespaceSvg);
    
    expect(result).notToContain('javascript');
    expect(result).toContain('<text>Whitespace</text>');
  });

  test('removes vbscript: URLs', () => {
    const vbscriptSvg = '<svg><a href="vbscript:msgbox(1)"><text>VBScript</text></a></svg>';
    const result = sanitizeSvgString(vbscriptSvg);
    
    expect(result).notToContain('vbscript');
    expect(result).toContain('<text>VBScript</text>');
  });

  test('removes data:text/html URLs', () => {
    const dataSvg = '<svg><a href="data:text/html,<script>alert(1)</script>"><text>Link</text></a></svg>';
    const result = sanitizeSvgString(dataSvg);
    
    expect(result).notToContain('data:text/html');
    expect(result).toContain('<text>Link</text>');
  });

  test('returns empty SVG on parse error', () => {
    const invalidSvg = 'This is not valid XML <>';
    const result = sanitizeSvgString(invalidSvg);
    
    expect(result).toBe('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  });
});
