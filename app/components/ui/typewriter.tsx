/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef, useCallback } from "react";
import { PiLineVerticalLight } from "react-icons/pi";

const NURTURE_TEXT = {
  primary: [
    "lifelike.",
    "look at the sky.",
    "get your wish.",
    "wind tempos.",
    "musician.",
    "do-re-mi-fa-so-la-ti-do.",
    "mother.",
    "dullscythe.",
    "sweet time.",
    "mirror.",
    "something comforting.",
    "blossom.",
    "unfold.",
    "trying to feel alive.",
    "danny vasta.",
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
};

const PERSONAL_TEXT = {
  primary: [
    "danny vasta.",
    "software engineer at Chewy.",
    "react enthusiast.",
    "music lover.",
    "pastry enjoyer.",
    "coffee snob.",
  ],
  secondary: [],
};

const TEXT = {
  "beautiful-world": {
    primary: [
      "beautiful world.",
      "excuse.",
      "analog sentimentalism.",
      "white ceiling.",
      "to see the next part of the dream.",
      "age of fluctuation.",
      "youth rebellion.",
      "extra story.",
      "chicken.",
      "i can feel my heart touching you.",
      "danny vasta.",
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

  nurture: NURTURE_TEXT,
  personal: PERSONAL_TEXT,
};

type ThemeKey = keyof typeof TEXT;

const getThemeKey = (theme: string): ThemeKey => {
  if (theme === "nurture-dark" || theme === "nurture-light") {
    return "nurture";
  }

  if (theme === "dark" || theme === "light") {
    return "personal";
  }

  return "beautiful-world";
};

const EMPTY_THEME = "";

const KEYBOARD = [
  "`1234567890-=.",
  "qwertyuiop[]\\.",
  "asdfghjkl;'.",
  "zxcvbnm,./.",
];
const getMissedKey = (correctLetter: string) => {
  if (correctLetter === " ") {
    const spaceNeighbors = "cvbnm";
    return spaceNeighbors[Math.floor(Math.random() * spaceNeighbors.length)];
  }

  for (const row of KEYBOARD) {
    const index = row.indexOf(correctLetter);
    if (index === -1) continue;

    const neighbors = [];

    if (index > 0) {
      neighbors.push(row[index - 1]);
    }

    if (index < row.length - 1) {
      neighbors.push(row[index + 1]);
    }

    return neighbors[Math.floor(Math.random() * neighbors.length)];
  }

  return correctLetter;
};

type TypingMode = "typing" | "fixing" | "deleting";

export const TypeWriter = () => {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme ?? EMPTY_THEME;
  const themeKey = getThemeKey(currentTheme);
  const isValidTheme = !!TEXT[themeKey];

  const [mounted, setMounted] = useState<boolean>(false);

  const [cursorBlinking, setCursorBlinking] = useState<boolean>(false);
  const [themeTextIndex, setThemeTextIndex] = useState<number>(0);
  const [highlighted, setHighlighted] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>("");
  const [displayTextIndex, setDisplayTextIndex] = useState<number>(0);

  const [typingMode, setTypingMode] = useState<TypingMode>("typing");
  const [mistakeIndex, setMistakeIndex] = useState<number | null>(null);
  const [mistakeCount, setMistakeCount] = useState<number>(0);

  const timersRef = useRef<{
    deleted: ReturnType<typeof setTimeout> | null;
    newText: ReturnType<typeof setTimeout> | null;
  }>({ deleted: null, newText: null });

  const showCursor = cursorBlinking || typingMode === "deleting";

  const currentThemeText = TEXT[themeKey]?.primary[themeTextIndex];
  const isTyping = displayText !== currentThemeText;
  const currentSecondaryThemeText =
    isTyping || typingMode === "deleting"
      ? ""
      : TEXT[themeKey]?.secondary?.[themeTextIndex];

  const resetTypingState = useCallback(() => {
    setDisplayText("");
    setDisplayTextIndex(0);
    setHighlighted(false);
    setCursorBlinking(false);
    setTypingMode("typing");
    setMistakeIndex(null);
    setMistakeCount(0);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setThemeTextIndex(0);
    resetTypingState();
  }, [currentTheme, resetTypingState]);

  // cursor blink
  useEffect(() => {
    if (!mounted || !isValidTheme) return;

    const cursorBlink = setInterval(
      () => setCursorBlinking((cursorBlinking) => !cursorBlinking),
      500,
    );

    return () => clearInterval(cursorBlink);
  }, [currentTheme, isValidTheme, mounted]);

  // text change
  useEffect(() => {
    if (!mounted || !isValidTheme) {
      setCursorBlinking(false);
      setHighlighted(false);
      setTypingMode("typing");
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
        setTypingMode("deleting");
      }, 250);

      // change text and display
      timersRef.current.newText = setTimeout(() => {
        setThemeTextIndex((themeTextIndex) => {
          if (themeTextIndex + 1 === TEXT[themeKey].primary.length) {
            return 0;
          }
          return themeTextIndex + 1;
        });

        resetTypingState();
      }, 600);
    };

    const interval = setInterval(sequence, 5000);

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
  }, [currentTheme, isValidTheme, mounted, resetTypingState]);

  // typewriter
  useEffect(() => {
    if (
      !mounted ||
      !isValidTheme ||
      !currentThemeText ||
      displayText === currentThemeText ||
      typingMode === "deleting"
    ) {
      return;
    }

    // backspacing: constant
    // typing: random within range, plus hesitation
    // type faster after mistakes
    const typingSpeed =
      typingMode === "fixing"
        ? 120
        : Math.floor(Math.random() * (70 - 45 + 1)) +
          45 +
          (Math.random() < 0.03 ? 100 : 0) -
          mistakeCount * 20;

    const typeWriter = setTimeout(() => {
      setCursorBlinking(true);

      switch (typingMode) {
        case "typing":
          // 5% chance to make a mistake
          if (
            mistakeCount < 1 &&
            mistakeIndex === null &&
            Math.random() < 0.075
          ) {
            setDisplayText(
              (displayText) =>
                displayText + getMissedKey(currentThemeText[displayTextIndex]),
            );
            setMistakeIndex(displayTextIndex);
            setMistakeCount((mistakeCount) => mistakeCount + 1);
          } else {
            // if we are 3 characters past the mistake
            // or at the end, start fixing
            if (
              mistakeIndex !== null &&
              (displayTextIndex >= mistakeIndex + 3 ||
                displayTextIndex >= currentThemeText.length)
            ) {
              setTypingMode("fixing");
            } else {
              setDisplayText(
                (displayText) =>
                  displayText + currentThemeText[displayTextIndex],
              );
              setDisplayTextIndex((displayTextIndex) => displayTextIndex + 1);
            }
          }
          break;
        case "fixing":
          if (mistakeIndex !== null && displayText.length === mistakeIndex) {
            setDisplayTextIndex(mistakeIndex);
            setMistakeIndex(null);
            setTypingMode("typing");
          } else {
            setDisplayText((displayText) => displayText.slice(0, -1));
          }
          break;
        default:
          return;
      }
    }, typingSpeed);

    return () => clearTimeout(typeWriter);
  }, [
    currentTheme,
    currentThemeText,
    displayText,
    displayTextIndex,
    isValidTheme,
    mistakeCount,
    mistakeIndex,
    mounted,
    typingMode,
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
          {isMultiLine && typingMode !== "deleting" ? (
            <>
              <span>{chunk1}</span>
              <span className="flex items-center">
                {chunk2}
                <PiLineVerticalLight
                  size={28}
                  className={`-ml-3 ${showCursor && !highlighted ? "opacity-100" : "opacity-0"}`}
                />
              </span>
            </>
          ) : (
            <>
              {typingMode !== "deleting" && displayText}
              <PiLineVerticalLight
                size={28}
                className={`-ml-3 -mr-4 $ ${showCursor && !highlighted ? "opacity-100" : "opacity-0"}`}
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
