import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Admissions", href: "/admissions" },
  { label: "Videos / Gallery", href: "/videos-gallery" },
  { label: "Contact Us", href: "/contact" },
];

export function AdmissionsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="admissions-page">
      <header className="admissions-page-header">
        <div className="admissions-header-inner">
          <a href="/" aria-label="Sruthi Swara Laya home">
            <img src="/brand/sruthi-swara-laya-logo.png" alt="Sruthi Swara Laya" />
          </a>
          <nav aria-label="Main navigation">
            {links.map((link) => <a key={link.label} href={link.href} className={link.label === "Admissions" ? "is-active" : ""}>{link.label}</a>)}
          </nav>
          <button className="admissions-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <span className={menuOpen ? "is-open" : ""} />
            <span className={menuOpen ? "is-open" : ""} />
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav className="admissions-mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .25 }}>
              {links.map((link) => <a key={link.label} href={link.href} className={link.label === "Admissions" ? "is-active" : ""} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="admissions-hero">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <span className="admissions-page-kicker">Learn with us</span>
          <h1>Admissions</h1>
          <p>Discover structured training in Carnatic vocal music and Harikatha at Sruthi Swara Laya.</p>
        </motion.div>
      </section>

      <section className="admissions-page-content">
        <article className="admissions-primary-card">
          <span>Classes offered</span>
          <h2>Carnatic Vocal</h2>
          <div className="admissions-schedule">
            <div><small>Fremont</small><strong>Monday through Sunday</strong></div>
            <div><small>Online</small><strong>Available all seven days</strong></div>
          </div>
        </article>

        <div className="admissions-info-grid">
          <article>
            <span>Faculty</span>
            <h3>Teachers</h3>
            <p>Anu Suresh<br />Manasa Suresh<br />Arun Mahadevan</p>
          </article>
          <article>
            <span>Additional training</span>
            <h3>Harikatha Classes</h3>
            <p>Please contact us for current class timings.</p>
          </article>
          <article>
            <span>How to apply</span>
            <h3>Applications</h3>
            <p>Application forms are available at Sruthi Swara Laya. Please contact Anu Suresh for enrollment information.</p>
          </article>
        </div>
      </section>

      <section className="admissions-cta">
        <div><span>Admissions contact</span><h2>Begin your musical journey.</h2></div>
        <a href="tel:+15105525824"><small>Anuradha Suresh</small>(510) 552-5824 <b aria-hidden="true">↗</b></a>
      </section>
    </main>
  );
}
