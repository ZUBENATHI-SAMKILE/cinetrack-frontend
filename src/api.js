import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Axios Instance 
const api = axios.create({ baseURL: BASE_URL });

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem("refresh_token");
        const { data } = await axios.post(`${BASE_URL}/auth/token/refresh/`, { refresh });
        localStorage.setItem("access_token", data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth 

export async function register(email, username, password, confirm_password) {
  const { data } = await api.post("/auth/register/", { email, username, password, confirm_password });
  localStorage.setItem("access_token", data.tokens.access);
  localStorage.setItem("refresh_token", data.tokens.refresh);
  return data.user;
}

export async function login(email, password) {
  const { data } = await api.post("/auth/login/", { email, password });
  localStorage.setItem("access_token", data.tokens.access);
  localStorage.setItem("refresh_token", data.tokens.refresh);
  return data.user;
}

export async function logout() {
  const refresh = localStorage.getItem("refresh_token");
  try { await api.post("/auth/logout/", { refresh }); } catch {}
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function getProfile() {
  const { data } = await api.get("/auth/profile/");
  return data;
}

export function isLoggedIn() {
  return !!localStorage.getItem("access_token");
}

// Movies (TMDB Proxy) 

export async function fetchPopular() {
  const { data } = await api.get("/movies/popular/");
  return data;
}

export async function searchMovies(query) {
  const { data } = await api.get("/movies/search/", { params: { q: query } });
  return data;
}

export async function fetchMovieDetail(tmdbId) {
  const { data } = await api.get(`/movies/${tmdbId}/`);
  return data;
}

// Watchlist 

export async function getWatchlist(status = null) {
  const params = status ? { status } : {};
  const { data } = await api.get("/movies/watchlist/", { params });
  return data;
}

export async function addToWatchlist(movie, status = "want_to_watch", rating = 0) {
  const { data } = await api.post("/movies/watchlist/", {
    tmdb_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path || "",
    release_date: movie.release_date || "",
    overview: movie.overview || "",
    vote_average: movie.vote_average || 0,
    status,
    rating,
  });
  return data;
}

export async function checkWatchlistItem(tmdbId) {
  const { data } = await api.get(`/movies/watchlist/${tmdbId}/`);
  return data;
}

export async function updateWatchlistItem(tmdbId, updates) {
  const { data } = await api.patch(`/movies/watchlist/${tmdbId}/`, updates);
  return data;
}

export async function removeFromWatchlist(tmdbId) {
  await api.delete(`/movies/watchlist/${tmdbId}/`);
}

// Stats & Most Watched 

export async function getUserStats() {
  const { data } = await api.get("/movies/stats/");
  return data;
}

export async function getMostWatched() {
  const { data } = await api.get("/movies/most-watched/");
  return data;
}