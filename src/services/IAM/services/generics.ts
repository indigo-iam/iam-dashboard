import { useCallback } from "react";

export function useGenerics() {
  const authority = window.env.IAM_AUTHORITY;
  const logout = useCallback(async () => {
    try {
      const response = await fetch(new URL("/logout", authority), {
        credentials: "include",
      });
      console.log("Goodbye!");
      return response;
    } catch (err) {
      console.error("cannot log out:", err);
    }
  }, [authority]);

  return {
    logout,
  };
}
