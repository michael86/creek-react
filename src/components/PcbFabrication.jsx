import { useContext, useRef, useLayoutEffect } from "react";
import ServiceButton from "./ServiceButton";
import ServiceSection from "./ServiceSection";
import styles from "../styles/Services.module.css";
import Viewport from "../context/Viewport";
import gsap from "gsap";

const service = {
  title: "PCB Fabrication",
  id: "fabrication",
  main: [
    {
      type: "text",
      content: [
        "Our customers can take advantage of our comprehensive range of design services for different types of printed circuit board, including: single sided PCBs, double sided conventional PCBs, plated through-hole PCBs, multilayer PCBs.",
        "With over 48-years experience in PCB fabrication, we have used our expertise to continually refine our processes. And meticulous management of our entire manufacturing system ensures that only one tooling charge will be applied. This guarantees our customers high quality products at competitive prices. We can offer rapid 24-hour lead times on small batch productions, or for very large scale productions, we have international manufacturing partners that can be utilised.",
        "The speed at which we deliver your products is always based upon your requirements and you are guaranteed to receive the same high quality standards on every product. Quality testing is carried out at our UK headquarters, with strict standards which must be met. Creek View Electronics has visited its international suppliers to ensure that processes are worked within globally recognised work ethics, without compromising on quality.",
      ],
    },
  ],
  aside: [
    {
      type: "list",
      content: [
        "Maximum active PCB size: 900 mm x 900 mm",
        "Materials: High Tg Fr4, Standard Tg Fr4 & Rogers, Polyimide, PTFE",
        "Solder resists: Liquid photo-imageable, colours: green, red, blue, black, white, silver grey",
        "Legend inks: all colours including white standard and yellow",
        "Multi-layer: layer counts from 1 to 12 layers",
        "PCB thicknesses from 0.2mm to 3.2 mm",
        "Copper weights: 1/2 oz to 3 oz, 17.5µm to 105µm",
        "PCB finishes: - Hot air solder level both lead-free and leaded: immersion silver or immersion gold over electroless nickel",
        "Min track and gap: 0.1 mm on 1/2 oz copper start, 0.15 mm on 1 oz copper start, 0.2 mm on 2 oz copper start",
        "Smallest drill at size: 0.2mm Smallest recommended drill size: 0.3mm",
        "Minimum solder resist to copper clearance: 0.1 mm",
        "Maximum plated hole depth to diameter aspect ratio on a 1.6 mm thick PCB is 6:1",
        "Mechanical: edge chamfering, counter-sinking, counter-boring, routing, scoring all available",
      ],
    },
    {
      type: "title",
      content: "Electrical Test Specifications",
    },
    {
      type: "list",
      content: [
        "Test area: 610 x 500 mm",
        "Number of probes: 2 front, 2 rear",
        "Minimum board size: 76 x 76 mm",
        "Maximum board thickness for clamping: 6 mm",
        "Repeatable accuracy: +/- 10 µm",
        "Resolution: 6µm",
        "Minimum pad pitch: 180µm",
        "Test voltage of resistance measurement continuity test: 0-10V",
        "Isolation test: 250V",
        "Test current of resistance measurement continuity test: 2.65µA-150mA",
      ],
    },
  ],
};

const PcbFabrication = () => {
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
            start: "top 50%",
            end: "top top",
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
          .from(main.children, {
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
          .from(aside.children, {
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
    <section className={`${styles.serviceSection}`} id={service.id} ref={ref}>
      <h2 className={`${styles.sectionTitle} `}>{service.title}</h2>

      <div className={styles.serviceContainer}>
        <ServiceSection main={service.main} />
        <ServiceSection main={service.aside} />
      </div>

      {width < 992 && <ServiceButton toggleSectionAside={toggleSectionAside} />}
    </section>
  );
};

export default PcbFabrication;
