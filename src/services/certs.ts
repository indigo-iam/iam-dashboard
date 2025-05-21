// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { revalidatePath } from "next/cache";
import { setNotification } from "@/services/notifications";
import { CertLinkRequest } from "@/models/certs";
import { authFetch } from "@/utils/fetch";
import { settings } from "@/config";

const { BASE_URL } = settings;

export async function sendCertificateLinkRequest(request: CertLinkRequest) {
  const url = `${BASE_URL}/iam/cert_link_requests`;
  const body = JSON.stringify(request);
  const response = await authFetch(url, {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "Request sent" });
    revalidatePath("/users");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot send Certificate Link Request",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}
