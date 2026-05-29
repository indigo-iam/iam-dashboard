// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { revalidatePath } from "next/cache";
import { Notification } from "@/components/toaster";
import { CertLinkRequest } from "@/models/certs";
import { authFetch } from "@/utils/fetch";
import { settings } from "@/config";

const { IAM_API_URL } = settings;

export async function sendCertificateLinkRequest(
  request: CertLinkRequest
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/cert_link_requests`;
  const body = JSON.stringify(request);
  const response = await authFetch(url, {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    revalidatePath("/users");
    return { type: "success", title: "Request sent" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot send Certificate Link Request",
    description: `Error ${response.status} ${msg}`,
  };
}
