// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2
import { Layout } from "@/app/components/layout";
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
      <div className="space-y-8">
        <GroupInfo group={group} />
        <Subgroups group={group} />
        <Managers group={group} />
        <Members group={group} />
      </div>
    </Layout>
  );
}
