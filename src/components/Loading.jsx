import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Loading = ({ mm }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const breakPoint = 991;

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        const { reduceMotion } = context;

        if (reduceMotion) return;

        gsap.from(ref.current, {
          y: 100,
          x: 500,
          autoAlpha: 0,
          stagger: 0.2,
        });
      },
      []
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <img style={{}} src="public/images/creekview-logo.svg" alt="site-logo" />
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <img style={{}} src="public/images/creekview-logo.svg" alt="site-logo" />
      </div>
    </div>
  );
};

export default Loading;
