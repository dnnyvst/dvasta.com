"use client";

import { ARTICLES } from "@/constants";

const Home = () => (
  <>
    <aside className="flex flex-col w-64 gap-8 pb-16">
      {ARTICLES.map(({ title, content }) => (
        <article key={title}>
          <h2>{title}</h2>
          <section className="flex flex-col gap-2">{content}</section>
        </article>
      ))}
    </aside>
    {/* <section className="flex-1 h-full bg-blue-500">main</section> */}
  </>
);

export default Home;
