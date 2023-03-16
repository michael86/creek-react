import styles from "../styles/About.module.css";
import { useContext, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

import Accredittors from "./Accredittors";
import Viewport from "../context/Viewport";
import useContent from "../hooks/useContent";
import OpeningCard from "./OpeningCard";
import { formatContent } from "../utils/text";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef();
  const { width } = useContext(Viewport);
  const [content] = useContent("about", true);

  useLayoutEffect(() => {
    if (!content) return;
    const paragraphs = [...ref.current.children[1].children].splice(1);
    const card = ref.current.children[2].children[0];

    const mm = gsap.matchMedia();

    mm.add("(max-width: 991px)", () => {
      gsap
        .timeline()
        .from(paragraphs, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 50%",
            end: "top top",

            scrub: true,
          },
          y: 100,
          x: 500,
          autoAlpha: 0,
          stagger: 0.2,
        })
        .from(card, {
          scrollTrigger: {
            trigger: paragraphs[paragraphs.length - 1],
            start: "top 50%",
            end: "top top",
            // markers: true,
            scrub: true,
          },
          scale: 0,
          autoAlpha: 0,
          stagger: 0.2,
        });
    });

    mm.add("(min-width: 992px)", () => {
      gsap
        .timeline()
        .from(paragraphs, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 30%",
            // markers: true,
            scrub: true,
          },
          y: 100,
          x: 500,
          autoAlpha: 0,
          stagger: 0.2,
        })
        .from(card, {
          scrollTrigger: {
            trigger: paragraphs[paragraphs.length - 1],
            start: "top bottom",
            end: "top center",
            // markers: true,
            scrub: true,
          },
          scale: 0,
          autoAlpha: 0,
          stagger: 0.2,
        });
    });
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
            {content.map((content) => formatContent(content))}
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
