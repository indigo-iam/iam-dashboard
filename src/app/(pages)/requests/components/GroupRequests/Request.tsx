import InfoTable from "@/components/InfoTable";
import { GroupRequest } from "@/models/group-requests";
import Link from "@/components/Link";
import RejectButton from "./RejectButton";
import ConfirmButton from "./ConfirmButton";
import { dateToHuman } from "@/utils/dates";

type GroupRequestProps = {
  request: GroupRequest;
};

export function Request(props: Readonly<GroupRequestProps>) {
  const { request } = props;
  const userLink = (
    <Link href={`/users/${request.userUuid}`}>{request.userUuid}</Link>
  );
  const groupLink = (
    <Link href={`/groups/${request.groupUuid}`}>{request.groupUuid}</Link>
  );

  const data = [
    { name: "Username", value: request.username },
    { name: "Group", value: request.groupName },
    { name: "User ID", value: userLink },
    { name: "Group ID", value: groupLink },
    {
      name: "Creation Date",
      value: dateToHuman(new Date(request.creationTime)),
    },
    { name: "Note", value: <i>{request.notes}</i> },
  ];
  return (
    <div className="flex flex-row">
      <InfoTable className="flex-grow" data={data} />
      <div className="m-auto">
        <div className="mx-auto flex gap-1">
          <RejectButton request={request} />
          <ConfirmButton request={request} />
        </div>
      </div>
    </div>
  );
}
