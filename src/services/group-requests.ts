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
import { settings } from "@/config";
import { revalidatePath } from "next/cache";
import { Notification } from "@/components/toaster";

const { IAM_API_URL } = settings;

export async function fetchGroupsRequests(username?: string) {
  let url = `${IAM_API_URL}/iam/group_requests?status=PENDING`;
  if (username) {
    url += `&username=${username}`;
  }
  return await getItem<PaginatedGroupRequests>(url);
}

export async function submitGroupRequest(
  req: JoinGroupRequest
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/group_requests`;
  const response = await authFetch(url, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    revalidatePath("/");
    return { type: "success", title: "Group Request sent" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot send Group Request",
    description: `Error ${response.status}: ${msg}`,
  };
}

export async function approveGroupRequest(
  requestId: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/group_requests/${requestId}/approve`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath("/requests");
    return {
      type: "success",
      title: "Group Request approved",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot approve Group Request",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function rejectGroupRequest(
  requestId: string,
  motivation: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/group_requests/${requestId}/reject?motivation=${motivation}`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath("/requests");
    return {
      type: "info",
      title: "Group Request rejected",
      description: "The user has been notified with the motivation you provided.",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot reject Group Request",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function abortGroupRequest(
  userId: string,
  req: GroupRequest
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/group_requests/${req.uuid}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return { type: "info", title: "Group Request deleted" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot delete Group Request",
    description: `Error ${response.status} ${msg}`,
  };
}
