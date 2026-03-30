import { Link } from "react-router-dom";
import { Play, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";

const heroTrailer = {
  id: 1,
  title: "Sinners",
  subtitle: "Supernatural horror thriller",
  poster: "https://image.tmdb.org/t/p/w500/705nQHqe4JGdEisrQmVYmXyjs1U.jpg",
  year: "2025",
  genre: "Horror",
  description: "Twin brothers return to their hometown to start fresh, only to find a greater evil waiting to welcome them back.",
};

const featuredTrailers = [
  {
    id: 2,
    title: "A Minecraft Movie",
    subtitle: "Family adventure comedy",
    poster: "https://image.tmdb.org/t/p/w500/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
    year: "2025",
    genre: "Adventure",
    description: "Four misfits are pulled through a portal into the Overworld and must master the cubic wonderland to find their way home.",
  },
  {
    id: 3,
    title: "Thunderbolts*",
    subtitle: "Marvel antihero action",
    poster: "https://image.tmdb.org/t/p/w500/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg",
    year: "2025",
    genre: "Action",
    description: "Seven disillusioned castoffs are ensnared in a death trap and must go on a dangerous mission that forces them to confront their darkest pasts.",
  },
  {
    id: 4,
    title: "Barbie",
    subtitle: "Playful blockbuster teaser",
    poster: "https://image.tmdb.org/t/p/w500/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg",
    year: "2023",
    genre: "Comedy",
    description: "A bright and bold trailer for the story of Barbie in the real world.",
  },
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    subtitle: "Animated multiverse action",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    year: "2023",
    genre: "Action",
    description: "An electrifying first look at the next chapter of the Spider-Verse saga.",
  },
];

const fallbackPoster = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750"><rect width="500" height="750" fill="#13131a"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="#e8b84b" font-family="DM Sans, sans-serif" font-size="24">Poster unavailable</text></svg>`)}`;

export default function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <section className="landing-hero">
        <div className="landing-copy">
          <span className="landing-badge">
            <Sparkles size={18} /> Trending trailers
          </span>
          <h1>Discover the trailers that set your next movie night in motion.</h1>
          <p>
            CineTrack helps you preview trending movies, save the ones you love, and jump to all your favorites with a single click.
          </p>

          <div className="landing-actions">
            <Link to="/login" className="Auth-btn">
              <Play size={16} /> Sign in
            </Link>
            <Link to="/register" className="Auth-link">
              Create account
            </Link>
          </div>
        </div>

        <div className="landing-hero-card">
          <div className="hero-card-top">
            <span className="section-label">Now previewing</span>
            <h2>{heroTrailer.title}</h2>
            <p>{heroTrailer.subtitle}</p>
          </div>
          <div className="hero-card-image">
            <img
              src={heroTrailer.poster}
              alt={heroTrailer.title}
              onError={(event) => {
                if (event.currentTarget.src !== fallbackPoster) {
                  event.currentTarget.src = fallbackPoster;
                }
              }}
            />
            <div className="hero-card-play">
              <Play size={18} />
            </div>
          </div>
          <div className="hero-card-meta">
            <p>{heroTrailer.description}</p>
            <div className="hero-card-tags">
              <span>{heroTrailer.year}</span>
              <span>{heroTrailer.genre}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <div>
            <span className="section-label">Featured trailers</span>
            <h2>What to watch this week</h2>
          </div>
          <p>Browse the latest trailer previews and keep the best movies on your watchlist.</p>
        </div>

        <div className="landing-grid">
          {featuredTrailers.map((trailer) => (
            <article className="trailer-card" key={trailer.id}>
              <div className="trailer-thumb">
                <img
                  src={trailer.poster}
                  alt={trailer.title}
                  onError={(event) => {
                    if (event.currentTarget.src !== fallbackPoster) {
                      event.currentTarget.src = fallbackPoster;
                    }
                  }}
                />
                <span className="trailer-play-icon">
                  <Play size={16} />
                </span>
              </div>
              <div className="trailer-copy">
                <h3>{trailer.title}</h3>
                <p>{trailer.subtitle}</p>
                <div className="trailer-meta">
                  <span>{trailer.year}</span>
                  <span>{trailer.genre}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
