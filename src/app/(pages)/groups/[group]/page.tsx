import Subgroups from "@/components/Group/Subgroups";
import GroupInformation from "@/components/Group/GroupInformation";
import Page from "@/components/Page";
import Panel from "@/components/Panel";
import Section from "@/components/Section";
import { fetchGroup } from "@/services/groups";
import Members from "@/components/Group/Members";

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
          <GroupInformation group={group} />
        </Section>
        <Section title="Subgroups">
          <Subgroups group={group} />
        </Section>
        <Section title="Managers">
          <p>To be implemented</p>
        </Section>
        <Section title="Members">
          <Members group={group} />
        </Section>
      </Panel>
    </Page>
  );
}
