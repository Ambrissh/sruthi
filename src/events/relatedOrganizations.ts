export const relatedOrganizations = [
  { slug: "cleveland-performances", name: "Cleveland Performances", website: "www.aradhana.org/schedule.html", description: "Performance schedules and programming associated with the Cleveland Thyagaraja Festival." },
  { slug: "sifa", name: "SIFA", website: "www.southindiafinearts.org", description: "South India Fine Arts presents and supports Indian classical music and cultural programming." },
  { slug: "svlotus", name: "SVLotus", website: "www.svlotus.com", description: "Silicon Valley LOTUS supports cultural, artistic, and community-centered programs in the Bay Area." },
  { slug: "sangati-center", name: "Sangati Center", website: "www.sangaticenter.org", description: "A community organization connecting audiences with Indian music, arts, and cultural experiences." },
] as const;
export type RelatedOrganizationSlug = typeof relatedOrganizations[number]["slug"];
