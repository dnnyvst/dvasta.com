"use client";

import { TypeWriter, ThemeToggle } from "@/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ANIMATED_THEMES = ["beautiful-world", "nurture-dark"];

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) return null;
  return (
    <header className="flex justify-between">
      {ANIMATED_THEMES.includes(resolvedTheme) ? (
        <TypeWriter />
      ) : (
        <h1>danny vasta</h1>
      )}
      <ThemeToggle />
    </header>
  );
};
