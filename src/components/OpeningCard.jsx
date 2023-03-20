import styles from "../styles/About.module.css";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useLayoutEffect, useRef } from "react";
import useWidth from "../hooks/useWidth";

const OpeningCard = () => {
  const [width] = useWidth();
  const ref = useRef();

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(),
      breakPoint = 991;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        let { isDesktop, reduceMotion } = context.conditions;

        if (reduceMotion) return;

        const card = ref.current;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: isDesktop ? "top 30%" : "top 50%",
            scrub: true,
          },
          scale: 0,
          autoAlpha: 0,
          stagger: 0.2,
        });
      }
    );

    return () => mm.revert();
  }, [width]);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card} ref={ref}>
        <div className={styles.cardHeader}>
          <h3>Opening Times.</h3>
        </div>

        <div className={styles.cardBody}>
          <p>
            We are currently <span className="open-status">open</span>
          </p>
          <ul>
            <li>Mon: 8AM - 5PM</li>
            <li>Tue: 8AM - 5PM</li>
            <li>Wed: 8AM - 5PM</li>
            <li>Thur: 8AM - 5PM</li>
            <li>Fri: 8AM - 1PM</li>
          </ul>

          <div className={styles.socialsContainer}>
            <a href="#home" style={{ background: "#4267b2" }}>
              <FontAwesomeIcon icon={faFacebook} inverse />
            </a>
            <a
              href="https://twitter.com/CreekviewLtd"
              target={"_blank"}
              rel={"noreferrer"}
              style={{ background: "#1da1f2" }}
            >
              <FontAwesomeIcon icon={faTwitter} inverse />
            </a>

            <a href="#home" style={{ background: "#ff0000" }}>
              <FontAwesomeIcon icon={faLinkedin} inverse />
            </a>
          </div>

          <div className={styles.btnContainer}>
            <a href="tel:01268 724187">
              <button>Phone</button>
            </a>
            <button>Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningCard;
