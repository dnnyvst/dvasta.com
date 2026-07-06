/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

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
  const [displayTextIndex, setDisplayTextIndex] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || resolvedTheme !== "beautiful-world") {
      setShowCursor(false);
      return;
    }

    const cursorBlink = setInterval(() => {
      setShowCursor((showCursor) => !showCursor);
    }, 500);

    const textChange = setInterval(() => {
      setDisplayTextIndex((displayTextIndex) => {
        if (displayTextIndex + 1 === THEME_TEXT[resolvedTheme].primary.length) {
          return 0;
        }
        return displayTextIndex + 1;
      });
    }, 3000);

    return () => {
      clearInterval(cursorBlink);
      clearInterval(textChange);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted || !resolvedTheme) return null;

  return (
    <div className="flex flex-col h-min">
      <h1 className={`pr-1 ${showCursor && "border-r"}`}>
        {THEME_TEXT[resolvedTheme]?.primary[displayTextIndex] || `danny vasta`}
      </h1>
      <p className={"w-min whitespace-nowrap pr-1 opacity-50"}>
        {THEME_TEXT[resolvedTheme]?.secondary?.[displayTextIndex] || ` `}
      </p>
    </div>
  );
};
