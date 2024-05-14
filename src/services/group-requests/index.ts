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

export const fetchGroupsRequests = async () => {
  return await getItem<PaginatedGroupRequests>(
    `${BASE_URL}/iam/group_requests?status=PENDING`
  );
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

export const abortGroupRequest = async (req: GroupRequest) => {
  const url = `${BASE_URL}/iam/group_requests/${req.uuid}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/");
  } else {
    return await response.json();
  }
};
