// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";
import { ClockIcon } from "@heroicons/react/24/outline";

import { GroupRequest } from "@/models/group-requests";
import { dateToHuman } from "@/utils/dates";
import { GroupRequestOptions } from "./options";

type GroupRequestViewProps = {
  userId: string;
  request: GroupRequest;
};

function GroupRequestView(props: Readonly<GroupRequestViewProps>) {
  const { userId, request } = props;
  const { groupName, groupUuid, notes, creationTime } = request;
  const sent = creationTime ? dateToHuman(new Date(creationTime)) : "N/A";
  return (
    <li key={groupName} className="iam-list-item lg:gap-2">
      <Link
        className="flex grow flex-col lg:flex-row"
        href={`/groups/${groupUuid}`}
      >
        <div className="flex grow flex-col">
          <p className="text-gray-950 dark:text-white">{groupName}</p>
          <p className="text-sm font-light">
            <span>Motivation</span>: <span className="italic">{notes}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="size-4" />
          <span className="text-sm font-light">Sent {sent}</span>
        </div>
      </Link>
      <GroupRequestOptions userId={userId} request={request} />
    </li>
  );
}

type GroupRequestsTableProps = {
  userId: string;
  requests: GroupRequest[];
};

export async function GroupRequestsTable(
  props: Readonly<GroupRequestsTableProps>
) {
  const { userId, requests } = props;
  return (
    <ul>
      {requests.map(req => (
        <GroupRequestView key={req.uuid} userId={userId} request={req} />
      ))}
    </ul>
  );
}
