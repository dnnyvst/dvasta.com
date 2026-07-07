/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { PiLineVerticalLight } from "react-icons/pi";

const THEME_TEXT: {
  [theme: string]: { primary: string[]; secondary?: string[] };
} = {
  "beautiful-world": {
    primary: [
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
      "danny vasta",
    ],
    secondary: [
      "아름다운 세상",
      "변명",
      "아날로그 센티멘탈리즘",
      "흰천장",
      "꿈의 다음 부분을 보기 위해",
      "격변의 시대",
      "청춘반란",
      "엑스트라 일대기",
      "닭",
      "나는 내 마음이 너를 만지는 것을 느낄 수 있어",
      "",
    ],
  },
  "nurture-dark": {
    primary: [
      "lifelike",
      "look at the sky",
      "get your wish",
      "wind tempos",
      "musician",
      "do-re-mi-fa-so-la-ti-do",
      "mother",
      "dullscythe",
      "sweet time",
      "mirror",
      "something comforting",
      "blossom",
      "unfold",
      "trying to feel alive",
      "danny vasta",
    ],
    secondary: [
      "𓂃 𓈒𓏸",
      "☁︎ ⋆ ☾",
      "✧ ⋆ ✩",
      "〰︎ 〰︎",
      "♩ ♪",
      "♫ ♪ ♩",
      "♡",
      "† 𖤐",
      "ꕤ ⋆",
      "◐ ◌",
      "☕︎ ☁︎",
      "❀ ✿",
      "⌇ ⋮",
      "☼ ✧",
      "",
    ],
  },
  "nurture-light": {
    primary: [
      "lifelike",
      "look at the sky",
      "get your wish",
      "wind tempos",
      "musician",
      "do-re-mi-fa-so-la-ti-do",
      "mother",
      "dullscythe",
      "sweet time",
      "mirror",
      "something comforting",
      "blossom",
      "unfold",
      "trying to feel alive",
      "danny vasta",
    ],
    secondary: [
      "𓂃 𓈒𓏸",
      "☁︎ ⋆ ☾",
      "✧ ⋆ ✩",
      "〰︎ 〰︎",
      "♩ ♪",
      "♫ ♪ ♩",
      "♡",
      "† 𖤐",
      "ꕤ ⋆",
      "◐ ◌",
      "☕︎ ☁︎",
      "❀ ✿",
      "⌇ ⋮",
      "☼ ✧",
      "",
    ],
  },
};

const EMPTY_THEME = "";

export const TypeWriter = () => {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme ?? EMPTY_THEME;
  const isValidTheme = !!THEME_TEXT[currentTheme];

  const [mounted, setMounted] = useState<boolean>(false);

  const [showCursor, setShowCursor] = useState<boolean>(false);
  const [themeTextIndex, setThemeTextIndex] = useState<number>(0);
  const [highlighted, setHighlighted] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>("");
  const [displayTextIndex, setDisplayTextIndex] = useState<number>(0);

  const timersRef = useRef<{
    deleted: ReturnType<typeof setTimeout> | null;
    newText: ReturnType<typeof setTimeout> | null;
  }>({ deleted: null, newText: null });

  const currentThemeText = THEME_TEXT[currentTheme]?.primary[themeTextIndex];
  const isTyping = displayText !== currentThemeText;
  const currentSecondaryThemeText =
    isTyping || deleted
      ? ""
      : THEME_TEXT[currentTheme]?.secondary?.[themeTextIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  // reset
  useEffect(() => {
    setThemeTextIndex(0);
    setDisplayText("");
    setDisplayTextIndex(0);
    setHighlighted(false);
    setDeleted(false);
  }, [currentTheme]);

  // cursor blink
  useEffect(() => {
    if (!mounted || !isValidTheme) return;

    const cursorBlink = setInterval(
      () => setShowCursor((showCursor) => !showCursor),
      500,
    );

    return () => clearInterval(cursorBlink);
  }, [currentTheme, isValidTheme, mounted]);

  // text change
  useEffect(() => {
    if (!mounted || !isValidTheme) {
      setShowCursor(false);
      setHighlighted(false);
      setDeleted(false);
      return;
    }

    const sequence = () => {
      if (timersRef.current.deleted) clearTimeout(timersRef.current.deleted);
      if (timersRef.current.newText) clearTimeout(timersRef.current.newText);

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
          if (themeTextIndex + 1 === THEME_TEXT[currentTheme].primary.length) {
            return 0;
          }
          return themeTextIndex + 1;
        });

        setHighlighted(false);
        setDeleted(false);
        setDisplayText("");
        setDisplayTextIndex(0);
      }, 600);
    };

    const interval = setInterval(sequence, 4000);

    const currentTimers = timersRef.current;
    return () => {
      clearInterval(interval);
      if (currentTimers.deleted) {
        clearTimeout(currentTimers.deleted);
        currentTimers.deleted = null;
      }

      if (currentTimers.newText) {
        clearTimeout(currentTimers.newText);
        currentTimers.newText = null;
      }
    };
  }, [currentTheme, isValidTheme, mounted]);

  // typewriter
  useEffect(() => {
    if (
      !mounted ||
      !isValidTheme ||
      !currentThemeText ||
      displayText === currentThemeText
    ) {
      return;
    }

    const typingSpeed = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
    const typeWriter = setTimeout(() => {
      setShowCursor(true);
      setDisplayText((displayText) => {
        return displayText + currentThemeText[displayTextIndex];
      });
      setDisplayTextIndex((displayTextIndex) => {
        return displayTextIndex + 1;
      });
    }, typingSpeed);

    return () => clearTimeout(typeWriter);
  }, [
    currentTheme,
    currentThemeText,
    displayText,
    displayTextIndex,
    isValidTheme,
    mounted,
  ]);

  if (!mounted || !resolvedTheme) return null;

  let chunk1 = "";
  let chunk2 = "";
  if (displayText.length > 20) {
    chunk1 = displayText.substring(0, 20).trim();
    chunk2 = displayText.substring(20).trim();
  }
  const isMobile = window.matchMedia("(max-width: 637px)").matches;
  const isMultiLine = isMobile && chunk2.length > 1;

  return (
    <div className="flex flex-col h-min">
      <h1 className="flex items-center">
        <span
          className={`flex ${highlighted ? "highlighted" : ""} ${isMultiLine ? "flex-col" : "flex-row"}`}
        >
          {isMultiLine && !deleted ? (
            <>
              <span>{chunk1}</span>
              <span className="flex items-center">
                {chunk2}
                <PiLineVerticalLight
                  size={28}
                  className={`-ml-3 ${(showCursor || deleted) && !highlighted ? "opacity-100" : "opacity-0"}`}
                />
              </span>
            </>
          ) : (
            <>
              {!deleted && displayText}
              <PiLineVerticalLight
                size={28}
                className={`-ml-3 -mr-4 $ ${(showCursor || deleted) && !highlighted ? "opacity-100" : "opacity-0"}`}
              />
            </>
          )}
        </span>
      </h1>
      <p
        className={`flex max-w-3/4 sm:max-w-full transition-opacity duration-300 ${!currentSecondaryThemeText ? "opacity-0" : "opacity-60"}`}
      >
        {currentSecondaryThemeText}
      </p>
    </div>
  );
};
