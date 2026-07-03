"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { LuScreenShare } from "react-icons/lu";

// const PILL_COLORS = {
//   "next.js": "bg-card-background border border-foreground",
//   "three.js": "border border-[#3e8fb0]",
//   "react-three-fiber": "border border-[#eb6f92]",
//   "tmi.js": "border border-[#9147ff]",
// };

type Project = {
  id: string;
  name: string;
  repoHref: string;
  liveHref?: string;
  technologies?: string[];
  year: string;
  description: ReactNode;
};

const PROJECTS: Project[] = [
  {
    id: "space",
    name: "space model viewer",
    repoHref: "https://github.com/dnnyvst/space",
    liveHref: "/space",
    technologies: ["next.js", "three.js", "react-three-fiber"],
    year: "2026 (ongoing)",
    description: (
      <>
        <p className="pb-4">
          a 3D model viewer for our solar system (currently in progress).
        </p>
        <p>
          this app was built as an act of exploring and learning more about 3D
          rendering, three.js, and react-three-fiber. technology aside, i
          learned a lot more about space, our solar system, and Voyager 2 along
          the way.
        </p>
        <p>
          this app is also a space to flex the creative side of my brain.
          another goal of mine here was to build and learn without ai tooling.
          to me, working on this app has been akin to writing, drawing,
          painting, or any other form of artistic expression.
        </p>
      </>
    ),
  },
  {
    id: "pomo",
    name: "pomodoro timer",
    repoHref: "https://github.com/dnnyvst/pomodoro-app",
    liveHref: "/focus",
    technologies: ["next.js"],
    year: "2024",
    description: (
      <>
        <p className="pb-4">
          a beautiful and distraction-free Pomodoro focus timer/task manager.
        </p>
        <p>
          the intent of this project was to create a simple and beautiful
          Pomodoro focus app. it was heavily inspired by{" "}
          <Link
            className="text-sm"
            href="https://pomofocus.io"
            target="_blank"
            rel="noreferrer"
          >
            https://pomofocus.io
          </Link>{" "}
          which i used for many years and love dearly.
        </p>
        this app aims to create a calm and practical atmosphere when studying or
        working through different tasks. when the timer is running, the rest of
        the ui melts away. i wanted to build something functional but also
        capture an aesthetic that i enjoy a lot. be sure to check out the
        &quot;long break&quot; screen.
      </>
    ),
  },
  {
    id: "douyu",
    name: "douyu WoW VOD browser",
    repoHref: "https://github.com/dnnyvst/douyu-for-dummies",
    liveHref: "https://www.douyufordummies.com/",
    year: "2024",
    description: (
      <>
        <p className="pb-4">
          a Douyu VOD browser to more easily track CN WoW streamers.
        </p>
        <p>
          in the only World of Warcraft mythic+ scene, there are many amazing
          players who stream on sites like Douyu, Huya, and Bilibili. it can be
          hard to find their streams / VODs for us Western folk, as even Google
          Translate doesn&apos;t make it obvious and you just kind of have to
          know what/who you are looking for.
        </p>
        <p>
          the point of this app is to colocate a few of the most popular Eastern
          WoW streamers in one place. currently it previews the last 10 VODs of
          each stream as well as provides links to their full Live Replay and
          Live pages.
        </p>
      </>
    ),
  },
  {
    id: "twitch-chat",
    name: "twitch chat guessing game",
    repoHref: "https://github.com/dnnyvst/twitch-chat-guessing-game",
    year: "2024",
    technologies: ["tmi.js"],
    description: (
      <>
        <p className="pb-4">&quot;guess the word&quot; game for Twitch chat.</p>
        <p>the user sets the secret word and chat guesses!</p>
        <p>
          this was inspired by a live music-guessing-game Porter Robinson did
          once. after watching him have to manually read through all of chat to
          see if anyone guessed correctly, i thought it could be cool to make a
          simple web app around this concept.
        </p>
        <p>
          mainly served as a chance to practice next.js and use tmi.js to make
          something integraded with Twitch.
        </p>
      </>
    ),
  },
  {
    id: "personal-site",
    name: "this site!",
    repoHref: "https://github.com/dnnyvst/personal-site",
    year: "2023, revamped 2026",
    description: "you're here!",
  },
];

export default function Home() {
  // const [selectedProjectId, setSelectedProjectId] = useState<string>("space");

  // const { name, liveHref, repoHref, description, year } =
  //   PROJECTS.find((project) => project.id === selectedProjectId) || {};

  return (
    <div className="flex w-full h-full gap-4">
      {/* most of these projects started off with the intent of just &quot;learning
      by doing&quot;. over the years i have refined, practiced, and learned new
      skills by building things that interest me */}
      {/* <aside className="w-1/5 card">
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
      </aside> */}
      <main className="flex flex-col flex-1 gap-4 overflow-y-scroll scrollbar-thin">
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
    </div>
  );
}

{
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
}
