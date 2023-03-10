import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import styles from "../../../styles/Services.module.css";
import PcbDesignBg from "../PcbDesignBg";

const BoxBuildDesktop = ({ content, onClick, active }) => {
  const splitString = (string) => string.split("");
  const ref = useRef();
  const asideRef = useRef();

  //head animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return;

      const head = ref.current.children[0];

      const traces = head.children[0];
      const paragraphs = [];

      const headers = [...ref.current.children]
        .slice(1)
        .map((header) => header)
        .flat();

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
        .to(asideRef, {
          autoAlpha: 1,
          onComplete: () => {
            gsap.set(asideRef, {
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
  }, [content]);

  return (
    <>
      {!content && <div>loading</div>}
      {content && (
        <>
          <div
            data-active={active && active}
            className={styles.cardTitle}
            onClick={() => onClick(content.id)}
          >
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

          {/* <div className={styles.serviceContainer}>
            <ServiceSection main={content.main} addRef={addRef} type="main" light />
            <ServiceSection main={content.aside} addRef={addRef} type="aside" light />
          </div> */}
        </>
      )}
    </>
  );
};

export default BoxBuildDesktop;
