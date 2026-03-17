import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, ArrowLeft,Mail } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API}/auth/forgot-password/`, { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo"><Film size={28} /> <span>CineTrack</span></div>

        {success ? (
          <>
            <div className="auth-success-icon"><Mail size={28} /></div>
            <h2 className="auth-title">Check your email</h2>
            <p className="auth-sub">
              If that email is registered, you'll receive a reset link shortly.
            </p>
            <Link to="/login" className="auth-btn" style={{ display: "block", textAlign: "center", marginTop: 24 }}>
              Back to Sign In
            </Link>
          </>
        ) : (
          <>
            <h2 className="auth-title">Forgot Password?</h2>
            <p className="auth-sub">Enter your email and we'll send you a reset link.</p>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="auth-switch">
              <Link to="/login">
                <ArrowLeft size={14} style={{ display: "inline", marginRight: 4 }} />
                Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}