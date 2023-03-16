import { useContext, useEffect, useState } from "react";
import Viewport from "../context/Viewport";
import BoxBuilds from "./services/BoxBuilds";
import PcbAssembly from "./services/PcbAssembly";
import ActiveService from "./services/ActiveService";
import PcbDesign from "./services/PcbDesign";
import PcbFabrication from "./services/PcbFabrication";
import ConditionWrapper from "./ConditionalWrapper";
import styles from "../styles/Services.module.css";

const Services = () => {
  const { width } = useContext(Viewport);
  const [content, setContent] = useState();
  const [active, setActive] = useState("design");

  useEffect(() => {
    const getContent = async () => {
      await fetch("content.json")
        .then((response) => response.json())
        .then((content) => setContent(content.services));
    };
    getContent();
  }, []);

  const onClick = (id) => setActive(id);

  return (
    <div className={styles.container}>
      {!content && <p>Loading</p>}
      {content && (
        <>
          {width >= 991 && <h2>Services</h2>}
          <ConditionWrapper width={width}>
            <PcbDesign
              onClick={width >= 991 && onClick}
              content={content.design}
              active={active === "design" ? true : false}
            />
            <PcbFabrication
              onClick={width >= 991 && onClick}
              content={content.fabrication}
              active={active === "fabrication" ? true : false}
            />
            <PcbAssembly
              onClick={width >= 991 && onClick}
              content={content.assembly}
              active={active === "assembly" ? true : false}
            />
            <BoxBuilds
              onClick={width >= 991 && onClick}
              content={content.boxBuild}
              active={active === "boxBuild" ? true : false}
            />
            {width >= 991 && <ActiveService content={content[active]} />}
          </ConditionWrapper>
        </>
      )}
    </div>
  );
};

export default Services;
