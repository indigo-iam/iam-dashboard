// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { UserIcon } from "@heroicons/react/24/solid";
import { getSession, isUserAdmin } from "@/auth";
import { Tab, TabGroup, TabList, TabPanels } from "@/components/tabs";
import { fetchMe } from "@/services/me";
import { fetchUser } from "@/services/users";
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
  return (
    <section>
      <header className="section-header">
        <UserIcon className="size-5" />
        <h2 className="text-base font-normal">{user.name?.formatted}</h2>
      </header>
      <TabGroup className="container space-y-8">
        <TabList className="flex overflow-auto">
          <Tab>GENERAL</Tab>
          {!isMe && <Tab>GROUPS</Tab>}
          {!isMe && <Tab>CLIENTS</Tab>}
          <Tab>APPROVED SITES</Tab>
          <Tab>ACTIVE TOKENS</Tab>
          <Tab>LINKED ACCOUNTS</Tab>
          <Tab>ATTRIBUTES</Tab>
        </TabList>
        <TabPanels>
          <General user={user} isMe={isMe} />
          {!isMe && <UserGroups user={user} isAdmin={isAdmin} />}
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
          <LinkedAccounts user={user} />
          <Attributes user={user} />
        </TabPanels>
      </TabGroup>
    </section>
  );
}
