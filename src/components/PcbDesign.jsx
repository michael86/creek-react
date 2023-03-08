import { useContext, useRef, useLayoutEffect } from "react";
import ServiceButton from "./ServiceButton";
import ServiceSection from "./ServiceSection";
import styles from "../styles/Services.module.css";
import Viewport from "../context/Viewport";
import gsap from "gsap";
import PcbDesignBg from "./PcbDesignBg";
// import dots from "../public/images/dots.svg";

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
        "We typically start from your general description or initial concept, undertake a feasibility study, produce a functional specification, circuit design and hardware development, software and firmware development, PCB layout and housing thought to pre-production or prototype build and finally production. Our extensive experience covers all types of embedded systems using microcontroller designs, including, ECG monitoring, RFID applications, CNC control, balanced battery chargers, monitoring and control systems and medical devices.",
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

      const head = ref.current.children[3].children[0].children[1];
      const traces = ref.current.children[3].children[0].children[2].children;

      gsap
        .timeline()
        .fromTo(head, { autoAlpha: 0 }, { autoAlpha: 1 })
        .fromTo(traces, { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.2 });
    }, ref.current);
  }, []);

  return (
    <section className={`${styles.serviceSection}`} id={service.id} ref={ref}>
      <h2 className={`${styles.sectionTitle} `}>{service.title}</h2>

      <div className={styles.serviceContainer}>
        <ServiceSection main={service.main} light />
        <ServiceSection main={service.aside} light />
      </div>

      {width < 992 && <ServiceButton toggleSectionAside={toggleSectionAside} />}
      <div className={styles.dotsContainer}>
        <PcbDesignBg />
      </div>
    </section>
  );
};

export default PcbDesign;
