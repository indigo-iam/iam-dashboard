// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import {
  Group,
  GroupLabel,
  GroupsSearchResponse,
  ManagedGroup,
  ManagedGroupResponse,
} from "@/models/groups";
import { authFetch, getItem } from "@/utils/fetch";
import { settings } from "@/config";
import { Paginated } from "@/models/pagination";
import { ScimReference, User } from "@/models/scim";
import { Notification } from "@/components/toaster";
import {
  makeScimReferenceFromGroup,
  makeScimReferenceFromManagedGroup,
  makeScimReferenceFromUser,
} from "@/utils/scim";

import { revalidatePath } from "next/cache";

const { IAM_API_URL } = settings;

export async function fetchGroup(groupID: string) {
  const url = `${IAM_API_URL}/scim/Groups/${groupID}`;
  const response = await authFetch(url);
  if (response.ok) {
    return (await response.json()) as Group;
  }
  console.error(
    `failed to fetch group '${groupID}' with status '${response.status}'`
  );
}

export async function searchGroup(filter: string) {
  const response = await getItem<Paginated<Group>>(
    `${IAM_API_URL}/iam/group/search?count=100&startIndex=0&filter=${filter}`
  );
  return response.Resources;
}

export async function fetchSubgroupsPage(
  groupID: string,
  count: number = 10,
  startIndex: number = 1
) {
  let url = `${IAM_API_URL}/scim/Groups/${groupID}/subgroups?count=${count}&startIndex=${startIndex}`;
  return await getItem<Paginated<ScimReference>>(url);
}

export async function fetchGroupMembersPage(
  groupID: string,
  count: number = 10,
  startIndex: number = 1
) {
  let url = `${IAM_API_URL}/scim/Groups/${groupID}/members?count=${count}&startIndex=${startIndex}`;
  return await getItem<Paginated<ScimReference>>(url);
}

