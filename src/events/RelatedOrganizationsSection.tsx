import { motion } from "framer-motion";
import { relatedOrganizations } from "./relatedOrganizations";

export function RelatedOrganizationsSection() {
  return <section className="related-section" aria-labelledby="related-events-heading"><div className="related-inner">
    <div className="related-heading"><p>Continue exploring</p><h2 id="related-events-heading">Related organizations</h2><span>Explore institutions and programs connected to Indian classical music and cultural performance.</span></div>
    <div className="related-grid">{relatedOrganizations.map((organization, index) => <motion.a key={organization.slug} href={`/events/related/${organization.slug}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }}>
      <span>{String(index + 1).padStart(2, "0")}</span><h3>{organization.name}</h3><p>{organization.description}</p><strong>View details <b aria-hidden="true">→</b></strong>
    </motion.a>)}</div>
  </div></section>;
}
