"use server";
import {
  Group,
  GroupsSearchResponse,
  ManagedGroupResponse,
} from "@/models/groups";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { Paginated } from "@/models/pagination";
import { revalidatePath } from "next/cache";
import { ScimReference, User } from "@/models/scim";
import { setNotification } from "@/components/toaster";
import { fetchMe } from "@/services/me";

const { BASE_URL } = getConfig();

export const fetchGroup = async (groupID: string) => {
  let url = `${BASE_URL}/scim/Groups/${groupID}`;
  return await getItem<Group>(url);
};

export const searchGroup = async (filter: string) => {
  const response = await getItem<Paginated<Group>>(
    `${BASE_URL}/iam/group/search?count=100&startIndex=0&filter=${filter}`
  );
  return response.Resources;
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
  me: boolean = false,
  filter?: string
) => {
  if (me) {
    // modo osceno per recuperare i gruppi dell'utente
    const meObj = await fetchMe();
    let groups: Paginated<Group> = {
      totalResults: 0,
      itemsPerPage: count,
      startIndex: startIndex,
      Resources: []
    };
    for(const g of meObj?.groups ?? []) {
      groups.Resources.push(await fetchGroup(g.value));
      groups.totalResults += 1;
    }
    groups.Resources = groups.Resources.slice(startIndex - 1, startIndex + count - 1)
    return groups;
  } else {
    let url = `${BASE_URL}/iam/group/search?count=${count}&startIndex=${startIndex}`;
    if (filter) {
      url += `&filter=${filter}`;
    }
    return await getItem<Paginated<Group>>(url);
  }
};

export const addGroup = async (groupName: string) => {
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
    await setNotification({ type: "success", message: "Group created" });
    revalidatePath("/groups");
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot create group",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export const deleteGroup = async (groupId: string) => {
  const url = `${BASE_URL}/scim/Groups/${groupId}`;
  const response = await authFetch(url, { method: "DELETE" });
  if (response.ok) {
    await setNotification({ type: "info", message: "Group deleted" });
    revalidatePath("/groups");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot delete group",
      subtitle: `Error ${response.status} ${msg}`,
    });
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
    setNotification({ type: "success", message: "Subgroup added" });
    revalidatePath("/groups");
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot add subgroup",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export const addUserToGroup = async (
  groupId: string,
  userRef: ScimReference
) => {
  const body = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations: [
      {
        op: "add",
        path: "members",
        value: [userRef],
      },
    ],
  };
  const url = `${BASE_URL}/scim/Groups/${groupId}`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    setNotification({ type: "success", message: "Success" });
    revalidatePath(`/groups/${groupId}`);
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot join group",
      subtitle: `Error ${response.status}, ${msg}`,
    });
  }
};

export const removeUserFromGroup = async (
  groupId: string,
  userRef: ScimReference
) => {
  const body = {
    operations: [
      {
        op: "remove",
        path: "members",
        value: [userRef],
      },
    ],
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  };
  const url = `${BASE_URL}/scim/Groups/${groupId}`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    // This function can be called from /users/me, /users/<userId> or
    // /group/<groupId>. For some unknown reason, cache revalidation works
    // for any string, even random characters. Keep '/' for the moment.
    revalidatePath("/");
  } else {
    const msg = await response.text();
    throw Error(
      `Remove user membership failed with status ${response.status} ${msg}`
    );
  }
};

// for some reason this API is not paginated
export const fetchGroupManagers = async (groupId: string) => {
  const url = `${BASE_URL}/iam/group/${groupId}/group-managers`;
  return getItem<User[]>(url);
};

export const assignGroupManager = async (groupId: string, userId: string) => {
  const url = `${BASE_URL}/iam/account/${userId}/managed-groups/${groupId}`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    setNotification({ type: "success", message: "Success" });
    revalidatePath(`/groups/${groupId}`);
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot assign group manager",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export const revokeGroupManager = async (groupId: string, userId: string) => {
  const url = `${BASE_URL}/iam/account/${userId}/managed-groups/${groupId}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    setNotification({ type: "success", message: "Success" });
    revalidatePath(`/groups/${groupId}`);
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot revoke group manager",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export async function fetchManagedGroups(userId: string) {
  const url = `${BASE_URL}/iam/account/${userId}/managed-groups`;
  return getItem<ManagedGroupResponse>(url);
}
