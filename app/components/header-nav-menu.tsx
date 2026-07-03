"use client";

import Link from "next/link";
import { SocialIcons, ThemeToggle } from "@/components";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const pages = [
  { path: "/", label: "about me" },
  { path: "/projects", label: "projects" },
];

export const HeaderNavMenu = () => {
  const currentPath = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <aside className="relative flex sm:hidden">
      <button
        className={`rounded-sm hover:cursor-pointer hover:bg-card-background ${open ? "bg-card-background" : ""} z-60`}
        onClick={() => setOpen((open) => !open)}
      >
        <IoMenu size={24} />
      </button>
      {open && (
        <div className="absolute z-50 border top-4 card w-[200px]">
          <ul className="flex flex-col gap-2">
            {pages.map(({ path, label }) => (
              <Link
                key={path}
                className={`no-underline ${[path === currentPath ? "pointer-events-none" : ""]}`}
                href={path}
                onClick={() => setOpen((open) => !open)}
              >
                <li
                  className={`card ${path === currentPath ? "bg-card-background pointer-events-none" : "bg-background hover:cursor-pointer hover:bg-card-background hover:italic"}`}
                >
                  {label}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};
