import styles from "../styles/About.module.css";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin,  faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWidth from "../hooks/useWidth";

const OpeningCard = () => {
  const [width] = useWidth();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const d = new Date();
    const day = d.getDay();
    const hour = d.getHours();

    if (day > 0 && day < 5) {
      if (hour >= 8 && hour <= 17) setOpen(true);
    }
    if (day === 5 && hour >= 8 && hour <= 12) setOpen(true);
  }, []);

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
            We are currently{" "}
            <span className="open-status" style={{ color: open ? "green" : "red" }}>
              {open ? "open" : "closed"}
            </span>
          </p>
          <ul>
            <li>Mon: 8AM - 5PM</li>
            <li>Tue: 8AM - 5PM</li>
            <li>Wed: 8AM - 5PM</li>
            <li>Thur: 8AM - 5PM</li>
            <li>Fri: 8AM - 1PM</li>
          </ul>

          <div className={styles.socialsContainer}>
            {/* //Facebook */}
            {/* <a href="#home" style={{ background: "#4267b2" }}>
              <FontAwesomeIcon icon={faFacebook} inverse />
            </a> */}
            <a
              href="https://twitter.com/CreekviewLtd"
              target={"_blank"}
              rel={"noreferrer"}
              style={{ background: "#1da1f2" }}
            >
              <FontAwesomeIcon icon={faTwitter} inverse />
            </a>

            <a
              href="https://uk.linkedin.com/company/creekview-electronics-ltd"
              target={"_blank"}
              rel={"noreferrer"}
              style={{ background: "#ff0000" }}
            >
              <FontAwesomeIcon icon={faLinkedin} inverse />
            </a>
          </div>

          <div className={styles.btnContainer}>
            <a href="tel:01268724187">
              <button>Phone</button>
            </a>

            <a href="mailto:sales@creekviewelectronics.co.uk">
              <button>Email Us</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningCard;
