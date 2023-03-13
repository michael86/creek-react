media only screen and (max-width: 600px) {...}

/_ Small devices (portrait tablets and large phones, 600px and up) _/
@media only screen and (min-width: 600px) {...}

/_ Medium devices (landscape tablets, 768px and up) _/
@media only screen and (min-width: 768px) {...}

/_ Large devices (laptops/desktops, 992px and up) _/
@media only screen and (min-width: 992px) {...}

/_ Extra large devices (large laptops and desktops, 1200px and up) _/
@media only screen and (min-width: 1200px) {...}

## For the assembly anim

import { useContext, useRef, useLayoutEffect } from "react";
import ServiceButton from "./ServiceButton";
import ServiceSection from "./ServiceSection";
import styles from "../../styles/Services.module.css";
import Viewport from "../../context/Viewport";
import gsap from "gsap";
import PcbAssemblyBg from "./PcbAssemblyBg";

const PcbAssembly = ({ content }) => {
const { width } = useContext(Viewport);
const timeline = useRef();
const ref = useRef();
const bgRef = useRef();
const btnTimeline = useRef();

const toggleSectionAside = () => {
if (btnTimeline.current)
!btnTimeline.current.progress() ? btnTimeline.current.play() : btnTimeline.current.reverse();
};

//main/aside
useLayoutEffect(() => {
const main = ref.current.children[1].children[0];
const aside = ref.current.children[1].children[1];

    const mm = gsap.matchMedia();

    gsap.context(() => {
      mm.add("(max-width: 991px)", () => {
        btnTimeline.current = gsap
          .timeline({ paused: true })
          .fromTo(main, { height: "auto" }, { x: -500, autoAlpha: 0 }, 0)
          .fromTo(aside, { autoAlpha: 0, x: 500 }, { height: "auto", autoAlpha: 1, x: "-100%" }, 0);

        timeline.current = gsap.timeline().from(main.children, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
          scale: 0,
          autoAlpha: 0,
          stagger: 0.2,
          y: 100,
        });
      });
      mm.add("(min-width: 992px)", () => {
        timeline.current = gsap
          .timeline()
          .set(main, { height: "auto" }) //Set height to auto incase of a viewport resize
          .set(aside, { height: "auto" }) //Set height to auto incase of a viewport resize
          .from(main, {
            scrollTrigger: {
              trigger: ref.current,
              start: "top 95%",
              end: "top top",
              scrub: true,
            },
            scale: 0,
            autoAlpha: 0,
            stagger: 0.2,
            y: 100,
          })
          .from(aside, {
            scrollTrigger: {
              trigger: ref.current,
              start: "top 95%",
              end: "top top",
              scrub: true,
            },
            scale: 0,
            autoAlpha: 0,
            stagger: 0.2,
            y: 100,
          });
      });
    }, ref.current);

}, []);

//bg
useLayoutEffect(() => {
if (width < 991) return;

    const ctx = gsap.context(() => {
      const svg = bgRef.current.children[0];
      const children = svg.children[3];

      const rightPads = [
        children.children[4],
        children.children[7],
        children.children[9],
        children.children[20],
        children.children[24],
        children.children[47],
        children.children[122],
        children.children[124],
      ];
      const yellowChips = [
        children.children[40],
        children.children[133],
        children.children[140],
        children.children[141],
      ];
      const yellowTrace = [children.children[12], children.children[11]];
      const marshmellow = [children.children[111], children.children[113], children.children[138]];
      const lowerChip = [
        children.children[95],
        children.children[97],
        children.children[99],
        children.children[101],
        children.children[103],
        children.children[105],
        children.children[107],
        children.children[109],
        children.children[114],
        children.children[115],
        children.children[116],
        children.children[117],
        children.children[118],
        children.children[119],
        children.children[142],
        children.children[143],
      ];
      const topChip = [
        children.children[93],
        children.children[78],
        children.children[80],
        children.children[82],
        children.children[84],
        children.children[86],
        children.children[88],
        children.children[90],
        children.children[92],
        children.children[120],
      ];
      const beigeChips = [children.children[134], children.children[135]];
      const blackChips = [children.children[136], children.children[137], children.children[139]];

      gsap
        .timeline()

        .from(svg, { autoAlpha: 0 }, 0)

        .from(blackChips, { scale: 0, stagger: 0.2 }, 1)
        .from(beigeChips, { scale: 0, stagger: 0.2, delay: 0.5 }, 1)
        .from(yellowChips, { scale: 0, stagger: 0.2, delay: 1 }, 1)

        .from(yellowTrace, { x: -500, autoAlpha: 0, stagger: 0.2 }, 1)
        .from(rightPads, { scale: 0, y: -150, autoAlpha: 0, stagger: 0.2 }, 2)
        .from(marshmellow, { x: -500, scale: 0, autoAlpha: 0, stagger: 0.2 }, 2)
        .from(lowerChip, { y: -100, autoAlpha: 0 }, 3)
        .from(topChip, { y: 100, autoAlpha: 0 }, 3);
    }, bgRef.current);

    return () => ctx.revert();

}, [width]);

return (
<section className={`${styles.serviceSection}`} id={content.id} ref={ref}>
<h2 className={`${styles.sectionTitle} `}>{content.title}</h2>

      <div className={styles.serviceContainer}>
        <ServiceSection main={content.main} light />
        <ServiceSection main={content.aside} light />
      </div>

      {width < 992 && <ServiceButton toggleSectionAside={toggleSectionAside} />}

      {width >= 991 && (
        <div className={styles.assemblyBgContainer} ref={bgRef}>
          <PcbAssemblyBg />
        </div>
      )}
    </section>

);
};

export default PcbAssembly;
