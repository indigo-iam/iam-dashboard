import InfoTable from "@/components/InfoTable";
import { Registration } from "@/models/registration";
import Link from "@/components/Link";
import ConfirmButton from "./ConfirmButton";
import RejectButton from "./RejectButton";
import { dateToHuman } from "@/utils/dates";
import { RequestView } from "../RequestView";

type RequestProps = {
  request: Registration;
};

export function Request(props: Readonly<RequestProps>) {
  const { request } = props;
  const link = (
    <Link href={`/users/${request.accountId}`}>{request.accountId}</Link>
  );
  const data = [
    { name: "Given Name", value: request.givenname },
    { name: "Family Name", value: request.familyname },
    { name: "Username", value: request.username },
    { name: "User ID", value: link },
    {
      name: "Creation Date",
      value: dateToHuman(new Date(request.creationTime)),
    },
    { name: "Note", value: <i>{request.notes}</i> },
  ];
  return (
    <RequestView data={data}>
      <RejectButton request={request} />
      <ConfirmButton request={request} />
    </RequestView>
  );
}
