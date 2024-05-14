import { GroupsSearchResponse } from "@/models/Groups";
import { getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();

export const fetchGroups = async () => {
  let url = `${BASE_URL}/iam/group/search`;
  const response = await getItem<GroupsSearchResponse>(url);
  const { totalResults, itemsPerPage, startIndex } = response;
  const pages = Math.floor(totalResults / itemsPerPage);
  let groups = response.Resources;

  const requests: Promise<GroupsSearchResponse>[] = [];
  for (let page = 1; page <= pages; ++page) {
    const index = itemsPerPage * page + startIndex;
    url = `${BASE_URL}/iam/group/search?startIndex=${index}`;
    const req = getItem<GroupsSearchResponse>(url);
    requests.push(req);
  }

  const results = await Promise.all(requests);
  groups = groups.concat(results.flatMap(r => r.Resources));
  return groups;
};
