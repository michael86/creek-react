import { useContext, useEffect, useRef } from "react";
import Viewport from "../context/Viewport";
import useContent from "../hooks/useContent";

import ActiveService from "./services/ActiveService";
import ServiceWrapper from "./services/ServiceWrapper";
import ConditionWrapper from "./ConditionalWrapper";

import styles from "../styles/Services.module.css";

const Services = ({ addRef, activeContent, setActiveContent }) => {
  const { width } = useContext(Viewport);
  const ref = useRef();
  const [content] = useContent("services");

  useEffect(() => {
    addRef(ref);
  }, [addRef]);

  return (
    <div ref={ref} className={styles.container} id="services">
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
