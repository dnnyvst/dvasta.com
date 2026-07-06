"use client";

import { useEffect, useState } from "react";
import { TbSun, TbMoonStars } from "react-icons/tb";
// beautiful world
// import { BsCloudSun } from "react-icons/bs";

export const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  // useEffect(() => {
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)",
  //   ).matches;

  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   setDark(prefersDark);
  // }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const Icon = dark ? TbSun : TbMoonStars;

  return (
    <Icon
      className="z-40 cursor-pointer"
      size={24}
      onClick={() => setDark((dark) => !dark)}
    />
  );
};
