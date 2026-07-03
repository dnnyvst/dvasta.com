"use client";

import Link from "next/link";
import { SocialIcons, ThemeToggle } from "@/components";
import { usePathname } from "next/navigation";

const pages = [
  { path: "/", label: "about me" },
  { path: "/projects", label: "projects" },
];

export const SideNav = () => {
  const currentPath = usePathname();

  return (
    <aside className="hidden w-1/5 bg-background sm:block">
      <ul className="flex flex-col gap-2">
        {/* <span className="flex justify-between pb-16">
          <span className="hidden md:inline">danny vasta</span>
          <span className="md:hidden">dv</span>
          <ThemeToggle />
        </span> */}
        <li className="hidden text-sm lg:inline">
          frontend / fullstack engineer at{" "}
          <Link
            className="text-sm"
            href="https://www.chewy.com/"
            target="_blank"
            rel="noreferrer"
          >
            Chewy
          </Link>
        </li>
        <li className="hidden py-2 lg:inline">
          <SocialIcons />
        </li>
        <hr className="hidden pb-2 lg:inline" />

        {pages.map(({ path, label }) => (
          <Link
            key={path}
            className={`no-underline ${[path === currentPath ? "pointer-events-none" : ""]}`}
            href={path}
          >
            <li
              className={`card ${path === currentPath ? "bg-card-background pointer-events-none" : "bg-background hover:cursor-pointer hover:bg-card-background hover:italic"}`}
            >
              {label}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};
