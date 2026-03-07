# 🎬 CineTrack — Movie Tracker App

A full-stack movie tracking web application built with **React**, **Django**, and **MongoDB**. Users can search for movies, manage a personal watchlist, rate films, and view stats about their watching habits.

---

## 🚀 Features

- 🔐 JWT Authentication (Register, Login, Logout, Auto token refresh)
- 🔍 Search movies powered by the TMDB API
- 🎥 Movie detail pages with cast, runtime, genres, and backdrop
- 📋 Personal watchlist with status tracking (Want to Watch / Watching / Watched)
- ⭐ Star rating system (1–5 stars)
- 📊 Profile stats (total saved, watched, avg rating)
- 🔥 Most Watched page showing top movies across all users
- 📱 Responsive design with a dark cinematic theme

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Python, Django 3.2, Django REST Framework |
| Database | MongoDB via Djongo |
| Auth | JWT (djangorestframework-simplejwt) |
| Movie Data | TMDB API (v3) |
| Styling | Plain CSS with CSS variables |

---



---

## 🌐 API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Create a new account |
| POST | `/api/auth/login/` | Login and receive JWT tokens |
| POST | `/api/auth/logout/` | Blacklist refresh token |
| GET | `/api/auth/profile/` | Get current user info |
| POST | `/api/auth/token/refresh/` | Refresh access token |

### Movies

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/movies/popular/` | Fetch popular movies |
| GET | `/api/movies/search/?q=inception` | Search movies |
| GET | `/api/movies/<tmdb_id>/` | Get movie detail + cast |

### Watchlist

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/movies/watchlist/` | Get user's watchlist |
| POST | `/api/movies/watchlist/` | Add movie to watchlist |
| GET | `/api/movies/watchlist/<tmdb_id>/` | Check if movie is in list |
| PATCH | `/api/movies/watchlist/<tmdb_id>/` | Update status or rating |
| DELETE | `/api/movies/watchlist/<tmdb_id>/` | Remove from watchlist |

### Stats

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/movies/stats/` | Get user stats |
| GET | `/api/movies/most-watched/` | Top movies across all users |

---

🧑‍💻 Author

Created with 💙 by Zubenathi Samkile.