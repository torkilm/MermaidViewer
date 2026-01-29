import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ViewMode } from './types';
import { DEFAULT_MERMAID_CODE, APP_TITLE } from './constants';
import { Editor } from './components/Editor';
import { Viewer } from './components/Viewer';
import { ConsentBanner } from './components/ConsentBanner';
import { SettingsModal } from './components/SettingsModal';
import { Privacy } from './components/Privacy';
import { GuidePage } from './components/GuidePage';
import { getDiagramFromUrl, updateUrlWithDiagram } from './utils/exportUtils';
import { initializeGTM, hasGTMConsent } from './utils/gtm';

// Migration: rename old localStorage keys to new keys
const migrateLocalStorage = () => {
  const oldCode = localStorage.getItem('mermaid-go-code');
  const oldTitle = localStorage.getItem('mermaid-go-title');
  if (oldCode && !localStorage.getItem('mermaid-studio-code')) {
    localStorage.setItem('mermaid-studio-code', oldCode);
    localStorage.removeItem('mermaid-go-code');
  }
  if (oldTitle && !localStorage.getItem('mermaid-studio-title')) {
    localStorage.setItem('mermaid-studio-title', oldTitle);
    localStorage.removeItem('mermaid-go-title');
  }
};

// Run migration immediately when module loads
migrateLocalStorage();

const App: React.FC = () => {
  // Route state - check current pathname for routing
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const pathname = window.location.pathname;
    if (pathname === '/mermaid-guide') return 'guide';
    if (pathname === '/privacy') return 'privacy';
    return 'app';
  });

  const [code, setCode] = useState<string>(() => {
    // Only try to load from URL if on main app route
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname === '') {
      const urlData = getDiagramFromUrl();
      if (urlData) return urlData.code;
    }

    // Fall back to localStorage
    const saved = localStorage.getItem('mermaid-studio-code');
    return saved || DEFAULT_MERMAID_CODE;
  });

  // Track if user has edited the diagram from defaults
  const [isEdited, setIsEdited] = useState<boolean>(() => {
    // If loading from URL (on main app route), consider it edited (shared diagram)
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname === '') {
      const urlData = getDiagramFromUrl();
      return !!urlData;
    }
    return false;
  });

  const [title, setTitle] = useState<string>(() => {
    // Only try to load from URL if on main app route
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname === '') {
      const urlData = getDiagramFromUrl();
      if (urlData) return urlData.title;
    }

    // Fall back to localStorage
    const saved = localStorage.getItem('mermaid-studio-title');
    return saved || APP_TITLE;
  });

  const [mode, setMode] = useState<ViewMode>(() => {
    // Only try to load from URL if on main app route
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname === '') {
      const urlData = getDiagramFromUrl();
      if (urlData?.viewMode) {
        return urlData.viewMode === 'viewer'
          ? ViewMode.VIEWER
          : ViewMode.EDITOR;
      }
    }
    return ViewMode.EDITOR;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // History State
  const [past, setPast] = useState<string[]>([]);
  const [future, setFuture] = useState<string[]>([]);
  const lastSavedCode = useRef<string>(code);
  const saveTimeoutRef = useRef<number | null>(null);

  // Debounced Save to LocalStorage
  const performSave = useCallback(
    (currentCode: string, currentTitle: string) => {
      localStorage.setItem('mermaid-studio-code', currentCode);
      localStorage.setItem('mermaid-studio-title', currentTitle);
      setIsSaving(false);
    },
    []
  );

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

  // Track if user has edited from defaults
  useEffect(() => {
    const hasEditedCode = code !== DEFAULT_MERMAID_CODE;
    const hasEditedTitle = title !== APP_TITLE;
    setIsEdited(hasEditedCode || hasEditedTitle);
  }, [code, title]);

  // Initialize GTM if user has given consent
  useEffect(() => {
    if (hasGTMConsent()) {
      initializeGTM();
    }
  }, []);

  // Handle browser navigation (back/forward buttons) and pathname changes
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      if (pathname === '/mermaid-guide') setCurrentRoute('guide');
      else if (pathname === '/privacy') setCurrentRoute('privacy');
      else setCurrentRoute('app');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync URL with diagram data only if edited
  useEffect(() => {
    if (isEdited) {
      const viewMode = mode === ViewMode.VIEWER ? 'viewer' : 'editor';
      updateUrlWithDiagram(code, title, viewMode);
    } else {
      // Clear the hash to show clean domain
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [code, title, mode, isEdited]);

  const updateCode = useCallback(
    (newCode: string, addToHistory = true) => {
      if (addToHistory && newCode !== code) {
        setPast((prev) => [...prev.slice(-49), code]); // Keep last 50 states
        setFuture([]);
      }
      setCode(newCode);
      lastSavedCode.current = newCode;
    },
    [code]
  );

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setFuture((prev) => [code, ...prev]);
    setPast(newPast);
    setCode(previous);
  }, [past, code]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setPast((prev) => [...prev, code]);
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

  const handleConsent = useCallback((accepted: boolean) => {
    if (accepted) {
      initializeGTM();
    }
  }, []);

  const handleConsentChange = useCallback((accepted: boolean) => {
    if (accepted) {
      initializeGTM();
    } else {
      // When consent is revoked, inform the user about page reload
      console.log('Consent revoked. For full effect, please reload the page.');
    }
  }, []);

  const navigateToPrivacy = useCallback(() => {
    window.history.pushState({}, '', '/privacy');
    setCurrentRoute('privacy');
  }, []);

  const navigateToGuide = useCallback(() => {
    window.history.pushState({}, '', '/mermaid-guide');
    setCurrentRoute('guide');
  }, []);

  const navigateToApp = useCallback(() => {
    window.history.pushState({}, '', '/');
    setCurrentRoute('app');
  }, []);

  // If on privacy route, show privacy page
  if (currentRoute === 'privacy') {
    return <Privacy onBack={navigateToApp} />;
  }

  // If on guide route, show guide page
  if (currentRoute === 'guide') {
    return <GuidePage onBack={navigateToApp} />;
  }

  // Otherwise, show main app
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
          onOpenSettings={() => setIsSettingsOpen(true)}
          onNavigateToPrivacy={navigateToPrivacy}
          onNavigateToGuide={navigateToGuide}
        />
      ) : (
        <Viewer
          code={code}
          onBack={handleBack}
          title={title}
          setTitle={setTitle}
          isEdited={isEdited}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onNavigateToPrivacy={navigateToPrivacy}
          onNavigateToGuide={navigateToGuide}
        />
      )}

      {/* Consent Banner */}
      <ConsentBanner
        onConsent={handleConsent}
        onNavigateToPrivacy={navigateToPrivacy}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onConsentChange={handleConsentChange}
        onNavigateToPrivacy={navigateToPrivacy}
      />
    </div>
  );
};

export default App;
