export type EventResource = {
  label: string;
  href: string;
};

export type FeaturedEvent = {
  name: string;
  date: string;
  venue: string[];
  time: string;
  mission: string;
  resources: EventResource[];
};

export type SiteContent = {
  featuredEvent: FeaturedEvent;
};

// Kept only so the public site remains readable if the API is temporarily down.
const fallbackSiteContent: SiteContent = {
  featuredEvent: {
    name: "Bay Area Kala Utsavam 2026",
    date: "Saturday, March 28 & Sunday, March 29, 2026",
    venue: ["University of Silicon Andhra", "1521 California Circle", "Milpitas, CA 95035"],
    time: "8:00am–6:00pm",
    mission:
      "Our goal is to create an annual arts event that honors and shares the culture and history of India via the public performance of traditional Carnatic music, encourages the continued practice of this art form to a high standard, and shares the appreciation and enjoyment with the larger community and honor those who have paved a path for us to do so.",
    resources: [
      { label: "Concert Flyer", href: "/events/baku-2026/concert-flyer.pdf" },
      { label: "Competition Winners", href: "/events/baku-2026/competition-results.pdf" },
      { label: "Sponsors", href: "/events/baku-2026/sponsors.pdf" },
    ],
  },
};

export async function getSiteContent(signal?: AbortSignal): Promise<SiteContent> {
  const apiBaseUrl = import.meta.env.VITE_API_URL ?? "";
  try {
    const response = await fetch(`${apiBaseUrl}/api/site-content`, { signal });
    if (!response.ok) throw new Error(`Site content request failed: ${response.status}`);
    return await response.json() as SiteContent;
  } catch {
    return fallbackSiteContent;
  }
}
