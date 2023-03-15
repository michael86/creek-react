import ServiceSection from "./ServiceSection";
import styles from "../../styles/Services.module.css";

const ActiveService = ({ content, addRef, light }) => {
  return (
    <div className={styles.serviceContainer}>
      <ServiceSection main={content.main} addRef={addRef} type="main" light />
      <ServiceSection main={content.aside} addRef={addRef} type="aside" light />
      <div className={styles.waveContainer}>
        <img src="images/wave-white.svg" alt="border" />
      </div>
    </div>
  );
};

export default ActiveService;
