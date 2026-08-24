import { motion } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Admissions", href: "/admissions" },
  { label: "Videos / Gallery", href: "/videos-gallery" },
  { label: "Contact Us", href: "/contact" },
];

const directionsUrl = "https://maps.google.com/?q=2355+Carpenter+Court,+Fremont,+CA+94539";
const mapEmbedUrl = "https://www.google.com/maps?q=2355+Carpenter+Court,+Fremont,+CA+94539&output=embed";

export function ContactPage() {
  return (
    <main className="contact-page">
      <header className="contact-header">
        <a href="/" aria-label="Sruthi Swara Laya home"><img src="/brand/sruthi-swara-laya-logo.png" alt="Sruthi Swara Laya" /></a>
        <nav aria-label="Main navigation">
          {links.map((link) => <a key={link.label} href={link.href} className={link.label === "Contact Us" ? "is-active" : ""}>{link.label}</a>)}
        </nav>
      </header>

      <section className="contact-hero">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <p>Visit or call</p>
          <h1>Contact <em>Us</em></h1>
          <span>We would be delighted to hear from you.</span>
        </motion.div>
      </section>

      <section className="contact-content">
        <motion.div className="contact-details" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .75, delay: .12 }}>
          <p className="contact-label">Our location</p>
          <h2>Shruthi Swara Laya</h2>
          <address>2355 Carpenter Court<br />Fremont, CA 94539</address>
          <a className="contact-phone" href="tel:+15105525824">(510) 552-5824</a>
          <a className="contact-directions" href={directionsUrl} target="_blank" rel="noreferrer">Map / Directions <span aria-hidden="true">↗</span></a>
          <p className="contact-nonprofit">Shruthi Swara Laya is a registered 501(c)(3) nonprofit organization.<small>Tax ID: 45-3040612</small></p>
        </motion.div>

        <motion.div className="contact-map" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .75, delay: .2 }}>
          <iframe src={mapEmbedUrl} title="Google Map showing Shruthi Swara Laya at 2355 Carpenter Court, Fremont" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </motion.div>
      </section>
    </main>
  );
}
