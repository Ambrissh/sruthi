import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PastEventsPage } from "./events/PastEventsPage";
import { EventsPage } from "./events/EventsPage";
import { BakuResourcePage } from "./events/BakuResourcePage";
import { GalleryPage } from "./gallery/GalleryPage";
import { AdmissionsPage } from "./admissions/AdmissionsPage";
import { ContactPage } from "./contact/ContactPage";
import { RelatedOrganizationPage } from "./events/RelatedOrganizationPage";
import type { RelatedOrganizationSlug } from "./events/relatedOrganizations";
import "./styles.css";
import { PersistentMusicProvider } from "./music/PersistentMusic";

function SiteRouter() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, "") || "/");
  useEffect(() => {
    const navigate = () => { setPath(window.location.pathname.replace(/\/+$/, "") || "/"); window.scrollTo(0, 0); };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest("a");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith("/")) return;
      event.preventDefault();
      history.pushState({}, "", url.pathname + url.search + url.hash);
      navigate();
    };
    document.addEventListener("click", click);
    window.addEventListener("popstate", navigate);
    return () => { document.removeEventListener("click", click); window.removeEventListener("popstate", navigate); };
  }, []);
  const resourceSlug = path.match(/^\/events\/baku-2025\/(event-flyer|competition-results|registration|sponsors|program-flyer)$/)?.[1] as "event-flyer" | "competition-results" | "registration" | "sponsors" | "program-flyer" | undefined;
  const relatedSlug = path.match(/^\/events\/related\/(cleveland-performances|sifa|svlotus|sangati-center)$/)?.[1] as RelatedOrganizationSlug | undefined;
  return resourceSlug ? <BakuResourcePage slug={resourceSlug} /> : relatedSlug ? <RelatedOrganizationPage slug={relatedSlug} /> : path === "/past-events" ? <PastEventsPage /> : path === "/events" ? <EventsPage /> : path === "/videos-gallery" ? <GalleryPage /> : path === "/admissions" ? <AdmissionsPage /> : path === "/contact" ? <ContactPage /> : <App />;
}

createRoot(document.getElementById("root")!).render(<StrictMode><PersistentMusicProvider><SiteRouter /></PersistentMusicProvider></StrictMode>);
