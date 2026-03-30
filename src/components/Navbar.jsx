import { Link, useLocation, useNavigate } from "react-router-dom";
import { Film, User } from "lucide-react";
import { logout, getProfile } from "../api";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(setUser).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    { to: "/home", label: "Home" },
    { to: "/watchlist", label: "My List" },
    { to: "/most-watched", label: "Most Watched" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
         <Film size={28} /> <span>CineTrack</span>
      </Link>
      <div className="navbar-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link ${pathname === l.to ? "active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="navbar-user">
        {user ? (
          <>
            <span className="nav-username"><User size={21} /> {user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav-link auth-link">Sign in</Link>
            <Link to="/register" className="nav-link auth-link">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}