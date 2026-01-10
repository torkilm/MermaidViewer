/**
 * Cross-browser clipboard utility with iOS Safari support
 * 
 * iOS Safari has strict restrictions on navigator.clipboard API:
 * - Must be called synchronously within user interaction
 * - Async operations can cause "user gesture" to be lost
 * 
 * This utility provides a fallback using the legacy execCommand approach
 * which is more reliable on iOS Safari.
 */

/**
 * Attempts to copy text to clipboard using modern API with fallback for iOS Safari
 * @param text Text to copy to clipboard
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // First try the modern clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API failed, trying fallback method:', err);
      // Fall through to fallback method
    }
  }

  // Fallback method using execCommand (works better on iOS Safari)
  return copyToClipboardFallback(text);
}

/**
 * Legacy fallback method using document.execCommand('copy')
 * This method is more reliable on iOS Safari and older browsers
 * @param text Text to copy to clipboard
 * @returns true if successful, false otherwise
 */
function copyToClipboardFallback(text: string): boolean {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  
  // Style it to be invisible and prevent layout shift
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '2em';
  textarea.style.height = '2em';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';
  textarea.style.opacity = '0';
  
  // Make it readonly to prevent iOS keyboard from appearing
  textarea.setAttribute('readonly', '');
  
  document.body.appendChild(textarea);
  
  try {
    // Select the text
    textarea.select();
    
    // For iOS Safari, we need to use setSelectionRange
    const isiOS = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());
    if (isiOS) {
      const range = document.createRange();
      range.selectNodeContents(textarea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textarea.setSelectionRange(0, text.length);
    }
    
    // Execute copy command
    const successful = document.execCommand('copy');
    
    return successful;
  } catch (err) {
    console.error('Fallback clipboard method failed:', err);
    return false;
  } finally {
    // Clean up
    document.body.removeChild(textarea);
  }
}
