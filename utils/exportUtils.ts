
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
