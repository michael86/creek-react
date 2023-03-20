import gsap from "gsap";
import { Power2 } from "gsap/all";

import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useContent from "../hooks/useContent";

import styles from "../styles/Gallery.module.css";

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ addRef }) => {
  const ref = useRef();
  const revealRefs = useRef([]);
  const revealTimelines = useRef([]);
  const firstRender = useRef(true);
  const [content] = useContent("gallery");
  const [showAmount, setShowAmount] = useState(4);

  const registerRevealTimeline = (ref, i) => {
    let image = ref.children[0];

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref,
          start: "top bottom",
        },
      })
      .set(ref, { autoAlpha: 1 })
      .from(ref, {
        duration: 1.5,
        xPercent: -100,
        ease: Power2.out,
      })
      .from(image, {
        xPercent: 100,
        duration: 1.5,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out,
      });

    const descriptionContainer = ref.children[1];

    revealTimelines.current[i] = gsap.timeline({ paused: true }).to(descriptionContainer, {
      top: 0,
    });
  };

  useLayoutEffect(() => {
    revealRefs.current.forEach((container, i) => registerRevealTimeline(container, i));
  }, []);

  const onShowDescription = (index) => {
    const tl = revealTimelines.current[index];
    if (!tl) return;

    const shown = revealRefs.current[index].dataset.shown;
    !shown || shown !== "true" ? tl.play() : tl.reverse();

    typeof shown === "undefined" || shown !== "true"
      ? (revealRefs.current[index].dataset.shown = true)
      : (revealRefs.current[index].dataset.shown = false);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    for (let i = showAmount - 4; i <= showAmount - 1; i++)
      registerRevealTimeline(revealRefs.current[i], i);
  }, [showAmount]);

  const onShowMore = () => setShowAmount(+showAmount + 4);

  useEffect(() => {
    content && addRef(ref);
  }, [content]);

  return (
    <>
      {!content && <h3>loading</h3>}
      {content && (
        <section className={`${styles.galleryContainer}`} ref={ref} id="gallery">
          {content.map((image, i) => {
            return (
              i + 1 <= showAmount && (
                <div
                  className={`${styles.reveal}`}
                  ref={(el) => (revealRefs.current[i] = el)}
                  onClick={() => onShowDescription(i)}
                  key={i}
                >
                  <img src={`/images/gallery/${image.name}`} alt={image.alt} />
                  <div className={styles.imageDescription}>
                    <p>{image.description}</p>
                  </div>
                </div>
              )
            );
          })}
          {showAmount < content.length && (
            <button className={styles.bubblyButton} onClick={onShowMore}>
              Show more
            </button>
          )}
        </section>
      )}
    </>
  );
};

export default Gallery;
