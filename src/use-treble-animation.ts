import { RefObject, useEffect } from "react";
import type { InstrumentIcon } from "./icon-data";

type Options = {
  icons: InstrumentIcon[];
  duration: number;
  speed: number;
  intensity: number;
  paused: boolean;
};

export function useTrebleAnimation(
  refs: RefObject<(HTMLSpanElement | null)[]>,
  { icons, duration, speed, intensity, paused }: Options,
) {
  useEffect(() => {
    if (paused) return;
    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const cycle = ((now - startedAt) / (duration * 1000)) * Math.PI * 2 * speed;

      for (let i = 0; i < icons.length; i += 1) {
        const icon = icons[i];
        const element = refs.current?.[i];
        if (!element) continue;

        // A narrow travelling pulse makes each character move and settle before
        // the next one follows, without sending the pieces around a shared path.
        const sequence = cycle * 5.4 - icon.phase * 1.7;
        const pulse = Math.pow(Math.max(0, Math.sin(sequence)), 7);
        const sway = Math.sin(sequence * 0.5) * 0.18;
        const x = (pulse * icon.directionX + sway * icon.directionX) * intensity;
        const y = (-pulse * 1.15 + sway * icon.directionY) * intensity;
        const rotation = pulse * (icon.directionX >= 0 ? 2.4 : -2.4);
        const scale = 1 + pulse * 0.075;
        element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, icons, intensity, paused, refs, speed]);
}
