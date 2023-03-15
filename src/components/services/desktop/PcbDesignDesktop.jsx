import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import styles from "../../../styles/Services.module.css";
import PcbDesignBg from "../PcbDesignBg";

const PcbDesignDesktop = ({ content, onClick, active }) => {
  const ref = useRef();
  const leftSide = useRef();
  const topSide = useRef();
  const rightSide = useRef();
  const bottomSide = useRef();
  const [tl, setTl] = useState();
  const splitString = (string) => string.split("");

  //head animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const svg = ref.current.children[5];
      const head = svg.children[1];
      const traces = svg.children[2].children;

      const headers = [...ref.current.children]
        .slice(6)
        .map((header) => header)
        .map((header) => header.children)
        .flat();

      const tl = gsap
        .timeline()
        .from(head, {
          y: "500px",
          autoAlpha: 0,
        })
        .from(traces, {
          scale: 0,
          autoAlpha: 0,
        })
        .from(headers[0], { autoAlpha: 0, stagger: 0.1 }, 1)
        .from(headers[1], { autoAlpha: 0, stagger: 0.1 }, 1)
        .from(headers[2], { autoAlpha: 0, stagger: 0.1 }, 1);

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 75%",
        toggleActions: "play none none none",
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const bgColor = "rgb(36, 131, 209)";
      const timeline = gsap
        .timeline({
          paused: true,
        })
        .from(
          topSide.current,
          {
            width: 0,
            immediateRender: false,
            autoRound: false,
            ease: "easeInOut",
          },
          0
        )
        .from(
          rightSide.current,
          {
            height: 0,

            immediateRender: false,
            autoRound: false,
            ease: "easeInOut",
          },
          0
        )
        .from(
          bottomSide.current,
          {
            width: 0,

            immediateRender: false,
            autoRound: false,
            ease: "easeInOut",
          },
          0
        )
        .from(
          leftSide.current,
          {
            height: 0,

            immediateRender: false,
            autoRound: false,
            ease: "easeInOut",
          },
          0
        );

      setTl(timeline);
    }, ref.current);

    return () => ctx.revert;
  }, []);

  const playAnim = () => {
    if (!tl) return;
    tl.play(0);
  };

  return (
    <>
      {!content && <div>loading</div>}
      {content && (
        <>
          <div
            data-active={active && active}
            className={`${styles.cardTitle} ${styles.pcbDesign}`}
            ref={ref}
            onClick={() => {
              playAnim();
              onClick(content.id);
            }}
          >
            <span data-active={active} ref={leftSide} className={styles.leftSide}></span>
            <span data-active={active} ref={topSide} className={styles.topSide}></span>
            <span data-active={active} ref={rightSide} className={styles.rightSide}></span>
            <span data-active={active} ref={bottomSide} className={styles.bottomSide}></span>
            <h2 className={`${styles.sectionTitle} `}>{content.title}</h2>
            <PcbDesignBg />
            <h3>
              {splitString("Creative Design Strategies").map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </h3>
            <h3>
              {splitString("Comprehensive Solutions").map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </h3>
            <h3>
              {splitString("3D Engineering").map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </h3>
          </div>
        </>
      )}
    </>
  );
};

export default PcbDesignDesktop;
