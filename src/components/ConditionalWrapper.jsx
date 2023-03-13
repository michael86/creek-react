import styles from "../styles/Services.module.css";

const ConditionWrapper = ({ width, children }) => {
  return <>{width >= 991 ? <div className={styles.grid}>{children}</div> : children}</>;
};

export default ConditionWrapper;
