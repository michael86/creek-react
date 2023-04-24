import { useContext, useLayoutEffect } from "react";
import gsap from "gsap";
import ServiceSection from "../ServiceSection";
import ServiceButton from "../ServiceButton";
import styles from "../../../styles/Services.module.css";
import { useRef } from "react";
import Viewport from "../../../context/Viewport";

const PcbDesignMobile = ({ content }) => {
  const ref = useRef();
  const mainRef = useRef();
  const asideRef = useRef();
  const btnTimeline = useRef();

  const { width } = useContext(Viewport);

  const toggleSectionAside = () => {
    if (btnTimeline.current)
      !btnTimeline.current.progress() ? btnTimeline.current.play() : btnTimeline.current.reverse();
  };

  const addRef = (el, type) => {
    type === "main" ? (mainRef.current = el) : (asideRef.current = el);
  };

  //main/aside triggers
  useLayoutEffect(() => {
    if (!mainRef.current || !asideRef.current) return;

    const main = mainRef.current;
    const aside = asideRef.current;

    gsap.context(() => {
      btnTimeline.current = gsap
        .timeline({ paused: true })
        .set(main, { clearProps: "all" })
        .set(aside, { clearProps: "all" })
        .to(main, { x: "-100%" })
        .fromTo(aside, { autoAlpha: 0, x: 500 }, { height: "auto", autoAlpha: 1, x: "-100%" }, 0);
    });
  }, [content]);

  //Paragraphs
  useLayoutEffect(() => {
    if (!content) return;

    let mm = gsap.matchMedia(),
      breakPoint = 991;

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { reduceMotion, isMobile } = context.conditions;
        const paragraphs = mainRef.current.children;

        if (reduceMotion || !isMobile) return;

        gsap.set(paragraphs, {
          display: "inline-block",
          onComplete: () => {},
        });
        gsap.from(paragraphs, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 30%",
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

  return (
    <>
      {!content && <p>loading</p>}
      {content && (
        <section
          className={`${styles.serviceSection} ${styles.pcbDesignContainer}`}
          id={content.id}
          ref={ref}
        >
          <h2 className={`${styles.sectionTitle} `}>{content.title}</h2>

          <div className={styles.serviceContainer}>
            <ServiceSection main={content.main} addRef={addRef} type="main" light />
            <ServiceSection main={content.aside} addRef={addRef} type="aside" light />
          </div>

          <ServiceButton toggleSectionAside={toggleSectionAside} />
        </section>
      )}
    </>
  );
};

export default PcbDesignMobile;
