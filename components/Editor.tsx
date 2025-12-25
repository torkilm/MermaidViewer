
import React, { useEffect, useState } from 'react';
import { PlayIcon, TrashIcon, UndoIcon, RedoIcon, MermaidGoLogo } from './Icons';
import { Footer } from './Footer';
import { SyntaxHighlighter } from './SyntaxHighlighter';
import { validateMermaidSyntax, SyntaxError } from '../utils/syntaxValidator';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  title: string;
  setTitle: (title: string) => void;
  isSaving: boolean;
}

export const Editor: React.FC<EditorProps> = ({ 
  code, 
  onChange, 
  onGenerate, 
  onClear, 
  onUndo, 
  onRedo,
  canUndo,
  canRedo,
  title,
  setTitle,
  isSaving
}) => {
  const [syntaxErrors, setSyntaxErrors] = useState<SyntaxError[]>([]);
  
  // Validate syntax on code change
  useEffect(() => {
    const errors = validateMermaidSyntax(code);
    setSyntaxErrors(errors);
  }, [code]);
  
  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          onRedo();
        } else {
          e.preventDefault();
          onUndo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        onRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo]);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95"
            aria-label="Mermaid Go Home"
          >
            <MermaidGoLogo className="w-8 h-8" />
            <span className="text-lg font-bold text-white hidden sm:inline">Mermaid Go</span>
          </a>
        </div>
        
        <div className="flex flex-col flex-1 min-w-0 px-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-xl font-bold tracking-tight text-white border-none focus:ring-0 focus:outline-none w-full max-w-[180px] md:max-w-none placeholder-slate-600 truncate"
            placeholder="Untitled Diagram"
          />
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300 ${isSaving ? 'text-indigo-400 animate-pulse' : 'text-slate-500'}`}>
              {isSaving ? 'Saving...' : 'Saved locally'}
            </span>
            {!isSaving && (
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {syntaxErrors.length > 0 && (
              <>
                <span className="text-slate-600 mx-1">•</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                  {syntaxErrors.length} {syntaxErrors.length === 1 ? 'Error' : 'Errors'}
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-2 rounded-lg transition-all active:scale-90 ${canUndo ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 opacity-50 cursor-not-allowed'}`}
            title="Undo (Ctrl+Z)"
          >
            <UndoIcon className="w-5 h-5" />
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-2 rounded-lg transition-all active:scale-90 ${canRedo ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 opacity-50 cursor-not-allowed'}`}
            title="Redo (Ctrl+Y)"
          >
            <RedoIcon className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-slate-800 mx-1"></div>

          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all active:scale-95"
            title="Clear all code and title"
          >
            <TrashIcon className="w-4 h-4" />
            <span className="text-sm font-medium hidden md:inline">Clear</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
        <div className="flex-1 relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-inner group">
          <div className="absolute top-3 right-4 z-10 opacity-40 text-xs font-mono uppercase tracking-widest pointer-events-none group-focus-within:opacity-100 transition-opacity">
            Mermaid Editor
          </div>
          <div className="relative w-full h-full overflow-auto flex">
            {/* Line Numbers */}
            <div className="shrink-0 py-6 pl-4 pr-2 bg-slate-950/50 border-r border-slate-800 select-none pointer-events-none">
              {code.split('\n').map((_, index) => (
                <div
                  key={index}
                  className="font-mono text-[15px] leading-relaxed text-slate-600 text-right"
                  style={{ minWidth: '2.5rem' }}
                >
          <div className="relative w-full h-full overflow-auto flex">
            <div className="shrink-0 py-6 pl-4 pr-2 bg-slate-950/50 border-r border-slate-800 select-none pointer-events-none">
              {code.split('\n').map((_, index) => (
                <div
                  key={index}
                  className="font-mono text-[15px] leading-relaxed text-slate-600 text-right"
                  style={{ minWidth: '2.5rem' }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="flex-1 relative">rmaid code here..."
                style={{ caretColor: '#e2e8f0' }}
              />
            </div>
          </div>
        </div>

        {/* Syntax Errors Display */}
        {syntaxErrors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 space-y-2 max-h-32 overflow-y-auto">
            {syntaxErrors.map((error, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  error.severity === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {error.severity === 'error' ? '✕' : '⚠'}
        </div>

        {syntaxErrors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 space-y-2 max-h-32 overflow-y-auto">
              </div>
            ))}
          </div>
        )}

        {/* Floating Helper Tip (Mobile Friendly) */}
        <div className="text-center">
          <p className="text-slate-500 text-xs font-medium px-4">
            Start with <code className="text-indigo-400">graph TD</code>, <code className="text-indigo-400">sequenceDiagram</code>, etc.
          </p>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="p-4 pb-8 bg-slate-950/80 backdrop-blur-md border-t border-slate-900 shrink-0">
        )}

        <div className="text-center">
          <p className="text-slate-500 text-xs font-medium px-4">
          <span className="text-lg">Generate Diagram</span>
        </button>
      </div>
      <Footer />
      </main>

      <div className="p-4 pb-8 bg-slate-950/80 backdrop-blur-md border-t border-slate-900 shrink-0">
        <button