import gsap from "gsap";
import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import Viewport from "../context/Viewport";
import SiteLogo from "../public/images/creekview-logo.svg";
import styles from "../styles/Landing.module.css";
import Global from "../styles/Global.module.css";

import LandingGallery from "./LandingGallery";

const Landing = () => {
  const containerRef = useRef();
  const logoRef = useRef();

  const [tl, setTl] = useState();
  const { width } = useContext(Viewport);
  const mobile = width <= 1024;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline()
        .from("#site-logo", {
          scale: 1.5,
          y: -300,
          autoAlpha: 0,
        })
        .from("h1", { autoAlpha: 0, y: 30 });
      setTl(tl);
    });
    return () => ctx.revert();
  }, [mobile]);

  return (
    <>
      <section
        className={`${[
          Global.flex,
          Global.alignCenter,
          Global.relative,
          styles.landing,
          mobile && Global.flexCol,
          !mobile && Global.justifyCenter,
        ].join(" ")}`}
        ref={containerRef}
        id="landing"
      >
        <img
          src={SiteLogo}
          className={`${styles.siteLogo} ${Global.mt2}`}
          alt="Creekview Electronics Logo"
          id="site-logo"
          ref={logoRef}
        />
        <div className={`${Global.mt2}`}>
          <h1>Global PCB Specialists</h1>
        </div>
        <LandingGallery tl={tl} />
      </section>
    </>
  );
};

export default Landing;
