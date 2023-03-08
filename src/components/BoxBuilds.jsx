import { useContext, useRef, useLayoutEffect } from "react";
import ServiceButton from "./ServiceButton";
import ServiceSection from "./ServiceSection";
import styles from "../styles/Services.module.css";
import Viewport from "../context/Viewport";
import gsap from "gsap";

const service = {
  title: "Box Builds",
  id: "box-build",
  main: [
    {
      type: "text",
      content: [
        'Box build assembly uses all the skills & manufacturing expertise of Creekview, with the addition of completing your product to a finished item, ready to go on your shelf or straight to your end customer, we cover it Having the "full package" will give you the peace of mind it\'s all in one place, with one point contact.',
        "If we have made it , we will guarantee our workmanship. Please contact us with your full spec to take full advantage of our turnkey facility.",
      ],
    },
  ],
  aside: [{ type: "gallery", content: ["img"] }],
};

const BoxBuilds = () => {
  const { width } = useContext(Viewport);
  const timeline = useRef();
  const ref = useRef();

  const btnTimeline = useRef();

  const toggleSectionAside = () => {
    if (btnTimeline.current)
      !btnTimeline.current.progress()
        ? btnTimeline.current.play()
        : btnTimeline.current.reverse();
  };

  useLayoutEffect(() => {
    const main = ref.current.children[1].children[0];
    const aside = ref.current.children[1].children[1];

    const mm = gsap.matchMedia();

    gsap.context(() => {
      mm.add("(max-width: 991px)", () => {
        btnTimeline.current = gsap
          .timeline({ paused: true })
          .fromTo(main, { height: "auto" }, { x: -500, autoAlpha: 0 }, 0)
          .fromTo(
            aside,
            { autoAlpha: 0, x: 500 },
            { height: "auto", autoAlpha: 1, x: "-100%" },
            0
          );

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
      });
      mm.add("(min-width: 992px)", () => {
        timeline.current = gsap
          .timeline()
          .set(main, { height: "auto" }) //Set height to auto incase of a viewport resize
          .set(aside, { height: "auto" }) //Set height to auto incase of a viewport resize
          .from(main, {
            scrollTrigger: {
              trigger: ref.current,
              start: "top 95%",
              end: "top top",
              scrub: true,
            },
            scale: 0,
            autoAlpha: 0,
            stagger: 0.2,
            y: 100,
          })
          .from(aside, {
            scrollTrigger: {
              trigger: ref.current,
              start: "top 95%",
              end: "top top",
              scrub: true,
            },
            scale: 0,
            autoAlpha: 0,
            stagger: 0.2,
            y: 100,
          });
      });
    }, ref.current);
  }, []);

  return (
    <section
      className={`${styles.serviceSection} ${styles.bgPrimary}`}
      id={service.id}
      ref={ref}
    >
      <h2 className={`${styles.sectionTitle} `}>{service.title}</h2>

      <div className={styles.serviceContainer}>
        <ServiceSection main={service.main} />
        <ServiceSection main={service.aside} />
      </div>

      {width < 992 && <ServiceButton toggleSectionAside={toggleSectionAside} />}
    </section>
  );
};

export default BoxBuilds;
