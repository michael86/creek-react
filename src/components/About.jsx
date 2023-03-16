import styles from "../styles/About.module.css";
import Global from "../styles/Global.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useContext, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

import Accredittors from "./Accredittors";
import Viewport from "../context/Viewport";
import useContent from "../hooks/useContent";

import { formatContent } from "../utils/text";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef();
  const { width } = useContext(Viewport);
  const [content] = useContent("about");

  useLayoutEffect(() => {
    if (!content) return;
    const paragraphs = [...ref.current.children[1].children].splice(1);
    const card = ref.current.children[2].children[0];

    const mm = gsap.matchMedia();

    mm.add("(max-width: 991px)", () => {
      gsap
        .timeline()
        .from(paragraphs, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 50%",
            end: "top top",

            scrub: true,
          },
          y: 100,
          x: 500,
          autoAlpha: 0,
          stagger: 0.2,
        })
        .from(card, {
          scrollTrigger: {
            trigger: paragraphs[paragraphs.length - 1],
            start: "top 50%",
            end: "top top",
            // markers: true,
            scrub: true,
          },
          scale: 0,
          autoAlpha: 0,
          stagger: 0.2,
        });
    });

    mm.add("(min-width: 992px)", () => {
      gsap
        .timeline()
        .from(paragraphs, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 30%",
            // markers: true,
            scrub: true,
          },
          y: 100,
          x: 500,
          autoAlpha: 0,
          stagger: 0.2,
        })
        .from(card, {
          scrollTrigger: {
            trigger: paragraphs[paragraphs.length - 1],
            start: "top bottom",
            end: "top center",
            // markers: true,
            scrub: true,
          },
          scale: 0,
          autoAlpha: 0,
          stagger: 0.2,
        });
    });
  }, [content]);

  return (
    <>
      {!content && <h1>Loading</h1>}
      {content && (
        <section className={styles.about} id="about" ref={ref}>
          <div className={styles.waveContainer}>
            <img src="/images/wave.svg" alt="border" />
          </div>
          <div className={styles.fontContainer}>
            <h2>About Us</h2>
            {content.map((content) => formatContent(content))}
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
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
                  <a href="#home" style={{ background: "#1da1f2" }}>
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

          {width >= 991 && <Accredittors />}
          <div className={styles.waveContainer}>
            <img src="images/wave-white.svg" alt="border" />
          </div>
        </section>
      )}
    </>
  );
};

export default About;
