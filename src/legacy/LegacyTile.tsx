import { motion, MotionValue, useTransform } from "framer-motion";

type Direction = { x: number; y: number };

type LegacyTileProps = {
  src: string;
  alt: string;
  index: number;
  progress: MotionValue<number>;
  direction: Direction;
};

export function LegacyTile({ src, alt, index, progress, direction }: LegacyTileProps) {
  // Recalibrated for 520svh scroll height.
  // The legacy grid slides in during scroll range ~0.08–0.22.
  // Center tile (index 4) appears first, others stagger outward.
  const staggerOrder = [4, 3, 5, 1, 7, 0, 2, 6, 8];
  const orderIndex = staggerOrder.indexOf(index);
  const base = 0.06;
  const start = base + orderIndex * 0.018;
  const end = Math.min(start + 0.16, 0.32);

  const x = useTransform(progress, [start, end, 0.45], [`${direction.x}vw`, "0vw", "0vw"]);
  const y = useTransform(progress, [start, end, 0.45], [`${direction.y}vh`, "0vh", "0vh"]);
  const opacity = useTransform(progress, [start, start + 0.04, end, 0.45], [0, 0.72, 1, 1]);
  const scale = useTransform(progress, [start, end, 0.45], [1.06, 1, 1]);

  return (
    <motion.figure style={{ x, y, opacity, scale }} className="legacy-tile">
      <img src={src} alt={alt} loading="eager" draggable={false} />
    </motion.figure>
  );
}
