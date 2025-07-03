// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2
import { Layout } from "@/app/components/layout";
import { TabGroup, TabList, TabPanels, Tab } from "@/components/tabs";
import { GroupInfo, Managers, Members, Subgroups } from "./components";
import { fetchGroup } from "@/services/groups";

type GroupPageProps = {
  params: Promise<{ group: string }>;
};

export default async function GroupPage(props: Readonly<GroupPageProps>) {
  const { params } = props;
  const groupID = (await params).group;
  const group = await fetchGroup(groupID);
  return (
    <Layout title={group.displayName}>
      <TabGroup className="space-y-8">
        <TabList className="flex overflow-auto">
          <Tab>GENERAL</Tab>
          <Tab>SUBGROUPS</Tab>
          <Tab>MANAGERS</Tab>
          <Tab>MEMBERS</Tab>
        </TabList>
        <TabPanels>
          <GroupInfo group={group} />
          <Subgroups group={group} />
          <Managers group={group} />
          <Members group={group} />
        </TabPanels>
      </TabGroup>
    </Layout>
  );
}
