import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

type ColorMode = "light" | "dark";

type ColorModeContextValue = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined);

type ColorModeProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "cw-color-mode";

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [colorMode, setColorMode] = useState<ColorMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ColorMode | null;
    if (stored === "light" || stored === "dark") {
      setColorMode(stored);
      return;
    }

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    setColorMode(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = colorMode;
    window.localStorage.setItem(STORAGE_KEY, colorMode);
  }, [colorMode]);

  const value = useMemo(
    () => ({
      colorMode,
      toggleColorMode: () =>
        setColorMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [colorMode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const ctx = useContext(ColorModeContext);
  if (!ctx) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return ctx;
};

