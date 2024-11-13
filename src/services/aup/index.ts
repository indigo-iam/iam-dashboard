"use server";
import { AUP, AUPCreate, AUPPatch } from "@/models/aup";
import getConfig from "@/utils/config";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";

const { BASE_URL } = getConfig();
const AUP_URL = `${BASE_URL}/iam/aup`;

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
    revalidatePath("/aup");
  } else {
    const msg = await response.text();
    throw Error(`create aup failed with status ${response.status} ${msg}`);
  }
}

export async function patchAUP(aup: AUPPatch) {
  const response = await authFetch(AUP_URL, {
    method: "PATCH",
    body: JSON.stringify(aup),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    revalidatePath("/aup");
  } else {
    const msg = await response.text();
    throw Error(`aup patch failed with status ${response.status} ${msg}`);
  }
}

export async function deleteAUP() {
  const response = await authFetch(AUP_URL, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/aup");
  } else {
    const msg = await response.text();
    throw Error(`aup delete failed with status ${response.status} ${msg}`);
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
    throw Error(`aup touch failed with status ${response.status} ${msg}`);
  }
}
