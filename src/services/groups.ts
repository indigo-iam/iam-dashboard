// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import {
  Group,
  GroupLabel,
  GroupsSearchResponse,
  ManagedGroupResponse,
} from "@/models/groups";
import { authFetch, getItem } from "@/utils/fetch";
import { settings } from "@/config";
import { Paginated } from "@/models/pagination";
import { revalidatePath } from "next/cache";
import { ScimReference, User } from "@/models/scim";
import { setNotification } from "@/services/notifications";

const { BASE_URL } = settings;

export async function fetchGroup(groupID: string) {
  let url = `${BASE_URL}/scim/Groups/${groupID}`;
  return await getItem<Group>(url);
}

export async function searchGroup(filter: string) {
  const response = await getItem<Paginated<Group>>(
    `${BASE_URL}/iam/group/search?count=100&startIndex=0&filter=${filter}`
  );
  return response.Resources;
}

export async function fetchSubgroupsPage(
  groupID: string,
  count: number = 10,
  startIndex: number = 1
) {
  let url = `${BASE_URL}/scim/Groups/${groupID}/subgroups?count=${count}&startIndex=${startIndex}`;
  return await getItem<Paginated<ScimReference>>(url);
}

export async function fetchGroupMembersPage(
  groupID: string,
  count: number = 10,
  startIndex: number = 1
) {
  let url = `${BASE_URL}/scim/Groups/${groupID}/members?count=${count}&startIndex=${startIndex}`;
  return await getItem<Paginated<ScimReference>>(url);
}

export async function fetchGroups() {
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
}

export async function getGroupsPage(
  count: number,
  startIndex: number = 1,
  filter?: string
) {
  let url = `${BASE_URL}/iam/group/search?count=${count}&startIndex=${startIndex}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  return await getItem<Paginated<Group>>(url);
}

export async function addGroup(groupName: string) {
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
    await setNotification({
      type: "error",
      message: "Cannot create group",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function deleteGroup(groupId: string) {
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
}

export async function addSubgroup(
  groupName: string,
  parentGroup: ScimReference
) {
  const body = {
    displayName: groupName,
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "urn:indigo-dc:scim:schemas:IndigoGroup": {
      parentGroup: {
        ...parentGroup,
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
    await setNotification({ type: "success", message: "Subgroup added" });
    revalidatePath("/groups");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot add subgroup",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function addUserToGroup(groupId: string, userRef: ScimReference) {
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
    await setNotification({ type: "success", message: "Success" });
    revalidatePath(`/groups/${groupId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot join group",
      subtitle: `Error ${response.status}, ${msg}`,
    });
  }
}

export async function removeUserFromGroup(
  groupId: string,
  userRef: ScimReference
) {
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
}

// for some reason this API is not paginated
export async function fetchGroupManagers(groupId: string) {
  const url = `${BASE_URL}/iam/group/${groupId}/group-managers`;
  return getItem<User[]>(url);
}

export async function assignGroupManager(groupId: string, userId: string) {
  const url = `${BASE_URL}/iam/account/${userId}/managed-groups/${groupId}`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "Success" });
    revalidatePath(`/groups/${groupId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot assign group manager",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function revokeGroupManager(groupId: string, userId: string) {
  const url = `${BASE_URL}/iam/account/${userId}/managed-groups/${groupId}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "Success" });
    revalidatePath(`/groups/${groupId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot revoke group manager",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function fetchManagedGroups(userId: string) {
  const url = `${BASE_URL}/iam/account/${userId}/managed-groups`;
  const response = await getItem<ManagedGroupResponse>(url);
  return response.managedGroups;
}

export async function addGroupLabel(groupId: string, label: GroupLabel) {
  const url = `${BASE_URL}/iam/group/${groupId}/labels`;
  const response = await authFetch(url, {
    method: "PUT",
    body: JSON.stringify(label),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    revalidatePath(`/groups/${groupId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot add group label",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function deleteGroupLabel(groupId: string, label: GroupLabel) {
  const url = `${BASE_URL}/iam/group/${groupId}/labels?name=${label.name}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/groups/${groupId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot delete label",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}
