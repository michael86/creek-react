import gsap from "gsap";
import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import Viewport from "../context/Viewport";
import styles from "../styles/Nav.module.css";

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);

  const { height } = useContext(Viewport);
  const navRef = useRef();
  const navTimeline = useRef();

  useLayoutEffect(() => {
    const fontSizes = ["7rem", "5rem", "4rem"];
    const fontSize =
      height <= 295
        ? fontSizes[3]
        : height >= 468
        ? fontSizes[2]
        : fontSizes[0];

    const ctx = gsap.context(() => {
      gsap.to("#line-one", { top: "0vh", ease: "bounce", duration: 1 });
      gsap.to("#line-two", { top: "0vh", ease: "bounce", duration: 1.5 });
      gsap.to("#line-three", { top: "0vh", ease: "bounce", duration: 2 });

      navTimeline.current = gsap
        .timeline({ paused: true })
        .to("#line-one", {
          rotation: "+=45",
          top: "12.5px",
          duration: 0.1,
        })
        .to("#line-two", { autoAlpha: 0, duration: 0.1 })
        .to("#line-three", {
          rotation: "-=45",
          top: "-11px",
          duration: 0.1,
        })
        .to(navRef.current, { height: "100vh", duration: 0.5 })
        .fromTo(
          ".nav-link",
          { left: "-55vw" },
          { left: "0", stagger: 0.1, delay: 0.5, duration: 0.5 },
          0
        )
        .fromTo(
          ".nav-link > a",
          { fontSize: "0" },
          { fontSize, stagger: 0.1, delay: 0.5, duration: 0.5 },
          0
        );
    }, navRef);

    return () => ctx.revert();
  }, [height]);

  const onClick = () => {
    setNavOpen(!navOpen);

    !navOpen ? navTimeline.current.play() : navTimeline.current.reverse(0);
  };

  return (
    <nav className={styles.base} ref={navRef}>
      <div className={styles.hamburger} onClick={onClick}>
        <div
          id="line-one"
          className={[styles.line, styles.lineOne].join(" ")}
        ></div>
        <div
          id="line-two"
          className={[styles.line, styles.lineOne, styles.lineTwoMargin].join(
            " "
          )}
        ></div>
        <div
          id="line-three"
          className={[styles.line, styles.lineOne, styles.lineThreeMargin].join(
            " "
          )}
        ></div>
      </div>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} nav-link`}>
          <a href="#home" className={styles.navLink}>
            Home
          </a>
        </li>
        <li className={`${styles.navItem} nav-link`}>
          <a href="#about" className={styles.navLink}>
            About
          </a>
        </li>
        <li className={`${styles.navItem} nav-link`}>
          <a href="#gallery" className={styles.navLink}>
            Gallery
          </a>
        </li>
        <li className={`${styles.navItem} nav-link`}>
          <a href="#services" className={styles.navLink}>
            Services
          </a>
        </li>
        <li className={`${styles.navItem} nav-link`}>
          <a href="#contact" className={styles.navLink}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
