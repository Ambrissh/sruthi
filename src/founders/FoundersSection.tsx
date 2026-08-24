import { motion } from "framer-motion";
import { FounderCard } from "./FounderCard";
import { founders } from "./foundersData";

const ease = [0.22, 1, 0.36, 1] as const;

const positions = ["left", "center", "right"] as const;

export function FoundersSection() {
  // Reorder founders so center is Anuradha (index 0), left is Manasa (1), right is Arun (2)
  const ordered = [founders[1], founders[0], founders[2]];

  return (
    <section className="founders-scene" aria-label="Our Founders">
      {/* Decorative top fade for seamless transition from legacy grid */}
      <div className="founders-top-fade" aria-hidden="true" />

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease }}
        className="founders-header"
      >
        <span className="founders-eyebrow">The Pillars of Sruthi Swara Laya</span>
        <h2 className="founders-title">Our Founders</h2>
        <div className="founders-divider" aria-hidden="true">
          <svg viewBox="0 0 120 16" fill="none">
            <path d="M0 8 C20 8, 25 2, 40 2 C50 2, 50 14, 60 14 C70 14, 70 2, 80 2 C95 2, 100 8, 120 8" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
      </motion.div>

      {/* Portraits row */}
      <div className="founders-portraits">
        {ordered.map((founder, index) => (
          <FounderCard
            key={founder.name}
            founder={founder}
            index={index}
            position={positions[index]}
          />
        ))}
      </div>
    </section>
  );
}
