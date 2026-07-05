"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { PROJECTS } from "@/constants";
import { FaGithub } from "react-icons/fa";
import { LuScreenShare } from "react-icons/lu";

export default function Home() {
  // const [selectedProjectId, setSelectedProjectId] = useState<string>("space");

  // const { name, liveHref, repoHref, description, year } =
  //   PROJECTS.find((project) => project.id === selectedProjectId) || {};

  return (
    <main className="flex flex-col flex-1 w-full h-full gap-4 overflow-y-scroll scrollbar-thin">
      {PROJECTS.map(({ id, name, liveHref, repoHref, description, year }) => (
        <section
          key={id}
          className="relative flex flex-col flex-1 w-full gap-4 shadow-md card"
        >
          <span className="absolute right-0 py-2 pr-4 text-xs opacity-60">
            {year}
          </span>
          <div className="flex flex-col gap-2 text-2xl">
            {name}
            {liveHref && (
              <Link
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                aria-label="live site link"
                className="text-xs w-min"
              >
                <span className="flex items-center gap-2">
                  <LuScreenShare /> live
                </span>
              </Link>
            )}
            <Link
              href={repoHref as string}
              target="_blank"
              rel="noreferrer"
              aria-label="Github repo link"
              className="text-xs w-min"
            >
              <span className="flex items-center gap-2">
                <FaGithub /> source
              </span>
            </Link>
          </div>
          <section className="flex flex-col gap-2 text-sm">
            {description}
          </section>
        </section>
      ))}
    </main>
  );
}

{
  /* most of these projects started off with the intent of just &quot;learning
      by doing&quot;. over the years i have refined, practiced, and learned new
      skills by building things that interest me */
}
{
  /* <aside className="w-1/5 card">
        <ul className="flex flex-col gap-2">
          {PROJECTS.map((project) => (
            <li
              className={`hover:cursor-pointer hover:bg-card-background card ${selectedProjectId !== project.id ? "bg-background" : ""}`}
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </aside> */
}

/* <ul className="flex flex-col gap-2">
            {technologies?.map((technology) => (
              <li
                className={`px-2 py-0 rounded-sm w-min whitespace-nowrap ${PILL_COLORS[technology]}`}
                key={technology}
              >
                {technology}
              </li>
            ))}
          </ul> */
