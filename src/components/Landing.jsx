import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../styles/Landing.module.css";
import useContent from "../hooks/useContent";

import LandingGallery from "./LandingGallery";
import Loading from "./Loading";
import LandingTitle from "./LandingTitle";

const Landing = () => {
  const [content] = useContent("landing");
  const containerRef = useRef();
  const [loading, setLoading] = useState(true);

  const [mm] = useState(gsap.matchMedia());

  useEffect(() => {
    setTimeout(() => {
      content && setLoading(false);
    }, 10 * 1000);
  }, [content]);

  return (
    <>
      {loading && <Loading mm={mm} loading={loading} />}

      {!loading && (
        <section className={styles.landing} ref={containerRef} id="landing">
          <LandingTitle content={content} mm={mm} />
          <LandingGallery mm={mm} />
        </section>
      )}
    </>
  );
};

export default Landing;
