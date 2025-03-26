// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel } from "@/components/layout";
import { fetchMe } from "@/services/me";
import { fetchUser } from "@/services/users";
import { ManagedGroups, UnmanagedGroups } from "./components";
import JoinGroupButton from "./components/join-group-button";

type UserPageProps = {
  params: Promise<{ user: string }>;
};

export default async function UserGroupsPage(props: Readonly<UserPageProps>) {
  const userId = (await props.params).user;
  const isMe = userId === "me";
  const user = isMe ? await fetchMe() : await fetchUser(userId);
  return (
    <Page title="User Groups">
      <Panel>
        <JoinGroupButton user={user} />
        <UnmanagedGroups user={user} />
        <ManagedGroups user={user} />
      </Panel>
    </Page>
  );
}
