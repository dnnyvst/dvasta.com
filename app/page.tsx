import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

export default function Home() {
  return (
    <div className="flex flex-col items-center flex-1 gap-4">
      <header>
        <Image
          priority
          src="/profile.jpg"
          className="w-full mb-4 border rounded-md border-foreground/70 dark:border-card-background"
          height={237}
          width={237}
          alt="a photo of danny vasta"
        />
        <h1 className="text-4xl">danny vasta</h1>
        <span className="text-sm">
          fullstack engineer at{" "}
          <Link
            className="text-sm"
            href="https://www.chewy.com/"
            target="_blank"
            rel="noreferrer"
          >
            Chewy
          </Link>
        </span>
      </header>
      {/* social links */}
      <nav
        className="flex justify-center gap-4 pt-2 pb-4"
        aria-label="Social links"
      >
        <Link
          href="https://www.linkedin.com/in/daniel-vasta/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <FaLinkedin size={24} />
        </Link>
        <Link
          href="https://github.com/dnnyvst"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="mailto:djv711@gmail.com"
          target="_blank"
          rel="noreferrer"
          aria-label="mail to dvv711@gmail.som"
        >
          <HiOutlineMail size={24} />
        </Link>
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="resume pdf"
        >
          <IoDocumentTextOutline size={24} />
        </Link>
      </nav>
      {/* main content */}
      <section className="flex flex-col flex-1 gap-4">
        <p>
          hi there, my name is Danny! i&apos;m a Software Engineer with 6+ years
          of experience and a passion for frontend/web development technologies.
          i am experienced with react, next.js, typescript, and frontend
          architecture / component-driven-design efforts.
        </p>
        <hr className="my-4" />
        <p>
          some things i&apos;m currently interested in, learning, or
          experimenting with:
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
      </section>
    </div>
  );
}
