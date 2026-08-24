import { motion } from "framer-motion";
import type { Founder } from "./foundersData";

const ease = [0.22, 1, 0.36, 1] as const;

type FounderCardProps = {
  founder: Founder;
  index: number;
  position: "left" | "center" | "right";
};

export function FounderCard({ founder, index, position }: FounderCardProps) {
  const slideDirection = position === "left" ? -80 : position === "right" ? 80 : 0;
  const delay = position === "center" ? 0.1 : 0.35;

  return (
    <motion.article
      initial={{ opacity: 0, y: position === "center" ? 60 : 40, x: slideDirection, scale: position === "center" ? 0.88 : 0.94 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, delay, ease }}
      className={`founder-card ${position === "center" ? "founder-card-center" : ""}`}
    >
      {/* Arch-shaped photo frame */}
      <motion.div
        className="founder-arch-wrapper"
        initial={{ scale: position === "center" ? 0.82 : 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.3, delay: delay + 0.05, ease }}
      >
        <div className={`founder-arch ${position === "center" ? "founder-arch-center" : "founder-arch-side"}`}>
          <img
            src={founder.photo}
            alt={`${founder.honorific} ${founder.name}`}
            loading="eager"
            draggable={false}
          />
        </div>
        {/* Decorative arch border overlay */}
        <div className={`founder-arch-border ${position === "center" ? "founder-arch-border-center" : "founder-arch-border-side"}`} />
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease }}
        className="founder-name-block"
      >
        <span className="founder-honorific">{founder.honorific}</span>
        <h3 className="founder-name">{founder.name}</h3>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: delay + 0.35, ease }}
        className="founder-bio"
      >
        {founder.bio.map((paragraph, pIndex) => (
          <p key={pIndex}>{paragraph}</p>
        ))}
      </motion.div>

      {/* Awards */}
      {founder.awards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: delay + 0.45, ease }}
          className="founder-awards"
        >
          <h4 className="founder-awards-title">Awards & Recognitions</h4>
          <ul>
            {founder.awards.map((award, aIndex) => (
              <li key={aIndex}>
                <span className="award-title">{award.title}</span>
                {award.year && <span className="award-year">({award.year})</span>}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.article>
  );
}
