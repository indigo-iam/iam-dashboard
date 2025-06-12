// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { fetchGroupsRequests } from "@/services/group-requests";
import { User } from "@/models/scim";
import GroupRequestOptions from "./options";

type GroupRequestProps = {
  user: User;
  isMe: boolean;
};

export default async function GroupRequests(
  props: Readonly<GroupRequestProps>
) {
  const { user, isMe } = props;
  const result = await fetchGroupsRequests(user.userName);

  if (!result || result.Resources.length === 0) {
    return null;
  }

  const groupRequests = result.Resources;

  return (
    <div className="panel">
      <h2>Group Requests</h2>
      <ul className="iam-list-item w-full">
        {groupRequests.map(req => {
          return (
            <li className="flex flex-row" key={req.uuid}>
              <div className="flex grow flex-col">
                <div className="inline-flex gap-1">
                  <span className="font-bold">Group Name:</span>
                  <span>{req.groupName}</span>
                </div>
                <div className="inline-flex gap-1">
                  <span className="font-bold">Group ID:</span>
                  <span>{req.groupUuid}</span>
                </div>
              </div>
              <GroupRequestOptions user={user} isMe={isMe} groupRequest={req} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
