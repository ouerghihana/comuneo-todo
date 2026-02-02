import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { account } from "~/lib/appwrite.client";
import "~/styles/auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Read navigation message once (e.g. after signup) and auto-dismiss
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);

      // Clear history state to avoid showing the message again
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Handle login form submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      await account.createEmailPasswordSession(email, password);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>

        {success && <div className="auth-success">{success}</div>}
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
  type="email"
  name="email"
  placeholder="Email"
  required
  autoComplete="email"
/>

<input
  type="password"
  name="password"
  placeholder="Password"
  required
  autoComplete="current-password"
/>


          <button type="submit" disabled={loading}>
            {loading ? "..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          No account? <a href="/signup">Create one</a>
        </div>
      </div>
    </div>
  );
}
