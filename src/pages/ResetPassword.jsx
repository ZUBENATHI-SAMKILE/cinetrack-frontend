import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Film, CheckCircle } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export default function ResetPassword() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/auth/reset-password/${uidb64}/${token}/`, {
        password: form.password,
        confirm_password: form.confirm_password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Reset link is invalid or has expired.");
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
            <div className="auth-success-icon"><CheckCircle size={48} color="#22c55e" /></div>
            <h2 className="auth-title">Password Reset!</h2>
            <p className="auth-sub">
              Your password has been reset. Redirecting you to sign in...
            </p>
            <Link to="/login" className="auth-btn" style={{ display: "block", textAlign: "center", marginTop: 24 }}>
              Sign In Now →
            </Link>
          </>
        ) : (
          <>
            <h2 className="auth-title">Reset Password</h2>
            <p className="auth-sub">Enter your new password below.</p>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>New Password <span className="label-hint">(min 6 characters)</span></label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password →"}
              </button>
            </form>

            <p className="auth-switch">
              <Link to="/login">Back to Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}