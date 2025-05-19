// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { authFetch, getItem } from "@/utils/fetch";
import { Registration } from "@/models/registration";
import { revalidatePath } from "next/cache";
import { setNotification } from "@/components/toaster";
import { settings } from "@/config";

const { BASE_URL } = settings;

export async function fetchRegistrationRequests() {
  let url = `${BASE_URL}/registration/list/pending`;
  return await getItem<Registration[]>(url);
}

export async function approveRegistrationRequest(requestId: string) {
  const url = `${BASE_URL}/registration/approve/${requestId}`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    setNotification({ type: "success", message: "User approved" });
    revalidatePath("/requests");
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot approve user",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function rejectRegistrationRequest(
  requestId: string,
  motivation: string
) {
  const url = `${BASE_URL}/registration/reject/${requestId}`;
  const body = JSON.stringify({ motivation });
  const response = await authFetch(url, {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    setNotification({ type: "success", message: "User request rejected" });
    revalidatePath("/requests");
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot reject user request",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}
