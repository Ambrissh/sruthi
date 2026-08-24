import { MotionValue } from "framer-motion";
import { LegacyTile } from "./LegacyTile";

const images = [
  "legacy-01.jpg", "legacy-02.jpg", "legacy-03.jpg",
  "legacy-04.jpg", "legacy-05.jpg", "legacy-06.jpg",
  "legacy-07.jpg", "legacy-08.jpg", "legacy-09.jpg",
];

const directions = [
  { x: -34, y: 0 }, { x: 0, y: -34 }, { x: 34, y: 0 },
  { x: 0, y: 36 }, { x: 0, y: 0 }, { x: 34, y: 0 },
  { x: 0, y: 36 }, { x: 0, y: -36 }, { x: 30, y: 30 },
];

export function LegacyGrid({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="legacy-grid" aria-label="Photographs from the Shruthi Swara Laya legacy">
      {images.map((image, index) => (
        <LegacyTile
          key={image}
          src={`/legacy/${image}`}
          alt={`Shruthi Swara Laya legacy photograph ${index + 1}`}
          index={index}
          progress={progress}
          direction={directions[index]}
        />
      ))}
    </div>
  );
}
