
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { renderDiagram } from '../services/mermaidService';
import { BackIcon, DownloadIcon } from './Icons';
import { sanitizeSvg, formatExportFilename } from '../utils/exportUtils';
import { Footer } from './Footer';

interface ViewerProps {
  code: string;
  onBack: () => void;
  title: string;
  setTitle: (title: string) => void;
}

const ZOOM_STEP = 0.2;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4;

export const Viewer: React.FC<ViewerProps> = ({ code, onBack, title, setTitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Transform states
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Refs for interaction logic
  const initialDistanceRef = useRef<number | null>(null);
  const initialScaleRef = useRef<number>(1);
  const lastTouchRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);

  useEffect(() => {
    const render = async () => {
      setIsLoading(true);
      setError(null);
      setScale(1);
      setOffset({ x: 0, y: 0 });
      try {
        const svg = await renderDiagram('diagram-' + Date.now(), code);
        setSvgMarkup(svg);
      } catch (err: any) {
        setError(err?.message || 'Failed to render diagram. Please check your syntax.');
      } finally {
        setIsLoading(false);
      }
    };

    render();
  }, [code]);

  const handleZoomIn = () => setScale(s => Math.min(s + ZOOM_STEP, MAX_ZOOM));
  const handleZoomOut = () => setScale(s => Math.max(s - ZOOM_STEP, MIN_ZOOM));
  const handleResetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isPanningRef.current = true;
      lastTouchRef.current = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      };
      initialDistanceRef.current = null;
    } else if (e.touches.length === 2) {
      isPanningRef.current = false;
      initialDistanceRef.current = getDistance(e.touches);
      initialScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();

    if (e.touches.length === 1 && isPanningRef.current) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - lastTouchRef.current.x;
      const deltaY = currentY - lastTouchRef.current.y;
      
      setOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      lastTouchRef.current = { x: currentX, y: currentY };
    } else if (e.touches.length === 2 && initialDistanceRef.current !== null) {
      const currentDistance = getDistance(e.touches);
      const factor = currentDistance / initialDistanceRef.current;
      const newScale = initialScaleRef.current * factor;
      setScale(Math.min(Math.max(newScale, MIN_ZOOM), MAX_ZOOM));
    }
  };

  const handleTouchEnd = () => {
    isPanningRef.current = false;
    initialDistanceRef.current = null;
  };

  // Mouse handlers for desktop panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    isPanningRef.current = true;
    lastTouchRef.current = { 
      x: e.clientX, 
      y: e.clientY 
    };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanningRef.current) return;
    
    const deltaX = e.clientX - lastTouchRef.current.x;
    const deltaY = e.clientY - lastTouchRef.current.y;
    
    setOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    lastTouchRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isPanningRef.current = false;
  };

  const handleMouseLeave = () => {
    isPanningRef.current = false;
  };

  const downloadPng = useCallback(() => {
    if (!containerRef.current) return;

    const originalSvg = containerRef.current.querySelector('svg');
    if (!originalSvg) return;

    const svgData = sanitizeSvg(originalSvg);
    
    const exportScale = 5; 
    const bbox = originalSvg.getBBox();
    const width = bbox.width;
    const height = bbox.height;
    
    const titlePadding = 80;
    const finalWidth = Math.max(width + 40, 400); 
    const finalHeight = height + titlePadding + 40;

    const canvas = document.createElement('canvas');
    canvas.width = finalWidth * exportScale;
    canvas.height = finalHeight * exportScale;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(exportScale, exportScale);
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, finalWidth, finalHeight);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 32px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title || 'Diagram', finalWidth / 2, 50);

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    const encodedData = window.btoa(unescape(encodeURIComponent(svgData)));
    const dataUrl = 'data:image/svg+xml;charset=utf-8;base64,' + encodedData;

    img.onload = () => {
      const xOffset = (finalWidth - width) / 2;
      ctx.drawImage(img, xOffset, titlePadding, width, height);
      
      try {
        const pngUrl = canvas.toDataURL('image/png');
        const fileName = formatExportFilename(title);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (err) {
        console.error("Export failed:", err);
        alert("Could not export PNG. Security restriction or size limit.");
      }
    };

    img.onerror = () => {
      console.error("Failed to load SVG into Image for export");
      alert("Export failed: SVG data could not be processed.");
    };

    img.src = dataUrl;
  }, [title]);

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0 z-20">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all active:scale-90"
          aria-label="Back to Editor"
        >
          <BackIcon className="w-6 h-6" />
        </button>
        
        <div className="flex-1 flex justify-center px-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-center text-lg font-bold tracking-tight text-white border-none focus:ring-0 focus:outline-none w-full max-w-[200px] border-b border-transparent focus:border-indigo-500/50 transition-colors"
            placeholder="Diagram Title"
            aria-label="Rename diagram"
          />
        </div>
        
        <div className="w-10"></div>
      </header>

      <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center gap-4 z-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-400 font-medium">Rendering...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 p-8 rounded-3xl max-w-sm w-full text-center z-10 mx-4 shadow-2xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="text-red-400 font-bold text-lg mb-2">Rendering Error</h3>
            <p className="text-red-200/80 text-sm leading-relaxed mb-6 font-mono break-words">
              {error}
            </p>
            <button 
              onClick={onBack}
              className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-95"
            >
              Back to Editor
            </button>
          </div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              ref={containerRef}
              className="min-w-full min-h-full flex items-center justify-center p-12 pointer-events-none"
              style={{ 
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                transformOrigin: 'center center',
                transition: isPanningRef.current ? 'none' : 'transform 0.1s ease-out'
              }}
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          </div>
        )}

        {!isLoading && !error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-slate-800/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700 shadow-2xl z-20">
            <button onClick={handleZoomIn} aria-label="Zoom In" className="w-12 h-12 flex items-center justify-center text-slate-200 hover:bg-slate-700 rounded-xl transition-colors active:bg-indigo-600 active:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </button>
            <button onClick={handleResetZoom} aria-label="Reset Zoom" className="w-12 h-12 flex flex-col items-center justify-center text-xs font-bold text-slate-400 hover:bg-slate-700 rounded-xl transition-colors active:text-indigo-400">
              <span>{Math.round(scale * 100)}%</span>
              <span className="text-[8px] uppercase">Reset</span>
            </button>
            <button onClick={handleZoomOut} aria-label="Zoom Out" className="w-12 h-12 flex items-center justify-center text-slate-200 hover:bg-slate-700 rounded-xl transition-colors active:bg-indigo-600 active:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
            </button>
          </div>
        )}
      </main>

      <div className="p-4 pb-8 bg-slate-950/80 backdrop-blur-md border-t border-slate-900 shrink-0 z-20">
        <div className="flex gap-3 max-w-md mx-auto">
          <button onClick={onBack} className="flex-1 h-[56px] flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all active:scale-[0.98]">
            <span>Back</span>
          </button>
          <button onClick={downloadPng} disabled={!!error || isLoading} className="flex-[2] h-[56px] flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all transform active:scale-[0.98]">
            <DownloadIcon className="w-6 h-6" />
            <span className="text-lg">Download PNG</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
