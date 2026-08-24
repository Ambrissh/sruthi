import { useEffect } from "react";

const resources = {
  "event-flyer": { title: "Event Flyer", pages: 1, pdf: "event-flyer.pdf" },
  "competition-results": { title: "Competition Results", pages: 3, pdf: "competition-results.pdf" },
  sponsors: { title: "Sponsors", pages: 7, pdf: "sponsors.pdf" },
  "program-flyer": { title: "Program Flyer", pages: 1, pdf: "program-flyer.pdf" },
} as const;

type ResourceSlug = keyof typeof resources | "registration";

export function BakuResourcePage({ slug }: { slug: ResourceSlug }) {
  useEffect(() => {
    document.title = `${slug === "registration" ? "Registration" : resources[slug].title} · Bay Area Kala Utsavam 2025`;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [slug]);

  const resource = slug === "registration" ? null : resources[slug];
  return (
    <main className="resource-page">
      <header className="resource-header">
        <a href="/events" className="resource-back">← Back to events</a>
        <div><p>Bay Area Kala Utsavam 2025</p><h1>{resource?.title ?? "Registration"}</h1></div>
        {resource && <a href={`/events/baku-2025/${resource.pdf}`} className="resource-download" download>Download PDF ↓</a>}
      </header>
      {resource ? (
        <section className={`resource-pages resource-pages-${slug}`}>
          {Array.from({ length: resource.pages }, (_, index) => <img key={index} src={`/events/baku-2025/${slug}-${index + 1}.png`} alt={`${resource.title}, page ${index + 1} of ${resource.pages}`} />)}
        </section>
      ) : (
        <section className="registration-archive">
          <span>Registration archive</span>
          <h2>Registration for this event has closed.</h2>
          <p>Bay Area Kala Utsavam 2025 took place on February 22 and 23, 2025 at the University of Silicon Andhra in Milpitas, California.</p>
          <a href="/events/baku-2025/event-flyer">View the event flyer →</a>
        </section>
      )}
      <footer className="resource-footer">Locally archived by Shruthi Swara Laya</footer>
    </main>
  );
}
