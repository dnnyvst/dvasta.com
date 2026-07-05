import Link from "next/link";

import { ModalOverlay } from "@/components";
import { PROJECTS, type Project } from "@/constants";
import { LuScreenShare } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";

interface ProjectProps {
  params: { id: string };
}
export default async function Project({ params }: ProjectProps) {
  const { id: projectId } = await params;

  const PROJECT: Project | undefined = PROJECTS.find(
    (project) => project.id === projectId,
  );

  const { name, liveHref, repoHref, description, year } = PROJECT || {};

  return (
    <ModalOverlay>
      <section className="relative flex flex-col gap-4 shadow-lg card">
        <span className="absolute right-0 py-2 pr-4 text-xs opacity-60">
          {year}
        </span>
        <div className="flex flex-col gap-2">
          <h2>{name}</h2>
          {liveHref && (
            <Link
              href={liveHref}
              target="_blank"
              rel="noreferrer"
              aria-label="live site link"
              className="w-min"
            >
              <span className="flex items-center gap-2">
                <LuScreenShare /> live
              </span>
            </Link>
          )}
          {repoHref && (
            <Link
              href={repoHref as string}
              target="_blank"
              rel="noreferrer"
              aria-label="Github repo link"
              className="w-min"
            >
              <span className="flex items-center gap-2">
                <FaGithub /> source
              </span>
            </Link>
          )}
        </div>
        <section className="flex flex-col gap-2">{description}</section>
      </section>
    </ModalOverlay>
  );
}
