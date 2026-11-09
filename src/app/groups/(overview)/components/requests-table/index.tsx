// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";
import { ListItem, UnorderedList } from "@/components/list";

import { GroupRequest } from "@/models/group-requests";
import { dateToHuman } from "@/utils/dates";

import { GroupRequestOptions } from "./options";

type GroupRequestViewProps = {
  userId: string;
  request: GroupRequest;
  isAdmin: boolean;
};

function GroupRequestView(props: Readonly<GroupRequestViewProps>) {
  const { userId, request, isAdmin } = props;
  const { groupName, groupUuid, notes, creationTime } = request;
  const sent = creationTime ? dateToHuman(new Date(creationTime)) : "N/A";
  return (
    <ListItem key={groupName}>
      <div className="flex grow">
        <div>
          {isAdmin ? (
            <Link href={`/groups/${groupUuid}`}>{groupName}</Link>
          ) : (
            <p className="text-gray-950 dark:text-gray-100">{groupName}</p>
          )}
          <p className="text-sm">
            Motivation: <q>{notes}</q>
          </p>
          <p className="text-xs">Sent {sent}</p>
        </div>
      </div>
      <GroupRequestOptions
        userId={userId}
        userFormattedName={request.userFullName ?? "unknown user"}
        request={request}
      />
    </ListItem>
  );
}

type GroupRequestsTableProps = {
  userId: string;
  requests: GroupRequest[];
  isAdmin: boolean;
};

export function GroupRequestsTable(props: Readonly<GroupRequestsTableProps>) {
  const { userId, requests, isAdmin } = props;
  return (
    <UnorderedList>
      {requests.map(req => (
        <GroupRequestView
          key={req.uuid}
          userId={userId}
          request={req}
          isAdmin={isAdmin}
        />
      ))}
    </UnorderedList>
  );
}
