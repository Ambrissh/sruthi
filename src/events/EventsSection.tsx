import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSiteContent, type FeaturedEvent } from "./siteContent";

export function EventsSection() {
  const [featuredEvent, setFeaturedEvent] = useState<FeaturedEvent>();

  useEffect(() => {
    const controller = new AbortController();
    getSiteContent(controller.signal).then((content) => setFeaturedEvent(content.featuredEvent));
    return () => controller.abort();
  }, []);

  if (!featuredEvent) return null;

  return (
    <section id="events" className="events-section">
      <div className="events-inner">
        <motion.p className="events-kicker" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Events</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .06 }}>
          Music in the community.
        </motion.h2>
        <motion.p className="events-intro" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .12 }}>
          Shruthi Swara Laya has been very active in participating in both Indian as well as mainstream cultural activities.
        </motion.p>

        <motion.article className="event-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: .16 }}>
          <div className="event-card-heading">
            <span>Featured event</span>
            <h3>{featuredEvent.name}</h3>
            <aside className="featured-baku-mission">
              <h4>BAKU Mission Statement</h4>
              <p>{featuredEvent.mission}</p>
            </aside>
            <div className="event-resources">
              {featuredEvent.resources.map((resource) => <a key={resource.label} href={resource.href} target="_blank" rel="noreferrer">{resource.label}<span aria-hidden="true">↗</span></a>)}
            </div>
          </div>
          <dl className="event-details">
            <div><dt>Date</dt><dd>{featuredEvent.date}</dd></div>
            <div><dt>Venue</dt><dd>{featuredEvent.venue.map((line, index) => <span key={line}>{line}{index < featuredEvent.venue.length - 1 && <br />}</span>)}</dd></div>
            <div><dt>Time</dt><dd>{featuredEvent.time}</dd></div>
          </dl>
        </motion.article>

        <p className="past-events-prompt">For past events of Shruthi Swara Laya, please <a href="/past-events">click here.</a></p>
      </div>
    </section>
  );
}
