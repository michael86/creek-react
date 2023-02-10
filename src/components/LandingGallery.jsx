import styles from "../styles/Landing.module.css";
import Global from "../styles/Global.module.css";
import gsap from "gsap";
import ScrollArrow from "../public/images/landing-scroll-arrow.svg";

import { useLayoutEffect, useRef, useState } from "react";

const cards = [
  {
    title: "PCB Fabrication",
    src: "https://ecitech.com/wp-content/uploads/2020/04/pcb_main.jpg",
    alt: "pcb fabrication as a service",
    id: `bg-img-${0}`,
    description:
      "Creekview Electronics is one of the few UK printed circuit board manufacturers to provide a complete electronic manufacturing service.",
  },
  {
    title: "PCB Assembly",
    src: "https://elitees.com/wp-content/uploads/2021/06/DSCF9318.jpg",
    alt: "pcb Assembly as a service",
    id: `bg-img-${1}`,
    description: `At Creekview Electronics, we provide our customers with reliable printed circuit board assembly solutions that achieve quality results at competitive prices. 
      We specialise in surface mount and through-hole PCB assembly, configured to meet the design, specification and volume of your project. With a multi-assembly setup, 
      we can manufacture different products simultaneously and our conventional PCB assembly capabilities enable us to manufacture single or double-sided, mixed technology PCBs.`,
  },
  {
    title: "Box Builds",
    src: "https://www.miracle.net.in/wp-content/uploads/2019/05/Outsourcing-A-Box-Build-Assembly-All-You-Need-To-Know.jpg",
    alt: "Box Builds as a service",
    id: `bg-img-${2}`,
    description:
      "Box build assembly uses all the skills & manufacturing expertise of Creekview, with the addition of completing your product to a finished item, ready to go",
  },
  {
    title: "PCB Design",
    src: "https://ecitech.com/wp-content/uploads/2020/04/pcb_main.jpg",
    alt: "pcb Design as a service",
    id: `bg-img-${3}`,
    description:
      "We can offer rapid 24-hour lead times on small batch productions, or for very large scale productions, we have international manufacturing partners",
  },
];

const LandingGallery = ({ tl }) => {
  const containerRef = useRef();
  const [gallIndex, setGallIndex] = useState(0);
  const cardRefs = useRef([]);
  const activeTl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl &&
        tl
          .fromTo(containerRef.current, { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo(".card-header-img", { x: -1000 }, { x: 0 })
          .fromTo("h2", { x: 1000 }, { x: 0 });
    }, containerRef);

    return () => ctx.revert();
  }, [tl]);

  const onClick = (current, target) => {
    if (activeTl.current && activeTl.current.isActive()) return;

    const newIndex =
      gallIndex + target < 0
        ? cards.length - 1
        : gallIndex + target > cards.length - 1
        ? 0
        : gallIndex + target;

    const currCard = cardRefs.current[current];
    const newCard = cardRefs.current[newIndex];

    gsap.context(() => {
      activeTl.current = gsap
        .timeline()
        .to("h2", { x: "-100%" }, 0)
        .to(`.card-header-img`, { autoAlpha: "0" }, 0)
        .to(`.card-content`, { y: "100%" }, 0)
        .to(currCard, { display: "none" });
    }, currCard);

    console.log(activeTl.current);
    gsap.context(() => {
      activeTl.currCard = gsap
        .timeline()
        .set(newCard, { display: "block" })
        .fromTo("h2", { x: "100%" }, { x: "0" }, 0)
        .fromTo(`.card-header-img`, { autoAlpha: "0" }, { autoAlpha: "1" }, 0)
        .fromTo(`.card-content`, { y: "100%" }, { y: "0" }, 0);
    }, newCard);

    setGallIndex(newIndex);
  };

  return (
    <div
      id="service-container"
      className={`${styles.servicesContainer} ${Global.mt2} ${Global.relative}`}
      ref={containerRef}
    >
      {cards.map((card, index) => {
        return (
          <div
            className={`${styles.serviceCard} ${Global.absolute}`}
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div
              className={`${styles.cardHeader} ${Global.relative} ${Global.flex} ${Global.justifyCenter} ${Global.alignCenter} card-header`}
            >
              <img
                src={ScrollArrow}
                className={`${styles.scrollButton} ${styles.scrollLeft} ${Global.absolute} scroll-btn`}
                alt="services scroll left"
                onClick={() => onClick(index, -1)}
              />
              <img
                src={card.src}
                alt={card.alt}
                className={`${Global.absolute} card-header-img`}
              />
              <h2>{card.title}</h2>
              <img
                src={ScrollArrow}
                className={`${styles.scrollButton} ${styles.scrollRight} ${Global.absolute} scroll-btn`}
                alt="services scroll right"
                onClick={() => onClick(index, 1)}
              />
            </div>
            <div className={`${styles.cardContent} card-content`}>
              <p>{card.description}</p>
              <div className={`${styles.btnContainer} ${Global.mt2}`}>
                <div className={`${styles.btn} ${styles.btnOne} btn`}>
                  <span>Read More</span>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <div className={`${styles.btn} ${styles.btnOne} btn`}>
                  <span>Enquire</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LandingGallery;
