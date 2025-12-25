
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ViewMode } from './types';
import { DEFAULT_MERMAID_CODE, APP_TITLE } from './constants';
import { Editor } from './components/Editor';
import { Viewer } from './components/Viewer';
import { getDiagramFromUrl, updateUrlWithDiagram } from './utils/exportUtils';

const App: React.FC = () => {
  const [code, setCode] = useState<string>(() => {
    // First try to load from URL
    const urlData = getDiagramFromUrl();
    if (urlData) return urlData.code;
    
    // Fall back to localStorage
    const saved = localStorage.getItem('mermaid-go-code');
    return saved || DEFAULT_MERMAID_CODE;
  });
  
  const [title, setTitle] = useState<string>(() => {
    // First try to load from URL
    const urlData = getDiagramFromUrl();
    if (urlData) return urlData.title;
    
    // Fall back to localStorage
    const saved = localStorage.getItem('mermaid-go-title');
    return saved || APP_TITLE;
  });

  const [mode, setMode] = useState<ViewMode>(() => {
    // First try to load from URL
    const urlData = getDiagramFromUrl();
    if (urlData?.viewMode) {
      return urlData.viewMode === 'viewer' ? ViewMode.VIEWER : ViewMode.EDITOR;
    }
    return ViewMode.EDITOR;
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // History State
  const [past, setPast] = useState<string[]>([]);
  const [future, setFuture] = useState<string[]>([]);
  const lastSavedCode = useRef<string>(code);
  const saveTimeoutRef = useRef<number | null>(null);

  // Debounced Save to LocalStorage
  const performSave = useCallback((currentCode: string, currentTitle: string) => {
    localStorage.setItem('mermaid-go-code', currentCode);
    localStorage.setItem('mermaid-go-title', currentTitle);
    setIsSaving(false);
  }, []);

  useEffect(() => {
    // Whenever code or title changes, mark as saving and set a timeout
    setIsSaving(true);
    
    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = window.setTimeout(() => {
      performSave(code, title);
    }, 1000); // Save after 1 second of inactivity

    return () => {
      if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    };
  }, [code, title, performSave]);

  // Sync URL with diagram data
  useEffect(() => {
    const viewMode = mode === ViewMode.VIEWER ? 'viewer' : 'editor';
    updateUrlWithDiagram(code, title, viewMode);
  }, [code, title, mode]);

  const updateCode = useCallback((newCode: string, addToHistory = true) => {
    if (addToHistory && newCode !== code) {
      setPast(prev => [...prev.slice(-49), code]); // Keep last 50 states
      setFuture([]);
    }
    setCode(newCode);
    lastSavedCode.current = newCode;
  }, [code]);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    setFuture(prev => [code, ...prev]);
    setPast(newPast);
    setCode(previous);
  }, [past, code]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    
    setPast(prev => [...prev, code]);
    setFuture(newFuture);
    setCode(next);
  }, [future, code]);

  const handleGenerate = useCallback(() => {
    setMode(ViewMode.VIEWER);
  }, []);

  const handleBack = useCallback(() => {
    setMode(ViewMode.EDITOR);
  }, []);

  const handleClear = useCallback(() => {
    updateCode('');
    setTitle('');
  }, [updateCode]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950">
      {/* Dynamic View Rendering */}
      {mode === ViewMode.EDITOR ? (
        <Editor 
          code={code} 
          onChange={(val) => updateCode(val)} 
          onGenerate={handleGenerate} 
          onClear={handleClear}
          onUndo={undo}
          onRedo={redo}
          canUndo={past.length > 0}
          canRedo={future.length > 0}
          title={title}
          setTitle={setTitle}
          isSaving={isSaving}
        />
      ) : (
        <Viewer 
          code={code} 
          onBack={handleBack} 
          title={title}
          setTitle={setTitle}
        />
      )}
    </div>
  );
};

export default App;
