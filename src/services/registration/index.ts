"use server";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { Registration } from "@/models/registration";
import { revalidatePath } from "next/cache";

const { BASE_URL } = getConfig();

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
    revalidatePath("/requests");
  } else {
    const msg = await response.text();
    throw Error(
      `Registration request approval failed with status ${response.status} ${msg}`
    );
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
    revalidatePath("/requests");
  } else {
    const msg = await response.text();
    throw Error(
      `Registration request rejection failed with status ${response.status} ${msg}`
    );
  }
}
