import Page from "@/components/Page";
import UsersTable from "./components/UsersTable";
import AddUser from "./components/AddUser";

type UsersProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default async function Users(props: Readonly<UsersProps>) {
  const { searchParams } = props;
  return (
    <Page title="Users">
      <UsersTable {...searchParams} />
      <AddUser />
    </Page>
  );
}
