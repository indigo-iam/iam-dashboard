"use server";
import { revalidatePath } from "next/cache";
import { setNotification } from "@/components/Toaster";
import { CertLinkRequest } from "@/models/certs";
import { authFetch } from "@/utils/fetch";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();

export async function sendCertificateLinkRequest(request: CertLinkRequest) {
  const url = `${BASE_URL}/iam/cert_link_requests`;
  const body = JSON.stringify(request);
  console.log(body);
  const response = await authFetch(url, {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    setNotification({ type: "success", message: "Request sent" });
    revalidatePath("/users");
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot send Certificate Link Request",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}
