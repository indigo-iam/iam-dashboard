// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { GroupRequestsTable } from "@/app/groups/(overview)/components";
import { GroupRequest } from "@/models/group-requests";
import { User } from "@/models/scim";

type GroupRequestProps = {
  user: User;
  requests: GroupRequest[];
};

export function GroupRequests(props: Readonly<GroupRequestProps>) {
  const { user, requests } = props;
  return (
    <div className="panel space-y-4">
      <h2>Pending requests</h2>
      <GroupRequestsTable user={user} requests={requests} />
    </div>
  );
}
