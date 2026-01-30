// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { setNotification } from "@/services/notifications";
import { AUP, AUPCreate, AUPPatch } from "@/models/aup";
import { settings } from "@/config";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";

const { IAM_API_URL } = settings;
const AUP_URL = `${IAM_API_URL}/iam/aup`;

export async function fetchAUP() {
  return await getItem<AUP>(AUP_URL);
}

export async function createAUP(aup: AUPCreate) {
  const response = await authFetch(AUP_URL, {
    method: "POST",
    body: JSON.stringify(aup),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "AUP Created" });
    revalidatePath("/aup");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot create AUP",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function patchAUP(aup: AUPPatch) {
  const response = await authFetch(AUP_URL, {
    method: "PATCH",
    body: JSON.stringify(aup),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "AUP updated" });
    revalidatePath("/aup");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot update AUP",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function deleteAUP() {
  const response = await authFetch(AUP_URL, {
    method: "DELETE",
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "AUP deleted" });
    revalidatePath("/aup");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot delete AUP",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function touchAUP() {
  const url = `${AUP_URL}/touch`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath("/aup");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot touch AUP",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}
