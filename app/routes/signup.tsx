import type { ActionFunctionArgs } from "react-router";
import { Form, useActionData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ID } from "appwrite";
import { getServerAccount } from "~/lib/appwrite.server";
import "~/styles/auth.css";

type ActionData =
  | { status: "error"; message: string }
  | { status: "success"; message: string }
  | undefined;

/* ---------- ACTION (SERVER-SIDE VALIDATION) ---------- */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  // Server-side validation
  if (!email || !password) {
    return {
      status: "error",
      message: "Email and password are required.",
    } satisfies ActionData;
  }

  if (!email.includes("@")) {
    return {
      status: "error",
      message: "Invalid email address.",
    } satisfies ActionData;
  }

  if (password.length < 6) {
    return {
      status: "error",
      message: "Password must be at least 6 characters.",
    } satisfies ActionData;
  }

  const account = getServerAccount();

  try {
    await account.create(ID.unique(), email, password);

    return {
      status: "success",
      message: "Account created successfully. Redirecting to login...",
    } satisfies ActionData;
  } catch (err: any) {
    return {
      status: "error",
      message: err?.message || "Signup failed.",
    } satisfies ActionData;
  }
}

/* ---------- COMPONENT (CLIENT-SIDE VALIDATION) ---------- */
export default function SignupPage() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  const [clientError, setClientError] = useState<string | null>(null);

  // Redirect after successful signup
  useEffect(() => {
    if (actionData?.status === "success") {
      const timer = setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: { message: "Account created successfully. Please login." },
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [actionData, navigate]);

  // Client-side validation
  function handleClientValidation(
    event: React.FormEvent<HTMLFormElement>
  ) {
    setClientError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email.includes("@")) {
      event.preventDefault();
      setClientError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      event.preventDefault();
      setClientError("Password must be at least 6 characters.");
      return;
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign up</h1>

        {clientError && (
          <div className="auth-error">{clientError}</div>
        )}

        {actionData?.status === "success" && (
          <div className="auth-success">{actionData.message}</div>
        )}

        {actionData?.status === "error" && (
          <div className="auth-error">{actionData.message}</div>
        )}

        <Form
          method="post"
          className="auth-form"
          onSubmit={handleClientValidation}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            Create account
          </button>
        </Form>

        <div className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
