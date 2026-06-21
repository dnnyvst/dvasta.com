import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className="twoSecondFadeIn">
          <section className={utilStyles.headingMd}>
            <p>
              hi there, my name is <strong>Danny</strong>! i'm a Software
              Engineer
              <i>
                {" "}
                (currently a Fullstack Engineer at{" "}
                <a href="https://www.chewy.com/">Chewy</a>!){" "}
              </i>
              with <span className="greenText">6+ years of experience</span> and
              a passion for frontend/web development technologies. i am
              experienced with React, Redux, Next.js, Javascript/Typescript and
              frontend architecture design efforts.
            </p>
          </section>
          <hr />
          <section>
            some things I'm currently interested in, learning and experimenting
            with on my own time <i>(Github to be updated soon)</i>:
            <ul>
              <li>
                Latest <a href="https://react.dev/">React</a> updates
              </li>
              <li>
                <a href="https://nextjs.org/" target="_blank">
                  Next.js
                </a>
              </li>
              <li>
                <a href="https://threejs.org/" target="_blank">
                  three.js
                </a>{" "}
                and{" "}
                <a
                  href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"
                  target="_blank"
                >
                  React Three Fiber
                </a>
              </li>
              <li>AI / machine learning</li>
              <li>
                Twitch Chat game / side project using{" "}
                <a href="https://www.npmjs.com/package/tmi.js">tmi.js</a>
              </li>
            </ul>
          </section>
          <hr />
          <section className="leftcolumn">
            <section
              className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
              <h2 className={utilStyles.headingLg}>info</h2>
              <ul className={utilStyles.list}>
                <li className={utilStyles.listItem}>
                  <a href="/resume.pdf" target="_blank">
                    resume
                  </a>
                </li>
                <li className={utilStyles.listItem}>
                  <a
                    href="https://www.linkedin.com/in/daniel-vasta/"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className={utilStyles.listItem}>
                  <a href="https://github.com/DNNYVST" target="_blank">
                    Github
                  </a>
                </li>
              </ul>
            </section>
          </section>
          <section className="rightcolumn">
            <section
              className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
              <h2 className={utilStyles.headingLg}>contact</h2>
              <ul className={utilStyles.list}>
                <li className={utilStyles.listItem}>
                  <a href="mailto:djv711@gmail.com" target="_blank">
                    e-mail
                  </a>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </Layout>
    </>
  );
}
