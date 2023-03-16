import styles from "../styles/About.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

const OpeningCard = () => {
  return (
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
  );
};

export default OpeningCard;
