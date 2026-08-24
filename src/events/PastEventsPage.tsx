import { useMemo, useState } from "react";
import pastEventsText from "./past-events.txt?raw";

type PastEvent = { event: string; date: string; venue: string; time: string; year: string };

const datePattern = /^(?:(?:Mon|Tue|Tues|Wed|Thu|Thurs|Fri|Sat|Sun)\s+)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:,?\s+\d{2,4})?$|^\d{1,2}\/\d{1,2}\/\d{2,4}(?:\s*&)?$/i;
const timePattern = /(?:\d{1,2}(?::\d{2})?\s*(?:am|pm)|noon|onwards|PST|PDT|IST)(?:\s*[-–]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?/i;
const noisePattern = /^(?:Past Events|Details of event\s*Date\s*Venue\s*Time|Details of event|Date\s*Venue\s*Time|Date\s*Time|Venue|Time)$/i;

function tidy(lines: string[]) {
  return lines.map((line) => line.trim()).filter((line) => line && !noisePattern.test(line)).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function yearFrom(date: string, context: string) {
  // Numeric archive dates are month/day/year. Only the final segment is the
  // year: in 1/26/2020, 26 is the day—not the year 2026.
  const numeric = date.match(/\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})(?:\s*&.*)?$/);
  if (numeric) return numeric[1].length === 2 ? `20${numeric[1]}` : numeric[1];
  const written = date.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+(\d{4})$/i);
  if (written) return written[1];
  const nearby = context.match(/20\d{2}/g);
  return nearby?.at(-1) ?? "Earlier";
}

function readVenueAndTime(lines: string[], start: number, initial: string[]) {
  const venue = [...initial];
  let time = "—";
  let end = start - 1;
  if (venue.length && timePattern.test(venue.at(-1) ?? "")) time = venue.pop() ?? "—";
  if (time !== "—") return { venue: tidy(venue), time, end };
  for (let cursor = start; cursor < lines.length; cursor += 1) {
    const line = lines[cursor].trim();
    if (!line) continue;
    const parts = line.split("\t").map((cell) => cell.trim()).filter(Boolean);
    if (datePattern.test((parts[0] ?? "").replace(/\s*&$/, ""))) break;
    const finalPart = parts.at(-1) ?? "";
    if (parts.length > 1 && timePattern.test(finalPart)) {
      venue.push(...parts.slice(0, -1));
      time = finalPart;
      end = cursor;
      break;
    }
    if (timePattern.test(line) && venue.length) {
      time = line;
      end = cursor;
      break;
    }
    venue.push(...parts);
    end = cursor;
  }
  return { venue: tidy(venue), time, end };
}

