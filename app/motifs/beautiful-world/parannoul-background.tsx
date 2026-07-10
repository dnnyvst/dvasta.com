"use client";
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ParannoulBackground = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || resolvedTheme !== "beautiful-world") return null;
  return (
    <div className="fixed inset-0 z-5">
      <div className="absolute bottom-0 right-0 hidden md:block h-3/4">
        <img
          src="/parannoul-album-cover.png"
          className="w-full h-full"
          alt="to see the next part of the dream album cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 md:hidden h-1/2">
        <img
          src="/parannoul-album-cover-2.png"
          className="w-full h-full"
          alt="to see the next part of the dream album cover"
        />
      </div>
    </div>
  );
};
