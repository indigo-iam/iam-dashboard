import Options from "@/components/options";
import { Group } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import RemoveMembership from "./remove-membership-button";
import AddSubgroupButton from "./add-subgroup-button";
import DeleteGroupButton from "./delete-group-button";
import { auth } from "@/auth";

export type GroupOptionsProps = {
  group: Group;
  userRef?: ScimReference;
};

export default async function GroupOptions(
  props: Readonly<GroupOptionsProps>
) {
  const { group, userRef } = props;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false

  return (
    <Options>
      {isAdmin && <AddSubgroupButton rootGroup={group} />}
      {userRef && <RemoveMembership
        userRef={userRef}
        groupId={group.id}
        groupName={group.displayName}
      />}
      {isAdmin && <DeleteGroupButton group={group} />}
    </Options>
  );
}
