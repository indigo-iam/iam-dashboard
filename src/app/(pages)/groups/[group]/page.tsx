import { Page, Panel, Section } from "@/components/layout";
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
    <Page title={group.displayName}>
      <Panel>
        <Section title="Group Information">
          <GroupInfo group={group} />
        </Section>
        <Section title="Subgroups">
          <Subgroups group={group} />
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
