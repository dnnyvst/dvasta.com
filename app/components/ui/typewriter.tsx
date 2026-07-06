/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

const THEME_TEXT: {
  [theme: string]: { primary: string[]; secondary?: string[] };
} = {
  "beautiful-world": {
    primary: [
      "danny vasta",
      "beautiful world",
      "excuse",
      "analog sentimentalism",
      "white ceiling",
      "to see the next part of the dream",
      "age of fluctuation",
      "youth rebellion",
      "extra story",
      "chicken",
      "i can feel my heart touching you",
    ],
    secondary: [
      "",
      "아름다운 세상",
      "변명",
      "아날로그 센티멘탈리즘",
      "흰천장",
      "",
      "격변의 시대",
      "청춘반란",
      "엑스트라 일대기",
      "",
      "",
    ],
  },
};

export const TypeWriter = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  const [showCursor, setShowCursor] = useState<boolean>(false);

  const [themeTextIndex, setThemeTextIndex] = useState<number>(0);

  const [highlighted, setHighlighted] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);

  const timersRef = useRef<{
    deleted: ReturnType<typeof setTimeout> | null;
    newText: ReturnType<typeof setTimeout> | null;
  }>({ deleted: null, newText: null });

  useEffect(() => {
    setMounted(true);
  }, []);

  // cursor blink
  useEffect(() => {
    if (!mounted || !Object.keys(THEME_TEXT).includes(resolvedTheme || "")) {
      setShowCursor(false);
      return;
    }

    const cursorBlink = setInterval(
      () => setShowCursor((showCursor) => !showCursor),
      500,
    );

    return () => clearInterval(cursorBlink);
  }, [mounted, resolvedTheme]);

  // text change
  useEffect(() => {
    if (!mounted || !Object.keys(THEME_TEXT).includes(resolvedTheme || "")) {
      setShowCursor(false);
      setHighlighted(false);
      setDeleted(false);
      return;
    }

    const sequence = () => {
      // highlight
      setHighlighted(true);

      // delete
      timersRef.current.deleted = setTimeout(() => {
        setHighlighted(false);
        setDeleted(true);
      }, 250);

      // change text and display
      timersRef.current.newText = setTimeout(() => {
        setThemeTextIndex((themeTextIndex) => {
          if (
            themeTextIndex + 1 ===
            THEME_TEXT[resolvedTheme || ""].primary.length
          ) {
            return 0;
          }
          return themeTextIndex + 1;
        });

        setHighlighted(false);
        setDeleted(false);
      }, 500);
    };

    const interval = setInterval(sequence, 4000);

    const currentTimers = timersRef.current;
    return () => {
      clearInterval(interval);
      if (currentTimers.deleted) clearTimeout(currentTimers.deleted);
      if (currentTimers.newText) clearTimeout(currentTimers.newText);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted || !resolvedTheme) return null;

  return (
    <div className="flex flex-col h-min">
      <h1
        className={`${showCursor && "border-r"} ${highlighted && "highlighted"} ${deleted && "opacity-0"}`}
      >
        {THEME_TEXT[resolvedTheme]?.primary[themeTextIndex] || `danny vasta`}
      </h1>
      <p
        className={`w-min whitespace-nowrap ${deleted ? "opacity-0" : "opacity-50"}`}
      >
        {THEME_TEXT[resolvedTheme]?.secondary?.[themeTextIndex] || ` `}
      </p>
    </div>
  );
};
