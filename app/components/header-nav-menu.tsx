"use client";

import Link from "next/link";
import { SocialIcons, ThemeToggle } from "@/components";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { FaHome, FaLaptopCode } from "react-icons/fa";
import { useState } from "react";

const pages = [
  { path: "/", label: <FaHome size={24} /> },
  { path: "/projects", label: <FaLaptopCode size={24} /> },
];

export const HeaderNavMenu = () => {
  const currentPath = usePathname();
  //   const [open, setOpen] = useState<boolean>(false);

  return (
    <aside className="relative flex sm:hidden">
      <Link
        href={pages[0].path}
        className={`rounded-l-sm p-1 hover:cursor-pointer hover:bg-background border-l border-t border-b ${currentPath === pages[0].path ? "bg-background border-card-background" : "bg-card-background border-card-background"} z-60`}
        // onClick={() => setOpen((open) => !open)}
      >
        {pages[0].label}
      </Link>
      <Link
        href={pages[1].path}
        className={`rounded-r-sm p-1 hover:cursor-pointer hover:bg-background border-r border-t border-b ${currentPath === pages[1].path ? "bg-background border-card-background" : "bg-card-background border-card-background"} z-60`}
        // onClick={() => setOpen((open) => !open)}
      >
        {pages[1].label}
      </Link>

      {/* {open && (
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
      )} */}
    </aside>
  );
};
