"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components";
import { usePathname } from "next/navigation";

const pages = [
  { path: "/", label: "home" },
  { path: "/projects", label: "projects" },
];

export const Header = () => {
  const currentPath = usePathname();

  return (
    <header className="sticky top-0 flex justify-between w-1/5 px-2 py-4 mr-auto bg-background z-99">
      <span>
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
      <ThemeToggle />
    </header>
  );
};
