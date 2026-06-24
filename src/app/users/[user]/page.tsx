// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { UserIcon } from "@heroicons/react/24/solid";
import { getSession, isUserAdmin } from "@/auth";
import { Tab, TabGroup, TabList, TabPanels } from "@/components/tabs";
import { fetchMe } from "@/services/me";
import { fetchUser, statusMFA } from "@/services/users";
import { redirect } from "next/navigation";
import {
  Attributes,
  General,
  LinkedAccounts,
  UserClients,
  UserGroups,
  ApprovedSites,
  ActiveTokens,
} from "./components";

type UserPageProps = {
  params: Promise<{ user: string }>;
  searchParams?: Promise<{ count?: string; page?: string }>;
};

export default async function UserPage(props: Readonly<UserPageProps>) {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const userId = (await props.params).user;
  const isMe = userId === "me" || userId === session.user.sub;

  const user = isMe ? await fetchMe() : await fetchUser(userId);
  if (!user) {
    return <h1>User not found</h1>;
  }

  const searchParams = await props.searchParams;
  const isAdmin = await isUserAdmin();
  if (!isMe && !isAdmin) {
    redirect("/");
  }
  const mfaEnabled = await statusMFA();
  const indigoUser = user["urn:indigo-dc:scim:schemas:IndigoUser"];
  const oidcIds = indigoUser?.oidcIds ?? [];
  const samlIds = indigoUser?.samlIds ?? [];
  const certificates = indigoUser?.certificates ?? [];
  const sshKeys = indigoUser?.sshKeys ?? [];

  return (
    <section>
      <header className="section-header flex items-center">
        <UserIcon className="size-5" />
        <h2 className="text-base font-normal">{user.name?.formatted}</h2>
      </header>
      <TabGroup className="container space-y-8">
        <TabList className="flex overflow-auto">
          <Tab>GENERAL</Tab>
          <Tab>GROUPS</Tab>
          {!isMe && <Tab>CLIENTS</Tab>}
          {isMe && <Tab>APPS AND WEBSITES</Tab>}
          {isMe && <Tab>ACTIVE TOKENS</Tab>}
          <Tab>LINKED ACCOUNTS</Tab>
          <Tab>ATTRIBUTES</Tab>
        </TabList>
        <TabPanels>
          <General user={user} isMe={isMe} mfaEnabled={mfaEnabled} />
          <UserGroups user={user} isAdmin={isAdmin} />
          {!isMe && (
            <UserClients
              user={user}
              isAdmin={isAdmin}
              page={searchParams?.page}
              count={searchParams?.count}
            />
          )}
          <ApprovedSites />
          <ActiveTokens />
          <LinkedAccounts
            userId={user.id}
            userName={user.displayName ?? "Unknown user"}
            oidcIds={oidcIds}
            samlIds={samlIds}
            certificates={certificates}
            sshKeys={sshKeys}
          />
          <Attributes
            userId={user.id}
            userName={user.name?.formatted ?? "Unknown user"}
          />
        </TabPanels>
      </TabGroup>
    </section>
  );
}
