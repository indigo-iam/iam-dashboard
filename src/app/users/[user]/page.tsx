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
  const userIdParam = (await props.params).user;
  const isMe = userIdParam === "me" || userIdParam === session.user.sub;

  const user = isMe ? await fetchMe() : await fetchUser(userIdParam);
  if (!user) {
    return <h1>User not found</h1>;
  }

  const searchParams = await props.searchParams;
  const isAdmin = await isUserAdmin();
  if (!isMe && !isAdmin) {
    redirect("/");
  }
  const mfaEnabled = await statusMFA();
  const userId = user.id;
  const userName = user.userName ?? "unknown userName";
  const userFormattedName = user.name?.formatted ?? "unknown user";
  const userGivenName = user.name?.givenName ?? "unknown name";
  const userFamilyName = user.name?.familyName ?? "unknown name";
  const userEmail = user.emails?.[0].value ?? "unknown email";
  const userIsActive = user.active ?? false;
  const userGroups = user.groups;
  const userCreatedAt = user.meta?.created;
  const userLastModified = user.meta?.lastModified;
  const indigoUser = user["urn:indigo-dc:scim:schemas:IndigoUser"];
  const userAupSignatureTime = indigoUser?.aupSignatureTime ?? null;
  const userEndTime = indigoUser?.endTime;
  const userAuthorities = indigoUser?.authorities ?? [];
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
          <Tab>ACTIVE TOKENS</Tab>
          <Tab>LINKED ACCOUNTS</Tab>
          <Tab>ATTRIBUTES</Tab>
        </TabList>
        <TabPanels>
          <General
            isMe={isMe}
            mfaEnabled={mfaEnabled}
            userId={userId}
            userName={userName}
            userFormattedName={userFormattedName}
            userGivenName={userGivenName}
            userFamilyName={userFamilyName}
            userAupSignatureTime={userAupSignatureTime}
            userEmail={userEmail}
            userIsActive={userIsActive}
            userCreatedAt={userCreatedAt}
            userLastModified={userLastModified}
            userEndTime={userEndTime}
            userAuthorities={userAuthorities}
            isAdmin={isAdmin}
          />
          <UserGroups
            userId={userId}
            userName={userName}
            userFormattedName={userFormattedName}
            userEmail={userEmail}
            userGroups={userGroups ?? []}
            isAdmin={isAdmin}
          />
          {!isMe && (
            <UserClients
              userId={userId}
              isAdmin={isAdmin}
              page={searchParams?.page}
              count={searchParams?.count}
            />
          )}
          {isMe && <ApprovedSites />}
          <ActiveTokens />
          <LinkedAccounts
            userId={userId}
            userName={userName}
            userFormattedName={userFormattedName}
            oidcIds={oidcIds}
            samlIds={samlIds}
            certificates={certificates}
            sshKeys={sshKeys}
          />
          <Attributes
            userId={userId}
            userName={userName}
            userFormattedName={userFormattedName}
            isAdmin={isAdmin}
          />
        </TabPanels>
      </TabGroup>
    </section>
  );
}
