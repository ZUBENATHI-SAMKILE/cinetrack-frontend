import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { fetchPopular, searchMovies } from "../api";
import { Film, Flame } from "lucide-react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPopular();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Popular movies error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSearching(false);
      const reload = async () => {
        try {
          const data = await fetchPopular();
          setMovies(Array.isArray(data) ? data : []);
        } catch {
          setMovies([]);
        }
      };
      reload();
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      setLoading(true);
      try {
        const results = await searchMovies(query);
        setMovies(Array.isArray(results) ? results : []);
      } catch (err) {
        console.error("Search error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="page-title">DISCOVER <span>MOVIES</span></h1>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <p className="section-label">
        <Flame size={25} color="orange"/> {searching ? `Results for "${query}"` : " Popular Right Now"} 
      </p>

      {loading ? (
        <div className="loading-grid">
          {Array(12).fill(0).map((_, i) => <div key={i} className="skeleton" />)}
        </div>
      ) : movies.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: "3rem" }}><Film size={28} /></p> 
          <p>No movies found for "{query}"</p>
        </div>
      ) : (
        <div className="grid">
          {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  );
}