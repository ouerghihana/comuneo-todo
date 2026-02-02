import { useNavigate } from "react-router";
import { account } from "~/lib/appwrite.client";

/**
 * Authentication related actions
 */
export function useAuth() {
  const navigate = useNavigate();

  async function logout() {
    await account.deleteSession("current");
    navigate("/login", {
      replace: true,
      state: { message: "Successfully logged out" },
    });
  }

  return {
    logout,
  };
}
