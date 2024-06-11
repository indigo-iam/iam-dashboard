import { auth } from "@/auth";

export async function authFetch(info: RequestInfo | URL, init?: RequestInit) {
  const session = await auth();
  if (!session) {
    throw Error("Session not ready");
  }

  const { access_token } = session;
  const options: RequestInit = init ?? {};
  let { headers } = options;
  options.headers = {
    ...headers,
    authorization: `Bearer ${access_token}`,
  };
  return fetch(info, options);
}

type GetItem = <T>(endpoint: string | URL) => Promise<T>;
export const getItem: GetItem = async (endpoint: string | URL) => {
  const response = await authFetch(endpoint);
  return response.json();
};
