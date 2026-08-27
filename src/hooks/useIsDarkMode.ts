"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the `dark` class is present on <html>. Updates when the
 * ThemeToggle flips it (via the "themechange" event) and when the class
 * changes for any other reason (MutationObserver as a safety net).
 */
export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const read = () => setIsDark(document.documentElement.classList.contains("dark"));
    read();

    window.addEventListener("themechange", read);
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("themechange", read);
      observer.disconnect();
    };
  }, []);

  return isDark;
}
