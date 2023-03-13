import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "../../styles/Services.module.css";

const ServiceButton = ({ index, toggleSectionAside }) => {
  const [btnText, setBtnText] = useState("Read More");
  const ref = useRef();
  const tl = useRef();
  useLayoutEffect(() => {
    const spans = ref.current.children;

    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(
          spans,
          {
            translateY: 0,
            scale: 2,
            stagger: 0.1,
          },
          0
        )
        .to(
          ref.current,
          {
            autoAlpha: 0.9,
            duration: 0.7,
            onComplete: () => {
              setTimeout(() => setBtnText("Back"), 1000);
            },
            onReverseComplete: () => {
              setBtnText("Read More");
            },
          },
          0
        )
        .to(ref.current, {
          autoAlpha: 1,
        })
        .to(spans, {
          translateY: "150%",

          stagger: 0.1,
        });
    }, ref);

    return () => ctx.revert();
  }, []);

  const onClick = () => {
    btnText === "Read More" ? tl.current.play() : tl.current.reverse();

    toggleSectionAside(index);
  };

  return (
    <button
      className={`${styles.serviceBtn} ${
        index % 2 === 0 ? styles.btnPrimary : styles.btnSecondary
      }`}
      onClick={onClick}
      ref={ref}
    >
      {btnText}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default ServiceButton;
