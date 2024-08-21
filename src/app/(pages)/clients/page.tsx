import { Page } from "@/components/Layout";
import Clients from "@/components/Clients";

type ClientsProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default function ClientsPage(props: Readonly<ClientsProps>) {
  const { searchParams } = props;
  return (
    <Page title="Clients">
      <Clients searchParams={searchParams} />
    </Page>
  );
}
