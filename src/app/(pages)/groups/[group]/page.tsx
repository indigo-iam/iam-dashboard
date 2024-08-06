import Page from "@/components/Page";
import Panel from "@/components/Panel";
import Section from "@/components/Section";
import { fetchGroup } from "@/services/groups";

type GroupPageProps = {
  params: { group: string };
};

export default async function GroupPage(props: Readonly<GroupPageProps>) {
  const { params } = props;
  const groupID = params.group;
  const group = await fetchGroup(groupID);

  return (
    <Page title={group.displayName}>
      <Panel>{JSON.stringify(group)}</Panel>
    </Page>
  );
}
