"use client";

import { TypeWriter, ThemeToggle } from "@/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) return null;
  return (
    <header className="relative z-40 flex">
      <TypeWriter />
      <ThemeToggle />
    </header>
  );
};
