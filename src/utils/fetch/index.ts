// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getAccessToken } from "@/auth/server";
import { notFound } from "next/navigation";

export async function authFetch(info: RequestInfo | URL, init?: RequestInit) {
  const { accessToken } = await getAccessToken();
  const options: RequestInit = init ?? {};
  let { headers } = options;
  options.headers = {
    ...headers,
    authorization: `Bearer ${accessToken}`,
  };
  return fetch(info, options);
}

type GetItem = <T>(endpoint: string | URL) => Promise<T>;
export const getItem: GetItem = async (endpoint: string | URL) => {
  const response = await authFetch(endpoint);
  if (response.ok) {
    return response.json();
  } else {
    const error = await response.text();
    const status = response.status;
    if (status === 404) {
      notFound();
    } else {
      throw Error(
        `getItem from ${endpoint} failed with status ${status}: ${error}`
      );
    }
  }
};
