// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel } from "@/components/layout";
import { Tab, TabGroup, TabList, TabPanels } from "@/components/tabs";
import { fetchMe } from "@/services/me";
import { fetchUser } from "@/services/users";
import {
  Attributes,
  Certificates,
  General,
  LinkedAccounts,
  SSHKeys,
  UserClients,
  UserGroups,
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
        <TabGroup className="space-y-8">
          <TabList className="flex overflow-auto">
            <Tab>GENERAL</Tab>
            <Tab>GROUPS</Tab>
            <Tab>CLIENTS</Tab>
            <Tab>LINKED ACCOUNTS</Tab>
            <Tab>CERTIFICATES</Tab>
            <Tab>SSH KEYS</Tab>
            <Tab>ATTRIBUTES</Tab>
          </TabList>
          <TabPanels>
            <General user={user} isMe={isMe} />
            <UserGroups user={user} />
            <UserClients isMe={isMe} />
            <LinkedAccounts user={user} />
            <Certificates user={user} />
            <SSHKeys user={user} />
            <Attributes user={user} />
          </TabPanels>
        </TabGroup>
      </Panel>
    </Page>
  );
}
