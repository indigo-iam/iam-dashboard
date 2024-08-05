import Page from "@/components/Page";
import GroupsTable from "./components/GroupsTable";

type GroupsProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default async function Groups(props: Readonly<GroupsProps>) {
  const { searchParams } = props;
  return (
    <Page title="Groups">
      <GroupsTable {...searchParams} />
    </Page>
  );
}
