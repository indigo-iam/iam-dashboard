import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GroupsContext } from "./Context";
import { useFetch } from "@utils/fetch";
import { Group, GroupsSearchResponse } from "@models/Groups";
import { useAuth } from "react-oidc-context";

interface GroupsProviderBaseProps {
  children?: ReactNode;
}

export interface GroupsProviderProps extends GroupsProviderBaseProps {}

export const GroupsProvider = (props: GroupsProviderProps) => {
  const { children } = props;
  const { getItem } = useFetch();
  const [groups, setGroups] = useState<Group[]>([]);
  const auth = useAuth();
  const didLoad = useRef(false);

  const fetchGroups = useCallback(async () => {
    const response = await getItem<GroupsSearchResponse>("/iam/group/search");
    const { totalResults, itemsPerPage, startIndex } = response;
    const pages = Math.floor(totalResults / itemsPerPage);
    let groups = response.Resources;

    const requests: Promise<GroupsSearchResponse>[] = [];
    for (let page = 1; page <= pages; ++page) {
      const index = itemsPerPage * page + startIndex;
      const endpoint = `/iam/group/search?startIndex=${index}`;
      const req = getItem<GroupsSearchResponse>(endpoint);
      requests.push(req);
    }

    const results = await Promise.all(requests);
    groups = groups.concat(results.flatMap(r => r.Resources));
    setGroups(groups);
  }, [getItem]);

  useEffect(() => {
    if (auth.isAuthenticated && !didLoad.current) {
      fetchGroups();
      didLoad.current = true;
    }
  });

  const value = useMemo(
    () => ({
      groups,
      fetchGroups,
    }),
    [groups, fetchGroups]
  );

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};
