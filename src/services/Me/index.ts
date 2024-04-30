import { GroupRequests, Me } from "@/models/Me";
import { getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();

export const useMe = () => {
  const fetchMe = async () => getItem<Me>(`${BASE_URL}/scim/Me`);
  const fetchGroupsRequests = () =>
    getItem<GroupRequests>(`${BASE_URL}/iam/group_requests?status=PENDING`);
  return {
    fetchMe,
    fetchGroupsRequests,
  };
};
