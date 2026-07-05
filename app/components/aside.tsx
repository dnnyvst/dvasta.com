import { type FC } from "react";
import { ARTICLES, type Article } from "@/constants";

const Article: FC<Article> = ({ title, content }) => (
  <article>
    <h2>{title}</h2>
    <section className="flex flex-col gap-2">{content}</section>
  </article>
);

export const Aside: FC = () => (
  <aside className="flex flex-col w-64 gap-8 pb-16">
    {ARTICLES.map((article) => (
      <Article key={article.title} {...article} />
    ))}
  </aside>
);
