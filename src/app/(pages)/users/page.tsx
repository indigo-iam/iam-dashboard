import Page from "@/components/Page";
import Users from "./components/Users";

type UsersProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default async function UsersPage(props: Readonly<UsersProps>) {
  const { searchParams } = props;
  return (
    <Page title="Users">
      <Users {...searchParams} />
    </Page>
  );
}
