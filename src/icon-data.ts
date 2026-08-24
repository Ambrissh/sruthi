import atlasData from "./assets/instrument-icons.json";

export type InstrumentIcon = {
  index: number;
  col: number;
  row: number;
  x: number;
  y: number;
  width: number;
  height: number;
  phase: number;
  speed: number;
  directionX: number;
  directionY: number;
};

type AtlasData = {
  cell: number;
  cols: number;
  rows: number;
  sourceWidth: number;
  sourceHeight: number;
  icons: Omit<InstrumentIcon, "phase" | "speed" | "directionX" | "directionY">[];
};

export const iconAtlas = atlasData as AtlasData;

// These variations form one coherent travelling wave, rather than random drift.
export const instrumentIcons: InstrumentIcon[] = iconAtlas.icons.map((icon) => {
  const verticalProgress = icon.y / iconAtlas.sourceHeight;
  const phase = verticalProgress * Math.PI * 4 + (icon.x / iconAtlas.sourceWidth) * 0.45;
  return {
    ...icon,
    phase,
    speed: 0.98 + (icon.index % 5) * 0.01,
    directionX: Math.cos(phase * 0.28),
    directionY: Math.sin(phase * 0.28) * 0.45,
  };
});
