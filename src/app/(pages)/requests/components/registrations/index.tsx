import InfoTable from "@/components/info-table";
import Link from "@/components/link";
import { TabPanel } from "@/components/tabs";
import { Registration } from "@/models/registration";
import { dateToHuman } from "@/utils/dates";
import RegistrationRequestsOptions from "./options";

type RowProps = {
  request: Registration;
};

function Row(props: Readonly<RowProps>) {
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
    <tr className="tbl-tr">
      <td className="tbl-td">
        <InfoTable data={data} />
      </td>
      <td className="tbl-td">
        <RegistrationRequestsOptions request={request} />
      </td>
    </tr>
  );
}

type RegistrationsProps = {
  requests: Registration[];
};

export default function Registrations(props: Readonly<RegistrationsProps>) {
  const { requests } = props;

  if (requests.length === 0) {
    return (
      <TabPanel className="flex flex-col gap-4 divide-y">
        There are no pending requests.
      </TabPanel>
    );
  }

  return (
    <TabPanel className="flex flex-col gap-4 divide-y">
      <table>
        <tbody>
          {requests.map(r => (
            <Row key={r.uuid} request={r} />
          ))}
        </tbody>
      </table>
    </TabPanel>
  );
}
