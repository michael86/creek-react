import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Intro = ({ setIntroPlayed }) => {
  const main = useRef();
  const imgOne = useRef();
  const imgTwo = useRef();
  const left = useRef();
  const right = useRef();

  useLayoutEffect(() => {
    console.log("playing intor");
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .set([left.current, right.current], { overflow: "hidden" }, 0)
        .to(left.current, { backgroundColor: "#000" }, 0)
        .to(right.current, { backgroundColor: "#000" }, 0)
        .from(imgOne.current, { autoAlpha: 0, y: -500 }, 1)
        .from(imgTwo.current, { autoAlpha: 0, y: 500 }, 1)
        .to(left.current, { duration: 2, x: "-100vw" }, 2)
        .to(right.current, { duration: 2, x: "100vw", onComplete: () => setIntroPlayed(true) }, 2);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={main}
      style={{
        zIndex: "99999999",
        backgroundColor: "transparent",
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
      className="container"
    >
      <div
        ref={left}
        className="half"
        style={{ display: "flex", alignContent: "center", justifyContent: "end", width: "50%" }}
      >
        <img
          ref={imgOne}
          style={{ width: "100%", height: "100%", scale: "1.5", translate: "50% 0" }}
          src="images/creekview-logo.svg"
          alt="creekview electronics ltd"
        />
      </div>
      <div
        ref={right}
        className="half"
        style={{ display: "flex", alignContent: "center", justifyContent: "end", width: "50%" }}
      >
        <img
          ref={imgTwo}
          style={{ width: "100%", height: "100%", scale: "1.5", translate: "-50% 0" }}
          src="images/creekview-logo.svg"
          alt="creekview electronics ltd"
        />
      </div>
    </div>
  );
};

// clip-path: polygon(0% 0%,100% 0%,100% 100%,0% 100%);

export default Intro;
