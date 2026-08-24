import { useState } from "react";

const videos = [
  { id: "kxmkWQl-DVI", title: "Pallavi Concert · 1 of 5", source: "Nada Vipanchi" },
  { id: "5q5m17b0H0c", title: "Pallavi Concert · 2 of 5", source: "Nada Vipanchi" },
  { id: "8y5DhzNLl1A", title: "Pallavi Concert · 3 of 5", source: "Nada Vipanchi" },
  { id: "oiEvgNnrsyI", title: "Pallavi Concert · 4 of 5", source: "Nada Vipanchi" },
  { id: "2IKlKIh-zUY", title: "Pallavi Concert · 5 of 5", source: "Nada Vipanchi" },
  { id: "jsEdmQxvKDM", title: "Chennai Music Season 2015", source: "Cleveland Aradhana" },
  { id: "jiWlPEIk2Zo", title: "Manasa Suresh · Carnatic Vocal", source: "Swara Lahari · Episode 348" },
  { id: "158x9LrY9DQ", title: "Irakkam Varaamal", source: "IndianRaga San Jose Labs" },
  { id: "NwocFulrgZU", title: "YCMF 2014 · Manasa Suresh", source: "iCarnatic" },
  { id: "37AZK4-FXx0", title: "Margazhi Music Mahothsavam 2014", source: "BGS Trust · Manasa Suresh Vocal" },
  { id: "ZLWjAHa_9PQ", title: "Rasika Pria with Dr. Balamuralikrishna", source: "Featured performance" },
];

const photos = [
  { title: "2018 Photos", href: "https://photos.app.goo.gl/QUYcCgK8gFjrDqGk6", image: "/legacy/legacy-07.jpg" },
  { title: "Cleveland Thyagaraja 2015 & Vocal Arangetram", href: "https://photos.app.goo.gl/FVrEhRoC2jhNvRw29", image: "/legacy/legacy-03.jpg" },
  { title: "Shruthi Swara Laya", href: "https://photos.app.goo.gl/jx1AwdL2PVanSPWQ7", image: "/legacy/legacy-09.jpg" },
];

const nav = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Admissions", href: "/admissions" },
  { label: "Videos / Gallery", href: "/videos-gallery" },
  { label: "Contact Us", href: "/contact" },
];

function VideoCard({ video, index }: { video: typeof videos[number]; index: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="gallery-video-card">
      <div className="gallery-video-preview">
        {playing ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button onClick={() => setPlaying(true)} aria-label={`Play ${video.title}`}>
            <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={`Video preview for ${video.title}`} loading={index < 3 ? "eager" : "lazy"} />
            <span className="gallery-play" aria-hidden="true">▶</span>
          </button>
        )}
      </div>
      <div className="gallery-video-copy">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div><h2>{video.title}</h2><p>{video.source}</p></div>
        <a href={`https://youtu.be/${video.id}`} target="_blank" rel="noreferrer" aria-label={`Open ${video.title} on YouTube`}>↗</a>
      </div>
    </article>
  );
}

export function GalleryPage() {
  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <a href="/" aria-label="Sruthi Swara Laya home"><img src="/brand/sruthi-swara-laya-logo.png" alt="Sruthi Swara Laya" /></a>
        <nav aria-label="Main navigation">{nav.map((item) => <a key={item.label} href={item.href} className={item.label === "Videos / Gallery" ? "is-active" : ""}>{item.label}</a>)}</nav>
      </header>

      <section className="gallery-hero">
        <p>Audio &amp; video gallery</p>
        <h1>Featured<br /><em>performances.</em></h1>
        <span>Concerts, collaborations, and archival performances from the Sruthi Swara Laya community.</span>
      </section>

      <section className="featured-videos" aria-label="Featured video performances">
        <div className="gallery-section-heading"><p>Watch &amp; listen</p><span>11 performances</span></div>
        <div className="gallery-video-grid">{videos.map((video, index) => <VideoCard key={video.id} video={video} index={index} />)}</div>
      </section>

      <section className="photo-gallery" aria-labelledby="photo-gallery-title">
        <div className="photo-gallery-heading"><p>Memories through the years</p><h2 id="photo-gallery-title">Photo Gallery</h2></div>
        <div className="photo-gallery-grid">
          {photos.map((album) => (
            <a key={album.title} href={album.href} target="_blank" rel="noreferrer" className="photo-album-card">
              <img src={album.image} alt="" /><span><strong>{album.title}</strong><small>View in Google Photos ↗</small></span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
