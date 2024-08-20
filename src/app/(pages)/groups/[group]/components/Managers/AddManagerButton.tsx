import { Group } from "@/models/groups";
import { assignGroupManager } from "@/services/groups";
import { ScimReference } from "@/models/scim";
import LinkUserButton from "../commons/LinkUserButton";

type AddManagersButtonProps = {
  group: Group;
};

export default function AddManagersButton(
  props: Readonly<AddManagersButtonProps>
) {
  const { group } = props;

  const action = async (groupId: string, userRef: ScimReference) => {
    "use server";
    await assignGroupManager(groupId, userRef.value);
  };

  return (
    <LinkUserButton
      group={group}
      buttonText="Add Group Manager"
      confirmButtonText="Add Group Manager"
      cancelButtonText="Cancel"
      action={action}
    />
  );
}
