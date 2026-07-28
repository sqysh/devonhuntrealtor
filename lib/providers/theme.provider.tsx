"use client";

import { useEffect, type ReactNode } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { setIsDark } = useThemeStore.getState();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setIsDark(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => setIsDark(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return <>{children}</>;
}
