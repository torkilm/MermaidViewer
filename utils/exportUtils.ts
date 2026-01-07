
/**
 * Helper function that performs the actual sanitization of an SVG element.
 * Removes scripts, event handlers, and javascript: URLs.
 */
function sanitizeSvgElement(svgElement: Element): void {
  // Remove script tags
  const scripts = svgElement.querySelectorAll('script');
  scripts.forEach(s => s.remove());

  // Remove event handlers (on*) and javascript: URLs
  const allElements = svgElement.querySelectorAll('*');
  allElements.forEach(el => {
    const attrs = el.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attrName = attrs[i].name.toLowerCase();
      const attrValue = attrs[i].value;
      
      // Remove on* event handlers
      if (attrName.startsWith('on')) {
        el.removeAttribute(attrs[i].name);
      }
      
      // Remove javascript: and data: URLs in href and xlink:href (including encoded variants)
      if (attrName === 'href' || attrName === 'xlink:href') {
        if (attrValue && isUnsafeUrl(attrValue)) {
          el.removeAttribute(attrs[i].name);
        }
      }
    }
  });
}

/**
 * Checks if a URL is unsafe (contains javascript:, data:text/html, etc.)
 * Handles encoded variants and whitespace obfuscation
 */
function isUnsafeUrl(url: string): boolean {
  // Create a temporary element to decode all HTML entities (including named entities)
  const txt = document.createElement('textarea');
  txt.innerHTML = url;
  const decoded = txt.value
    .replace(/\s+/g, '') // Remove all whitespace (including tabs, newlines)
    .toLowerCase();
  
  // Check for various dangerous URL schemes
  return decoded.startsWith('javascript:') || 
         decoded.startsWith('data:text/html') ||
         decoded.startsWith('vbscript:');
}

/**
 * Ensures the SVG has the correct xmlns attribute
 */
function ensureXmlNamespace(svgData: string): string {
  if (!svgData.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    return svgData.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return svgData;
}

/**
 * Sanitizes an SVG element by removing potential security risks like scripts and event handlers.
 */
export function sanitizeSvg(element: SVGSVGElement): string {
  const clone = element.cloneNode(true) as SVGSVGElement;
  
  sanitizeSvgElement(clone);

  const svgData = new XMLSerializer().serializeToString(clone);
  return ensureXmlNamespace(svgData);
}

/**
 * Sanitizes an SVG string by removing potential security risks like scripts and event handlers.
 * This function parses the SVG string, sanitizes it, and returns the cleaned string.
 */
export function sanitizeSvgString(svgString: string): string {
  // Create a temporary container to parse the SVG string
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  
  // Check for parsing errors
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    console.error('SVG parsing error occurred during sanitization');
    // Return empty SVG to prevent potential XSS if malformed SVG contains malicious content
    return '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
  }
  
  const svgElement = doc.documentElement;
  
  sanitizeSvgElement(svgElement);

  const svgData = new XMLSerializer().serializeToString(svgElement);
  return ensureXmlNamespace(svgData);
}

/**
 * Generates a standardized filename in the format: YYYYMMDD-HHMMSS-title.png
 */
export function formatExportFilename(title: string, date: Date = new Date()): string {
  const dateStr = date.getFullYear().toString() + 
                  (date.getMonth() + 1).toString().padStart(2, '0') + 
                  date.getDate().toString().padStart(2, '0');
                  
  const timeStr = date.getHours().toString().padStart(2, '0') + 
                  date.getMinutes().toString().padStart(2, '0') + 
                  date.getSeconds().toString().padStart(2, '0');
  
  const safeTitle = (title || 'diagram')
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
    
  return `${dateStr}-${timeStr}-${safeTitle}.png`;
}

// URL Sharing utilities

// Encode diagram code to URL-safe base64
export const encodeDiagramToUrl = (code: string, title: string, viewMode?: string): string => {
  const data = JSON.stringify({ code, title, viewMode });
  // Use base64 encoding and make it URL-safe
  const base64 = btoa(encodeURIComponent(data));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

// Decode diagram code from URL-safe base64
export const decodeDiagramFromUrl = (encoded: string): { code: string; title: string; viewMode?: string } | null => {
  try {
    // Restore standard base64 format
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    const data = decodeURIComponent(atob(base64));
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to decode diagram from URL:', error);
    return null;
  }
};

// Get diagram data from URL hash
export const getDiagramFromUrl = (): { code: string; title: string; viewMode?: string } | null => {
  const hash = window.location.hash.slice(1); // Remove the '#'
  if (!hash) return null;
  return decodeDiagramFromUrl(hash);
};

// Update URL with diagram data without reloading
export const updateUrlWithDiagram = (code: string, title: string, viewMode?: string): void => {
  const encoded = encodeDiagramToUrl(code, title, viewMode);
  const newUrl = `${window.location.pathname}#${encoded}`;
  window.history.replaceState(null, '', newUrl);
};

// Get shareable URL
export const getShareableUrl = (code: string, title: string, viewMode?: string): string => {
  const encoded = encodeDiagramToUrl(code, title, viewMode);
  return `${window.location.origin}${window.location.pathname}#${encoded}`;
};
