"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { TbSun, TbMoonStars } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";
import { PiPlant } from "react-icons/pi";
import { type IconType } from "react-icons";

// something comforting -- nurture theme

const THEME_CONFIG: {
  [theme: string]: { Icon: IconType; label: string; id: string };
} = {
  "nurture-dark": {
    Icon: PiPlant,
    label: "nurture (dark)",
    id: "nurture-dark",
  },
  "beautiful-world": {
    Icon: BsCloudSun,
    label: "beautiful world",
    id: "beautiful-world",
  },
  light: {
    Icon: TbSun,
    label: "light",
    id: "light",
  },
  dark: {
    Icon: TbMoonStars,
    label: "dark",
    id: "dark",
  },
};

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentThemeConfig = THEME_CONFIG[resolvedTheme || "light"];

  return (
    <div className="flex flex-col items-end gap-2">
      <span
        className="flex items-center gap-4 px-2 py-1 w-min"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        {menuOpen ? (
          <>
            {Object.values(THEME_CONFIG).map(({ Icon, id }) => (
              <Icon
                key={id}
                className="z-40 cursor-pointer"
                size={24}
                onClick={() => setTheme(id)}
                onMouseEnter={() => setHoveredTheme(id)}
                onMouseLeave={() => setHoveredTheme(null)}
              />
            ))}
          </>
        ) : (
          <currentThemeConfig.Icon
            className="z-40 cursor-pointer"
            size={24}
            onClick={() => setTheme(currentThemeConfig.id)}
          />
        )}
      </span>
      {hoveredTheme && (
        <div
          data-theme={hoveredTheme}
          className="px-2 py-1 rounded-md whitespace-nowrap bg-background text-foreground"
        >
          {THEME_CONFIG[hoveredTheme]?.label}
        </div>
      )}
    </div>
  );
};
