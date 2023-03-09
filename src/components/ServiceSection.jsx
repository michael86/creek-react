import { useEffect, useState } from "react";

import styles from "../styles/Services.module.css";

const ServiceSection = ({ main, light, addRef, type }) => {
  const [uls, setUls] = useState([]);

  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(uls));

    main.forEach(
      (content) => content.type === "list" && copy.push(content.content)
    );

    setUls(copy);
  }, [main]);

  return (
    <section ref={addRef ? (el) => addRef(el, type) : null}>
      {main.map((main, i) => {
        return (
          main.type === "text" &&
          (Array.isArray(main.content) ? (
            main.content.map((content, index) => (
              <p
                className={`${styles.sectionContent} ${
                  !light && styles.textPrimary
                }`}
                key={`content-${index}`}
              >
                {content}
              </p>
            ))
          ) : (
            <p
              className={`${styles.sectionContent} ${
                !light && styles.textPrimary
              }`}
              key={`content-${i}`}
            >
              {main.content}
            </p>
          ))
        );
      })}

      {uls.length > 0 && (
        <div className={styles.ulContainer}>
          {uls.map((items, i) => {
            return (
              <ul
                className={`${styles.sectionContent} ${
                  !light && styles.textPrimary
                }`}
                key={i}
              >
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
