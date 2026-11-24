// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { UserGroupIcon } from "@heroicons/react/24/solid";

import Link from "@/components/link";
import { ListItem, UnorderedList } from "@/components/list";
import { ScimReference } from "@/models/scim";
import GroupOptions from "./options";
import JoinGroupButton from "./join-group-button";
import { Panel } from "@/components/layout";

type ViewProps = {
  groupId: string;
  groupDisplay: string;
};

function StaticView(props: Readonly<ViewProps>) {
  const { groupId, groupDisplay } = props;
  return (
    <div className="flex grow flex-col">
      <p className="text-gray-950 dark:text-gray-100">{groupDisplay}</p>
      <p className="text-sm font-light">{groupId}</p>
    </div>
  );
}

function LinkView(props: Readonly<ViewProps>) {
  const { groupId, groupDisplay } = props;
  return (
    <div className="flex grow flex-col">
      <Link href={`/groups/${groupId}`}>{groupDisplay}</Link>
      <p className="text-sm font-light">{groupId}</p>
    </div>
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
    <ListItem>
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
    </ListItem>
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
  isMe: boolean;
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
    isMe,
  } = props;
  if (!userGroups || userGroups.length === 0) {
    return (
      <Panel>
        <div className="flex justify-between">
          <h2>Joined group</h2>
        </div>
        <div>
          <UserGroupIcon className="mx-auto size-16 text-gray-400" />
          <p className="p-2 text-center text-sm">
            {isMe
              ? "You are not member of any group. Send a request to join your first group"
              : "The user is not member of any group."}
          </p>
          <JoinGroupButton
            userId={userId}
            userName={userName}
            userFormattedName={userFormattedName}
            userEmail={userEmail}
            isAdmin={isAdmin}
            className="mx-auto"
          />
        </div>
      </Panel>
    );
  }
  return (
    <Panel>
      <div className="flex justify-between">
        <h2>Joined groups</h2>
        <JoinGroupButton
          userId={userId}
          userName={userName}
          userFormattedName={userFormattedName}
          userEmail={userEmail}
          isAdmin={isAdmin}
          variant="outline"
        />
      </div>
      <UnorderedList>
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
      </UnorderedList>
    </Panel>
  );
}
