// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { GroupRequest } from "@/models/group-requests";
import { dateToHuman } from "@/utils/dates";
import GroupRequestOptions from "./options";
import Link from "@/components/link";

type RowPros = {
  request: GroupRequest;
};

export function Row(props: Readonly<RowPros>) {
  const { request } = props;
  const { userFullName, username, userUuid, groupName } = request;
  const creationTime = request.creationTime
    ? dateToHuman(new Date(request.creationTime))
    : "N/A";

  return (
    <li className="iam-list-item">
      <div className="flex grow">
        <div className="grow">
          <p className="text-gray-950 dark:text-gray-100">
            User{" "}
            <Link className="iam-link" href={`/users/${userUuid}`}>
              {userFullName} (<i>{username}</i>)
            </Link>{" "}
            asked to join group{" "}
            <Link className="iam-link" href={`/groups/${request.groupUuid}`}>
              {groupName}
            </Link>
            .
          </p>
          <p className="text-sm">
            Motivation: <q>{request.notes}</q>
          </p>
          <p className="text-xs">Sent {creationTime}</p>
        </div>
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
      <div className="panel flex flex-col gap-4">
        <h3>Group requests</h3>
        <p>There are no pending requests.</p>
      </div>
    );
  }
  return (
    <div className="panel">
      <h3>Group requests</h3>
      <ul className="w-full table-auto">
        {requests.map(r => (
          <Row key={r.uuid} request={r} />
        ))}
      </ul>
    </div>
  );
}
