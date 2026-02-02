import { useNavigate } from "react-router";
import { account } from "~/lib/appwrite.client";

/**
 * Authentication related actions
 */
export function useAuth() {
  const navigate = useNavigate();

  async function logout() {
    console.log("[AUTH] logout");

    // Kill Appwrite session
    await account.deleteSession("current");

    // Redirect to login with a message
    navigate("/login", {
      replace: true,
      state: { message: "Successfully logged out" },
    });
  }

  return {
    logout,
  };
}
