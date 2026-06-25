// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getAccessToken, signOut } from "@/auth";
import { logger } from "@/utils/logger";
import { notFound, redirect } from "next/navigation";
import { trace } from "@opentelemetry/api";

export async function authFetch(info: RequestInfo | URL, init?: RequestInit) {
  return await trace
    .getTracer("indigo-iam")
    .startActiveSpan(`authFetch ${info}`, async span => {
      try {
        const { accessToken } = await getAccessToken();
        const options: RequestInit = init ?? {};
        const { headers } = options;
        options.headers = {
          ...headers,
          authorization: `Bearer ${accessToken}`,
        };
        logger.debug("fetching", info.toString());
        return await fetch(info, options);
      } finally {
        span.end();
      }
    });
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
    } else if (status === 401) {
      // handle aup expired during active session
      await signOut();
      console.warn(error);
      redirect("/signin");
    } else {
      throw Error(
        `getItem from ${endpoint} failed with status ${status}: ${error}`
      );
    }
  }
};
