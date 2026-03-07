import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { getWatchlist, removeFromWatchlist, updateWatchlistItem } from "../api";
import StarRating from "../components/StarRating";

const IMG_BASE = "https://image.tmdb.org/t/p/w200";

const STATUS_LABELS = {
  all: "All",
  want_to_watch: "Want to Watch",
  watching: "Watching",
  watched: "Watched",
};

export default function Watchlist() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getWatchlist();
      setList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Watchlist load error:", err);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? list : list.filter((m) => m.status === filter);

  const handleRemove = async (tmdbId) => {
    await removeFromWatchlist(tmdbId);
    setList((prev) => prev.filter((m) => m.tmdb_id !== tmdbId));
  };

  const handleStatus = async (tmdbId, val) => {
    await updateWatchlistItem(tmdbId, { status: val });
    setList((prev) => prev.map((m) => m.tmdb_id === tmdbId ? { ...m, status: val } : m));
  };

  const handleRating = async (tmdbId, val) => {
    await updateWatchlistItem(tmdbId, { rating: val });
    setList((prev) => prev.map((m) => m.tmdb_id === tmdbId ? { ...m, rating: val } : m));
  };

  return (
    <div className="page">
      <h1 className="page-title">MY <span>LIST</span></h1>

      <div className="filter-tabs">
        {Object.entries(STATUS_LABELS).map(([val, label]) => (
          <button
            key={val}
            className={`filter-tab ${filter === val ? "active" : ""}`}
            onClick={() => setFilter(val)}
          >
            {label}
            <span className="tab-count">
              {val === "all" ? list.length : list.filter((m) => m.status === val).length}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "var(--muted)" }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: "3rem" }}><Film size={28} /></p>
          <p>Nothing here yet. <Link to="/" style={{ color: "var(--accent)" }}>Discover movies →</Link></p>
        </div>
      ) : (
        <div className="watchlist-grid">
          {filtered.map((movie) => (
            <div key={movie.tmdb_id} className="watchlist-item">
              <Link to={`/movie/${movie.tmdb_id}`} className="wl-poster">
                {movie.poster_path
                  ? <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
                  : <div className="wl-no-poster"><Film size={28} /></div>
                }
              </Link>
              <div className="wl-info">
                <Link to={`/movie/${movie.tmdb_id}`} className="wl-title">{movie.title}</Link>
                <p className="wl-year">{movie.release_date?.split("-")[0]}</p>
                <select
                  className="status-select-sm"
                  value={movie.status}
                  onChange={(e) => handleStatus(movie.tmdb_id, e.target.value)}
                >
                  <option value="want_to_watch">Want to Watch</option>
                  <option value="watching">Watching</option>
                  <option value="watched">Watched</option>
                </select>
                <StarRating value={movie.rating} onChange={(v) => handleRating(movie.tmdb_id, v)} />
              </div>
              <button className="wl-remove" onClick={() => handleRemove(movie.tmdb_id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}