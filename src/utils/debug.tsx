import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type DebugContextValue = {
  isDebug: boolean;
  toggleDebug: (value?: boolean) => void;
  log: (title: string, payload?: unknown, severity?: 'info' | 'warn' | 'error') => void;
};

const DebugContext = createContext<DebugContextValue | undefined>(undefined);
const STORAGE_KEY = 'verovault:debug';
const LEGACY_STORAGE_KEY = 'neovault:debug';

const getInitialDebug = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const fromQuery = new URLSearchParams(window.location.search).get('debug');
  if (fromQuery) {
    return fromQuery !== 'false';
  }

  // Read from new key first, then fall back to legacy key for backward compatibility
  const persisted = window.localStorage.getItem(STORAGE_KEY);
  if (persisted !== null) return persisted === 'true';
  const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
  return legacy ? legacy === 'true' : false;
};

export const DebugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDebug, setIsDebug] = useState<boolean>(() => getInitialDebug());

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.dataset.debug = String(isDebug);
  }, [isDebug]);

  const toggleDebug = useCallback((value?: boolean) => {
    setIsDebug((prev) => {
      const next = typeof value === 'boolean' ? value : !prev;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, String(next));
        // Optional: clean up legacy key
        try {
          window.localStorage.removeItem(LEGACY_STORAGE_KEY);
        } catch (e) {
          // ignore cleanup failure
          void e;
        }
      }
      return next;
    });
  }, []);

  const log = useCallback<DebugContextValue['log']>((title, payload, severity = 'info') => {
    if (!isDebug) return;

    const stamp = new Date().toLocaleTimeString();
    const prefix = `%c[VeroVault ${severity.toUpperCase()} @ ${stamp}]`;
    const styles =
      severity === 'error'
        ? 'color:#F87171;font-weight:600;'
        : severity === 'warn'
          ? 'color:#FBBF24;font-weight:600;'
          : 'color:#22D3EE;font-weight:600;';

    if (payload) {
      console[severity === 'info' ? 'log' : severity](prefix, styles, payload);
    } else {
      console[severity === 'info' ? 'log' : severity](prefix, styles);
    }
  }, [isDebug]);

  const value = useMemo(() => ({ isDebug, toggleDebug, log }), [isDebug, log, toggleDebug]);

  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
};

export const useDebug = () => {
  const context = useContext(DebugContext);
  if (!context) {
    throw new Error('useDebug must be used within DebugProvider');
  }
  return context;
};
