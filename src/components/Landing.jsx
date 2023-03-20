import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Landing.module.css";
import useContent from "../hooks/useContent";

import LandingGallery from "./LandingGallery";
import LandingTitle from "./LandingTitle";

const Landing = ({ addRef }) => {
  const [content] = useContent("landing");
  const containerRef = useRef();

  const [mm] = useState(gsap.matchMedia());

  useEffect(() => {
    addRef(containerRef);
  }, []);

  return (
    <>
      <section className={styles.landing} ref={containerRef} id="landing">
        <LandingTitle content={content} mm={mm} />
        <LandingGallery mm={mm} />
      </section>
    </>
  );
};

export default Landing;
