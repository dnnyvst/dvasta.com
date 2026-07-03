"use client";

import Link from "next/link";
import { SocialIcons, ThemeToggle } from "@/components";
import { usePathname } from "next/navigation";

const pages = [
  { path: "/", label: "home" },
  { path: "/projects", label: "projects" },
];

export const Header = () => {
  const currentPath = usePathname();

  return (
    <header className="sticky top-0 flex items-center w-full py-4 bg-background z-99">
      <span className="w-1/5">
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
      <span className="flex flex-1">
        <span className="inline lg:hidden">
          <SocialIcons />
        </span>
        <span className="ml-auto">
          <ThemeToggle />
        </span>
      </span>
    </header>
  );
};
