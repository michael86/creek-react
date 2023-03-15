import { useContext, useEffect, useState } from "react";
import Viewport from "../../context/Viewport";
import styles from "../../styles/Services.module.css";

const ServiceSection = ({ main, light, addRef, type }) => {
  const [uls, setUls] = useState([]);
  const { width } = useContext(Viewport);

  useEffect(() => {
    const copy = [];

    main.forEach((content) => content.type === "list" && copy.push(content.content));

    setUls(copy);
  }, [main]);

  return (
    <section
      className={type === "main" ? "main" : "aside"}
      ref={addRef ? (el) => addRef(el, type) : null}
    >
      {main.map((main, i) => {
        return (
          main.type === "text" &&
          (Array.isArray(main.content) ? (
            main.content.map((content, index) => (
              <p className={`${!light ? styles.textPrimary : ""}`} key={`content-${index}`}>
                {content}
              </p>
            ))
          ) : (
            <p className={`${!light ? styles.textPrimary : ""}`} key={`content-${i}`}>
              {main.content}
            </p>
          ))
        );
      })}

      {uls.length > 0 && (
        <div className={styles.ulContainer}>
          {uls.map((items, i) => {
            return (
              <ul className={`${!light ? styles.textPrimary : ""}`} key={i}>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ServiceSection;
