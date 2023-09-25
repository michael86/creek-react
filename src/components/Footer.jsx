import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Viewport from "../context/Viewport";
import styles from "../styles/Footer.module.css";
import Accreditors from "../components/Accredittors";

const Footer = () => {
  const { width } = useContext(Viewport);

  return (
    <>
      <h4>Do you have a challenge for us?</h4>

      <div className={styles.contactContainer}>
        <div className={styles.directContactContainer}>
          
          <p>Get in touch with a member of our team to start discussing your goals</p>
          <div
            className={styles.emailBtn}
            onClick={(e) => {
              window.location.href = "mailto:sales@creekviewelectronics.co.uk";
              e.preventDefault();
            }}
          >
            <a href="mailto:sales@creekviewelectronics.co.uk">
              Email Us
              <FontAwesomeIcon style={{ marginLeft: "1rem" }} icon={faEnvelope} />
            </a>
          </div>
          <div
            className={styles.callBtn}
            onClick={(e) => {
              window.location.href = "tel:01268724187";
              e.preventDefault();
            }}
          >
            <a href="tel:01268724187">
              Phone Us
              <FontAwesomeIcon style={{ marginLeft: "1rem" }} icon={faPhone} />
            </a>
          </div>
        </div>
        <div className={styles.socialsContainer}>
          {/* <FontAwesomeIcon style={{ color: "#4267B2" }} icon={faFacebook} /> */}
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
          <a href="https://twitter.com/CreekviewLtd" target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              style={{
                color: "#1DA1F2",
              }}
              icon={faTwitter}
            />
          </a>
          {/* <a href="https://twitter.com/CreekviewLtd" target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              style={{
                color: "#1DA1F2",
              }}
              icon={faInstagram}
            />
          </a> */}
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
      {width < 991 && (
        <div className={styles.accreditorContainer}>
          <Accreditors />
        </div>
      )}

      <div className={styles.smallPrint}>
        <p>Creekview LTD &copy; 2011</p>
        <p>
          Site created by{" "}
          <a href="https://github.com/michael86" target={"_blank"} rel={"noreferrer"}>
            Michael Hodgson
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
