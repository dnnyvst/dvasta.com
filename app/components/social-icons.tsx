import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";

const LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/dnnyvst",
    Icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-vasta/",
    Icon: FaLinkedin,
  },
  {
    name: "djv711@gmail.com",
    href: "mailto:djv711@gmail.com",
    Icon: HiOutlineMail,
  },
  {
    name: "resume",
    href: "/resume.pdf",
    Icon: IoDocumentTextOutline,
  },
];

export const SocialIcons = () => (
  <nav className="flex flex-col gap-2" aria-label="Social links">
    <ul className="flex flex-col gap-2">
      {LINKS.map(({ name, href, Icon }) => (
        <li key={name} className="flex items-center gap-2">
          <span className="text-xl leading-none">•</span>
          <Link
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="resume pdf"
            className="flex items-center gap-1"
          >
            <Icon size={18} /> {name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
