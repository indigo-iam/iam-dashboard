// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { revalidatePath } from "next/cache";
import { Notification } from "@/components/toaster";
import { CertLinkRequest } from "@/models/certs";
import { authFetch } from "@/utils/fetch";
import { settings } from "@/config";
import { patchIndigoUser } from "./indigo-user";

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
    title: "Cannot send certificate link request",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function addProxyCert(
  userId: string,
  cert: string
): Promise<Notification | void> {
  // admins cannot add proxy for others
  const url = `${IAM_API_URL}/iam/account/me/proxycert`;
  const body = { certificate_chain: cert };
  const response = await authFetch(url, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return;
  }
  if (response.headers.get("content-type") === "application/json") {
    return { type: "error", title: await response.json() };
  } else {
    return { type: "error", title: await response.text() };
  }
}

export async function linkCertificate(
  userId: string,
  label: string,
  pemEncodedCertificate: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/scim/Users/${userId}`;
  const response = await patchIndigoUser(url, {
    op: "add",
    value: {
      "urn:indigo-dc:scim:schemas:IndigoUser": {
        certificates: [
          {
            label,
            pemEncodedCertificate,
          },
        ],
      },
    },
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "success",
      title: "Certificated linked to account",
    };
  }
  const error = await response.json();
  return {
    type: "error",
    title: "Cannot link certificate to user",
    description: error.detail,
  };
}

export async function deleteAccountLink(
  certificateIssuer: string,
  certificateSubject: string
): Promise<Notification | void> {
  const searchParams = new URLSearchParams({
    certificateIssuer,
    certificateSubject,
  });
  searchParams.toString();
  const url = `${IAM_API_URL}/iam/account-linking/X509?${searchParams.toString()}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/users/me");
    return;
  }
  return {
    type: "error",
    title: await response.text(),
  };
}
