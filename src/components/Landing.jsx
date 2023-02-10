import React, {
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import Viewport from "../context/Viewport";
import SiteLogo from "../public/images/creekview-logo.svg";
import styles from "../styles/Landing.module.css";
import Global from "../styles/Global.module.css";

import gsap from "gsap";
import LandingGallery from "./LandingGallery";

const Landing = () => {
  const containerRef = useRef();
  const logoRef = useRef();
  const [tl, setTl] = useState();
  const { width } = useContext(Viewport);
  const mobile = width <= 1024;

  useLayoutEffect(() => {
    //Inititate timeline
    console.log("initiating timeline");
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ paused: true })
        .fromTo(
          "#site-logo",
          {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            scale: 0,
          },
          { scale: 1.9, ease: "power4", duration: 1 }
        )
        .to("#site-logo", {
          scale: 1,
          top: "0",
          left: "25vw",
          xPercent: 0,
          yPercent: 0,
          ease: "power4",
          duration: 1,
          width: "50vw",
          onComplete: function () {
            gsap.set(this.targets(), { clearProps: "all" });
          },
        })
        .fromTo(
          "h1",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            onComplete: function () {
              gsap.set(this.targets(), { clearProps: "all" });
            },
          }
        );
      setTl(tl);
    });
    return () => ctx.revert();
  }, [mobile]);

  useEffect(() => {
    console.log("playing timeline");
    tl && tl.play();
  }, [tl]);

  return (
    <>
      <section
        className={`${[
          Global.flex,
          Global.alignCenter,
          Global.mt5,
          Global.relative,
          styles.landing,
          mobile && Global.flexCol,
          !mobile && Global.justifyCenter,
        ].join(" ")}`}
        ref={containerRef}
      >
        <img
          src={SiteLogo}
          className={styles.siteLogo}
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
