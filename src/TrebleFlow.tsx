import { CSSProperties, useEffect, useRef, useState } from "react";
import { iconAtlas, instrumentIcons } from "./icon-data";
import { useTrebleAnimation } from "./use-treble-animation";
import atlasUrl from "./assets/instrument-atlas.png";

export type TrebleFlowProps = {
  animationSpeed?: number;
  loopDuration?: number;
  movementIntensity?: number;
  pathScale?: number;
  className?: string;
};

export function TrebleFlow({
  animationSpeed = 1,
  loopDuration = 18,
  movementIntensity = 1.35,
  pathScale = 1,
  className = "",
}: TrebleFlowProps) {
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const resize = () => setScale(root.clientWidth / iconAtlas.sourceWidth);
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();
    return () => observer.disconnect();
  }, []);

  useTrebleAnimation(iconRefs, {
    icons: instrumentIcons,
    duration: loopDuration,
    speed: animationSpeed,
    intensity: movementIntensity,
    paused: false,
  });

  return (
    <div
      ref={rootRef}
      className={`treble-sculpture ${className}`}
      style={{
        "--treble-ratio": `${iconAtlas.sourceWidth} / ${iconAtlas.sourceHeight}`,
        "--treble-scale": pathScale,
      } as CSSProperties}
      role="img"
      aria-label="A treble clef composed of musical instrument silhouettes"
    >
      <div className="treble-stage" aria-hidden="true">
        {instrumentIcons.map((icon, index) => {
          const size = Math.max(icon.width, icon.height) * scale;
          const centerX = (icon.x + icon.width / 2) * scale;
          const centerY = (icon.y + icon.height / 2) * scale;
          return (
            <span
              key={icon.index}
              ref={(element) => { iconRefs.current[index] = element; }}
              className="treble-piece"
              style={{
                left: centerX,
                top: centerY,
              } as CSSProperties}
            >
              <i
                className="treble-piece-image"
                style={{
                  width: size,
                  height: size,
                  backgroundImage: `url(${atlasUrl})`,
                  backgroundSize: `${iconAtlas.cols * size}px ${iconAtlas.rows * size}px`,
                  backgroundPosition: `${-icon.col * size}px ${-icon.row * size}px`,
                }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
