// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { GroupRequest } from "@/models/group-requests";
import { dateToHuman } from "@/utils/dates";
import GroupRequestOptions from "./options";
import Link from "next/link";

type RowPros = {
  request: GroupRequest;
};

export function Row(props: Readonly<RowPros>) {
  const { request } = props;
  const { userFullName, username, userUuid, groupName, groupUuid } = request;
  const creationTime = request.creationTime
    ? dateToHuman(new Date(request.creationTime))
    : "N/A";

  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <div className="space-x-1">
          <span>User</span>
          <Link
            href={`/users/${userUuid}`}
            className="space-x-1 break-all hover:underline"
          >
            <span className="font-bold">{userFullName}</span>
            <span>({username})</span>
          </Link>
          <span>asked to join group</span>
          <Link href={`/groups/${groupUuid}`} className="hover:underline">
            <span className="font-bold">{groupName}</span>
          </Link>
          <span>{creationTime}</span>.
        </div>
        <span className="p-2 italic">Motivation: {request.notes}</span>
      </div>
      <GroupRequestOptions request={request} />
    </li>
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
    <TabPanel className="panel space-y-4">
      <ul className="w-full table-auto">
        {requests.map(r => (
          <Row key={r.uuid} request={r} />
        ))}
      </ul>
    </TabPanel>
  );
}
