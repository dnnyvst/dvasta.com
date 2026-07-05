"use client";

import Link from "next/link";
import { SocialIcons } from "@/components";
import { PROJECTS } from "@/constants";

export default function Home() {
  return (
    <div className="flex items-center h-full gap-8">
      <aside className="flex flex-col w-64 gap-8">
        <article>
          <h2>me</h2>
          <section className="flex flex-col gap-2">
            <p>software engineer with 7+ years of experience.</p>
            <p>
              fullstack engineer at{" "}
              <Link
                href="https://www.chewy.com/"
                target="_blank"
                rel="noreferrer"
              >
                Chewy
              </Link>{" "}
              on the Sponsored Ads team.
            </p>
          </section>
        </article>
        <article>
          <h2>projects</h2>
          <section className="flex flex-col gap-2">
            <ul>
              {PROJECTS.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </section>
        </article>
        <article>
          <h2>links</h2>
          <section className="flex flex-col gap-2">
            <SocialIcons />
          </section>
        </article>
      </aside>
      {/* <main className="flex-1 h-full bg-blue-500">main</main> */}
    </div>
  );
}
