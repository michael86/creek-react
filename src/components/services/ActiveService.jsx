import ServiceSection from "./ServiceSection";
import styles from "../../styles/Services.module.css";
import { useRef } from "react";
// useLayoutEffect;
// import gsap from "gsap";

const ActiveService = ({ content, addRef }) => {
  const ref = useRef();

  // useLayoutEffect(() => {
  //   if (!ref.current) return;
  //   const main = ref.current.children[0];
  //   const aside = ref.current.children[1];

  //   gsap
  //     .timeline()
  //     .from(main.children, {
  //       autoAlpha: 0,
  //       stagger: 0.1,
  //     })
  //     .from(aside.children, {
  //       autoAlpha: 0,
  //       stagger: 0.1,
  //     });
  // }, [content]);

  return (
    <div className={styles.serviceContainer} ref={ref}>
      <ServiceSection main={content.main} addRef={addRef} type="main" light />
      <ServiceSection main={content.aside} addRef={addRef} type="aside" light />
      <div className={styles.waveContainer}>
        <img src="images/wave-white.svg" alt="border" />
      </div>
    </div>
  );
};

export default ActiveService;
