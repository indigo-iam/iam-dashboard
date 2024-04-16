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

  const rawUpdate = useCallback(
    async (
      endpoint: string,
      method: string,
      body?: BodyInit,
      contentType?: string
    ) => {
      const url = new URL(endpoint, authority);
      const headers = {
        Authorization,
      };
      if (contentType) {
        Object.assign(headers, { "Content-Type": contentType });
      }
      return fetch(url, {
        method,
        headers,
        body,
      });
    },
    [authority, Authorization]
  );

  const post = useCallback(
    async (endpoint: string, body?: BodyInit, contentType?: string) => {
      return await rawUpdate(endpoint, "POST", body, contentType);
    },
    [rawUpdate]
  );

  const patch = useCallback(
    async (endpoint: string, body?: BodyInit, contentType?: string) => {
      return await rawUpdate(endpoint, "PATCH", body, contentType);
    },
    [rawUpdate]
  );

  type GetItem = <T>(endpoint: string) => Promise<Promise<T>>;
  const getItem = useCallback<GetItem>(
    async (endpoint: string) => {
      const response = await get(endpoint);
      return await response.json();
    },
    [get]
  );

  return {
    get,
    getItem,
    post,
    patch,
  };
}
