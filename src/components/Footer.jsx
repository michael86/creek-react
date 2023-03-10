import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <>
      <h3>Let's make your dream come true</h3>
      <p>Do you have a challenge for us?</p>
      <p>
        Get in touch with a member of our team to start discussing your goals
      </p>

      <div className={styles.contactContainer}>
        <div className={styles.directContactContainer}>
          <div className={styles.emailBtn}>
            <a href="mailto:sadsad@saddasd">
              Email Us
              <FontAwesomeIcon
                style={{ marginLeft: "1rem" }}
                icon={faEnvelope}
              />
            </a>
          </div>
          <div className={styles.callBtn}>
            <a href="tel:0000000000">
              Phone Us
              <FontAwesomeIcon style={{ marginLeft: "1rem" }} icon={faPhone} />
            </a>
          </div>
        </div>
        <div className={styles.socialsContainer}>
          <FontAwesomeIcon style={{ color: "#4267B2" }} icon={faFacebook} />
          <a
            href="https://www.linkedin.com/company/creekview-electronics-ltd/mycompany/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              style={{
                color: "#dd5143",
              }}
              icon={faLinkedin}
            />
          </a>
          <a
            href="https://twitter.com/CreekviewLtd"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              style={{
                color: "#1DA1F2",
              }}
              icon={faTwitter}
            />
          </a>
          <a
            href="https://twitter.com/CreekviewLtd"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              style={{
                color: "#1DA1F2",
              }}
              icon={faInstagram}
            />
          </a>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.0955527432134!2d0.5174628159596584!3d51.584812112860824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8dd1f29cfe37b%3A0x47d3038817a245a1!2sCreekview%20Electronics%20Ltd!5e0!3m2!1sen!2suk!4v1677079243429!5m2!1sen!2suk"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="g-maps"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default Footer;
