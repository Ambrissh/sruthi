import { useEffect } from "react";
import { relatedOrganizations, type RelatedOrganizationSlug } from "./relatedOrganizations";

export function RelatedOrganizationPage({ slug }: { slug: RelatedOrganizationSlug }) {
  const organization = relatedOrganizations.find((item) => item.slug === slug)!;
  useEffect(() => { document.title = `${organization.name} · Related Organizations`; }, [organization.name]);
  return <main className="related-detail-page">
    <header><a href="/events">← Back to events</a><img src="/brand/sruthi-swara-laya-logo.png" alt="Sruthi Swara Laya" /></header>
    <section><p>Related organization</p><h1>{organization.name}</h1><div className="related-detail-card">
      <span>About</span><p>{organization.description}</p><dl><dt>Reference website</dt><dd>{organization.website}</dd></dl>
      <small>This informational page is hosted locally by Shruthi Swara Laya and does not redirect to an external website.</small>
    </div></section>
  </main>;
}
