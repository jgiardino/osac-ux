import * as React from 'react';

interface AiVisionLayerContextValue {
  isAiVisionLayer: boolean;
  setAiVisionLayer: (enabled: boolean) => void;
}

const AiVisionLayerContext = React.createContext<AiVisionLayerContextValue | null>(null);

const STORAGE_KEY = 'osac-demo-ai-vision-layer';

/** Demo-only overlay for AI vision nav/routes. Does not change DemoShellRole. */
export const AiVisionLayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAiVisionLayer, setAiVisionLayerState] = React.useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const setAiVisionLayer = React.useCallback((enabled: boolean) => {
    setAiVisionLayerState(enabled);
    try {
      sessionStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // ignore quota / private mode
    }
  }, []);

  const value = React.useMemo(
    () => ({ isAiVisionLayer, setAiVisionLayer }),
    [isAiVisionLayer, setAiVisionLayer],
  );

  return <AiVisionLayerContext.Provider value={value}>{children}</AiVisionLayerContext.Provider>;
};

export const useAiVisionLayer = (): AiVisionLayerContextValue => {
  const ctx = React.useContext(AiVisionLayerContext);
  if (!ctx) {
    throw new Error('useAiVisionLayer must be used inside AiVisionLayerProvider');
  }
  return ctx;
};
