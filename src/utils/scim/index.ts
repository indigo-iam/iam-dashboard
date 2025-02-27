import { Group } from "@/models/groups";
import { ScimReference, User } from "@/models/scim";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();

export function makeScimReferenceFromUser(user: User): ScimReference {
  return {
    $ref: `${BASE_URL}/scim/Users/${user.id}`,
    display: user.userName!,
    value: user.id,
  };
}

export function makeScimReferenceFromGroup(group: Group): ScimReference {
  return {
    $ref: `${BASE_URL}/scim/Groups/${group.id}`,
    display: group.displayName,
    value: group.id,
  };
}
