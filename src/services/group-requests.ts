// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";
import {
  GroupRequest,
  PaginatedGroupRequests,
  JoinGroupRequest,
} from "@/models/group-requests";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { revalidatePath } from "next/cache";
import { setNotification } from "@/components/toaster";

const { BASE_URL } = getConfig();

export const fetchGroupsRequests = async (username?: string) => {
  let url = `${BASE_URL}/iam/group_requests?status=PENDING`;
  if (username) {
    url += `&username=${username}`;
  }
  return await getItem<PaginatedGroupRequests>(url);
};

export const submitGroupRequest = async (req: JoinGroupRequest) => {
  const url = `${BASE_URL}/iam/group_requests`;
  const response = await authFetch(url, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "Group Request sent" });
    revalidatePath("/");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot send Group Request",
      subtitle: `Error ${response.status}: ${msg}`,
    });
  }
};

export const approveGroupRequest = async (requestId: string) => {
  const url = `${BASE_URL}/iam/group_requests/${requestId}/approve`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "Group Request approved" });
    revalidatePath("/requests");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot approve Group Request",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export const rejectGroupRequest = async (
  requestId: string,
  motivation: string
) => {
  const url = `${BASE_URL}/iam/group_requests/${requestId}/reject?motivation=${motivation}`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    await setNotification({ type: "info", message: "Group Request rejected" });
    revalidatePath("/requests");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot reject Group Request",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export const abortGroupRequest = async (userId: string, req: GroupRequest) => {
  const url = `${BASE_URL}/iam/group_requests/${req.uuid}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    await setNotification({ type: "info", message: "Group Request deleted" });
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot delete Group Request",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};
