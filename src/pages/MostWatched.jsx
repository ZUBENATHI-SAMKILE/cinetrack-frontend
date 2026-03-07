import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMostWatched } from "../api";
import { Film, Flame } from "lucide-react";

const IMG_BASE = "https://image.tmdb.org/t/p/w200";

export default function MostWatched() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMostWatched();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("MostWatched load error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="page"><p style={{ color: "var(--muted)" }}>Loading...</p></div>;

  return (
    <div className="page">
      <h1 className="page-title">MOST <span>WATCHED</span></h1>
      <p className="mw-subtitle"><Flame size={28} color="orange"/> Top movies added by all users on CineTrack.</p>

      {movies.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: "3rem" }}><Film size={48} className="empty-icon" /></p>
          <p>No data yet — start adding movies to your list!</p>
        </div>
      ) : (
        <div className="mw-list">
          {movies.map((movie, i) => (
            <Link to={`/movie/${movie.tmdb_id}`} key={movie.tmdb_id} className="mw-item">
              <span className="mw-rank">{String(i + 1).padStart(2, "0")}</span>
              <div className="mw-poster">
                {movie.poster_path
                  ? <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
                  : <div className="mw-no-poster"><Film size={48} /></div>
                }
              </div>
              <div className="mw-info">
                <p className="mw-title">{movie.title}</p>
                <p className="mw-year">{movie.release_date?.split("-")[0]}</p>
              </div>
              <div className="mw-right">
                <span className="mw-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                <span className="mw-votes">
                  {movie.watch_count} {movie.watch_count === 1 ? "user" : "users"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}