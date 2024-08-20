import { Group } from "@/models/groups";
import { addUserToGroup } from "@/services/groups";
import { ScimReference } from "@/models/scim";
import LinkUserButton from "../commons/LinkUserButton";

type AddMemberButtonProps = {
  group: Group;
};

export default function AddMemberButton(props: Readonly<AddMemberButtonProps>) {
  const { group } = props;

  const action = async (groupId: string, userRef: ScimReference) => {
    "use server";
    await addUserToGroup(groupId, userRef);
  };

  return (
    <LinkUserButton
      group={group}
      buttonText="Add Member"
      confirmButtonText="Add Member to Group"
      cancelButtonText="Cancel"
      action={action}
    />
  );
}
