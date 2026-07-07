"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { TbSun, TbMoonStars } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";
import { PiPlant, PiPlantFill } from "react-icons/pi";
import { type IconType } from "react-icons";

// something comforting -- nurture theme

const THEME_CONFIG: {
  [theme: string]: { Icon: IconType; label: string; id: string };
} = {
  "nurture-light": {
    Icon: PiPlant,
    label: "nurture (light)",
    id: "nurture-light",
  },
  "nurture-dark": {
    Icon: PiPlantFill,
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

  const isMobile = window.matchMedia("(max-width: 637px)").matches;

  return (
    <div className="absolute right-0 flex flex-col items-end gap-2">
      <span
        className="flex flex-col-reverse items-center gap-4 sm:flex-row"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        {menuOpen ? (
          <>
            {Object.values(THEME_CONFIG).map(({ Icon, id }) => (
              <button
                key={id}
                className={`pb-1 cursor-pointer border-thickness-2 ${id === currentThemeConfig.id && "border-b-2"}`}
                onClick={() => {
                  setTheme(id);
                  if (isMobile) {
                    setMenuOpen(false);
                    setHoveredTheme(null);
                  }
                }}
                onMouseEnter={() => setHoveredTheme(id)}
                onMouseLeave={() => setHoveredTheme(null)}
              >
                <Icon size={24} />
              </button>
            ))}
          </>
        ) : (
          <currentThemeConfig.Icon
            className={`cursor-pointer ${(currentThemeConfig.id === "light" || currentThemeConfig.id === "dark") && "animate-pulse"}`}
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
