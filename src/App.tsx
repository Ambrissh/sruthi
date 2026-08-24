import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LegacyScrollTransition } from "./legacy/LegacyScrollTransition";
import { tracks, type Track, usePersistentMusic } from "./music/PersistentMusic";
import "./styles.css";

const navigation = ["Home", "Events", "Admissions", "Videos / Gallery", "Contact Us"];
const ease = [0.22, 1, 0.36, 1] as const;

function navigationHref(item: string) {
  if (item === "Home") return "/";
  if (item === "Events") return "/events";
  if (item === "Admissions") return "/admissions";
  if (item === "Videos / Gallery") return "/videos-gallery";
  if (item === "Contact Us") return "/contact";
  return `/#${item.toLowerCase().replaceAll(" ", "-").replace("/", "")}`;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

function BrandMark() {
  return (
    <a href="/" className="group block" aria-label="Sruthi Swara Laya home">
      <img src="/brand/sruthi-swara-laya-logo.png" alt="Sruthi Swara Laya" className="h-12 w-28 object-contain object-left transition-transform duration-500 group-hover:-translate-y-0.5 sm:h-14 sm:w-36" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header initial={{ opacity: 0, x: -48 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease }} className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex h-24 max-w-[1540px] items-center justify-between px-6 lg:px-10" aria-label="Main navigation">
        <BrandMark />
        <div className="hidden items-center gap-7 xl:flex">
          {navigation.map((item) => <a key={item} href={navigationHref(item)} className="nav-link">{item}</a>)}
        </div>
        <div className="flex items-center gap-3 lg:gap-5">
          <button onClick={() => setOpen((value) => !value)} className="menu-button xl:hidden" aria-label="Toggle navigation" aria-expanded={open}>
            <span className={open ? "translate-y-[3px] rotate-45" : ""} />
            <span className={open ? "-translate-y-[3px] -rotate-45" : ""} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="mobile-menu xl:hidden">
          {navigation.map((item) => <a key={item} onClick={() => setOpen(false)} href={navigationHref(item)}>{item}</a>)}
        </motion.div>}
      </AnimatePresence>
    </motion.header>
  );
}

type PlayerProps = {
  trackIndex: number; currentTrack: Track; playing: boolean; audioActive: boolean; currentTime: number; duration: number;
  onToggle: () => void; onSeek: (value: number) => void; onPrevious: () => void; onNext: () => void; onSelect: (index: number) => void;
};

function MusicalNotes() {
  const notes = ["C", "G", "C", "G", "C", "G", "C"];
  return (
    <div className="music-notes is-playing" aria-hidden="true">
      {notes.map((note, index) => (
        <span key={`${note}-${index}`} style={{ "--note-index": index } as React.CSSProperties}>
          <svg className="western-note" viewBox="0 0 36 48">
            <g className="western-note-staff">
              <path d="M2 14H34M2 19H34M2 24H34M2 29H34M2 34H34" />
            </g>
            <g className={`western-note-mark western-note-${note.toLowerCase()}`}>
              <ellipse cx="15" cy={note === "C" ? 37 : 24} rx="5.5" ry="3.8" transform={`rotate(-18 15 ${note === "C" ? 37 : 24})`} />
              <path d={note === "C" ? "M20 36V10" : "M20 23V4"} />
              {note === "C" && <path className="ledger-line" d="M6 37H23" />}
            </g>
          </svg>
        </span>
      ))}
    </div>
  );
}

function ShrutiCallout() {
  return (
    <motion.aside initial={{ opacity: 0, x: -42 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.75, ease }} className="shruti-callout">
      <svg className="shruti-arrow" viewBox="0 0 110 72" aria-hidden="true">
        <path d="M104 11 C 67 2, 46 13, 54 32 C 60 48, 35 55, 8 56" />
        <path d="M18 47 L 7 56 L 19 64" />
      </svg>
      <p className="font-serif text-xl italic leading-none text-ink/80">This is a shruti box.</p>
      <p className="mt-2 text-[9px] leading-relaxed tracking-[0.06em] text-ink/50">A shruti box does not play a melody; it creates the tonal background that keeps the music grounded. This one is tuned to C, sustaining the tones C and G.</p>
    </motion.aside>
  );
}

