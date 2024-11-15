import { Page, Panel, Section } from "@/components/Layout";
import { Groups } from "./components/Groups";

type GroupsProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default async function GroupsPage(props: Readonly<GroupsProps>) {
  const { searchParams } = props;
  return (
    <Page title="Groups">
      <Panel>
        <Section>
          <Groups {...searchParams} />
        </Section>
      </Panel>
    </Page>
  );
}
