import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import styles from "../../styles/Services.module.css";
import FormattedContent from "../FormattedContent";

const ServiceSection = ({ main, light, addRef, type }) => {
  const [uls, setUls] = useState([]);

  useEffect(() => {
    const copy = [];

    main.forEach(
      (content) => content.type === "list" && copy.push(content.content)
    );

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
            main.content.map((content, i) => {
              return (
                <FormattedContent
                  key={i}
                  data={{ content: content, key: uuid.v4() }}
                />
              );
            })
          ) : (
            <FormattedContent
              key={i}
              data={{ content: main.content, key: uuid.v4() }}
            />
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
