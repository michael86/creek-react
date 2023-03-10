import { useContext, useRef, useLayoutEffect, useState } from "react";
import ServiceButton from "./ServiceButton";
import ServiceSection from "./ServiceSection";
import styles from "../styles/Services.module.css";
import Viewport from "../context/Viewport";
import gsap from "gsap";
import PcbDesignBg from "./PcbDesignBg";
import ScrollTrigger from "gsap/ScrollTrigger";
import PcbDesignDots from "./PcbDesignDots";

const service = {
  title: "PCB Design",
  id: "design",
  main: [
    {
      type: "text",
      content: [
        "With extensive experience in a wide variety of industries and systems, Creekview Electronics can provide you with a complete electronics solution. From refining a concept to production of the final product, we work together with our customers at every step, to achieve successful results.",
        "Our aim is to deliver your project on time and to within your budget, and to ultimately surpass your expectations. Feasibility studies may first be undertaken to ensure that your project is viable both in engineering and economic terms. We then utilise creative design strategies to reduce costs wherever possible, and employ technical experts to support, refine and direct your project to completion.",
        "We offer a comprehensive range of design solutions including rapid prototyping for full 3D visual and engineering validation. We can also convert 2D drawings or reverse engineer parts into fully interactive 3D CAD models. These systems enable us to apply design for manufacture techniques throughout the project, ensuring that the product is optimised for the correct manufacturing and assembly process. This facilitates expert analysis of a product during the design process, where we can check parts and assemblies, and detect interference long before prototyping and manufacturing. This saves our customers time and money.",
      ],
    },
  ],
  aside: [
    { type: "title", content: "Technical Specifications" },
    {
      type: "text",
      content:
        "We typically start from your general description or initial concept, undertake a feasibility study, produce a functional specification, circuit design and hardware development, software and firmware development, PCB layout and housing thought to pre-production or prototype uild and finally production. Our extensive experience covers all typesof embedded systems using microcontroller designs, including, ECG monitoring, RFID applications, CNC control, balanced battery chargers, monitoring and control systems and medical devices.",
    },
    { type: "title", content: "Incorporated Systems" },
    {
      type: "list",
      content: [
        "PIC & Microcontrollers",
        "Microprocessors",
        "Digital embedded controls",
        "Ethernet & USB",
        "Wireless & Bluetooth",
        "Battery & mains capability",
        "Serial communications",
        "Signal processing with 8 bit, 16 bit or 32 bit",
      ],
    },

    { type: "title", content: "Design Services" },
    {
      type: "list",
      content: [
        "Circuit design - analogue & digital",
        "PCB & Enclosure design",
        "3D concept design",
        "Interactive 3D CAD models",
        "2D drawings",
        "Reverse engineering",
        "Simulation",
      ],
    },
  ],
};

const PcbDesign = () => {
  const { width } = useContext(Viewport);
  const timeline = useRef();
  const ref = useRef();
  const mainRef = useRef();
  const asideRef = useRef();
  const headRef = useRef();
  const btnTimeline = useRef();

  const toggleSectionAside = () => {
    if (btnTimeline.current)
      !btnTimeline.current.progress() ? btnTimeline.current.play() : btnTimeline.current.reverse();
  };

  const addRef = (el, type) => {
    type === "main" ? (mainRef.current = el) : (asideRef.current = el);
  };

  //head animation
  useLayoutEffect(() => {
    if (width < 992) {
      return;
    }

    const ctx = gsap.context(() => {
      const head = headRef.current.children[0];

      const traces = headRef.current.children[0].children[2].children;
      const paragraphs = [...mainRef.current.children, asideRef.current.children[0]];
      const headers = [...headRef.current.children]
        .slice(1)
        .map((header) => header.children)
        .flat();
      console.log(headers.flat());
      const tl = gsap
        .timeline()
        .set(head, {
          x: "50%",
          y: "25%",
          scale: 1.5,
        })
        .set([headers], { scale: 0, autoAlpha: 0, y: 100 })
        .set([...paragraphs, asideRef.current], { autoAlpha: 0 })
        .from(head, { autoAlpha: 0 })
        .from(traces, {
          scale: 0,
          autoAlpha: 0,

          duration: 1,
          y: 100,
        })
        .to(head, {
          x: 0,
          y: 0,
          scale: 1,
          onComplete: () => {
            gsap.set(head, { clearProps: "all" });
          },
        })
        .to(asideRef.current, {
          autoAlpha: 1,
          onComplete: () => {
            gsap.set(asideRef.current, {
              clearProps: "all",
            });
          },
        })
        .to(paragraphs, {
          autoAlpha: 1,
          stagger: 0.2,
          onComplete: () => {
            gsap.set(paragraphs, {
              clearProps: "all",
            });
          },
        })
        .to(
          headers[0],
          {
            scale: 1,
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            onComplete: () => {
              gsap.set(headers[0], {
                clearProps: "all",
              });
            },
          },
          1
        )
        .to(
          headers[1],
          {
            scale: 1,
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            onComplete: () => {
              gsap.set(headers[1], {
                clearProps: "all",
              });
            },
          },
          1
        )
        .to(
          headers[2],
          {
            scale: 1,
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            onComplete: () => {
              gsap.set(headers[2], {
                clearProps: "all",
              });
            },
          },
          1
        );

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, [width]);

  //main/aside triggers
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const main = mainRef.current;
    const aside = asideRef.current;

    gsap.context(() => {
      mm.add("(max-width: 991px)", () => {
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
      });

      mm.add("(min-width: 992px)", () => {
        gsap.set(main, { clearProps: "all" });
        gsap.set(aside, { clearProps: "all" });
      });
    }, ref.current);
  }, []);

  const splitString = (string) => string.split("");

  return (
    <section
      className={`${styles.serviceSection} ${styles.pcbDesignContainer}`}
      id={service.id}
      ref={ref}
    >
      <h2 className={`${styles.sectionTitle} `}>{service.title}</h2>

      {width >= 992 && (
        <div ref={headRef} className={styles.dotsContainer}>
          <PcbDesignBg />
          <h3>
            {splitString("Creative Design Strategies").map((letter) => (
              <span>{letter}</span>
            ))}
          </h3>
          <h3>
            {splitString("Comprehensive Solutions").map((letter) => (
              <span>{letter}</span>
            ))}
          </h3>
          <h3>
            {splitString("3D Engineering").map((letter) => (
              <span>{letter}</span>
            ))}
          </h3>
        </div>
      )}

      <div className={styles.serviceContainer}>
        <ServiceSection main={service.main} addRef={addRef} type="main" light />
        <ServiceSection main={service.aside} addRef={addRef} type="aside" light />
      </div>

      {width < 992 && <ServiceButton toggleSectionAside={toggleSectionAside} />}

      {width >= 991 && <PcbDesignDots />}
    </section>
  );
};

export default PcbDesign;
