import Options from "@/components/Options";
import DeleteGroupRequestButton from "./DeleteGroupRequest";
import { User } from "@/models/scim";
import { GroupRequest } from "@/models/group-requests";

type GroupRequestOptionsProps = {
  user: User;
  isMe: boolean;
  groupRequest: GroupRequest;
};

export default function GroupRequestOptions(
  props: Readonly<GroupRequestOptionsProps>
) {
  const { user, isMe, groupRequest } = props;
  return (
    <Options>
      <DeleteGroupRequestButton
        user={user}
        isMe={isMe}
        groupRequest={groupRequest}
      />
    </Options>
  );
}
