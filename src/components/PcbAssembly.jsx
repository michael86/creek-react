import { useContext, useRef, useLayoutEffect } from "react";
import ServiceButton from "./ServiceButton";
import ServiceSection from "./ServiceSection";
import styles from "../styles/Services.module.css";
import Viewport from "../context/Viewport";
import gsap from "gsap";

const service = {
  title: "PCB Assembly",
  id: "assembly",
  main: [
    {
      type: "text",
      content: [
        "At Creekview Electronics, we provide our customers with reliable printed circuit board assembly solutions that achieve quality results at competitive prices. We specialise in surface mount and through-hole PCB assembly, configured to meet the design, specification and volume of your project.",
        "With a multi-assembly setup, we can manufacture different products simultaneously and our conventional PCB assembly capabilities enable us to manufacture single or double-sided, mixed technology PCBs. We have recently invested heavily into our surface mount technology, which now includes a Europlacer speed print automated stencil printer and Europlacer iineo II SMT machine.",
        "One of our three SMD placement machines is installed as high capacity automatic SMD placement, with several quick slot-in carts that allow us to switch setup quickly. This facilitates our extensive production capacity and ensures that we can consistently deliver high standards to our customers. Our through-hole facility is well-equipped, with skilled IPC trained operators to populate and solder components to boards. We can also provide automated placement of micro-BGA parts, giving us the flexibility to accommodate your requirements for each project.",
      ],
    },
  ],
  aside: [
    { type: "title", content: "Consistent Quality" },
    {
      type: "text",
      content:
        "Our components are sourced from around the world to ensure that we can provide high quality, cost-effective solutions to our customers. Traceability is a crucial element of this and a key requirement in our procurement process. We look meticulously at each component to determine the part that is used and then establish the manufacturer.",
    },
    {
      type: "text",
      content:
        "Each PCB is inspected using our state of the art automated optical inspection system to ensure that they are defect free before being released for the next stage of the product build. Fault finding can then be carried out to component level. We have experience in testing for many disciplines including analogue and digital systems.",
    },
    {
      type: "text",
      content:
        "We provide small to high volume PCB assembly production batches, with high quality rapid manufacturing to give our customers short lead times and timely deliveries. Our flexible assembly capabilities also enable us manufacture prototypes at speed.",
    },
    {
      type: "text",
      content:
        "As we manufacture our own PCBs, we can ensure that each individual PCB is tooled with the optimum step and repeat, breakout tabs and fiducials to suit our assembly. This allows us to achieve the lowest possible production costs. Learn more about our PCB fabrication here.",
    },
    { type: "title", content: "End-To-End Reliability" },
    {
      type: "list",
      content: [
        "Europlacer iineo pick and place machine",
        "Europlacer EP710 paste machine",
        "Multitroniks DHM-120",
        "Multitroniks SHM-120",
        "BTU-VIP-70 Lead-free PCB oven",
        "Extra Eye first article inspection system",
      ],
    },

    { type: "title", content: "Conventional Assembly" },
    {
      type: "list",
      content: [
        "Hand assembly & soldering on single/double sided conventional PCBs & SMT PCBs",
        "Lead-free assembly as standard",
        "JVC Digital Camera",
        "IPC-A610-C acceptability standard",
      ],
    },

    { type: "title", content: "Cable Assembly" },
    {
      type: "list",
      content: [
        "Wire loom assembly onto fabricated metal panels",
        "Bespoke cable assemblies",
        "KOMAX 210 cut and strip",
        "GLW EC65 electric crimp tools",
        "IPC-A610-C acceptability standard",
        "Single wire preparation",
      ],
    },

    { type: "title", content: "Mechanical Assembly" },
    {
      type: "list",
      content: [
        "Cabinet build",
        "Nearby engineering facility",
        "Nearby metal fabrication supplier",
        "Assembly of boxed products",
        "ICP-A610-C acceptability standard",
      ],
    },

    { type: "title", content: "Testing" },
    {
      type: "list",
      content: [
        "Testing of conventional and SMT PCBs to test procedures",
        "Using DVM scopes and PIC programs",
        "Fault finding to component level",
      ],
    },
  ],
};

const PcbAssembly = () => {
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
    <section className={`${styles.serviceSection}`} id={service.id} ref={ref}>
      <h2 className={`${styles.sectionTitle} `}>{service.title}</h2>

      <div className={styles.serviceContainer}>
        <ServiceSection main={service.main} light />
        <ServiceSection main={service.aside} light />
      </div>

      {width < 992 && <ServiceButton toggleSectionAside={toggleSectionAside} />}
    </section>
  );
};

export default PcbAssembly;
