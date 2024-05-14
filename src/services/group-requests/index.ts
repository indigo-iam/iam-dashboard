"use server";
import { GroupRequestResource, GroupRequests } from "@/models/Me";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { revalidatePath } from "next/cache";

const { BASE_URL } = getConfig();
const url = new URL(`${BASE_URL}/iam/group_requests`);

export const fetchGroupsRequests = async () => {
  return await getItem<GroupRequests>(`${url}?status=PENDING`);
};

export const abortGroupRequest = async (req: GroupRequestResource) => {
  const response = await authFetch(`${url}/${req.uuid}`, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/");
  } else {
    return await response.json();
  }
};
