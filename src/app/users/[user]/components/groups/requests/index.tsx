// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { GroupRequestsTable } from "@/app/groups/(overview)/components";
import { GroupRequest } from "@/models/group-requests";

type GroupRequestProps = {
  userId: string;
  requests: GroupRequest[];
};

export function GroupRequests(props: Readonly<GroupRequestProps>) {
  const { userId, requests } = props;
  return (
    <div className="panel space-y-4">
      <h2>Pending requests</h2>
      <GroupRequestsTable userId={userId} requests={requests} />
    </div>
  );
}
