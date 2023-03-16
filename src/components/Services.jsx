import { useContext, useState } from "react";
import Viewport from "../context/Viewport";
import useContent from "../hooks/useContent";

import ActiveService from "./services/ActiveService";
import ServiceWrapper from "./services/ServiceWrapper";
import ConditionWrapper from "./ConditionalWrapper";

import styles from "../styles/Services.module.css";

const Services = () => {
  const { width } = useContext(Viewport);

  const [content] = useContent("services");
  const [activeContent, setActiveContent] = useState("design");

  return (
    <div className={styles.container}>
      {!content && <p>Loading</p>}
      {content && (
        <>
          {width >= 991 && <h2>Services</h2>}
          <ConditionWrapper width={width}>
            <ServiceWrapper
              content={content}
              active={activeContent}
              setActiveContent={setActiveContent}
            />

            {width >= 991 && <ActiveService content={content[activeContent]} />}
          </ConditionWrapper>
        </>
      )}
    </div>
  );
};

export default Services;
