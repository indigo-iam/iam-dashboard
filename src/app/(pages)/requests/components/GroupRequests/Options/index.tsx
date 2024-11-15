import Options from "@/components/Options";
import { GroupRequest } from "@/models/group-requests";
import ConfirmButton from "./ConfirmButton";
import RejectButton from "./RejectButton";

type GroupRequestOptionsProps = {
  request: GroupRequest;
};

export default function GroupRequestOptions(
  props: Readonly<GroupRequestOptionsProps>
) {
  const { request } = props;
  return (
    <Options>
      <RejectButton request={request} />
      <ConfirmButton request={request} />
    </Options>
  );
}