function parsePastEvents(raw: string): PastEvent[] {
  const rows: PastEvent[] = [{
    event: "Bay Area Kala Utsavam 2025",
    date: "2/22/25 & 2/23/25",
    venue: "University of Silicon Andhra\n1521 California Circle\nMilpitas, CA 95035",
    time: "8am–6pm",
    year: "2025",
  }];
  const lines = raw.replace(/\r/g, "").split("\n");
  let pending: string[] = [];
  let context = "";

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    if (!rawLine.trim()) continue;
    context += ` ${rawLine}`;
    const cells = rawLine.split("\t").map((cell) => cell.trim());
    const dateCell = cells.findIndex((cell) => datePattern.test(cell.replace(/\s*&$/, "")) || /^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(cell));

    if (cells.length > 1 && dateCell >= 0) {
      const date = cells[dateCell];
      const event = tidy([...pending, ...cells.slice(0, dateCell)]);
      const details = readVenueAndTime(lines, index + 1, cells.slice(dateCell + 1));
      if (event) rows.push({ event, date, venue: details.venue || "—", time: details.time, year: yearFrom(date, context) });
      pending = [];
      if (details.end >= index + 1) index = details.end;
      continue;
    }

    const line = rawLine.trim();
    if (datePattern.test(line.replace(/\s*&$/, ""))) {
      const continuation = line.endsWith("&") ? lines[index + 1]?.split("\t").map((cell) => cell.trim()) : null;
      if (continuation && continuation.length > 1 && datePattern.test(continuation[0])) {
        const event = tidy(pending);
        const date = `${line} ${continuation[0]}`;
        const details = readVenueAndTime(lines, index + 2, continuation.slice(1));
        if (event) rows.push({ event, date, venue: details.venue || "—", time: details.time, year: yearFrom(date, context) });
        pending = [];
        index = Math.max(index + 1, details.end);
        continue;
      }
      const event = tidy(pending);
      const after: string[] = [];
      let cursor = index + 1;
      while (cursor < lines.length && !datePattern.test(lines[cursor].trim().replace(/\s*&$/, "")) && !lines[cursor].includes("\t")) {
        if (lines[cursor].trim()) after.push(lines[cursor].trim());
        if (timePattern.test(lines[cursor])) { cursor += 1; break; }
        cursor += 1;
      }
      const timeIndex = after.findIndex((value) => timePattern.test(value));
      const venue = tidy(timeIndex >= 0 ? after.slice(0, timeIndex) : after.slice(0, 3));
      const time = timeIndex >= 0 ? after.slice(timeIndex).join(" ") : "—";
      if (event) rows.push({ event, date: line, venue: venue || "—", time, year: yearFrom(line, context) });
      pending = [];
      index = cursor - 1;
    } else if (!noisePattern.test(line)) {
      pending.push(line);
      if (pending.length > 18) pending = pending.slice(-18);
    }
  }
  return rows.filter((row) => row.event.length > 2);
}

export function PastEventsPage() {
  const events = useMemo(() => parsePastEvents(pastEventsText), []);
  const years = useMemo(() => [...new Set(events.map((event) => event.year))].filter((value) => value !== "Earlier" && Number(value) >= 1998 && Number(value) <= new Date().getFullYear()).sort((a, b) => Number(b) - Number(a)), [events]);
  const [year, setYear] = useState("All");
  const visible = year === "All" ? events : events.filter((event) => event.year === year);

  return (
    <main className="past-events-page">
      <header className="past-events-header">
        <a href="/" aria-label="Return to Sruthi Swara Laya home"><img src="/brand/sruthi-swara-laya-logo.png" alt="Sruthi Swara Laya" /></a>
        <a className="past-events-back" href="/events"><span aria-hidden="true">←</span> Back to events</a>
      </header>
      <section className="past-events-hero">
        <p>Our archive</p><h1>Past Events</h1>
        <span>Concerts, celebrations, student performances, and community gatherings through the years.</span>
      </section>
      <nav className="archive-years" aria-label="Filter past events by year">
        {["All", ...years].map((item) => <button key={item} className={year === item ? "is-active" : ""} onClick={() => setYear(item)}>{item}</button>)}
      </nav>
      <section className="past-events-archive" aria-label="Past events archive">
        <div className="archive-summary"><span>{year === "All" ? "Complete archive" : year}</span><strong>{visible.length} events</strong></div>
        <div className="events-table" role="table">
          <div className="events-table-head" role="row"><span role="columnheader">Event</span><span role="columnheader">Date</span><span role="columnheader">Venue</span><span role="columnheader">Time</span></div>
          {visible.map((event, index) => <article className="events-table-row" role="row" key={`${event.date}-${index}`}>
            <div role="cell" data-label="Event"><span className="event-number">{String(index + 1).padStart(2, "0")}</span><h2>{event.event}</h2></div>
            <div role="cell" data-label="Date">{event.date}</div>
            <div role="cell" data-label="Venue">{event.venue || "—"}</div>
            <div role="cell" data-label="Time">{event.time || "—"}</div>
          </article>)}
        </div>
      </section>
      <footer className="past-events-footer"><span>Sruthi Swara Laya</span><a href="/events">Return to events →</a></footer>
    </main>
  );
}
