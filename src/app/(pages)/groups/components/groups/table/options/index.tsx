import Options from "@/components/options";
import { ScimReference } from "@/models/scim";
import RemoveMembership from "./remove-membership-button";
import AddSubgroupButton from "./add-subgroup-button";
import DeleteGroupButton from "./delete-group-button";

export type GroupOptionsProps = {
  group: ScimReference;
  isAdmin: boolean;
  userRef?: ScimReference;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { group, isAdmin, userRef } = props;
  return (
    <Options>
      {userRef && <RemoveMembership userRef={userRef} group={group} />}
      {isAdmin && (
        <>
          <AddSubgroupButton rootGroup={group} />
          <DeleteGroupButton group={group} />
        </>
      )}
    </Options>
  );
}
