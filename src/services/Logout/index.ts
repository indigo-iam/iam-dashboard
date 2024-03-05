import { useCallback } from "react";
import { useAuth } from "react-oidc-context";

export function useLogout() {
  const authority = window.env.IAM_AUTHORITY;
  const { removeUser } = useAuth();

  const logout = useCallback(async () => {
    try {
      const response = await fetch(new URL("/logout", authority), {
        credentials: "include",
      });
      removeUser();
      console.log("Goodbye!");
      return response;
    } catch (err) {
      console.error("cannot log out:", err);
    }
  }, [authority, removeUser]);

  return {
    logout,
  };
}
