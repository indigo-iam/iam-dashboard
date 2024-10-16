import { Page, Panel } from "@/components/Layout";
import Section from "@/components/Section";
import SubgroupsTable from "./components/Subgroups/Table";
import GroupInfo from "./components/GroupInfo";
import Members from "./components/Members";
import { fetchGroup } from "@/services/groups";
import Managers from "./components/Managers";

type GroupPageProps = {
  params: { group: string };
};

export default async function GroupPage(props: Readonly<GroupPageProps>) {
  const { params } = props;
  const groupID = params.group;
  const group = await fetchGroup(groupID);

  return (
    <Page title={group.displayName}>
      <Panel>
        <Section title="Group Information">
          <GroupInfo group={group} />
        </Section>
        <Section title="Subgroups">
          <SubgroupsTable group={group} />
        </Section>
        <Section title="Managers">
          <Managers group={group} />
        </Section>
        <Section title="Members">
          <Members group={group} />
        </Section>
      </Panel>
    </Page>
  );
}
