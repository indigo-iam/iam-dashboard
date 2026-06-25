// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { TabGroup, TabList, TabPanels, Tab } from "@/components/tabs";
import {
  GroupInfo,
  Managers,
  Members,
  Subgroups,
  EditGroupButton,
} from "./components";
import { fetchGroup } from "@/services/groups";

import { redirect } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/24/solid";

type GroupPageProps = {
  params: Promise<{ group: string }>;
};

export default async function GroupPage(props: Readonly<GroupPageProps>) {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const { params } = props;
  const groupID = (await params).group;
  const group = await fetchGroup(groupID);
  if (!group) {
    redirect("/groups");
  }
  const isAdmin = await isUserAdmin();
  const indigoUser = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const groupId = group.id;
  const groupName = group.displayName;
  const groupDescription = indigoUser.description;

  return (
    <section>
      <header className="section-header">
        <div className="flex grow items-center gap-2">
          <UserGroupIcon className="size-5" />
          <h2 className="text-base font-normal">{groupName}</h2>
        </div>
        <EditGroupButton group={group} />
      </header>
      <TabGroup className="container space-y-8">
        <TabList className="flex overflow-auto">
          <Tab>GENERAL</Tab>
          <Tab>SUBGROUPS</Tab>
          {isAdmin && <Tab>MANAGERS</Tab>}
          <Tab>MEMBERS</Tab>
        </TabList>
        <TabPanels>
          <GroupInfo group={group} />
          <Subgroups groupId={group.id} groupName={groupName} />
          {isAdmin && <Managers group={group} />}
          <Members
            groupId={groupId}
            groupName={groupName}
            groupDescription={groupDescription}
            isAdmin={isAdmin}
          />
        </TabPanels>
      </TabGroup>
    </section>
  );
}
