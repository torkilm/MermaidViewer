
import { formatExportFilename, sanitizeSvg } from '../utils/exportUtils';

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
