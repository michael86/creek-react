import styles from "../styles/About.module.css";

import { useRef } from "react";

const About = () => {
  const ref = useRef();

  return (
    <section className={styles.about} id="about" ref={ref}>
      <h2>About Us</h2>
    </section>
  );
};

export default About;
