"use client";

import Link from "next/link";
import { HeaderNavMenu, SocialIcons, ThemeToggle } from "@/components";
import { usePathname } from "next/navigation";

const pages = [
  { path: "/", label: "home" },
  { path: "/projects", label: "projects" },
];

export const Header = () => {
  // const currentPath = usePathname();

  return (
    <header className="relative sticky top-0 z-40 flex items-center w-full gap-4 px-2 py-4 bg-background lg:px-0">
      <span className="flex items-center w-1/5 gap-2">
        {/* {currentPath === "/" ? (
          <>
            <span className="hidden md:inline">danny vasta</span>
            <span className="md:hidden">dv</span>
          </>
        ) : (
          pages.find((page) => page.path === currentPath)?.label
        )} */}
        <span className="hidden md:inline">danny vasta</span>
        <span className="md:hidden">dv</span>
        <HeaderNavMenu />
      </span>

      {/* <nav className="flex justify-center gap-4 whitespace-nowrap justify-self-center">
        {pages.map(({ path, label }) => (
          <span key={path}>
            {path === currentPath ? (
              <>{label}</>
            ) : (
              <Link href={path}>{label}</Link>
            )}
          </span>
        ))}
      </nav> */}
      <span className="absolute -translate-x-1/2 sm:static sm:translate-x-0 sm:left-auto left-1/2 lg:hidden">
        <SocialIcons />
      </span>
      <span className="ml-auto">
        <ThemeToggle />
      </span>
    </header>
  );
};
