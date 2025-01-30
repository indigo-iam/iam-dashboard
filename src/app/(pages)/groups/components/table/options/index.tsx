import Options from "@/components/options";
import { Group } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import RemoveMembership from "./remove-membership-button";
import AddSubgroupButton from "./add-subgroup-button";
import DeleteGroupButton from "./delete-group-button";

export type GroupOptionsProps = {
  group: Group;
  userRef?: ScimReference;
  isAdmin?: boolean;
};

export default function GroupOptions(
  props: Readonly<GroupOptionsProps>
) {
  const { group, userRef, isAdmin } = props;

  return (
    <Options>
      {isAdmin && <AddSubgroupButton rootGroup={group} />}
      {userRef && <RemoveMembership
        userRef={userRef}
        group={group}
      />}
      {isAdmin && <DeleteGroupButton group={group} />}
    </Options>
  );
}
