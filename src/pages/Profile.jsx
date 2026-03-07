import { useState, useEffect } from "react";
import {Star, User, Bookmark,CheckCircle,PlayCircle,Clock } from "lucide-react";
import { getUserStats, getWatchlist, getProfile } from "../api";

export default function Profile() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, list, u] = await Promise.all([
          getUserStats(),
          getWatchlist(),
          getProfile(),
        ]);
        setStats(s);
        setUser(u);
        const listArray = Array.isArray(list) ? list : [];
        setRecent(
          [...listArray]
            .sort((a, b) => new Date(b.added_at) - new Date(a.added_at))
            .slice(0, 5)
        );
      } catch (err) {
        console.error("Profile load error:", err);
      }
    };
    load();
  }, []);

  if (!stats) return <div className="page"><p style={{ color: "var(--muted)" }}>Loading...</p></div>;

  return (
    <div className="page">
      <h1 className="page-title">MY <span>PROFILE</span></h1>

      <div className="profile-avatar">
        <div className="avatar-circle"><User size={25} /> </div>
        <div>
          <p className="profile-name">{user?.username || "Movie Enthusiast"}</p>
          <p className="profile-sub">{user?.email}</p>
        </div>
      </div>

      <div className="stats-grid">
        {[
          { label: "Total Saved", value: stats.total, icon: <Bookmark size={18} className="bookmark-icon-red"/> },
          { label: "Watched", value: stats.watched, icon: <CheckCircle size={18} color="#22c55e" /> },
          { label: "Watching", value: stats.watching, icon: <PlayCircle size={18} color="#3b82f6" /> },
          { label: "Want to Watch", value: stats.want_to_watch, icon: <Clock size={18} color="#f59e0b" /> },
          { label: "Avg. Rating", value: stats.avg_rating || "—", icon: <Star size={18} fill="gold" color="gold" /> },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <span className="stat-emoji">{s.icon }</span>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {recent.length > 0 && (
        <>
          <h2 className="section-heading">Recently Added</h2>
          <div className="recent-list">
            {recent.map((m) => (
              <div key={m.tmdb_id} className="recent-item">
                <span className="recent-title">{m.title}</span>
                <span className="recent-status">{m.status.replace(/_/g, " ")}</span>
                {m.rating > 0 && <span className="recent-rating">{"★".repeat(m.rating)}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}