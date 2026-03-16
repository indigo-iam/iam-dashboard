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
    <li className="iam-list-item flex flex-row items-center">
      <div className="flex grow">
        <Link
          href={`/users/${userUuid}`}
          className="flex grow flex-col lg:flex-row"
        >
          <div className="flex grow flex-col">
            <p>
              User <b>{userFullName}</b> (<i>{username}</i>) asked to join group{" "}
              <b>{groupName}</b>.
            </p>
            <p className="text-gray dark:text-secondary/60 text-sm">
              Motivation: {request.notes}
            </p>
          </div>
          <p className="text-gray dark:text-secondary/50 flex items-center text-sm whitespace-nowrap lg:px-2 lg:text-right">
            Sent {creationTime}
          </p>
        </Link>
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
