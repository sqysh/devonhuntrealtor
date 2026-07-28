import { create } from "zustand";

/**
 * Flips the `dark` class, suppressing transitions across the swap so colors
 * snap instead of smearing. Pairs with `[data-theme-switching]` in globals.css.
 */
const applyDocumentTheme = (isDark: boolean) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.setAttribute("data-theme-switching", "");
  root.classList.toggle("dark", isDark);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => root.removeAttribute("data-theme-switching"));
  });
};

type ThemeState = {
  isDark: boolean;
  /** False until the client has read the media query — guard theme-dependent UI on this. */
  hydrated: boolean;
  setIsDark: (isDark: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  hydrated: false,

  setIsDark: (isDark) => {
    applyDocumentTheme(isDark);
    set({ isDark, hydrated: true });
  },
}));

/** Drop-in replacement for the Redux `isDark` selector. */
export const useIsDark = (): boolean => useThemeStore((s) => s.isDark);
