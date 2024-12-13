import Options from "@/components/options";
import { GroupRequest } from "@/models/group-requests";
import ConfirmButton from "./confirm-button";
import RejectButton from "./reject-button";

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
