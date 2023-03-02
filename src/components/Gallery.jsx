import gsap from "gsap";
import { Power2 } from "gsap/all";

import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useLayoutEffect } from "react";

import styles from "../styles/Gallery.module.css";

const galleryImages = [
  {
    name: "custom-pcbs.jpg",
    alt: "Custom PCBS",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse error totam, modi omnis labore provident! Dolorem, fugiat consequuntur quibusdam labore quod eligendi facilis exercitationem! Ea magni corrupti optio iusto molestias?",
  },

  {
    name: "custom-pcbs.jpg",
    alt: "Custom PCBS",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse error totam, modi omnis labore provident! Dolorem, fugiat consequuntur quibusdam labore quod eligendi facilis exercitationem! Ea magni corrupti optio iusto molestias?",
  },
  {
    name: "custom-pcbs.jpg",
    alt: "Custom PCBS",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse error totam, modi omnis labore provident! Dolorem, fugiat consequuntur quibusdam labore quod eligendi facilis exercitationem! Ea magni corrupti optio iusto molestias?",
  },
  {
    name: "custom-pcbs.jpg",
    alt: "Custom PCBS",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse error totam, modi omnis labore provident! Dolorem, fugiat consequuntur quibusdam labore quod eligendi facilis exercitationem! Ea magni corrupti optio iusto molestias?",
  },
];

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const containerRef = useRef();
  const revealRefs = useRef([]);
  const revealTimelines = useRef([]);

  useLayoutEffect(() => {
    revealRefs.current.forEach((container, i) => {
      let image = revealRefs.current[i].children[0];
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container,
            toggleActions: "restart none none reset",
          },
        })
        .set(container, { autoAlpha: 1 })
        .from(container, {
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

      const descriptionContainer = revealRefs.current[i].children[1];

      revealTimelines.current[i] = gsap
        .timeline({ paused: true })
        .to(descriptionContainer, {
          top: 0,
        });
    });
  }, []);

  const onShowDescription = (index) => {
    const tl = revealTimelines.current[index];
    console.log("has timline");
    if (!tl) return;
    console.log("passed tl check");
    const shown = revealRefs.current[index].dataset.shown;

    console.log("shown", shown);
    !shown || shown !== "true" ? tl.play() : tl.reverse();

    typeof shown === "undefined" || shown !== "true"
      ? (revealRefs.current[index].dataset.shown = true)
      : (revealRefs.current[index].dataset.shown = false);
  };

  return (
    <section className={`${styles.galleryContainer}`} ref={containerRef}>
      {galleryImages.map((image, i) => {
        return (
          <div
            className={`${styles.reveal}`}
            ref={(el) => (revealRefs.current[i] = el)}
            onClick={() => onShowDescription(i)}
            key={i}
          >
            <img
              src={require(`../public/images/gallery/${image.name}`)}
              alt={image.alt}
            />
            <div className={styles.imageDescription}>
              <p>{image.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Gallery;
