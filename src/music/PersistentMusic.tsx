import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

export type Track = { title: string; artist: string; src?: string };

export const tracks: Track[] = [
  { title: "Pallavi Concert · 1 of 5", artist: "Manasa Suresh · Sruthi Swara Laya", src: "/audio/manasa-suresh-pallavi-concert-1-of-5.mp3" },
  { title: "Concert Archive · 2 of 5", artist: "Audio coming soon" },
  { title: "Concert Archive · 3 of 5", artist: "Audio coming soon" },
  { title: "Concert Archive · 4 of 5", artist: "Audio coming soon" },
  { title: "Concert Archive · 5 of 5", artist: "Audio coming soon" },
];

type MusicState = {
  trackIndex: number; currentTrack: Track; playing: boolean; audioActive: boolean;
  currentTime: number; duration: number; toggle: () => void; seek: (value: number) => void;
  previous: () => void; next: () => void; select: (index: number) => void;
};

const MusicContext = createContext<MusicState | null>(null);

export function PersistentMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentTrack = tracks[trackIndex];

  const play = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack.src) return;
    audio.volume = 0.2;
    try {
      await audio.play();
      setPlaying(true);
      setAudioActive(true);
      localStorage.setItem("ssl-music", "on");
    } catch {
      // Safari can reject audible autoplay. Never claim music is playing when
      // the media element is actually paused; the first user gesture retries it.
      setPlaying(false);
      setAudioActive(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (localStorage.getItem("ssl-music") !== "off" && currentTrack.src) void play();
  }, [trackIndex]);

  useEffect(() => {
    const unlock = () => {
      if (localStorage.getItem("ssl-music") !== "off" && audioRef.current?.paused) void play();
    };
    window.addEventListener("pointerdown", unlock, { once: true, capture: true });
    window.addEventListener("keydown", unlock, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", unlock, { capture: true });
      window.removeEventListener("keydown", unlock, { capture: true });
    };
  }, [trackIndex]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack.src) return;
    if (!audio.paused) {
      audio.pause(); setPlaying(false); setAudioActive(false); localStorage.setItem("ssl-music", "off");
    } else { localStorage.setItem("ssl-music", "on"); void play(); }
  };
  const select = (index: number) => { setTrackIndex(index); setPlaying(Boolean(tracks[index].src)); };
  const move = (direction: number) => select((trackIndex + direction + tracks.length) % tracks.length);

  return (
    <MusicContext.Provider value={{
      trackIndex, currentTrack, playing, audioActive, currentTime, duration, toggle,
      seek: (value) => { if (audioRef.current) audioRef.current.currentTime = value; },
      previous: () => move(-1), next: () => move(1), select,
    }}>
      <audio ref={audioRef} src={currentTrack.src} autoPlay loop playsInline preload="auto"
        onPlay={() => { setPlaying(true); setAudioActive(true); }} onPause={() => setAudioActive(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} />
      {children}
      <button className="persistent-music-toggle" onClick={toggle} aria-pressed={playing} aria-label={playing ? "Turn music off" : "Turn music on"}>
        <span className={audioActive ? "is-active" : ""} aria-hidden="true"><i /><i /><i /></span>
        {playing ? "Music on" : "Music off"}
      </button>
    </MusicContext.Provider>
  );
}

export function usePersistentMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error("usePersistentMusic must be used inside PersistentMusicProvider");
  return value;
}
