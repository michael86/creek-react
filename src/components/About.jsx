import styles from "../styles/About.module.css";
import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

import Accredittors from "./Accredittors";
import Viewport from "../context/Viewport";
import useContent from "../hooks/useContent";
import OpeningCard from "./OpeningCard";
import FormattedContent from "./FormattedContent";

gsap.registerPlugin(ScrollTrigger);

const About = ({ addRef }) => {
  const ref = useRef();
  const { width } = useContext(Viewport);
  const [content] = useContent("about", true);

  useLayoutEffect(() => {
    if (!content) return;

    let mm = gsap.matchMedia(),
      breakPoint = 991;

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop, reduceMotion } = context.conditions;
        const paragraphs = [...ref.current.children[1].children].splice(1);
        const card = ref.current.children[2].children[0];

        if (reduceMotion) return;

        gsap.from(paragraphs, {
          scrollTrigger: {
            trigger: ref.current,
            start: isDesktop ? "top 90%" : "top 50%",
            end: isDesktop ? "top 30%" : "top top",
            scrub: true,
          },
          y: 100,
          x: 500,
          autoAlpha: 0,
          stagger: 0.2,
        });
      }
    );

    return () => mm.revert();
  }, [content, width]);

  useEffect(() => {
    content && addRef(ref);
  }, [content]);

  return (
    <>
      {!content && <h1>Loading</h1>}
      {content && (
        <section className={styles.about} id="about" ref={ref}>
          <div className={styles.waveContainer}>
            <img src="/images/wave.svg" alt="border" />
          </div>
          <div className={styles.fontContainer}>
            <h2>About Us</h2>
            {content.map((content, i) => (
              <FormattedContent data={content} key={i} />
            ))}
          </div>

          <OpeningCard />

          {width >= 991 && <Accredittors />}
          <div className={styles.waveContainer}>
            <img src="images/wave-white.svg" alt="border" />
          </div>
        </section>
      )}
    </>
  );
};

export default About;
