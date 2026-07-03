import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";

export const SocialIcons = () => (
  <nav className="flex gap-4" aria-label="Social links">
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
);
