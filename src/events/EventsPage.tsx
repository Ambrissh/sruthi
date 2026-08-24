import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EventsSection } from "./EventsSection";
import { RelatedOrganizationsSection } from "./RelatedOrganizationsSection";

const links = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Admissions", href: "/admissions" },
  { label: "Videos / Gallery", href: "/videos-gallery" },
  { label: "Contact Us", href: "/contact" },
];

export function EventsPage() {
  const [open, setOpen] = useState(false);
  return (
    <main className="events-page">
      <header className="events-page-header">
        <nav className="events-page-nav" aria-label="Main navigation">
          <a href="/" aria-label="Sruthi Swara Laya home"><img src="/brand/sruthi-swara-laya-logo.png" alt="Sruthi Swara Laya" /></a>
          <div className="events-page-links">
            {links.map((link) => <a key={link.label} href={link.href} className={link.label === "Events" ? "is-active" : ""}>{link.label}</a>)}
          </div>
          <button className="menu-button events-menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}><span className={open ? "translate-y-[3px] rotate-45" : ""} /><span className={open ? "-translate-y-[3px] -rotate-45" : ""} /></button>
        </nav>
        <AnimatePresence>{open && <motion.div className="events-mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</motion.div>}</AnimatePresence>
      </header>
      <EventsSection />
      <RelatedOrganizationsSection />
    </main>
  );
}
