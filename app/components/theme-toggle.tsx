"use client";

import { TbSun, TbMoonStars } from "react-icons/tb";

export const ThemeToggle = () => {
  const toggle = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");

    document.cookie = `theme=${isDark ? "dark" : "light"}; path=/; max-age=31536000`;
  };

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <button onClick={toggle} className="cursor-pointer">
      {isDark ? <TbSun size={24} /> : <TbMoonStars size={24} />}
    </button>
  );
};
