import styles from "../styles/About.module.css";

export default function Accredittors() {
  return (
    <div className={styles.accreditorContainer}>
      <h2>
        Accredited by Citation, an official IPC distributor, ISO certified and
        more.
      </h2>
      <div className={styles.imgContainer}>
        <img src="images/ipc.png" alt="ipc acceditor" />
        <img src="images/joscar.png" alt="joscar acceditor" />
        <img src="images/qms.png" alt="qms acceditor" />
        <img src="images/rohs.png" alt="rohs acceditor" />
      </div>
    </div>
  );
}
