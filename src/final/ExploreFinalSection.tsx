import { motion } from "framer-motion";
import { TrebleFlow } from "../TrebleFlow";

const ease = [0.22, 1, 0.36, 1] as const;

const links = [
  { label: "Upcoming events", detail: "Discover our forthcoming concerts, festivals, and community performances.", href: "/events" },
  { label: "Admissions & classes", detail: "Inquire about structured Carnatic music training and current enrollment.", href: "#classes" },
  { label: "Photo, audio & video gallery", detail: "Explore performances, recordings, and moments from our school.", href: "/videos-gallery" },
  { label: "Contact us", detail: "Begin a conversation with Shruthi Swara Laya.", href: "/contact" },
];

export function ExploreFinalSection() {
  return (
    <section className="explore-final" aria-label="Explore Shruthi Swara Laya">
      <motion.div initial={{ opacity: 0, x: -70 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.1, ease }} className="explore-clef">
        <div className="final-clef-art">
          <img className="final-clef-underlay" src="/brand/treble-clef-silhouette.png" alt="" aria-hidden="true" />
          <TrebleFlow movementIntensity={4.4} loopDuration={6.2} animationSpeed={1.18} className="final-clef-motion" />
        </div>
      </motion.div>
      <div className="explore-content">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="explore-kicker">Continue your journey</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.08, ease }}>Discover what comes next.</motion.h2>
        <div className="explore-links">
          {links.map((link, index) => (
            <motion.a key={link.label} href={link.href} initial={{ opacity: 0, x: 46 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.18 + index * 0.09, ease }}>
              <span><strong>{link.label}</strong><small>{link.detail}</small></span>
              <b aria-hidden="true">↗</b>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
