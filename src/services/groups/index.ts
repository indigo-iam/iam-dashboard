"use server";
import { Group, GroupsSearchResponse } from "@/models/groups";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { Paginated } from "@/models/pagination";
import { revalidatePath } from "next/cache";
import { ScimReference } from "@/models/scim";

const { BASE_URL } = getConfig();

export const fetchGroup = async (groupID: string) => {
  let url = `${BASE_URL}/scim/Groups/${groupID}`;
  return await getItem<Group>(url);
};

export const fetchSubgroupsPage = async (
  groupID: string,
  count: number = 10,
  startIndex: number = 1
) => {
  let url = `${BASE_URL}/scim/Groups/${groupID}/subgroups?count=${count}&startIndex=${startIndex}`;
  return await getItem<Paginated<ScimReference>>(url);
};

export const fetchGroupMembersPage = async (
  groupID: string,
  count: number = 10,
  startIndex: number = 1
) => {
  let url = `${BASE_URL}/scim/Groups/${groupID}/members?count=${count}&startIndex=${startIndex}`;
  return await getItem<Paginated<ScimReference>>(url);
};

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

export const getGroupsPage = async (
  count: number,
  startIndex: number = 1,
  filter?: string
) => {
  let url = `${BASE_URL}/iam/group/search?count=${count}&startIndex=${startIndex}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  return await getItem<Paginated<Group>>(url);
};

export const addRootGroup = async (groupName: string) => {
  const body = {
    displayName: groupName,
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  };
  const url = `${BASE_URL}/scim/Groups`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/groups");
  } else {
    const msg = await response.text();
    throw Error(`Add RootGroup failed with status ${response.status} ${msg}`);
  }
};

export const deleteRootGroup = async (groupId: string) => {
  const url = `${BASE_URL}/scim/Groups/${groupId}`;
  const response = await authFetch(url, { method: "DELETE" });
  if (response.ok) {
    revalidatePath("/groups");
  } else {
    const msg = await response.text();
    throw Error(
      `Delete RootGroup failed with status ${response.status} ${msg}`
    );
  }
};

export const addSubgroup = async (groupName: string, parentGroup: Group) => {
  const body = {
    displayName: groupName,
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],

    "urn:indigo-dc:scim:schemas:IndigoGroup": {
      parentGroup: {
        $ref: `${BASE_URL}/scim/Groups/${parentGroup.id}`,
        display: parentGroup.displayName,
        value: parentGroup.id,
      },
    },
  };
  const url = `${BASE_URL}/scim/Groups`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/groups");
  } else {
    const msg = await response.text();
    throw Error(`Add Subgroup failed with status ${response.status} ${msg}`);
  }
};
