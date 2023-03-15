import ServiceSection from "./ServiceSection";
import styles from "../../styles/Services.module.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ActiveService = ({ content, addRef }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    if (!ref.current) return;
    const main = ref.current.children[0];
    const aside = ref.current.children[1];

    let paragraphs = [...main.children].filter((el) => el.tagName === "P");
    paragraphs = [...paragraphs, ...[...aside.children].filter((el) => el.tagName === "P")];
    const spans = paragraphs.map((span) => span.children);

    let ulContainers = [...main.children].filter((el) => el.tagName === "DIV");
    ulContainers = [...ulContainers, ...[...aside.children].filter((el) => el.tagName === "DIV")];

    gsap.timeline().from(spans, {
      autoAlpha: 0,
      stagger: 0.1,
    });
    // .from(
    //   ul.map((child) => child),
    //   {
    //     autoAlpha: 0,
    //     stagger: 0.1,
    //   }
    // );
  }, [content]);

  return (
    <div className={styles.serviceContainer} ref={ref}>
      <ServiceSection main={content.main} addRef={addRef} type="main" light />
      <ServiceSection main={content.aside} addRef={addRef} type="aside" light />
      <div className={styles.waveContainer}>
        <img src="images/wave-white.svg" alt="border" />
      </div>
    </div>
  );
};

export default ActiveService;
