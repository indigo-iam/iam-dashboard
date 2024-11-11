"use server";
import {
  GroupRequest,
  PaginatedGroupRequests,
  JoinGroupRequest,
} from "@/models/group-requests";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/");
  } else {
    return response.status;
  }
};

export const approveGroupRequest = async (requestId: string) => {
  const url = `${BASE_URL}/iam/group_requests/${requestId}/approve`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath("/requests");
  } else {
    const msg = await response.text();
    throw Error(
      `group request approval failed with status ${response.status} ${msg}`
    );
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
    revalidatePath("/requests");
  } else {
    const msg = await response.text();
    throw Error(
      `group request rejection failed with status ${response.status} ${msg}`
    );
  }
};

export const abortGroupRequest = async (userId: string, req: GroupRequest) => {
  const url = `${BASE_URL}/iam/group_requests/${req.uuid}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
  } else {
    return await response.json();
  }
};
