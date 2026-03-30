import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import MostWatched from "./pages/MostWatched";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes,no Navbar */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />

        {/* Protected routes ,with Navbar */}
        <Route path="/*" element={
          <PrivateRoute>
            <Navbar />
            <main>
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="movie/:id" element={<MovieDetail />} />
                <Route path="watchlist" element={<Watchlist />} />
                <Route path="profile" element={<Profile />} />
                <Route path="most-watched" element={<MostWatched />} />
              </Routes>
            </main>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;