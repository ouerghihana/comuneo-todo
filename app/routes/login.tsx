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

  // Show success message once (after logout)
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const formData = new FormData(e.currentTarget);
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  console.log("[LOGIN] submit", email);

  try {
    console.log("[LOGIN] creating session...");
    const session = await account.createEmailPasswordSession(email, password);
    console.log("[LOGIN] session created", session);

    console.log("[LOGIN] checking account...");
    const me = await account.get();
    console.log("[LOGIN] account OK", me);

    navigate("/", { replace: true });
  } catch (err: any) {
    console.error("[LOGIN] ERROR", err);
    setError(err?.message || "Login failed");
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
