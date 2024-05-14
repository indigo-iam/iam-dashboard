"use server";
import { GroupRequestResource, GroupRequests } from "@/models/Me";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { revalidatePath } from "next/cache";

const { BASE_URL } = getConfig();

export const fetchGroupsRequests = async () => {
  return await getItem<GroupRequests>(
    `${BASE_URL}/iam/group_requests?status=PENDING`
  );
};

export const abortGroupRequest = async (req: GroupRequestResource) => {
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
