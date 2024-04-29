import { GroupRequests, Me } from "@/models/Me";
import { getItem } from "@/utils/fetch";

const BASE_URL = process.env.IAM_AUTHORITY_URL;

export const useMe = () => {
  const fetchMe = () => getItem<Me>(new URL("/scim/Me", BASE_URL));
  const fetchGroupsRequests = () =>
    getItem<GroupRequests>(
      new URL("/iam/group_requests?status=PENDING", BASE_URL)
    );
  return {
    fetchMe,
    fetchGroupsRequests,
  };
};
