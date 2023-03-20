import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Viewport from "../context/Viewport";
import styles from "../styles/Nav.module.css";

gsap.registerPlugin(ScrollToPlugin);

const Nav = ({ sections }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { width } = useContext(Viewport);

  const navRef = useRef();
  const navTimeline = useRef();
  const homeRef = useRef();
  const aboutRef = useRef();
  const gallRef = useRef();
  const serviceRef = useRef();
  const firstRender = useRef(true);

  const genRandNumber = () => {
    let num = Math.floor(Math.random() * 99) + 1; // this will get a number between 1 and 99;
    num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    return num;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#line-one", { top: "0vh", ease: "bounce", duration: 1 });
      gsap.to("#line-two", { top: "0vh", ease: "bounce", duration: 1.5 });
      gsap.to("#line-three", { top: "0vh", ease: "bounce", duration: 2 });

      //if width greater than height

      navTimeline.current = gsap
        .timeline({ paused: true })
        .to("#line-one", {
          rotation: "+=45",
          top: "12.5px",
          duration: 0.1,
          color: "#000",
        })
        .to("#line-two", { autoAlpha: 0, duration: 0.1 })
        .to("#line-three", {
          rotation: "-=45",
          top: "-11px",
          duration: 0.1,
          color: "#000",
        })
        .to(navRef.current, { height: "100vh", duration: 0.5 })
        .fromTo(
          ".nav-link",
          { left: "-55vw" },
          { left: "0", stagger: 0.1, delay: 0.5, duration: 0.5 },
          0
        )
        .fromTo(
          ".nav-link > p",
          { fontSize: "0" },
          { fontSize: width >= 991 ? "8vw" : "20vw", stagger: 0.1, delay: 0.5, duration: 0.5 },
          0
        );
    }, navRef);

    return () => ctx.revert();
  }, [width]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    navOpen ? navTimeline.current.play() : navTimeline.current.reverse(0);
  }, [navOpen]);

  const onClick = () => {
    setNavOpen(!navOpen);
  };

  const onNavigate = (target, id) => {
    const letters = [...target.current.children[0].children];
    if (letters) {
      letters.forEach((letter) => {
        gsap.to(letter, {
          scale: 0,
          rotate: 360,
          autoAlpha: 0,
          y: `${genRandNumber()}vh`,
          x: `${genRandNumber()}vw`,
          duration: 1,
          onComplete: function () {
            gsap.set(this.targets(), { clearProps: "all" });
          },
        });
      });
    }

    setTimeout(() => {
      gsap.to(window, { duration: 1, scrollTo: sections[id] });
      setNavOpen(false);
    }, 500);
  };

  return (
    <nav className={styles.base} ref={navRef}>
      <div className={styles.hamburger} onClick={onClick}>
        <div id="line-one" className={[styles.line, styles.lineOne].join(" ")}></div>
        <div
          id="line-two"
          className={[styles.line, styles.lineOne, styles.lineTwoMargin].join(" ")}
        ></div>
        <div
          id="line-three"
          className={[styles.line, styles.lineOne, styles.lineThreeMargin].join(" ")}
        ></div>
      </div>
      <ul className={styles.navList}>
        <li
          onClick={(e) => onNavigate(homeRef, "landing")}
          ref={homeRef}
          className={`${styles.navItem} nav-link`}
        >
          <p className={styles.navLink}>
            <span className={styles.navLetters}>H</span>
            <span className={styles.navLetters}>o</span>
            <span className={styles.navLetters}>m</span>
            <span className={styles.navLetters}>e</span>
          </p>
        </li>
        <li
          onClick={() => onNavigate(aboutRef, "about")}
          ref={aboutRef}
          className={`${styles.navItem} nav-link`}
        >
          <p className={styles.navLink}>
            <span className={styles.navLetters}>A</span>
            <span className={styles.navLetters}>b</span>
            <span className={styles.navLetters}>o</span>
            <span className={styles.navLetters}>u</span>
            <span className={styles.navLetters}>t</span>
          </p>
        </li>
        <li
          onClick={() => onNavigate(gallRef, "gallery")}
          ref={gallRef}
          className={`${styles.navItem} nav-link`}
        >
          <p className={styles.navLink}>
            <span className={styles.navLetters}>G</span>
            <span className={styles.navLetters}>a</span>
            <span className={styles.navLetters}>l</span>
            <span className={styles.navLetters}>l</span>
            <span className={styles.navLetters}>e</span>
            <span className={styles.navLetters}>r</span>
            <span className={styles.navLetters}>y</span>
          </p>
        </li>
        <li
          onClick={() => onNavigate(serviceRef, "services")}
          ref={serviceRef}
          className={`${styles.navItem} nav-link`}
        >
          <p className={styles.navLink}>
            <span className={styles.navLetters}>S</span>
            <span className={styles.navLetters}>e</span>
            <span className={styles.navLetters}>r</span>
            <span className={styles.navLetters}>v</span>
            <span className={styles.navLetters}>i</span>
            <span className={styles.navLetters}>c</span>
            <span className={styles.navLetters}>e</span>
            <span className={styles.navLetters}>s</span>
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
