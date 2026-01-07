import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
// Import to register the Mermaid language definition
import '../utils/prismMermaid';

interface SyntaxHighlighterProps {
  code: string;
  inline?: boolean;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  inline = false,
}) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Highlight code whenever it changes
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre
      className={
        inline
          ? 'font-mono text-[15px] leading-relaxed whitespace-pre m-0'
          : 'absolute inset-0 p-6 font-mono text-[15px] leading-relaxed pointer-events-none whitespace-pre'
      }
    >
      <code ref={codeRef} className="language-mermaid">
        {code}
      </code>
    </pre>
  );
};
