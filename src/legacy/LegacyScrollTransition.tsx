import { ReactNode } from "react";
import { FoundersSection } from "../founders/FoundersSection";
import { ExploreFinalSection } from "../final/ExploreFinalSection";
import { CollapsingGallerySection } from "./CollapsingGallerySection";

export function LegacyScrollTransition({ hero }: { hero: ReactNode }) {
  return (
    <>
      <div className="hero-scene">{hero}</div>
      <CollapsingGallerySection />
      <FoundersSection />
      <ExploreFinalSection />
    </>
  );
}
