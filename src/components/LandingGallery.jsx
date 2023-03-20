import styles from "../styles/Landing.module.css";
import Global from "../styles/Global.module.css";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import { useLayoutEffect, useRef, useState, useContext } from "react";
import Viewport from "../context/Viewport";
import useContent from "../hooks/useContent";

gsap.registerPlugin(ScrollToPlugin);

const LandingGallery = ({ mm, setActiveContent }) => {
  const containerRef = useRef();
  const [gallIndex, setGallIndex] = useState(0);
  const cardRefs = useRef([]);
  const cardTimelines = useRef([]);
  const activeTl = useRef();
  const { width } = useContext(Viewport);
  const [content] = useContent("landing");

  useLayoutEffect(() => {
    if (!content || !mm) return;

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
  }, [mm, content]);

  //card hover anims
  useLayoutEffect(() => {
    if (!content) return;
    cardRefs.current.forEach((card, index) => {
      cardTimelines.current[index] = gsap.context(() => {
        gsap
          .timeline({ paused: true })
          .to("h2", { repeat: -1, yoyo: true, scale: 1.2, duration: 1 }, 0)
          .to("img", { repeat: -1, yoyo: true, scale: 1.2, duration: 1 }, 0);
      }, card);
    });
  }, [content]);

  const onClick = (current, target) => {
    if (activeTl.current && activeTl.current.isActive()) return;

    const newIndex =
      gallIndex + target < 0
        ? content.landingCards.length - 1
        : gallIndex + target > content.landingCards.length - 1
        ? 0
        : gallIndex + target;

    const currCard = cardRefs.current[current];
    const newCard = cardRefs.current[newIndex];

    const mm = gsap.matchMedia(),
      breakPoint = 991;

    mm.add(
      {
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        console.log("isMobile", isMobile);
        gsap.context(() => {
          activeTl.current = gsap
            .timeline()
            .to("h2", { x: isMobile && "-100%" }, 0)
            .to(`.card-header-img`, { autoAlpha: isMobile && "0" }, 0)
            .to(`.card-content`, { y: isMobile && "100%" }, 0);
        }, currCard);

        gsap.context(() => {
          activeTl.currCard = gsap
            .timeline()
            .set(newCard, { display: isMobile && "block" })
            .fromTo("h2", { x: isMobile && "100%" }, { x: isMobile && "0" }, 0)
            .fromTo(
              `.card-header-img`,
              { autoAlpha: isMobile && "0" },
              { autoAlpha: isMobile && "1" },
              0
            )
            .fromTo(`.card-content`, { y: isMobile && "100%" }, { y: isMobile && "0" }, 0);
        }, newCard);
      }
    );

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

  const scrollTo = (id) => {
    setActiveContent(id);
    gsap.to(window, { scrollTo: width >= 991 ? "#services" : `#${id}` });
  };

  return (
    <>
      {!content && <h3>Loading</h3>}
      {content && (
        <div
          id="service-container"
          className={`${styles.servicesContainer} ${Global.relative}`}
          ref={containerRef}
        >
          {content.landingCards.map((card, index) => {
            return (
              <div
                className={`${styles.serviceCard} service-card`}
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => width >= 991 && scrollTo(card.id)}
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
                    <div
                      className={`${styles.btn} ${styles.btnOne} btn`}
                      onClick={() => {
                        width < 991 && scrollTo(card.id);
                      }}
                    >
                      <span>Read More</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default LandingGallery;
