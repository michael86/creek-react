import styles from "../styles/Services.module.css";

const ServiceSection = ({ main, parentIndex }) => {
  return (
    <section>
      {main.map((main, i) => {
        return main.type === "text" ? (
          Array.isArray(main.content) ? (
            main.content.map((content, index) => (
              <p
                className={`${styles.sectionContent} ${
                  parentIndex % 2 !== 0 ? styles.textPrimary : ""
                }`}
                key={`content-${index}`}
              >
                {content}
              </p>
            ))
          ) : (
            <p
              className={`${styles.sectionContent} ${
                parentIndex % 2 !== 0 ? styles.textPrimary : ""
              }`}
              key={`content-${i}`}
            >
              {main.content}
            </p>
          )
        ) : main.type === "list" ? (
          <ul
            className={`${styles.sectionContent} ${
              parentIndex % 2 !== 0 ? styles.textPrimary : ""
            }`}
            key={`content-${i}`}
          >
            {main.content.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ul>
        ) : (
          ""
        );
      })}
    </section>
  );
};

export default ServiceSection;
