// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";
import { ScimReference } from "@/models/scim";
import GroupOptions from "./options";
import JoinGroupButton from "./join-group-button";

type StaticViewProps = {
  groupId: string;
  groupDisplay: string;
};

function StaticView(props: Readonly<StaticViewProps>) {
  const { groupId, groupDisplay } = props;
  return (
    <div className="flex grow flex-col">
      <p className="text-gray-950 dark:text-gray-100">{groupDisplay}</p>
      <p className="text-sm font-light">{groupId}</p>
    </div>
  );
}

type LinkViewProps = StaticViewProps;

function LinkView(props: Readonly<LinkViewProps>) {
  const { groupId, groupDisplay } = props;
  return (
    <Link href={`/groups/${groupId}`} className="flex grow flex-col">
      <p className="text-gray-950 dark:text-gray-100">{groupDisplay}</p>
      <p className="text-sm font-light">{groupId}</p>
    </Link>
  );
}

type RowProps = {
  userId: string;
  userDisplay: string;
  groupId: string;
  groupDisplay: string;
  isAdmin?: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { userId, userDisplay, groupId, groupDisplay, isAdmin } = props;
  return (
    <li className="iam-list-item">
      {isAdmin ? (
        <LinkView groupId={groupId} groupDisplay={groupDisplay} />
      ) : (
        <StaticView groupId={groupId} groupDisplay={groupDisplay} />
      )}
      <GroupOptions
        userId={userId}
        userDisplay={userDisplay}
        groupId={groupId}
        groupDisplay={groupDisplay}
      />
    </li>
  );
}

type UserGroupsProps = {
  userId: string;
  userName: string;
  userDisplay: string;
  userFormattedName: string;
  userEmail: string;
  userGroups?: ScimReference[];
  isAdmin?: boolean;
};

export default function UnmanagedGroups(props: Readonly<UserGroupsProps>) {
  const {
    userId,
    userName,
    userDisplay,
    userFormattedName,
    userEmail,
    userGroups,
    isAdmin,
  } = props;
  if (!userGroups || userGroups.length === 0) {
    return (
      <div className="panel space-y-4">
        <div className="flex justify-between">
          <h2>Joined groups</h2>
          <JoinGroupButton
            userId={userId}
            userName={userName}
            userFormattedName={userFormattedName}
            userEmail={userEmail}
            isAdmin={isAdmin}
          />
        </div>
        <p>No group found.</p>
      </div>
    );
  }
  return (
    <div className="panel space-y-4">
      <div className="flex justify-between">
        <h2>Joined groups</h2>
        <JoinGroupButton
          userId={userId}
          userName={userName}
          userFormattedName={userFormattedName}
          userEmail={userEmail}
          isAdmin={isAdmin}
        />
      </div>
      <ul className="w-full">
        {userGroups.map(g => (
          <Row
            key={g.value}
            userId={userId}
            userDisplay={userDisplay}
            groupId={g.value}
            groupDisplay={g.display}
            isAdmin={isAdmin}
          />
        ))}
      </ul>
    </div>
  );
}