export async function fetchGroups() {
  let url = `${IAM_API_URL}/iam/group/search`;
  const response = await getItem<GroupsSearchResponse>(url);
  const { totalResults, itemsPerPage, startIndex } = response;
  const pages = Math.floor(totalResults / itemsPerPage);
  let groups = response.Resources;

  const requests: Promise<GroupsSearchResponse>[] = [];
  for (let page = 1; page <= pages; ++page) {
    const index = itemsPerPage * page + startIndex;
    url = `${IAM_API_URL}/iam/group/search?startIndex=${index}`;
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
  let url = `${IAM_API_URL}/iam/group/search?count=${count}&startIndex=${startIndex}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  return await getItem<Paginated<Group>>(url);
}

export async function addGroup(groupName: string): Promise<Notification> {
  const body = {
    displayName: groupName,
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  };
  const url = `${IAM_API_URL}/scim/Groups`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/groups");
    return { type: "success", title: "Group created" };
  }
  const error = `Error ${response.status} ${await response.text()}`;
  return {
    type: "error",
    title: "Cannot create group",
    description: error,
  };
}

export async function editGroup(
  groupId: string,
  description?: string | null
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/group/${groupId}`;
  const body = JSON.stringify({
    id: groupId,
    description,
  });
  const response = await authFetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  if (response.ok) {
    revalidatePath(`/groups/${groupId}`);
    return { type: "success", title: "Group edited" };
  }
  const { error } = await response.json();
  return {
    type: "error",
    title: "Cannot edit group",
    description: error,
  };
}

export async function deleteGroup(group: Group) {
  const groupRef = makeScimReferenceFromGroup(group);
  return await deleteGroupByReference(groupRef);
}

export async function deleteManagedGroup(managedGroup: ManagedGroup) {
  const groupRef = makeScimReferenceFromManagedGroup(managedGroup);
  return await deleteGroupByReference(groupRef);
}

export async function deleteGroupByReference(
  groupRef: ScimReference
): Promise<Notification> {
  const url = `${IAM_API_URL}/scim/Groups/${groupRef.value}`;
  const response = await authFetch(url, { method: "DELETE" });
  if (response.ok) {
    revalidatePath("/groups");
    return {
      type: "info",
      title: "Group deleted",
      description: `Group ${groupRef.display} has been deleted`,
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot delete group",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function addSubgroup(
  groupName: string,
  parentGroup: Group
): Promise<Notification> {
  const parentGroupRef = makeScimReferenceFromGroup(parentGroup);
  return addSubgroupByRef(groupName, parentGroupRef);
}

export async function addSubgroupToManagedGroup(
  groupName: string,
  parentGroup: ManagedGroup
): Promise<Notification> {
  const parentGroupRef = makeScimReferenceFromManagedGroup(parentGroup);
  return addSubgroupByRef(groupName, parentGroupRef);
}

export async function addSubgroupByRef(
  groupName: string,
  parentGroupRef: ScimReference
): Promise<Notification> {
  const body = {
    displayName: groupName,
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "urn:indigo-dc:scim:schemas:IndigoGroup": {
      parentGroup: {
        ...parentGroupRef,
      },
    },
  };
  const url = `${IAM_API_URL}/scim/Groups`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/groups");
    return {
      type: "success",
      title: "Subgroup added",
      description: `Group ${groupName} has been added to parent group ${parentGroupRef.display}`,
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot add subgroup",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function addUserToGroup(
  group: Group,
  user: User
): Promise<Notification> {
  const userRef = makeScimReferenceFromUser(user);
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
  const url = `${IAM_API_URL}/scim/Groups/${group.id}`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath(`/groups/${group.id}`);
    return {
      type: "success",
      title: "Member added",
      description: `User ${user.name?.formatted} has been added to group ${group.displayName}`,
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot add user to group",
    description: `Error ${response.status}, ${msg}`,
  };
}

export async function removeUserByRefFromGroup(
  userRef: ScimReference,
  group: Group
): Promise<Notification> {
  const groupRef = makeScimReferenceFromGroup(group);
  return await removeUserByRefFromGroupReference(userRef, groupRef);
}

export async function removeUserFromGroupReference(
  user: User,
  groupRef: ScimReference
): Promise<Notification> {
  const userRef = makeScimReferenceFromUser(user);
  return await removeUserByRefFromGroupReference(userRef, groupRef);
}

export async function removeUserByRefFromGroupReference(
  userRef: ScimReference,
  groupRef: ScimReference
): Promise<Notification> {
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
  const url = `${IAM_API_URL}/scim/Groups/${groupRef.value}`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath(`/groups/${groupRef.value}`);
    return {
      type: "success",
      title: "Member removed",
      description: `User ${userRef.display} has been removed from group ${groupRef.display}`,
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot remove user from group",
    description: `Error ${response.status}, ${msg}`,
  };
}

// for some reason this API is not paginated
export async function fetchGroupManagers(groupId: string) {
  const url = `${IAM_API_URL}/iam/group/${groupId}/group-managers`;
  const response = await authFetch(url);
  if (response.ok) {
    return (await response.json()) as User[];
  } else {
    const msg = await response.text();
    console.error(
      `Failed to fetch groups manager with status: ${response.status}, ${msg}`
    );
  }
}

export async function assignGroupManager(
  group: Group,
  user: User
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/account/${user.id}/managed-groups/${group.id}`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath(`/groups/${group.id}`);
    return {
      type: "success",
      title: "Success",
      description: `User ${user.displayName} has been assigned manager of group ${group.displayName}`,
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot assign group manager",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function revokeGroupManager(
  groupId: string,
  userId: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/account/${userId}/managed-groups/${groupId}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/groups/${groupId}`);
    return { type: "success", title: "Success" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot revoke group manager",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function fetchManagedGroups(userId: string) {
  const url = `${IAM_API_URL}/iam/account/${userId}/managed-groups`;
  const response = await getItem<ManagedGroupResponse>(url);
  return response.managedGroups;
}

export async function addGroupLabel(
  groupId: string,
  label: GroupLabel
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/group/${groupId}/labels`;
  const response = await authFetch(url, {
    method: "PUT",
    body: JSON.stringify(label),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    revalidatePath(`/groups/${groupId}`);
    return { type: "success", title: "Group label added" };
  }
  const { error } = await response.json();
  return {
    type: "error",
    title: "Cannot add group label",
    description: error,
  };
}

export async function deleteGroupLabel(
  groupId: string,
  label: GroupLabel
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/group/${groupId}/labels?name=${label.name}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/groups/${groupId}`);
    return { type: "success", title: "" };
  }
  const { error } = await response.json();
  return {
    type: "error",
    title: "Cannot delete label",
    description: error,
  };
}
