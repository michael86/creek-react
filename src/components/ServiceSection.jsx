import styles from "../styles/Services.module.css";

const ServiceSection = ({ main, parentIndex }) => {
  return (
    <section>
      {main.map((main) => {
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
            >
              {main.content}
            </p>
          )
        ) : main.type === "list" ? (
          <ul
            className={`${styles.sectionContent} ${
              parentIndex % 2 !== 0 ? styles.textPrimary : ""
            }`}
          >
            {main.content.map((content) => (
              <li>{content}</li>
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
