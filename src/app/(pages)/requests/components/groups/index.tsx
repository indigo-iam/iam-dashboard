// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import InfoTable from "@/components/info-table";
import { TabPanel } from "@/components/tabs";
import Link from "@/components/link";
import { GroupRequest } from "@/models/group-requests";
import { dateToHuman } from "@/utils/dates";
import GroupRequestOptions from "./options";

type RowPros = {
  request: GroupRequest;
};

export function Row(props: Readonly<RowPros>) {
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
    <tr className="tbl-tr">
      <td className="tbl-td">
        <InfoTable data={data} />
      </td>
      <td className="tbl-td">
        <GroupRequestOptions request={request} />
      </td>
    </tr>
  );
}

type GroupsProps = {
  requests: GroupRequest[];
};

export default function Groups(props: Readonly<GroupsProps>) {
  const { requests } = props;
  if (requests.length === 0) {
    return (
      <TabPanel className="flex flex-col gap-4 divide-y">
        There are no pending requests.
      </TabPanel>
    );
  }
  return (
    <TabPanel>
      <table className="w-full table-auto">
        <tbody>
          {requests.map(r => (
            <Row key={r.uuid} request={r} />
          ))}
        </tbody>
      </table>
    </TabPanel>
  );
}
