// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel } from "@/components/layout";
import { fetchMe } from "@/services/me";
import { fetchUser } from "@/services/users";
import {
  Attributes,
  Certificates,
  GroupRequests,
  LinkedAccounts,
  SSHKeys,
  UserInfo,
} from "./components";

type UserPageProps = {
  params: Promise<{ user: string }>;
};

export default async function UserPage(props: Readonly<UserPageProps>) {
  const userId = (await props.params).user;
  const isMe = userId === "me";
  const user = isMe ? await fetchMe() : await fetchUser(userId);

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <Page title={user.name?.formatted}>
      <Panel>
        <UserInfo user={user} isMe={isMe} />
        <GroupRequests user={user} isMe={isMe} />
        <LinkedAccounts user={user} />
        <Certificates user={user} />
        <SSHKeys user={user} />
        <Attributes user={user} />
      </Panel>
    </Page>
  );
}
