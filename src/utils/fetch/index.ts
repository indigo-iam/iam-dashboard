import { useCallback, useMemo } from "react";
import { useAuth } from "react-oidc-context";

export function useFetch() {
  const auth = useAuth();
  const authority = window.env.IAM_AUTHORITY;

  const Authorization = useMemo(() => {
    if (!auth.user) {
      return "";
    }
    const { access_token } = auth.user;
    return `Bearer ${access_token}`;
  }, [auth.user]);

  const get = useCallback(
    async (endpoint: string) => {
      const url = new URL(endpoint, authority);
      return await fetch(url, {
        headers: {
          Authorization,
        },
      });
    },
    [authority, Authorization]
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
