"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components";
import { usePathname } from "next/navigation";

const pages = [
  { path: "/", label: "home" },
  { path: "/projects", label: "projects" },
  // { path: "/contact", label: "contact me" },
];

export const Header = () => {
  const currentPath = usePathname();

  return (
    <header className="sticky top-0 grid w-full grid-cols-3 px-2 py-4 bg-background z-99">
      <span className="justify-self-start">
        {currentPath === "/" ? (
          <>
            <span className="hidden md:inline">danny vasta</span>
            <span className="md:hidden">dv</span>
          </>
        ) : (
          pages.find((page) => page.path === currentPath)?.label
        )}
      </span>
      <nav className="flex justify-center gap-4 whitespace-nowrap justify-self-center">
        {pages.map(({ path, label }) => (
          <span key={path}>
            {path === currentPath ? (
              <>{label}</>
            ) : (
              <Link href={path}>{label}</Link>
            )}
          </span>
        ))}
      </nav>
      <span className="justify-self-end">
        <ThemeToggle />
      </span>
    </header>
  );
};
