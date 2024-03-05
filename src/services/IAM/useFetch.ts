import { useCallback } from "react";
import { useAuth } from "react-oidc-context";

export function useFetch() {
  const auth = useAuth();
  const authority = window.env.IAM_AUTHORITY;

  const get = useCallback(
    async (endpoint: string) => {
      const token = auth.user?.access_token;
      if (!token) {
        throw new Error("access token is undefined");
      }
      const url = new URL(endpoint, authority);
      return await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [authority, auth.user]
  );

  type GetItem = <T>(endpoint: string) => Promise<Promise<T>>;
  const getItem = useCallback<GetItem>(
    async (endpoint: string) => {
      const response = await get(endpoint);
      return response.json();
    },
    [get]
  );

  return {
    get,
    getItem,
  };
}
