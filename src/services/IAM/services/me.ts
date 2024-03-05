import { useCallback } from "react";
import { Me, GroupRequests } from "../models/me";
import { useFetch } from "../useFetch";

export function useMe() {
  const { getItem } = useFetch();

  const getMe = useCallback(async () => {
    return getItem<Me>("/scim/Me");
  }, [getItem]);

  const getGroupRequests = useCallback(async () => {
    return await getItem<GroupRequests>("/iam/group_requests?status=PENDING");
  }, [getItem]);

  return {
    getMe,
    getGroupRequests,
  };
}
