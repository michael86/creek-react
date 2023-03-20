import { useLayoutEffect } from "react";
import gsap from "gsap";
import ServiceSection from "../ServiceSection";
import ServiceButton from "../ServiceButton";
import styles from "../../../styles/Services.module.css";
import { useRef } from "react";

const PcbAssemblyMobile = ({ content }) => {
  const ref = useRef();
  const mainRef = useRef();
  const asideRef = useRef();
  const btnTimeline = useRef();
  const timeline = useRef();

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
        .to(main, { x: -400 })
        .fromTo(aside, { autoAlpha: 0, x: 500 }, { height: "auto", autoAlpha: 1, x: "-100%" }, 0);
    });
  }, [content]);

  //Paragraphs
  useLayoutEffect(() => {
    const paragraphs = mainRef.current.children;
    const ctx = gsap.context(() => {
      [...paragraphs].forEach((sentence) => {
        if (!sentence.children.length) return;
        timeline.current = gsap.from(sentence.children, {
          scrollTrigger: {
            trigger: sentence,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
          stagger: 0.2,
          autoAlpha: 0,
          scale: 0,
          y: 100,
        });
      });
    }, ref.current);

    return () => ctx.revert();
  }, []);

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

export default PcbAssemblyMobile;
