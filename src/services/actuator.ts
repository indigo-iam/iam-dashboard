// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { authFetch } from "@/utils/fetch";

const { IAM_API_URL } = settings;

export async function getLoginServiceVersion(): Promise<string> {
  const url = `${IAM_API_URL}/actuator/info`;
  const response = await authFetch(url);
  if (response.ok) {
    const payload = await response.json();
    if (payload.build && payload.build.version) {
      return payload.build.version;
    }
    console.warn("Cannot find 'version' from '/actuator/info'");
  } else {
    console.error(
      `failed to fetch '/actuator/info' with status ${response.status}`
    );
  }
  return "unknown";
}
