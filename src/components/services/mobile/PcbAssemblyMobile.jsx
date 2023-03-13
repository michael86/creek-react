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

    console.log("mainRef", mainRef);

    console.log("asideRef", asideRef);
    const main = mainRef.current;
    const aside = asideRef.current;

    gsap.context(() => {
      btnTimeline.current = gsap
        .timeline({ paused: true })
        .set(main, { clearProps: "all" })
        .set(aside, { clearProps: "all" })
        .to(main, { x: "-100%" })
        .fromTo(aside, { autoAlpha: 0, x: 500 }, { height: "auto", autoAlpha: 1, x: "-100%" }, 0);

      timeline.current = gsap.timeline().from(main.children, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 40%",
          scrub: true,
        },
        scale: 0,
        autoAlpha: 0,
        stagger: 0.2,
        y: 100,
      });
    }, ref.current);
  }, [content]);

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
