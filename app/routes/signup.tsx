import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

import { account } from "~/lib/appwrite.client";
import "~/styles/auth.css";

/**
 * Signup page
 * - Client-side validation
 * - Appwrite signup on the client
 * - Works in development + production (Vercel)
 */
export default function SignupPage() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Handle signup form submission
   */
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    // Basic client-side validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      // Create Appwrite account
      await account.create(ID.unique(), email, password);

      setSuccess("Account created successfully. Redirecting to login...");

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            message: "Account created successfully. Please login.",
          },
        });
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign up</h1>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
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
            autoComplete="new-password"
          />

          <button type="submit" disabled={loading}>
            {loading ? "..." : "Create account"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
