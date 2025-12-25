
/**
 * Sanitizes an SVG element by removing potential security risks like scripts and event handlers.
 */
export function sanitizeSvg(element: SVGSVGElement): string {
  const clone = element.cloneNode(true) as SVGSVGElement;
  
  // Remove script tags
  const scripts = clone.querySelectorAll('script');
  scripts.forEach(s => s.remove());

  // Remove event handlers (on*)
  const allElements = clone.querySelectorAll('*');
  allElements.forEach(el => {
    const attrs = el.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attrName = attrs[i].name.toLowerCase();
      if (attrName.startsWith('on')) {
        el.removeAttribute(attrs[i].name);
      }
    }
  });

  let svgData = new XMLSerializer().serializeToString(clone);
  
  // Ensure the correct namespace is present
  if (!svgData.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    svgData = svgData.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  return svgData;
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
export const encodeDiagramToUrl = (code: string, title: string): string => {
  const data = JSON.stringify({ code, title });
  // Use base64 encoding and make it URL-safe
  const base64 = btoa(encodeURIComponent(data));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

// Decode diagram code from URL-safe base64
export const decodeDiagramFromUrl = (encoded: string): { code: string; title: string } | null => {
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
export const getDiagramFromUrl = (): { code: string; title: string } | null => {
  const hash = window.location.hash.slice(1); // Remove the '#'
  if (!hash) return null;
  return decodeDiagramFromUrl(hash);
};

// Update URL with diagram data without reloading
export const updateUrlWithDiagram = (code: string, title: string): void => {
  const encoded = encodeDiagramToUrl(code, title);
  const newUrl = `${window.location.pathname}#${encoded}`;
  window.history.replaceState(null, '', newUrl);
};

// Get shareable URL
export const getShareableUrl = (code: string, title: string): string => {
  const encoded = encodeDiagramToUrl(code, title);
  return `${window.location.origin}${window.location.pathname}#${encoded}`;
};
