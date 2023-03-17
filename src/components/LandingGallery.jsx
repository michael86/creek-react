import styles from "../styles/Landing.module.css";
import Global from "../styles/Global.module.css";
import gsap from "gsap";

import { useLayoutEffect, useRef, useState, useContext } from "react";
import Viewport from "../context/Viewport";

const cards = [
  {
    title: "PCB Assembly",
    srcMobile: "https://elitees.com/wp-content/uploads/2021/06/DSCF9318.jpg",
    srcDesktop: "/images/assembly-logo.webp",
    alt: "pcb Assembly as a service",
    id: `bg-img-${1}`,
    description: `At Creekview Electronics, we provide our customers with reliable printed circuit board assembly solutions that achieve quality results at competitive prices. 
      We specialise in surface mount and through-hole PCB assembly, configured to meet the design, specification and volume of your project. With a multi-assembly setup, 
      we can manufacture different products simultaneously and our conventional PCB assembly capabilities enable us to manufacture single or double-sided, mixed technology PCBs.`,
  },
  {
    title: "PCB Fabrication",
    srcDesktop: "images/fabrication-logo.webp",
    srcMobile: "https://ecitech.com/wp-content/uploads/2020/04/pcb_main.jpg",
    alt: "pcb fabrication as a service",
    id: `bg-img-${0}`,
    description:
      "Creekview Electronics is one of the few UK printed circuit board manufacturers to provide a complete electronic manufacturing service.",
  },
  {
    title: "Box Builds",
    srcDesktop: "images/box-build-logo.svg",
    srcMobile:
      "https://www.miracle.net.in/wp-content/uploads/2019/05/Outsourcing-A-Box-Build-Assembly-All-You-Need-To-Know.jpg",
    alt: "Box Builds as a service",
    id: `bg-img-${2}`,
    description:
      "Box build assembly uses all the skills & manufacturing expertise of Creekview, with the addition of completing your product to a finished item, ready to go",
  },
  {
    title: "PCB Design",
    srcDesktop: "images/design-logo.webp",
    srcMobile: "https://ecitech.com/wp-content/uploads/2020/04/pcb_main.jpg",
    alt: "pcb Design as a service",
    id: `bg-img-${3}`,
    description:
      "We can offer rapid 24-hour lead times on small batch productions, or for very large scale productions, we have international manufacturing partners",
  },
];

const LandingGallery = ({ mm }) => {
  const containerRef = useRef();
  const [gallIndex, setGallIndex] = useState(0);
  const cardRefs = useRef([]);
  const cardTimelines = useRef([]);
  const activeTl = useRef();
  const { width } = useContext(Viewport);

  useLayoutEffect(() => {
    if (!mm) return;

    const breakPoint = 991;

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop, reduceMotion } = context.conditions;

        if (reduceMotion) return;

        const tl = gsap.timeline().from(containerRef.current, { autoAlpha: 0 });

        !isDesktop && tl.from(".card-header-img", { x: -1000 }).from("h2", { x: 1000 });

        isDesktop &&
          tl
            .from(".service-card", { autoAlpha: 0, scale: 0, stagger: 0.2 }, 0)
            .from(".service-card h2", { y: 1000, stagger: 0.2 }, 1)
            .from(".service-card img", { scale: 0, rotate: 360, stagger: 0.2 }, 1)
            .fromTo(".btn", { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.2 }, 2);
      }
    );
  }, [mm]);

  //card hover anims
  useLayoutEffect(() => {
    cardRefs.current.forEach((card, index) => {
      cardTimelines.current[index] = gsap.context(() => {
        gsap
          .timeline({ paused: true })
          .to("h2", { repeat: -1, yoyo: true, scale: 1.2, duration: 1 }, 0)
          .to("img", { repeat: -1, yoyo: true, scale: 1.2, duration: 1 }, 0);
      }, card);
    });
  }, []);

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

  const onMouseEnter = (target) => {
    if (width < 992) return;

    cardTimelines.current[target].data[0].play();
  };

  const onMouseLeave = (target) => {
    if (width < 992) return;
    cardTimelines.current[target].data[0].pause();
  };

  return (
    <>
      <div
        id="service-container"
        className={`${styles.servicesContainer} ${Global.relative}`}
        ref={containerRef}
      >
        {cards.map((card, index) => {
          return (
            <div
              className={`${styles.serviceCard} service-card`}
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={() => onMouseLeave(index)}
                className={`${styles.cardHeader} ${Global.relative} ${Global.flex} ${Global.justifyCenter} ${Global.alignCenter} card-header`}
              >
                <img
                  src="images/landing-scroll-arrow.svg"
                  className={`${styles.scrollButton} ${styles.scrollLeft} ${Global.absolute} scroll-btn`}
                  alt="services scroll left"
                  onClick={() => onClick(index, -1)}
                />

                <h2>{card.title}</h2>
                <img
                  src={width < 992 ? card.srcMobile : card.srcDesktop}
                  alt={card.alt}
                  className={`${width < 992 && Global.absolute} ${
                    styles.mobileImage
                  } card-header-img`}
                />

                <img
                  src="images/landing-scroll-arrow.svg"
                  className={`${styles.scrollButton} ${styles.scrollRight} ${Global.absolute} scroll-btn`}
                  alt="services scroll right"
                  onClick={() => onClick(index, 1)}
                />
              </div>
              <div className={`${styles.cardContent} card-content`}>
                <div className={styles.elipsisContainer}>
                  <p>{card.description}</p>
                </div>
                <div className={`${Global.mt2}`}>
                  <div className={`${styles.btn} ${styles.btnOne} btn`}>
                    <span>Read More</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LandingGallery;
