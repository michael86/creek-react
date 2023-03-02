import styles from "../styles/About.module.css";
import Global from "../styles/Global.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = ({ addRefToTl }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const paragraphs = [...ref.current.children[0].children].splice(1);
    const card = ref.current.children[1].children[0];
    gsap
      .timeline()
      .from(paragraphs, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 50%",
          end: "top top",
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
          start: "top 50%",
          end: "top top",
          // markers: true,
          scrub: true,
        },
        scale: 0,
        autoAlpha: 0,
        stagger: 0.2,
      });
  }, [addRefToTl]);

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.fontContainer}>
        <h2>About Us</h2>
        <p className={Global.mt2}>
          Originally established as{" "}
          <span className={Global.highLight}>Valco UK Ltd</span> in 1998, the
          company split its mechanical and electrical divisions with the latter
          emerging as Creek View Electronics in 2005. This meant that we could
          continue to grow within the electrical manufacturing industry and
          provide a better service to our customers. As one of the leading{" "}
          <strong>
            <em>electronic design engineers in Essex</em>
          </strong>
          , we specialise in a variety of services.
        </p>
        <p className={Global.mt2}>
          From conformal coating and cable assembly to box build assembly and
          electrical testing and inspection services, you can ensure that Creek
          View Electronics to provide a service that is second to none. So, if
          you're looking for a high quality and reliable electronic design
          company, why not choose Creek View Electronics? For many years, Creek
          View Electronics obtained its printed circuit boards from
          Photomechanical Services Ltd, which was established in 1969.
        </p>
        <p className={Global.mt2}>
          Recognising the opportunity to provide customers with an end-to-end
          service solution, enhanced product quality and faster lead times, both
          companies joined forces and now trade under Creek View Electronics
          Ltd.
        </p>
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
    </section>
  );
};

export default About;