function ShrutiPlayer({ trackIndex, currentTrack, playing, audioActive, currentTime, duration, onToggle, onSeek, onPrevious, onNext, onSelect }: PlayerProps) {
  return (
    <motion.div initial={{ opacity: 0, x: -90 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.15, delay: 0.12, ease }} className="player-shell">
      <div className="shruti-box-window" aria-label="Shruti box music player">
        <img src="/player/shruti-box-cutout.png" alt="Traditional black shruti box" />
      </div>
      <MusicalNotes />
      <ShrutiCallout />
      <div className="player-console">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="mt-2 truncate font-serif text-2xl font-normal sm:text-3xl">{currentTrack.title}</h2>
            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.12em] text-ink/50">{currentTrack.artist}</p>
          </div>
          <span className="font-serif text-sm italic text-ink/45">{String(trackIndex + 1).padStart(2, "0")} / 05</span>
        </div>

        <div className="mt-7">
          <input className="progress-range" type="range" min="0" max={duration || 1} step="0.1" value={Math.min(currentTime, duration || 1)} onChange={(event) => onSeek(Number(event.target.value))} aria-label="Track progress" />
          <div className="mt-2 flex justify-between text-[9px] tracking-[0.14em] text-ink/45"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2" aria-label="Select a track">
            {tracks.map((track, index) => <button key={track.title} onClick={() => onSelect(index)} className={`track-dot ${index === trackIndex ? "is-active" : ""}`} aria-label={`Select ${track.title}`} />)}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onPrevious} className="transport-small" aria-label="Previous track">‹</button>
            <button onClick={onToggle} className="transport-main" aria-label={playing ? "Pause music" : "Play music"}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span></button>
            <button onClick={onNext} className="transport-small" aria-label="Next track">›</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const { trackIndex, currentTrack, playing, audioActive, currentTime, duration, toggle, seek, previous, next, select } = usePersistentMusic();

  return (
    <main className="traditional-page min-h-svh overflow-x-clip text-ink">
      <LegacyScrollTransition hero={<>
        <Header />
        <section className="relative z-10 mx-auto grid min-h-svh max-w-[1540px] grid-cols-1 items-center gap-10 px-6 pb-14 pt-28 lg:grid-cols-[52%_48%] lg:gap-0 lg:px-10 lg:pb-8 lg:pt-24">
        <div className="flex items-center justify-center lg:-translate-y-10 lg:justify-start"><ShrutiPlayer trackIndex={trackIndex} currentTrack={currentTrack} playing={playing} audioActive={audioActive} currentTime={currentTime} duration={duration} onToggle={toggle} onSeek={seek} onPrevious={previous} onNext={next} onSelect={select} /></div>
        <div className="mx-auto w-full max-w-[820px] pb-8 text-center lg:-translate-y-9 lg:pb-0 lg:pl-[2vw] lg:text-left">
          <motion.h1 initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.05, delay: 0.2, ease }} className="font-serif text-[clamp(4.5rem,7.2vw,8.7rem)] font-normal leading-[0.76] tracking-[-0.06em]">
            Sruthi<br /><span className="whitespace-nowrap italic">Swara Laya</span>
          </motion.h1>
          <motion.h2 initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.05, delay: 0.34, ease }} className="mt-7 max-w-3xl font-serif text-[clamp(2.6rem,4.2vw,5.2rem)] font-normal italic leading-[0.94] tracking-[-0.04em] text-ink/88">
            Touching the future with traditional arts.
          </motion.h2>
          <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.48, ease }} className="information-grid">
            <div>
              <p className="information-label">Our Story</p>
              <p className="information-copy">Shruthi Swara Laya, USA, is a fine arts institution dedicated to Performing Arts in Indian Music and Dance. Founded by Anuradha Suresh in April 1998, it has earned the support and strength of Bay Area communities.</p>
            </div>
            <div>
              <p className="information-label">Our Mission</p>
              <p className="information-copy">To provide professional and academic training in Carnatic music and Harikatha through structured learning, workshops, and progressive performance opportunities at school and community venues.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.95, delay: 0.64, ease }} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="/contact" className="primary-button">Contact Us <span aria-hidden="true">↗</span></a>
            <a href="/events" className="secondary-button">Explore Events</a>
          </motion.div>
        </div>
        </section>
      </>} />
    </main>
  );
}
