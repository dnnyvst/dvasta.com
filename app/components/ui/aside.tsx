import { type FC } from "react";
import { ARTICLES, type Article } from "@/constants";

const Article: FC<Article> = ({ title, content }) => (
  <article>
    <h2>{title}</h2>
    <section className="z-40 flex flex-col gap-2 pointer-events-auto">
      {content}
    </section>
  </article>
);

export const Aside: FC = () => (
  <aside className="z-40 flex flex-col w-64 gap-8 pointer-events-none xl:z-50">
    {ARTICLES.map((article) => (
      <Article key={article.title} {...article} />
    ))}
  </aside>
);
