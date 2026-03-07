import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import { Film, CheckCircle, ArrowLeft } from "lucide-react";
import { fetchMovieDetail, addToWatchlist, checkWatchlistItem, updateWatchlistItem, removeFromWatchlist } from "../api";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

const STATUS_LABELS = {
  want_to_watch: "Want to Watch",
  watching: "Watching",
  watched: "Watched",
};

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [inList, setInList] = useState(false);
  const [status, setStatus] = useState("want_to_watch");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [movieData, listData] = await Promise.all([
          fetchMovieDetail(id),
          checkWatchlistItem(parseInt(id)),
        ]);
        setMovie(movieData);
        if (listData.in_list) {
          setInList(true);
          setStatus(listData.status);
          setRating(listData.rating);
        }
      } catch (err) {
        console.error("MovieDetail load error:", err);
      }
    };
    load();
  }, [id]);

  if (!movie) return <div className="detail-loading">Loading...</div>;

  const genres = movie.genres?.map((g) => g.name).join(", ");
  const cast = movie.credits?.cast?.slice(0, 6).map((c) => c.name).join(", ");
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  const handleAdd = async () => {
    setLoading(true);
    try {
      await addToWatchlist(movie, status, rating);
      setInList(true);
    } catch (e) {
      if (e.response?.status === 409) setInList(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (field, value) => {
    if (field === "status") setStatus(value);
    if (field === "rating") setRating(value);
    await updateWatchlistItem(movie.id, { [field]: value });
  };

  const handleRemove = async () => {
    await removeFromWatchlist(movie.id);
    setInList(false);
    setRating(0);
    setStatus("want_to_watch");
  };

  return (
    <div className="detail-page">
      {movie.backdrop_path && (
        <div
          className="backdrop"
          style={{ backgroundImage: `url(${BACKDROP_BASE}${movie.backdrop_path})` }}
        />
      )}

      <div className="detail-content page">
        <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Back</button>

        <div className="detail-layout">
          <div className="detail-poster">
            {movie.poster_path
              ? <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
              : <div className="no-poster-lg"><Film size={48}  /></div>
            }
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>

            <div className="detail-meta">
              {movie.release_date?.split("-")[0] && (
                <span>{movie.release_date.split("-")[0]}</span>
              )}
              {runtime && <span>{runtime}</span>}
              {movie.vote_average > 0 && (
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
              )}
            </div>

            {genres && <p className="detail-genres">{genres}</p>}
            {movie.overview && <p className="detail-overview">{movie.overview}</p>}
            {cast && <p className="detail-cast"><strong>Cast:</strong> {cast}</p>}

            <div className="detail-actions">
              {!inList ? (
                <>
                  <select
                    className="status-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {Object.entries(STATUS_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                  <button className="btn-add" onClick={handleAdd} disabled={loading}>
                    {loading ? "Adding..." : "+ Add to My List"}
                  </button>
                </>
              ) : (
                <div className="in-list-panel">
                  <p className="in-list-label"><CheckCircle size={20} color="#22c55e"  /> In your list</p> 
                  <select
                    className="status-select"
                    value={status}
                    onChange={(e) => handleUpdate("status", e.target.value)}
                  >
                    {Object.entries(STATUS_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                  <StarRating value={rating} onChange={(v) => handleUpdate("rating", v)} />
                  <button className="btn-remove" onClick={handleRemove}>
                    Remove from List
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}