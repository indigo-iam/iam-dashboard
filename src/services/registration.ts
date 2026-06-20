// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { Notification } from "@/components/toaster";
import { Registration } from "@/models/registration";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";

const { IAM_API_URL } = settings;

export async function fetchRegistrationRequests() {
  const url = `${IAM_API_URL}/registration/list/pending`;
  return await getItem<Registration[]>(url);
}

export async function approveRegistrationRequest(
  requestId: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/registration/approve/${requestId}`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath("/requests");
    return { type: "success", title: "User approved" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot approve user",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function rejectRegistrationRequest(
  requestId: string,
  motivation: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/registration/reject/${requestId}`;
  const body = JSON.stringify({ motivation });
  const response = await authFetch(url, {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    revalidatePath("/requests");
    return {
      type: "success",
      title: "User request rejected",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot reject user request",
    description: `Error ${response.status} ${msg}`,
  };
}
