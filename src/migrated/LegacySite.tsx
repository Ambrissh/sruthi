import { useEffect, useMemo, useState } from "react";
import indexSource from "./source/index.html?raw";
import aboutSource from "./source/about.html?raw";
import classesSource from "./source/classes.html?raw";
import eventsSource from "./source/events.html?raw";
import pastEventsSource from "./source/pastevents.html?raw";
import bakuSource from "./source/baku.html?raw";
import linksSource from "./source/links.html?raw";
import admissionSource from "./source/admission.html?raw";
import audioSource from "./source/audio.html?raw";
import videoSource from "./source/video.html?raw";
import gallerySource from "./source/gallery.html?raw";
import contactSource from "./source/contact.html?raw";

type LegacyPage = {
  source: string;
  label: string;
  menu: string;
};

const pages: Record<string, LegacyPage> = {
  "/": { source: indexSource, label: "Home", menu: "home" },
  "/index.php": { source: indexSource, label: "Home", menu: "home" },
  "/about.php": { source: aboutSource, label: "About", menu: "about" },
  "/classes.php": { source: classesSource, label: "Classes", menu: "classes" },
  "/events.php": { source: eventsSource, label: "Events", menu: "events" },
  "/pastevents.php": { source: pastEventsSource, label: "Events", menu: "events" },
  "/baku.php": { source: bakuSource, label: "BAKU", menu: "baku" },
  "/links.php": { source: linksSource, label: "Links", menu: "links" },
  "/admission.php": { source: admissionSource, label: "Admissions", menu: "admissions" },
  "/audio.php": { source: audioSource, label: "Audio", menu: "audio" },
  "/video.php": { source: videoSource, label: "Video", menu: "video" },
  "/gallery.php": { source: gallerySource, label: "Photo Gallery", menu: "gallery" },
  "/contact.php": { source: contactSource, label: "Contact", menu: "contact" },
};

const navigation = [
  ["home", "index.php", "but_home"],
  ["about", "about.php", "but_about"],
  ["classes", "classes.php", "but_classes"],
  ["events", "events.php", "but_events"],
  ["baku", "baku.php", "but_baku"],
  ["links", "links.php", "but_links"],
  ["admissions", "admission.php", "but_admissions"],
  ["audio", "audio_video.php", "but_audio"],
  ["gallery", "gallery.php", "but_photo"],
  ["contact", "contact.php", "but_contact"],
] as const;

function extractPageContent(source: string) {
  const headerEnd = source.indexOf("?>");
  const footerStart = source.indexOf("<?php include('includes/footer.php'); ?>");
  const body = source.slice(headerEnd + 2, footerStart === -1 ? undefined : footerStart);

  return body
    .replace(/src=["']images\//g, 'src="/legacy-assets/images/')
    .replace(/background=["']images\//g, 'background="/legacy-assets/images/')
    .replace(/href=["']docs\//g, 'href="/legacy-assets/docs/')
    .replace(/href=["']([^"']+\.php)([^"']*)["']/g, 'href="/$1$2"');
}

export function LegacySite() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const page = pages[path] ?? pages["/"];

  useEffect(() => {
    document.title = "shruthi swara laya";
  }, [page]);

  const content = useMemo(() => extractPageContent(page.source), [page]);

  return <main className="legacy-site">
    <div className="legacy-top"><img src="/legacy-assets/images/top_img.jpg" alt="Shruthi Swara Laya" /></div>
    <div className="legacy-frame">
      <nav className="legacy-menu" aria-label="Main navigation">
        {navigation.map(([key, href, image]) => {
          const selected = key === page.menu;
          return <a key={key} href={`/${href}`} className={selected ? "is-selected" : undefined} target={key === "gallery" ? "_blank" : undefined}>
            <img src={`/legacy-assets/images/${image}_${selected ? "01" : "00"}.jpg`} alt="" />
          </a>;
        })}
      </nav>
      <section className="legacy-panel">
        <div className="legacy-content" dangerouslySetInnerHTML={{ __html: content }} />
        <footer className="legacy-footer">
          <img src="/legacy-assets/images/bot_line.jpg" alt="" />
          <p>For more information please contact: <a href="mailto:annumanasa@gmail.com">ANURADHA SURESH</a> at 510-552-5824</p>
        </footer>
      </section>
    </div>
    <footer className="legacy-bottom"><img src="/legacy-assets/images/bot_left_corner.jpg" alt="" /><span>© 2011-2026 Shruthi Swara Laya, All Rights Reserved.</span><span>Hosted &amp; maintained by <a href="http://www.neuronlinks.com" target="_blank" rel="noreferrer">NeuronLinks, Inc.</a></span><img src="/legacy-assets/images/bot_right_corner.jpg" alt="" /></footer>
  </main>;
}
