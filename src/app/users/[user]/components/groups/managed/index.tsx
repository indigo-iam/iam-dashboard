// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Suspense } from "react";

import { fetchManagedGroups } from "@/services/groups";
import { Panel } from "@/components/layout";
import Link from "@/components/link";
import { ListItem, UnorderedList } from "@/components/list";
import GroupOptions from "./options";

type RowProps = {
  groupId: string;
  groupName: string;
};

function Row(props: Readonly<RowProps>) {
  const { groupId, groupName } = props;
  return (
    <ListItem>
      <div className="flex grow flex-col">
        <Link className="iam-link" href={`/groups/${groupId}`}>
          {groupName}
        </Link>
        <p className="text-sm font-light">{groupId}</p>
      </div>
      <GroupOptions groupId={groupId} groupName={groupName} />
    </ListItem>
  );
}

type ContentProps = {
  userId: string;
};

async function Content(props: Readonly<ContentProps>) {
  const { userId } = props;
  const groups = await fetchManagedGroups(userId);

  if (groups.length === 0) {
    return null;
  }

  return (
    <Panel>
      <h2>Managed groups</h2>
      <UnorderedList>
        {groups.map(group => (
          <Row key={group.id} groupId={group.id} groupName={group.name} />
        ))}
      </UnorderedList>
    </Panel>
  );
}

type ManagedGroupProps = {
  userId: string;
};

export default function ManagedGroups(props: Readonly<ManagedGroupProps>) {
  const { userId } = props;
  return (
    <Suspense>
      <Content userId={userId} />
    </Suspense>
  );
}
