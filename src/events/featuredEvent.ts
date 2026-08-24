export type EventResource = {
  label: string;
  href: string;
};

/**
 * The one place to update the event featured on the Events page.
 *
 * 1. Add replacement PDFs to public/events/<event-slug>/.
 * 2. Update this record with the new event's details and filenames.
 * 3. Move a completed event into past-events.txt when appropriate.
 */
export const featuredEvent = {
  name: "Bay Area Kala Utsavam 2026",
  date: "Saturday, March 28 & Sunday, March 29, 2026",
  venue: "University of Silicon Andhra\n1521 California Circle\nMilpitas, CA 95035",
  time: "8:00am–6:00pm",
  mission:
    "Our goal is to create an annual arts event that honors and shares the culture and history of India via the public performance of traditional Carnatic music, encourages the continued practice of this art form to a high standard, and shares the appreciation and enjoyment with the larger community and honor those who have paved a path for us to do so.",
  resources: [
    { label: "Concert Flyer", href: "/events/baku-2026/concert-flyer.pdf" },
    { label: "Competition Winners", href: "/events/baku-2026/competition-results.pdf" },
    { label: "Sponsors", href: "/events/baku-2026/sponsors.pdf" },
  ] satisfies EventResource[],
} as const;
