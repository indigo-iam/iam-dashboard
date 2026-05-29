// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { Notification } from "@/components/toaster";
import { AUP, AUPCreate, AUPPatch } from "@/models/aup";
import { settings } from "@/config";
import { authFetch } from "@/utils/fetch";
import { revalidatePath } from "next/cache";

const { IAM_API_URL } = settings;
const AUP_URL = `${IAM_API_URL}/iam/aup`;

export async function fetchAUP(): Promise<AUP | null | Notification> {
  const response = await authFetch(AUP_URL);
  if (response.ok) {
    return (await response.json()) as AUP;
  }
  if (response.status === 404) {
    return null;
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot fetch AUP",
    description: `Error: ${response.status} ${msg}`,
  };
}

export async function createAUP(aup: AUPCreate): Promise<Notification> {
  const response = await authFetch(AUP_URL, {
    method: "POST",
    body: JSON.stringify(aup),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    revalidatePath("/aup");
    return {
      type: "success",
      title: "AUP created",
      description:
        "Acceptable Usage Policy has been created for your organization",
    };
  }
  const msg = await response.json();
  return {
    type: "error",
    title: "Cannot create AUP",
    description: msg.error,
  };
}

export async function patchAUP(aup: AUPPatch): Promise<Notification> {
  const response = await authFetch(AUP_URL, {
    method: "PATCH",
    body: JSON.stringify(aup),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    revalidatePath("/aup");
    return { type: "success", title: "AUP updated" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot update AUP",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function deleteAUP(): Promise<Notification> {
  const response = await authFetch(AUP_URL, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/aup");
    return { type: "success", title: "AUP deleted" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot delete AUP",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function touchAUP(): Promise<Notification | undefined> {
  const url = `${AUP_URL}/touch`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath("/aup");
  } else {
    const msg = await response.text();
    return {
      type: "error",
      title: "Cannot touch AUP",
      description: `Error ${response.status} ${msg}`,
    };
  }
}
