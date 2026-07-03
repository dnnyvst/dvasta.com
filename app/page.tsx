"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 w-full h-full gap-4 overflow-y-scroll scrollbar-thin">
      <Image
        priority
        src="/profile.jpg"
        className="mb-4 rounded-md"
        height={144}
        width={144}
        alt="a photo of danny vasta"
      />
      <p>
        hi there, my name is Danny! i&apos;m a Software Engineer with 7+ years
        of experience and a passion for frontend/web development technologies. i
        am experienced with react, next.js, typescript, and frontend
        architecture / component-driven-design efforts.
      </p>
      <p>
        i am currently a frontend / fullstack engineer at{" "}
        <Link href="https://www.chewy.com/" target="_blank" rel="noreferrer">
          Chewy
        </Link>{" "}
        on the Sponsored Ads team.
      </p>
      <p className="pt-4">
        some things i&apos;m currently interested in, learning, or experimenting
        with:
      </p>
      <ul>
        <li>
          -{" "}
          <Link href="https://threejs.org/" target="_blank" rel="noreferrer">
            three.js
          </Link>{" "}
          and{" "}
          <Link
            href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"
            target="_blank"
            rel="noreferrer"
          >
            react-three-fiber
          </Link>
        </li>
        <li>
          - latest{" "}
          <Link href="https://react.dev/" target="_blank" rel="noreferrer">
            react
          </Link>{" "}
          and{" "}
          <Link href="https://nextjs.org/" target="_blank" rel="noreferrer">
            next.js
          </Link>{" "}
          updates
        </li>
        <li>- ai and improving my agentic engineering workflow</li>
        {/* <li>
            - Twitch chat game; experimenting with{" "}
            <Link
              href="https://www.npmjs.com/package/tmi.js"
              target="_blank"
              rel="noreferrer"
            >
              tmi.js
            </Link>
          </li> */}
      </ul>
      <p>
        check out the <Link href="/projects">projects page</Link> to see more!
      </p>
    </main>
  );
}
