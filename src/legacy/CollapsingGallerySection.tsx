import {
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt: string };
type Direction = { x: number; y: number };

// Swap these paths for /images/gallery-1.jpg … /images/gallery-9.jpg when the
// final photography is supplied. The fifth image is always the hero image.
const imageOrder = [2, 3, 4, 5, 1, 6, 7, 8, 9];
const imageData: GalleryImage[] = imageOrder.map((imageNumber, index) => ({
  src: `/legacy/legacy-${String(imageNumber).padStart(2, "0")}.jpg`,
  alt: `Sruthi Swara Laya memory ${index + 1}`,
}));

const directions: Direction[] = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

type GalleryTileProps = {
  image: GalleryImage;
  index: number;
  direction: Direction;
  progress: MotionValue<number>;
  heroScale: MotionValue<number>;
  centerRef?: React.RefObject<HTMLElement | null>;
};

function GalleryTile({
  image,
  index,
  direction,
  progress,
  heroScale,
  centerRef,
}: GalleryTileProps) {
  const isCenter = index === 4;
  const x = useTransform(progress, [0.2, 0.7], [direction.x * 28, 0]);
  const y = useTransform(progress, [0.2, 0.7], [direction.y * 28, 0]);
  const opacity = useTransform(progress, [0, 0.32, 0.68, 1], [0, 0, 1, 1]);
  const scale = useTransform(progress, [0.2, 0.7], [0.94, 1]);
  const centerScale = useTransform(
    [progress, heroScale],
    ([value, fullScale]) => 1 + (Number(fullScale) - 1) * (1 - Math.min(Number(value) / 0.68, 1)),
  );
  const centerRadius = useTransform(progress, [0, 0.46, 0.68], [0, 5, 14]);

  return (
    <motion.figure
      ref={isCenter ? centerRef : undefined}
      className={`collapsing-gallery-tile${isCenter ? " is-center" : ""}`}
      style={
        isCenter
          ? { scale: centerScale, borderRadius: centerRadius }
          : { x, y, opacity, scale }
      }
    >
      <img
        src={image.src}
        alt={image.alt}
        draggable={false}
        loading="eager"
        decoding="async"
        fetchPriority={isCenter ? "high" : "auto"}
      />
    </motion.figure>
  );
}

function CompactGallery() {
  return (
    <section className="collapsing-gallery-section collapsing-gallery-section-compact" aria-label="Our memories">
      <div className="collapsing-gallery-mobile-grid">
        {imageData.map((image, index) => (
          <figure className="collapsing-gallery-tile" key={image.src}>
            <img src={image.src} alt={image.alt} loading={index < 4 ? "eager" : "lazy"} decoding="async" />
          </figure>
        ))}
      </div>
    </section>
  );
}

export function CollapsingGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const centerRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const heroScale = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateCompact = () => setCompact(media.matches);
    updateCompact();
    media.addEventListener("change", updateCompact);
    return () => media.removeEventListener("change", updateCompact);
  }, []);

  useEffect(() => {
    const measure = () => {
      const center = centerRef.current;
      if (!center) return;
      const width = center.offsetWidth;
      const height = center.offsetHeight;
      if (!width || !height) return;
      heroScale.set(Math.max(window.innerWidth / width, window.innerHeight / height));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (centerRef.current) observer.observe(centerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [heroScale]);

  if (compact) return <CompactGallery />;

  return (
    <section ref={sectionRef} className="collapsing-gallery-section" aria-label="Our memories">
      <div className="collapsing-gallery-sticky">
        <div className="collapsing-gallery-grid">
          {imageData.map((image, index) => (
            <GalleryTile
              key={image.src}
              image={image}
              index={index}
              direction={directions[index]}
              progress={scrollYProgress}
              heroScale={heroScale}
              centerRef={index === 4 ? centerRef : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
