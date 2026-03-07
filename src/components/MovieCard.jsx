import { Link } from "react-router-dom";
import { Film } from "lucide-react";

const IMG_BASE = "https://image.tmdb.org/t/p/w300";

export default function MovieCard({ movie }) {
  const { id, title, poster_path, vote_average, release_date } = movie;
  const year = release_date?.split("-")[0];
  const rating = vote_average?.toFixed(1);

  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <div className="card-poster">
        {poster_path ? (
          <img src={`${IMG_BASE}${poster_path}`} alt={title} loading="lazy" />
        ) : (
          <div className="no-poster"><Film size={28} /></div>
        )}
        {rating && (
          <div className="card-rating">⭐ {rating}</div>
        )}
      </div>
      <div className="card-info">
        <p className="card-title">{title}</p>
        {year && <p className="card-year">{year}</p>}
      </div>
    </Link>
  );
}